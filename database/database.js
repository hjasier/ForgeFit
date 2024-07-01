import * as SQLite from 'expo-sqlite';

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
