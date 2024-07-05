
export const initialData = {

    //Muscle groups
    //0 Chest
    //1 Back
    //2 Legs
    //3 Shoulders
    //4 Arms
    //5 Abs
    //6 Glutes

    muscleGroups: [
        { id: 0, name: 'Pecho', imgSRC: 'default' },
        { id: 1, name: 'Espalda', imgSRC: 'default' },
        { id: 2, name: 'Piernas', imgSRC: 'default' },
        { id: 3, name: 'Hombros', imgSRC: 'default' },
        { id: 4, name: 'Brazos', imgSRC: 'default' },
        { id: 5, name: 'Abdominales', imgSRC: 'default' },
        { id: 6, name: 'Glúteos', imgSRC: 'default' }
    ],


    musculatures: [
        // Chest
        { id: 0, name: 'Pecho Inferior', muscleGroup: 0 },
        { id: 1, name: 'Pecho Medio', muscleGroup: 0 },
        { id: 2, name: 'Pecho Superior', muscleGroup: 0 },
        { id: 3, name: 'Pectoral Mayor', muscleGroup: 0 },
        { id: 4, name: 'Pectoral Menor', muscleGroup: 0 },
    
        // Back
        { id: 5, name: 'Dorsal Ancho', muscleGroup: 1 },
        { id: 6, name: 'Trapecio Superior', muscleGroup: 1 },
        { id: 7, name: 'Trapecio Medio', muscleGroup: 1 },
        { id: 8, name: 'Trapecio Inferior', muscleGroup: 1 },
        { id: 9, name: 'Romboides', muscleGroup: 1 },
        { id: 10, name: 'Erectores Espinales', muscleGroup: 1 },
        { id: 11, name: 'Redondo Mayor', muscleGroup: 1 },
        { id: 12, name: 'Redondo Menor', muscleGroup: 1 },
    
        // Legs
        { id: 13, name: 'Cuádriceps', muscleGroup: 2 },
        { id: 14, name: 'Recto Femoral', muscleGroup: 2 },
        { id: 15, name: 'Vasto Lateral', muscleGroup: 2 },
        { id: 16, name: 'Vasto Medial', muscleGroup: 2 },
        { id: 17, name: 'Vasto Intermedio', muscleGroup: 2 },
        { id: 18, name: 'Isquiotibiales', muscleGroup: 2 },
        { id: 19, name: 'Bíceps Femoral', muscleGroup: 2 },
        { id: 20, name: 'Semitendinoso', muscleGroup: 2 },
        { id: 21, name: 'Semimembranoso', muscleGroup: 2 },
        { id: 22, name: 'Aductores', muscleGroup: 2 },
        { id: 23, name: 'Abductores', muscleGroup: 2 },
        { id: 24, name: 'Gemelos', muscleGroup: 2 },
        { id: 25, name: 'Sóleo', muscleGroup: 2 },
    
        // Shoulders
        { id: 26, name: 'Deltoide Anterior', muscleGroup: 3 },
        { id: 27, name: 'Deltoide Medio', muscleGroup: 3 },
        { id: 28, name: 'Deltoide Posterior', muscleGroup: 3 },
        { id: 29, name: 'Manguito Rotador', muscleGroup: 3 },
    
        // Arms
        { id: 30, name: 'Bíceps Braquial', muscleGroup: 4 },
        { id: 31, name: 'Tríceps Braquial', muscleGroup: 4 },
        { id: 32, name: 'Braquial Anterior', muscleGroup: 4 },
        { id: 33, name: 'Braquiorradial', muscleGroup: 4 },
    
        // Abs
        { id: 34, name: 'Recto Abdominal', muscleGroup: 5 },
        { id: 35, name: 'Oblicuos Externos', muscleGroup: 5 },
        { id: 36, name: 'Oblicuos Internos', muscleGroup: 5 },
        { id: 37, name: 'Transverso Abdominal', muscleGroup: 5 },
    
        // Glutes
        { id: 38, name: 'Glúteo Mayor', muscleGroup: 6 },
        { id: 39, name: 'Glúteo Medio', muscleGroup: 6 },
        { id: 40, name: 'Glúteo Menor', muscleGroup: 6 },
        { id: 41, name: 'Tensor de la Fascia Lata', muscleGroup: 6 }
    ],

    
    //Exercises

    ejers: [
        // Jalón al pecho (Back)
        { name: 'Jalón al pecho cerrado', muscles: [5, 9], muscleGroups: [1] }, // Dorsal Ancho, Romboides
        { name: 'Jalón al pecho abierto', muscles: [5, 9], muscleGroups: [1] }, // Dorsal Ancho, Romboides
        { name: 'Jalón al pecho agarre neutro', muscles: [5, 9], muscleGroups: [1] }, // Dorsal Ancho, Romboides
        { name: 'Jalón al pecho en máquina', muscles: [5, 9], muscleGroups: [1] }, // Dorsal Ancho, Romboides
        { name: 'Dominadas', muscles: [5, 28, 30], muscleGroups: [1, 4] }, // Dorsal Ancho, Deltoide Posterior, Bíceps Braquial
    
        // Remo (Back)
        { name: 'Remo con barra', muscles: [5, 7, 9], muscleGroups: [1] }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: 'Remo con mancuerna', muscles: [5, 7, 9], muscleGroups: [1] }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: 'Remo con polea', muscles: [5, 7, 9], muscleGroups: [1] }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: 'Remo en máquina horizontal', muscles: [5, 7, 9], muscleGroups: [1] }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: 'Remo en máquina vertical', muscles: [5, 7, 9], muscleGroups: [1] }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: 'Low row en máquina', muscles: [5, 7, 9], muscleGroups: [1] }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: 'Remo inclinado', muscles: [5, 7, 9], muscleGroups: [1] }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: 'Remo en barra T', muscles: [5, 7, 9], muscleGroups: [1] }, // Dorsal Ancho, Trapecio Medio, Romboides
    
        // Curl de Bíceps (Arms)
        { name: 'Curl Martillo', muscles: [30, 33], muscleGroups: [4] }, // Bíceps Braquial, Braquiorradial
        { name: 'Curl Barra', muscles: [30], muscleGroups: [4] }, // Bíceps Braquial
        { name: 'Curl Mancuernas', muscles: [30], muscleGroups: [4] }, // Bíceps Braquial
        { name: 'Bíceps en máquina', muscles: [30], muscleGroups: [4] }, // Bíceps Braquial
        { name: 'Bíceps en Scott', muscles: [30], muscleGroups: [4] }, // Bíceps Braquial
        { name: 'Bíceps Spider', muscles: [30], muscleGroups: [4] }, // Bíceps Braquial
    
        // Tríceps (Arms)
        { name: 'Tríceps polea', muscles: [31], muscleGroups: [4] }, // Tríceps Braquial
        { name: 'Tríceps polea Katana', muscles: [31], muscleGroups: [4] }, // Tríceps Braquial
        { name: 'Tríceps en máquina', muscles: [31], muscleGroups: [4] }, // Tríceps Braquial
        { name: 'Press Francés', muscles: [31], muscleGroups: [4] }, // Tríceps Braquial
    
        // Press de Pecho (Chest)
        { name: 'Press Banca', muscles: [1, 3, 4], muscleGroups: [0] }, // Pecho Medio, Pectoral Mayor, Pectoral Menor
        { name: 'Press Banca Smith', muscles: [1, 3, 4], muscleGroups: [0] }, // Pecho Medio, Pectoral Mayor, Pectoral Menor
        { name: 'Press Banca Mancuernas', muscles: [1, 3, 4], muscleGroups: [0] }, // Pecho Medio, Pectoral Mayor, Pectoral Menor
        { name: 'Press Banca Máquina', muscles: [1, 3, 4], muscleGroups: [0] }, // Pecho Medio, Pectoral Mayor, Pectoral Menor
        { name: 'Press Banca Inclinado', muscles: [2, 3, 4], muscleGroups: [0] }, // Pecho Superior, Pectoral Mayor, Pectoral Menor
        { name: 'Press Banca Inclinado Smith', muscles: [2, 3, 4], muscleGroups: [0] }, // Pecho Superior, Pectoral Mayor, Pectoral Menor
        { name: 'Press Banca Inclinado Mancuernas', muscles: [2, 3, 4], muscleGroups: [0] }, // Pecho Superior, Pectoral Mayor, Pectoral Menor
        { name: 'Press Banca Inclinado Máquina', muscles: [2, 3, 4], muscleGroups: [0] }, // Pecho Superior, Pectoral Mayor, Pectoral Menor
        { name: 'Fondos', muscles: [1, 3, 31], muscleGroups: [0, 4] }, // Pecho Medio, Pectoral Mayor, Tríceps Braquial
        { name: 'Aperturas / Butterfly', muscles: [1, 3, 4], muscleGroups: [0] }, // Pecho Medio, Pectoral Mayor, Pectoral Menor
    
        // Hombros (Shoulders)
        { name: 'Elevaciones laterales', muscles: [27], muscleGroups: [3] }, // Deltoide Medio
        { name: 'Elevaciones laterales en polea', muscles: [27], muscleGroups: [3] }, // Deltoide Medio
        { name: 'Elevaciones laterales en máquina', muscles: [27], muscleGroups: [3] }, // Deltoide Medio
        { name: 'Press militar con mancuernas', muscles: [26, 27], muscleGroups: [3] }, // Deltoide Anterior, Deltoide Medio
        { name: 'Face pull', muscles: [28, 29], muscleGroups: [3, 1] }, // Deltoide Posterior, Manguito Rotador
        { name: 'Press militar máquina', muscles: [26, 27], muscleGroups: [3] }, // Deltoide Anterior, Deltoide Medio
        { name: 'Elevaciones frontales', muscles: [26], muscleGroups: [3] }, // Deltoide Anterior
        { name: 'Elevaciones posteriores', muscles: [28], muscleGroups: [3] }, // Deltoide Posterior
    
        // Piernas (Legs)
        { name: 'Sentadilla Libre', muscles: [13, 24, 38], muscleGroups: [2, 6] }, // Cuádriceps, Gemelos, Glúteo Mayor
        { name: 'Sentadilla Smith', muscles: [13, 24, 38], muscleGroups: [2, 6] }, // Cuádriceps, Gemelos, Glúteo Mayor
        { name: 'Peso muerto', muscles: [18, 24, 38], muscleGroups: [2, 6] }, // Isquiotibiales, Gemelos, Glúteo Mayor
        { name: 'Peso muerto rumano', muscles: [18, 24, 38], muscleGroups: [2, 6] }, // Isquiotibiales, Gemelos, Glúteo Mayor
        { name: 'Peso muerto sumo', muscles: [18, 24, 38], muscleGroups: [2, 6] }, // Isquiotibiales, Gemelos, Glúteo Mayor
        { name: 'Prensa pierna', muscles: [13, 24, 38], muscleGroups: [2, 6] }, // Cuádriceps, Gemelos, Glúteo Mayor
        { name: 'Extensión de cuádriceps', muscles: [13, 14, 15, 16, 17], muscleGroups: [2] }, // Cuádriceps, Recto Femoral, Vasto Lateral, Vasto Medial, Vasto Intermedio
        { name: 'Flexión de cuádriceps', muscles: [13, 14, 15, 16, 17], muscleGroups: [2] }, // Cuádriceps, Recto Femoral, Vasto Lateral, Vasto Medial, Vasto Intermedio
        { name: 'Leg curl', muscles: [18, 19, 20, 21], muscleGroups: [2] }, // Isquiotibiales, Bíceps Femoral, Semitendinoso, Semimembranoso
        { name: 'Abductor', muscles: [23], muscleGroups: [2] }, // Abductores
        { name: 'Aductor', muscles: [22], muscleGroups: [2] }, // Aductores
        { name: 'Gemelos en máquina', muscles: [24, 25], muscleGroups: [2] }, // Gemelos, Sóleo
        { name: 'Gemelos en Smith', muscles: [24, 25], muscleGroups: [2] }, // Gemelos, Sóleo
        { name: 'Gemelos en prensa', muscles: [24, 25], muscleGroups: [2] } // Gemelos, Sóleo
    ]
    
};