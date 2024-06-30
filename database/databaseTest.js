// database.js
import * as SQLite from 'expo-sqlite';

async function setupDatabaseTest() {
  // Abre o crea la base de datos 'myDatabase.db'
  const db = await SQLite.openDatabaseAsync('myDatabase.db');
  
  // Configuración inicial de la base de datos
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY NOT NULL,
      value TEXT NOT NULL,
      intValue INTEGER
    );
  `);

  return db;
}

export default setupDatabaseTest;
