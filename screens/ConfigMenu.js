import { View, Text, TouchableOpacity , Alert } from 'react-native'
import React, { useEffect } from 'react'
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { backupDatabase , restoreDatabase , backupDatabaseToServer , importBackUpFromServer } from '../database/database';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { initialData } from '../database/initialData';
import { useDatabase } from '../hooks/DatabaseContext';
import axios from 'axios';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import entrenamientos from '../database/entrenamientos';
import relaciones from '../database/relaciones';
import moment from 'moment';

const ConfigMenu = () => {

  const db = useDatabase();
  const [availableBackups, setAvailableBackups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleChangeDate = async (event, selectedDate) => { 
    setDate(selectedDate);
    setShow(false);
    const formattedDate = selectedDate.toISOString();
    await db.runAsync(`UPDATE user SET creationDate = ? WHERE id = 0;`, [formattedDate]);
  };

  const showDatepicker = () => {
    setShow(true);
  };
  
  const handleExportData = async () => {
    backupDatabase();
    shareBackupFile();
  };  

  const shareBackupFile = async () => {
    const backupUri = `${FileSystem.documentDirectory}backup.tar`;
    try {
      await Sharing.shareAsync(backupUri);
    } catch (error) {
      console.error('Error al compartir archivo de copia de seguridad:', error);
    }
  };

  const handleImportData = async () => {
    try {
      const documentPickerResult = await DocumentPicker.getDocumentAsync({
        type: '*/*',	
        copyToCacheDirectory: false,
      });

  
      if (!documentPickerResult.cancelled) {
        const uri = documentPickerResult.assets[0].uri;
        const name = documentPickerResult.assets[0].name;

        if (!name.endsWith('.backup')) {
          Alert.alert('Selecciona un archivo de copia de seguridad válido');
        }
  
        // Obtener información del archivo seleccionado
        const fileInfo = await FileSystem.getInfoAsync(uri);
  
        if (!fileInfo.exists) {
          throw new Error('El archivo seleccionado no existe.');
        }
  
        // Crear una nueva ruta para la copia del archivo
        const newPath = `${FileSystem.documentDirectory}backupRestored.tar`;
  
        // Copiar el archivo a la nueva ruta
        await FileSystem.copyAsync({
          from: uri,
          to: newPath,
        });

        await restoreDatabase(newPath);
  
        Alert.alert('Base de datos importada');
        
        // Aquí puedes continuar con cualquier acción adicional que necesites con el archivo copiado
      } 
    } catch (error) {
      console.error('Error al importar archivo:', error);
      // Manejar el error de acuerdo a tu aplicación
    }
  };

  const handleBackUpToServer = async () => {
    const response = backupDatabaseToServer();
    if (response){
      Alert.alert('Backup realizado con éxito');
      getAvailableBackups();
    } else {
      Alert.alert('Error al realizar el backup');
    }
  };

  
  const getAvailableBackups = async () => {
    try {
      const response = await axios.get('http://192.168.28.151:5000/list');
      if(response.status === 200){
      setAvailableBackups(response.data);
      }
    } catch (error) {
      console.error('Error al obtener backups:', error);
    }
  }



  const handleImportDataFromServer = async (backup) => {
    const response = importBackUpFromServer(backup);
    if (response){
      Alert.alert('Backup restaurado con éxito');
    } else {
      Alert.alert('Error al restaurar el backup');
    }
  }

  const formatDate = (date,time) => {
    const dateTime = `${date} ${time}`;
    return moment(dateTime, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm');
  }

  const importDataFromOldDB = async () => {
    try {
      if (db) {
        for (let i = 0; i < entrenamientos.length; i++) {
          if(!relaciones[entrenamientos[i].ej_id]){
            continue;
          }
          const query = `
            INSERT INTO sets
            (exercise_id, weight, reps, date, isMainSet)
            VALUES (?, ?, ?, ?, 1);
          `;
          const values = [relaciones[entrenamientos[i].ej_id], entrenamientos[i]["medidas"].peso, entrenamientos[i]["medidas"].reps, formatDate(entrenamientos[i].fecha,entrenamientos[i].hora)];
          await db.runAsync(query, values);
        }
      }
    } catch (error) {
      console.error("Error al insertar rutina", error);
      return;
    } finally {
      // Código de limpieza o navegación aquí si es necesario
    }
  }



    
  return (
    <View className="items-center justify-center h-full space-y-10">
      
      
      <TouchableOpacity p-4 onPress={handleExportData}>
        <Text >Exportar datos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImportData} p-4>
        <Text >Importar datos</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={handleBackUpToServer} p-4>
        <Text >Backup a Server</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getAvailableBackups} p-4>
        <Text >Ver Backups en Server</Text>
      </TouchableOpacity>

      {availableBackups.map((backup, index) => (
        <TouchableOpacity key={index} onPress={() => handleImportDataFromServer(backup)} p-4>
          <Text >Restaurar Copia de seguridad {backup.name}</Text>
        </TouchableOpacity>
      ))}


      <TouchableOpacity onPress={showDatepicker} p-4>
        <Text >Cambiar fecha inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => importDataFromOldDB()} p-4>
        <Text >ImportDataFromOldDB</Text>
      </TouchableOpacity>

        {show && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleChangeDate}
        />
      )}

    </View>
  )
}

export default ConfigMenu