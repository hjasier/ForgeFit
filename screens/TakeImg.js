import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View , Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import * as FileSystem from 'expo-file-system';

export default function TakeImg() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarcodeScanned = ({ data }) => {
    if (scanned) {
      return;
    }
    console.log(data);
    Vibration.vibrate();
    setScanned(true);
    navigation.goBack();


  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        // Toma la foto y obtén la URI temporal
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Foto temporalmente guardada en: ', photo.uri);

        // Definir la ruta donde se guardará la imagen dentro de la aplicación
        const appImagePath = `${FileSystem.documentDirectory}photos/`;
        const fileName = `photo_${Date.now()}.jpg`; // Nombre único basado en la fecha actual
        const newFilePath = appImagePath + fileName;

        // Asegurar que la carpeta 'photos' exista
        const dirInfo = await FileSystem.getInfoAsync(appImagePath);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(appImagePath, { intermediates: true });
        }

        // Mover la imagen desde la ubicación temporal a la carpeta definida
        await FileSystem.moveAsync({
          from: photo.uri,
          to: newFilePath,
        });

        console.log('Foto guardada en la aplicación en: ', newFilePath);
        navigation.navigate('AlimAdd', { imgSRC: newFilePath });
      } catch (error) {
        console.log('Error al tomar la foto: ', error);
      }
    }
  };




  return (
    <View style={styles.container}>
      <CameraView 
      style={styles.camera} 
      facing={facing}
      ref={cameraRef}
      >
        <View className="items-center justify-center h-full px-4" >
          <View className="w-72 rounded-2xl border-8 border-white h-72"/>
          <TouchableOpacity onPress={handleTakePicture} className="mt-9 w-24 h-24 bg-white rounded-full border-gray-200 border-8"/>
        </View>
      </CameraView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});