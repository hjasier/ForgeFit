import * as SQLite from 'expo-sqlite';

let dbInstance = null;

export const setupDatabase = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('database.db');

    await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS alims (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          barCode INTEGER,
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
        CREATE TABLE IF NOT EXISTS alimGroups (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
        );
      `);
  }
  return dbInstance;
};

export const getDatabase = () => dbInstance;
