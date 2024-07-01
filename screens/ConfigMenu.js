import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ConfigMenu = () => {

    const handleExportData = () => {
        console.log("Exporting data")
    }

    
  return (
    <View className="items-center justify-center h-full">
      
      
      <TouchableOpacity className="h-10 w-30 bg-gray-500 text-white rounded-lg" onPress={handleExportData}>
        <Text className="text-white">Exportar datos</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfigMenu