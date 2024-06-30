import React, { createContext, useContext, useEffect, useState } from 'react';
import { setupDatabase } from '../database/database';


const DatabaseContext = createContext(null);


export const DatabaseProvider = ({ children }) => {
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    
    async function initializeDatabase() {
      const db = await setupDatabase();
      setDatabase(db);
    }

    initializeDatabase();
  }, []);

  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  return useContext(DatabaseContext);
};
