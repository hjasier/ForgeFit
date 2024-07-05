import { View, Text, TouchableOpacity , Alert  } from 'react-native'
import React from 'react'
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { backupDatabase , restoreDatabase } from '../database/database';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { initialData } from '../database/initialData';
import { useDatabase } from '../hooks/DatabaseContext';


const ConfigMenu = () => {

  const db = useDatabase();
  
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
  
        console.log(`Archivo copiado exitosamente a ${newPath}`);
        Alert.alert('Base de datos importada');
        
        // Aquí puedes continuar con cualquier acción adicional que necesites con el archivo copiado
      } else {
        console.log('Selección de documento cancelada por el usuario.');
      }
    } catch (error) {
      console.error('Error al importar archivo:', error);
      // Manejar el error de acuerdo a tu aplicación
    }
  };






    
  return (
    <View className="items-center justify-center h-full">
      
      
      <TouchableOpacity className="h-10 w-30 bg-gray-500 text-white rounded-lg" onPress={handleExportData}>
        <Text className="text-white">Exportar datos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImportData} className="h-10 w-30 bg-gray-500 text-white rounded-lg">
        <Text className="text-white">Importar datos</Text>
      </TouchableOpacity>


    </View>
  )
}

export default ConfigMenu