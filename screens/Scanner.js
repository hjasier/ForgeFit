import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View , Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

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
    
    Vibration.vibrate();
    setScanned(true);

    getAlimData(data);

    //navigation.goBack();

  };


  const getAlimData = async (barcode) => {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await response.json();
    if (data.status === 0) {
      alert("Producto no encontrado");
      setTimeout(() => {
        setScanned(false);
      }, 800);
      return;
    }
    navigation.navigate('MacrosInfo', {data: data});
  }

  return (
    <View style={styles.container}>
      <CameraView 
      style={styles.camera} 
      facing={facing}
      barcodeScannerSettings={{
        barcodeTypes: [
          'code128',
          'aztec',
          'ean13',
          'ean8',
          'pdf417',
          'upc_e',
          'datamatrix',
          'code39',
          'code93',
          'itf14',
          'codabar',
          'upc_a'
      ],
      }}
      onBarcodeScanned={handleBarcodeScanned}
      >
        <View className="items-center justify-center h-full px-4" >
          <View className="w-full rounded-2xl border-8 border-white h-52"></View>
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