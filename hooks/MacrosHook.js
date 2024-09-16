import { useState, useEffect , createContext ,useContext} from 'react';
import { useDatabase } from './DatabaseContext';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const MacrosContext = createContext(null);

export const MacrosProvider = ({ children }) => {

  const [todayGoals, setTodayGoals] = useState({kcals: 0, protein: 0, carbs: 0});
  const [todayMacros, setTodayMacros] = useState({kcals: 0, protein: 0, carbs: 0});

  const db = useDatabase();
  const navigation = useNavigation();


  const updateMacros = async () => {
    try {
      if (db) {
        const query = `
          SELECT 
          SUM(c.weight * a.kcals / a.weight) AS kcals,
          SUM(c.weight * a.protein / a.weight) AS protein,
          SUM(c.weight * a.carbs / a.weight) AS carbs
          FROM consums c
          JOIN alims a ON c.alimId = a.id
          WHERE DATE(c.date) = DATE(?);
        `;
        const values = [moment().format('YYYY-MM-DD HH:mm:ss')];
  
        // Uso de db.get para obtener un solo resultado
        const result = await db.getAllAsync(query, values);

        if (result && result[0] && result[0].kcals !== null && result[0].protein !== null && result[0].carbs !== null) {
          
          // Formatear cada valor de result[0] a 2 decimales
          const formattedResult = {
            kcals: parseFloat(result[0].kcals.toFixed(2)),
            protein: parseFloat(result[0].protein.toFixed(2)),
            carbs: parseFloat(result[0].carbs.toFixed(2))
          };
          setTodayMacros(formattedResult);
          return formattedResult;
        }
        else {
          setTodayMacros({kcals: 0, protein: 0, carbs: 0});
          return {kcals: 0, protein: 0, carbs: 0};
        }
      }
    } catch (error) {
      console.error("Error al obtener las calorías totales consumidas:", error);
      return null;
    }
  };

  const calcTodayMacros = async () => {
    try {
        if (db) {

        const userData = await db.getAllAsync('SELECT * FROM user WHERE id = 0');
        const weightData = await db.getAllAsync(`SELECT * FROM weight ORDER BY date DESC LIMIT 1;`);
        
        if (!userData[0]){
        return;
       
        }
        if (!weightData[0]){
        return;
        
        }

        const height = userData[0].height;
        const age = userData[0].age;
        const gender = userData[0].gender;
        const activity = userData[0].activity;
        const goal = userData[0].goal;
        const weight = weightData[0].weight

        const newMacros = calculateMacros(height, weight, age, gender, activity, goal);
        setTodayGoals(newMacros);
        }
    }
    catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      return null;
    }
  };


  const calculateMacros = (height, weight, age, gender, activity, goal) => {
    // Paso 1: Calcular TMB
    let BMR;
    if (gender === 'male') {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Paso 2: Ajustar TMB con el nivel de actividad
    let activityFactor;
    switch (activity) {
        case 'BMR':
            activityFactor = 1.0;
            break;
        case 'Sedentary':
            activityFactor = 1.2;
            break;
        case 'Light':
            activityFactor = 1.375;
            break;
        case 'Moderate':
            activityFactor = 1.55;
            break;
        case 'Active':
            activityFactor = 1.725;
            break;
        case 'VeryActive':
            activityFactor = 1.9;
            break;
        case 'ExtraActive':
            activityFactor = 2.0;
            break;
        default:
            activityFactor = 1.0; // Asumir BMR si no se selecciona ninguna opción válida
    }
    let TDEE = BMR * activityFactor;

    // Paso 3: Ajustar calorías según el objetivo
    let calories;
    switch (goal) {
        case 'MaintainWeight':
            calories = TDEE;
            break;
        case 'MildWeightLoss':
            calories = TDEE - 250;
            break;
        case 'WeightLoss':
            calories = TDEE - 500;
            break;
        case 'ExtremeWeightLoss':
            calories = TDEE - 1000;
            break;
        case 'MildWeightGain':
            calories = TDEE + 250;
            break;
        case 'WeightGain':
            calories = TDEE + 500;
            break;
        case 'ExtremeWeightGain':
            calories = TDEE + 1000;
            break;
        default:
            calories = TDEE; // Asumir mantenimiento si no se selecciona ninguna opción válida
    }

    // Paso 4: Distribuir calorías en macronutrientes
    let proteinCalories = calories * 0.25; // 25% de proteínas
    let carbCalories = calories * 0.50; // 50% de carbohidratos
    let fatCalories = calories * 0.25; // 25% de grasas

    // Convertir calorías de macronutrientes a gramos
    const proteinGrams = proteinCalories / 4; // 1 gramo de proteína = 4 calorías
    const carbGrams = carbCalories / 4; // 1 gramo de carbohidrato = 4 calorías
    const fatGrams = fatCalories / 9; // 1 gramo de grasa = 9 calorías

    
    return {
        kcals: Math.round(calories),
        protein: Math.round(proteinGrams),
        carbs: Math.round(carbGrams),
        dat: Math.round(fatGrams)
    };
}


  const value = {
    todayGoals,
    todayMacros,
    calcTodayMacros,
    updateMacros
  };

  return (
    <MacrosContext.Provider value={value}>
      {children}
    </MacrosContext.Provider>
  );

  
};


export const useMacros = () => {
  return useContext(MacrosContext);
};

