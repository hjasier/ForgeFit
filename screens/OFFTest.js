// OFFTest.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const OFFTest = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        search_terms: query,
        search_simple: 1,
        action: 'process',
        json: 1,
        lc: 'es', // Idioma
        page_size: 5,
      };

      const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', { params });

      setProducts(response.data.products || []);
    } catch (err) {
      setError('Error al buscar productos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Productos en OpenFoodFacts</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Introduce el nombre del producto"
      />
      <Button
        title={loading ? 'Buscando...' : 'Buscar'}
        onPress={searchProducts}
        disabled={loading}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.productList}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text><Text style={styles.bold}>Marca:</Text> {item.brands}</Text>
              <Text><Text style={styles.bold}>Ingredientes:</Text> {item.ingredients_text}</Text>
              <Text><Text style={styles.bold}>Calorías:</Text> {item.nutriments?.energy} kJ</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  productList: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  productItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default OFFTest;
