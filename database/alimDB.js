// database.js
import * as SQLite from 'expo-sqlite';

async function setupAlimDB() {

  const db = await SQLite.openDatabaseAsync('alimDB.db');
  

  // NO ES ESTEEEEEEEEEE
  // BORRRAR

  await db.execAsync(`
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
      sugar INTEGER,
      salt INTEGER,
      sodium INTEGER,
      potassium INTEGER,
      cholesterol INTEGER,
      weight INTEGER,
      brand TEXT,
      imgSRC TEXT,
      unit TEXT,
      uploadSRC TEXT
      
    );
  `);

  return db;
}

export default setupAlimDB;
