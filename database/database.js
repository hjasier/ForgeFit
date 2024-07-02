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
    const dbPath = FileSystem.documentDirectory + 'TEST/';
    
    const tarBase64 = await FileSystem.readAsStringAsync(tarUri, { encoding: FileSystem.EncodingType.Base64 });

        // Convertir la cadena Base64 en datos binarios (Buffer)
        const tarBuffer = Buffer.from(tarBase64, 'base64');

        // Crear un stream de lectura desde el buffer
        const tarStream = new Readable();
        tarStream.push(tarBuffer);
        tarStream.push(null); // Fin del stream

        // Extraer el contenido del archivo tar en la ruta especificada
        await extract({
            file: tarStream,
            cwd: dbPath
        });


    console.log('Database restored successfully');
  } catch (error) {
    console.error('Error restoring database:', error);
  }
};
