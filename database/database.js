import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import JSZip from 'jszip';
import { initialData } from './initialData';
import { Asset } from 'expo-asset';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Alert } from 'react-native';


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
        CREATE TABLE IF NOT EXISTS consums (
          id INTEGER PRIMARY KEY NOT NULL,
          date DATETIME DEFAULT CURRENT_TIMESTAMP,
          alimId INTEGER NOT NULL,
          weight INTEGER,
          unit TEXT,
          FOREIGN KEY (alimId) REFERENCES alims (id)
        );
      `);

    await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS exercises (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          muscleGroup INTEGER NOT NULL,
          imgSRC TEXT,
          uploadSRC TEXT,
          FOREIGN KEY (muscleGroup) REFERENCES muscleGroup (id)
        );
    `);
    

    await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS musculatures (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          muscleGroup INTEGER,
          FOREIGN KEY (muscleGroup) REFERENCES muscleGroup (id)
        );
    `);

    await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS musculature_exercise (
          musculature_id INTEGER NOT NULL,
          exercise_id INTEGER NOT NULL,
          FOREIGN KEY (musculature_id) REFERENCES musculatures (id),
          FOREIGN KEY (exercise_id) REFERENCES exercises (id),
          PRIMARY KEY (musculature_id, exercise_id)
        );
    `);

    await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS muscleGroup (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
        );
    `);
  
    

    await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS routines (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          imgSRC TEXT DEFAULT '0'
        );
    `);

    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS routine_exercises (
      routine_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      exOrder INTEGER,
      sets INTEGER DEFAULT 3,
      FOREIGN KEY (routine_id) REFERENCES routines(id),
      FOREIGN KEY (exercise_id) REFERENCES exercises(id),
      PRIMARY KEY (routine_id, exercise_id)
       );
  `);

    await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS sets (
          id INTEGER PRIMARY KEY NOT NULL,
          exercise_id INTEGER NOT NULL,
          reps INTEGER NOT NULL,
          weight INTEGER,
          isMainSet BOOLEAN NOT NULL,
          date DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (exercise_id) REFERENCES exercises (id)
        );
    `);

    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS dropsets (
          id INTEGER PRIMARY KEY NOT NULL,
          main_set_id INTEGER NOT NULL, 
          drop_set_id INTEGER NOT NULL,
          set_order INTEGER NOT NULL, 
          FOREIGN KEY (main_set_id) REFERENCES sets (id),
          FOREIGN KEY (drop_set_id) REFERENCES sets (id)
      );
    `);


    await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          age INTEGER,
          activity INTEGER,
          goal INTEGER,
          gender TEXT,
          creationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
          height INTEGER
        );
    `);

    await dbInstance.execAsync(`
        CREATE TABLE IF NOT EXISTS exercise_images (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          imgIndex INTEGER NOT NULL,
          muscleGroup INTEGER NOT NULL,
          FOREIGN KEY (muscleGroup) REFERENCES muscleGroup (id)
        );
    `);

    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS weight (
        id INTEGER PRIMARY KEY NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        weight INTEGER NOT NULL
      );
    `);

    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS week (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        letter TEXT NOT NULL,
        routine_id INTEGER,
        FOREIGN KEY (routine_id) REFERENCES routines (id)
      );
    `);


    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS exercise_groups (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        imgSRC INTEGER
      );
    `);


    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS group_exercise (
        group_id INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        FOREIGN KEY (group_id) REFERENCES groups (id),
        FOREIGN KEY (exercise_id) REFERENCES exercises (id),
        PRIMARY KEY (group_id, exercise_id)
      );
    `);





    //-------------------------------------------------------------------------------------
    //DEBUG
    //-------------------------------------------------------------------------------------

    const DEBUG_DELETE_ALL_TABLES = false;
    if (DEBUG_DELETE_ALL_TABLES) {
      console.log('Droping all tables');
      try {
      //await dbInstance.execAsync(`DROP TABLE IF EXISTS alims;`);
      //await dbInstance.execAsync(`DROP TABLE IF EXISTS consums;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS exercises;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS musculatures;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS muscleGroup;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS routines;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS routine_exercises;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS dropsets;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS sets;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS user;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS musculature_exercise;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS exercise_images;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS weight;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS week;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS exercise_groups;`);
      await dbInstance.execAsync(`DROP TABLE IF EXISTS group_exercise;`);

      } catch (error) {
        console.error('Error deleting tables:', error);
      }
      finally {
        console.log('Tables dropped');
      }
    }

    //-------------------------------------------------------------------------------------
    //INITIAL DATA
    //-------------------------------------------------------------------------------------
    
    const mresult = await dbInstance.getAllAsync('SELECT COUNT(*) FROM muscleGroup');
    if (mresult[0]["COUNT(*)"]==0) {
        let query = `INSERT INTO muscleGroup (id,name) VALUES`;
        initialData.muscleGroups.forEach((group) => {
            query += `(${group.id},'${group.name}'),`;
        });
        query = query.slice(0, -1); // Elimina la última coma
        query += ';';
        try {
            console.log("Insertando datos iniciales muscleGroup")
            await dbInstance.execAsync(query);
        } catch (error) {
            console.error("Error al insertar datos iniciales gruposM", error);
        }
    }else{
      console.log("Skipping muscleGroup insertions")
    }


    const saveImage = async (imageSRC) => {
      const asset = Asset.fromModule(imageSRC);
      const assetUri = asset.uri;
      try{
        const fileName = `ex_${Date.now()}.jpg`; // Nombre único basado en la fecha actual
        const appImagePath = FileSystem.documentDirectory+`exImages/`;
        const newFilePath = appImagePath+`${fileName}`;
        const dirInfo = await FileSystem.getInfoAsync(appImagePath);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(appImagePath, { intermediates: true });
        }
        await FileSystem.downloadAsync(
          assetUri, // La URI del recurso en la carpeta de activos
          newFilePath // La ruta de destino en el sistema de archivos del usuario
        );
        return newFilePath;
      }
      catch (error) {
        console.error('Error downloading asset:', error);
      }
    }


     const eimgresult = await dbInstance.getAllAsync('SELECT COUNT(*) FROM exercise_images');
     if (eimgresult[0]["COUNT(*)"]==0){
         let query = `INSERT INTO exercise_images (name, imgIndex, muscleGroup) VALUES`;
  
         initialData.images.forEach((img,index) => {
             query += `('${img.name}', '${index}', ${img.muscleGroup}),`;
         });
         query = query.slice(0, -1); // Elimina la última coma
         query += ';';
         try {
             console.log("Insertando datos iniciales imagenes ejercicios")
             await dbInstance.execAsync(query);
         } catch (error) {
             console.error("Error al insertar datos iniciales imagenes ejercicios", error);
         }
     }
      else{
        console.log("Skipping exercise_images insertions")
      }



    const eresult = await dbInstance.getAllAsync('SELECT COUNT(*) FROM exercises');
    if (eresult[0]["COUNT(*)"]==0) {
        let query = `INSERT INTO exercises
                     (name, muscleGroup, imgSRC , uploadSRC) 
                     VALUES
        `;
        initialData.ejers.forEach((ejer) => {
            const image = initialData.images.find(img => img.name === ejer.image);
            const imageID = initialData.images.indexOf(image);
            if (!image) {
                console.error(`No se encontró la imagen ${ejer.image} para el ejercicio ${ejer.name}`);
                return;
            }
            query += `('${ejer.name}', ${ejer.muscleGroups[0]},${imageID},  'default'),`;
        });
        query = query.slice(0, -1); // Elimina la última coma
        query += ';';
        try {
            console.log("Insertando datos iniciales ejercicios");
            await dbInstance.execAsync(query);
        } catch (error) {
            console.error("Error al insertar datos iniciales ejercicios", error);
        }
    }else{
      console.log("Skipping exercises insertions")
    }
    

    const weekresult = await dbInstance.getAllAsync('SELECT COUNT(*) FROM week');
    if (weekresult[0]["COUNT(*)"]==0) {
        let query = `INSERT INTO week (id, name, letter) VALUES`;
        initialData.week.forEach((day) => {
            query += `(${day.id},'${day.name}','${day.letter}'),`;
        });
        query = query.slice(0, -1); // Elimina la última coma
        query += ';';
        try {
            console.log("Insertando datos iniciales week");
            await dbInstance.execAsync(query);
        } catch (error) {
            console.error("Error al insertar datos iniciales week", error);
        }
    }
    
    


  }

  return dbInstance;
};

