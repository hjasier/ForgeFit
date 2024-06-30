import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import setupDatabaseTest from '../database/databaseTest';


export default function SQTest() {
  const [db, setDb] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function initializeDb() {
      // Configuración de la base de datos
      const database = await setupDatabaseTest();
      setDb(database);

      // Leer todos los registros de la tabla 'todos'
      const allTodos = await database.getAllAsync('SELECT * FROM todos');
      setTodos(allTodos);
    }

    initializeDb();
  }, []);

  const addTodo = async () => {
    if (db) {
      await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', ['Nuevo Todo', Math.random() * 100]);
      const updatedTodos = await db.getAllAsync('SELECT * FROM todos');
      setTodos(updatedTodos);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQLite en Expo</Text>

      <Button title="Agregar TODO" onPress={addTodo} />

      <ScrollView style={styles.todoList}>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.todoItem}>
            <Text>{`ID: ${todo.id} - ${todo.value} (IntValue: ${todo.intValue})`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}




























const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  todoList: {
    marginTop: 16,
    width: '100%',
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 5,
  },
});
