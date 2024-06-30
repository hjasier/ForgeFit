// SerApiTest.js

import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import axios from 'axios';

const SerApiTest = () => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    // Función para hacer la solicitud a SerpApi
    const fetchImage = async () => {
        try {
          const searchTerm = ''; // Término de búsqueda, puedes cambiarlo dinámicamente
          const apiKey = '59eca2e25fdc7f5d6b71f94d235f77ccf048e2d3e7fdb05f545e4721bfcdc76e';
          const apiUrl = `https://serpapi.com/search?engine=google_images&q=${encodeURIComponent(searchTerm)}&api_key=${apiKey}`;
      
          const response = await axios.get(apiUrl);
      
          // Obtener la URL de la primera imagen de los resultados
          if (response.data && response.data.images_results && response.data.images_results.length > 0) {
            const firstImage = response.data.images_results[0].original;
            setImageURL(firstImage);
          } else {
            setImageURL('');
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

    // Llamar a la función para cargar la imagen al cargar el componente
    fetchImage();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageURL ? (
        <Image
          source={{ uri: imageURL }}
          style={{ width: 200, height: 200, resizeMode: 'cover', borderRadius: 10 }}
        />
      ) : (
        <Text>No se encontró ninguna imagen</Text>
      )}
    </View>
  );
};

export default SerApiTest;