export const getDatabase = () => dbInstance;












export const backupDatabase = async () => {
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


export const backupDatabaseToServer = async (serverDir) => {
  const dbPath = FileSystem.documentDirectory + 'SQLite/';
  const filesToSend = [
      { name: 'database.db', path: dbPath + 'database.db' },
      { name: 'database.db-wal', path: dbPath + 'database.db-wal' },
      { name: 'database.db-shm', path: dbPath + 'database.db-shm' }
  ];
  const formData = new FormData();
  filesToSend.forEach(file => {
      formData.append('file', {
          uri: 'file://' + file.path,
          type: 'application/octet-stream',
          name: file.name
      });
  });
  try {
      const response = await axios.post(`${serverDir}/upload`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      return response.data;
  } catch (error) {
      console.error('Upload error:', error);
  }
};


export const importBackUpFromServer = async (backup,serverDir) => {
  const filesToDownload = [backup.f0, backup.f1, backup.f2];

  const dbPath = FileSystem.documentDirectory + 'SQLite/';

  // Asegúrate de que el directorio SQLite exista
  const dirInfo = await FileSystem.getInfoAsync(dbPath);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dbPath, { intermediates: true });
  }

  await Promise.all(filesToDownload.map(async (file) => {
    try {
      const response = await axios.get(`${serverDir}/download/${file}`, { responseType: 'arraybuffer' });
      const filePath = dbPath + file.split('_')[1];
      const base64Data = Buffer.from(response.data, 'binary').toString('base64');
      await FileSystem.writeAsStringAsync(filePath, base64Data, { encoding: FileSystem.EncodingType.Base64 });
      Alert.alert('Base de datos importada');
    } catch (error) {
      console.error(`Error al descargar o guardar el archivo ${file}:`, error);
    }
  }));

  await setupDatabase();
};