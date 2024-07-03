import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import JSZip from 'jszip';

let dbInstance = null;

export const setupDatabase = async () => {
  if (!dbInstance) {
    console.log('Creating database instance');
    dbInstance = await SQLite.openDatabaseAsync('database.db');
    
    await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS alims (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          barCode INTEGER unique,
          kcals INTEGER,
          protein INTEGER,
          carbs INTEGER,
          fat INTEGER,
          saturated INTEGER,
          fiber INTEGER,
          sugars INTEGER,
          salt INTEGER,
          sodium INTEGER,
          potassium INTEGER,
          cholesterol INTEGER,
          weight INTEGER,
          unit TEXT,
          alimGroup INTEGER,
          brand TEXT,
          imgSRC TEXT,
          uploadSRC TEXT
        );
      `);

    await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS consums (
          id INTEGER PRIMARY KEY NOT NULL,
          hour TEXT NOT NULL,
          day TEXT NOT NULL,
          month TEXT NOT NULL,
          year TEXT NOT NULL,
          alimId INTEGER NOT NULL,
          weight INTEGER,
          unit TEXT,
          FOREIGN KEY (alimId) REFERENCES alims (id)
        );
      `);

    await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ejers (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          musculature INTEGER NOT NULL,
          imgSRC TEXT,
          uploadSRC TEXT,
          FOREIGN KEY (musculature) REFERENCES musculatures (id)
        );
    `);

    await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS musculature (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
        );
    `);

    await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS routine (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          imgSRC TEXT,
        );
    `);

    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS routine_exercise (
      routine_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      order INTEGER,
      FOREIGN KEY (routine_id) REFERENCES rutines(id),
      FOREIGN KEY (exercise_id) REFERENCES exercises(id),
      PRIMARY KEY (routine_id, exercise_id)
       );
  `);

    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS dropSets (
        id INTEGER PRIMARY KEY NOT NULL,
        ejerId INTEGER NOT NULL,
        reps INTEGER,
        weight INTEGER,
        FOREIGN KEY (ejerId) REFERENCES ejers (id)
      );
    `);

    await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS sets (
          id INTEGER PRIMARY KEY NOT NULL,
          ejerId INTEGER NOT NULL,
          reps INTEGER,
          weight INTEGER,
          dropSet_id INTEGER,
          FOREIGN KEY (ejerId) REFERENCES ejers (id)
          FOREIGN KEY (dropSet_id) REFERENCES dropSets (id)
        );
    `);


    await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          age INTEGER,
          weight INTEGER,
          height INTEGER,
        );
    `);




    
  }
  return dbInstance;
};

export const getDatabase = () => dbInstance;












export const backupDatabase = async () => {
  console.log('Backing up database');
  try {
    const dbPath = FileSystem.documentDirectory + 'SQLite/';
    const filesToCompress = [
      { name: 'database.db', path: dbPath + 'database.db' },
      { name: 'database.db-wal', path: dbPath + 'database.db-wal' },
      { name: 'database.db-shm', path: dbPath + 'database.db-shm' }
  ];
    const tarUri = `${FileSystem.documentDirectory}backup.tar`;

    const zip = new JSZip();

    // Agregar los archivos al zip
    await Promise.all(filesToCompress.map(async (file) => {
        const fileContent = await FileSystem.readAsStringAsync(file.path, { encoding: FileSystem.EncodingType.Base64 });
        zip.file(file.name, fileContent, { base64: true });
    }));

    // Generar el archivo tar como Base64
    const tarBase64 = await zip.generateAsync({ type: 'base64', compression: 'DEFLATE' });

    // Guardar el archivo tar como Base64
    await FileSystem.writeAsStringAsync(tarUri, tarBase64, { encoding: FileSystem.EncodingType.Base64 });

    console.log('Database backup completed successfully at:', tarUri);
  } catch (error) {
    console.error('Error backing up database:', error);
  }
};


export const restoreDatabase = async (tarUri) => {
  console.log('Restoring database');
  try {
    const dbPath = FileSystem.documentDirectory + 'SQLite/';
    const zip = new JSZip();
    const tarBase64 = await FileSystem.readAsStringAsync(tarUri, { encoding: FileSystem.EncodingType.Base64 });

    // Cargar el archivo tar
    await zip.loadAsync(tarBase64, { base64: true });

    // Extraer los archivos del tar
    await Promise.all(Object.keys(zip.files).map(async (fileName) => {
      const file = zip.files[fileName];
      const filePath = dbPath + fileName;
      await FileSystem.writeAsStringAsync(filePath, file._data, { encoding: FileSystem.EncodingType.Base64 });
    }
    ));


    console.log('Database restored successfully');
  } catch (error) {
    console.error('Error restoring database:', error);
  }
};
