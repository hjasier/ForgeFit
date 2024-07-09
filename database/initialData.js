
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
        { id: 0, name: 'Pecho', imgSRC: require('../assets/muscleGroups/chest.png') },
        { id: 1, name: 'Espalda', imgSRC: require('../assets/muscleGroups/back.png') },
        { id: 2, name: 'Piernas', imgSRC: require('../assets/muscleGroups/legs.png') },
        { id: 3, name: 'Hombros', imgSRC: require('../assets/muscleGroups/shoulders.png') },
        { id: 4, name: 'Brazos', imgSRC: require('../assets/muscleGroups/arms.png') },
        { id: 5, name: 'Abs', imgSRC: require('../assets/muscleGroups/abs.png') },
        { id: 6, name: 'Cuello', imgSRC: require('../assets/muscleGroups/neck.png') },
        
        //{ id: 6, name: 'Glúteos', imgSRC: 'default' }
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

    images: [
        { id:0, name: 'chest-building-exercises-and-muscle-vector-34238801.png', imgSRC: require('../assets/exDefaultImages/chest-building-exercises-and-muscle-vector-34238801.png'), muscleGroup: 4 },
        { id:1, name: 'dumbbell-overhead-press-top-body-workout-vector-34405161.png', imgSRC: require('../assets/exDefaultImages/dumbbell-overhead-press-top-body-workout-vector-34405161.png'), muscleGroup: 3 },
        { id:2, name: 'hammer-strength-machine-seated-chest-press-vector-34861746.png', imgSRC: require('../assets/exDefaultImages/hammer-strength-machine-seated-chest-press-vector-34861746.png'), muscleGroup: 1 },
        { id:3, name: 'incline-barbell-bench-press-exercise-vector-34861748.png', imgSRC: require('../assets/exDefaultImages/incline-barbell-bench-press-exercise-vector-34861748.png'), muscleGroup: 0 },
        { id:4, name: 'lifting-barbell-in-a-gym-on-ez-bar-preacher-curl-vector-34705869.png', imgSRC: require('../assets/exDefaultImages/lifting-barbell-in-a-gym-on-ez-bar-preacher-curl-vector-34705869.png'), muscleGroup: 4 },
        { id:5, name: 'man-butterfliespec-deckseated-machine-flyes-flat-vector-34502820.png', imgSRC: require('../assets/exDefaultImages/man-butterfliespec-deckseated-machine-flyes-flat-vector-34502820.png'), muscleGroup: 0 },
        { id:6, name: 'man-character-doing-dumbbell-incline-bench-row-vector-48801264.png', imgSRC: require('../assets/exDefaultImages/man-character-doing-dumbbell-incline-bench-row-vector-48801264.png'), muscleGroup: 1 },
        { id:7, name: 'man-doing-adductor-adduction-inner-thigh-machine-vector-38567794.png', imgSRC: require('../assets/exDefaultImages/man-doing-adductor-adduction-inner-thigh-machine-vector-38567794.png'), muscleGroup: 2 },
        { id:8, name: 'man-doing-barbell-bench-press-chest-vector-34502753.png', imgSRC: require('../assets/exDefaultImages/man-doing-barbell-bench-press-chest-vector-34502753.png'), muscleGroup: 0 },
        { id:9, name: 'man-doing-barbell-bent-over-row-exercise-from-side-vector-45412372.png', imgSRC: require('../assets/exDefaultImages/man-doing-barbell-bent-over-row-exercise-from-side-vector-45412372.png'), muscleGroup: 1 },
        { id:10, name: 'man-doing-barbell-deadlifts-exercise-flat-vector-39110701.png', imgSRC: require('../assets/exDefaultImages/man-doing-barbell-deadlifts-exercise-flat-vector-39110701.png'), muscleGroup: 2 },
        { id:11, name: 'man-doing-barbell-drag-bicep-curls-exercise-vector-45443642.png', imgSRC: require('../assets/exDefaultImages/man-doing-barbell-drag-bicep-curls-exercise-vector-45443642.png'), muscleGroup: 4 },
        { id:12, name: 'man-doing-barbell-squat-exercise-vector-39117268.png', imgSRC: require('../assets/exDefaultImages/man-doing-barbell-squat-exercise-vector-39117268.png'), muscleGroup: 2 },
        { id:13, name: 'man-doing-bent-over-row-with-smith-machine-vector-49027816.png', imgSRC: require('../assets/exDefaultImages/man-doing-bent-over-row-with-smith-machine-vector-49027816.png'), muscleGroup: 1 },
        { id:14, name: 'man-doing-bent-over-t-bar-row-with-chest-supported-vector-45433041.png', imgSRC: require('../assets/exDefaultImages/man-doing-bent-over-t-bar-row-with-chest-supported-vector-45433041.png'), muscleGroup: 1 },
        { id:15, name: 'man-doing-cable-bent-over-one-arm-lateral-raise-vector-49254763.png', imgSRC: require('../assets/exDefaultImages/man-doing-cable-bent-over-one-arm-lateral-raise-vector-49254763.png'), muscleGroup: 3 },
        { id:16, name: 'man-doing-cable-hammer-bicep-curls-exercise-vector-34698172.png', imgSRC: require('../assets/exDefaultImages/man-doing-cable-hammer-bicep-curls-exercise-vector-34698172.png'), muscleGroup: 4 },
        { id:17, name: 'man-doing-cable-hip-extensions-flat-vector-37251939.png', imgSRC: require('../assets/exDefaultImages/man-doing-cable-hip-extensions-flat-vector-37251939.png'), muscleGroup: 2 },
        { id:18, name: 'man-doing-cable-lying-tricep-extension-exercise-vector-49217592.png', imgSRC: require('../assets/exDefaultImages/man-doing-cable-lying-tricep-extension-exercise-vector-49217592.png'), muscleGroup: 4 },
        { id:19, name: 'man-doing-cable-one-arm-lateral-raise-exercise-vector-42797996.png', imgSRC: require('../assets/exDefaultImages/man-doing-cable-one-arm-lateral-raise-exercise-vector-42797996.png'), muscleGroup: 3 },
        { id:20, name: 'man-doing-cable-rope-overhead-triceps-extensions-vector-37299924.png', imgSRC: require('../assets/exDefaultImages/man-doing-cable-rope-overhead-triceps-extensions-vector-37299924.png'), muscleGroup: 4 },
        { id:21, name: 'man-doing-calf-raises-posture-exercise-vector-34493783.png', imgSRC: require('../assets/exDefaultImages/man-doing-calf-raises-posture-exercise-vector-34493783.png'), muscleGroup: 2 },
        { id:22, name: 'man-doing-chin-ups-workout-pull-up-with-supinated-vector-44351163.png', imgSRC: require('../assets/exDefaultImages/man-doing-chin-ups-workout-pull-up-with-supinated-vector-44351163.png'), muscleGroup: 1 },
        { id:23, name: 'man-doing-close-grip-bench-press-exercise-vector-42872334.png', imgSRC: require('../assets/exDefaultImages/man-doing-close-grip-bench-press-exercise-vector-42872334.png'), muscleGroup: 0 },
        { id:24, name: 'man-doing-close-grip-lat-pulldowns-vector-37229653.png', imgSRC: require('../assets/exDefaultImages/man-doing-close-grip-lat-pulldowns-vector-37229653.png'), muscleGroup: 1 },
        { id:25, name: 'man-doing-dumbbell-front-raise-exercise-vector-42782860.png', imgSRC: require('../assets/exDefaultImages/man-doing-dumbbell-front-raise-exercise-vector-42782860.png'), muscleGroup: 3 },
        { id:26, name: 'man-doing-exercise-using-abductor-thigh-machine-vector-48677624.png', imgSRC: require('../assets/exDefaultImages/man-doing-exercise-using-abductor-thigh-machine-vector-48677624.png'), muscleGroup: 2 },
        { id:27, name: 'man-doing-front-incline-dumbbell-raise-exercise-vector-49296048.png', imgSRC: require('../assets/exDefaultImages/man-doing-front-incline-dumbbell-raise-exercise-vector-49296048.png'), muscleGroup: 3 },
        { id:28, name: 'man-doing-gravitron-tricep-press-exercise-vector-49227599.png', imgSRC: require('../assets/exDefaultImages/man-doing-gravitron-tricep-press-exercise-vector-49227599.png'), muscleGroup: 4 },
        { id:29, name: 'man-doing-hammer-strength-chest-bench-press-vector-49101873.png', imgSRC: require('../assets/exDefaultImages/man-doing-hammer-strength-chest-bench-press-vector-49101873.png'), muscleGroup: 0 },
        { id:30, name: 'man-doing-hex-trap-bar-cafe-deadlifts-squats-vector-38652184.png', imgSRC: require('../assets/exDefaultImages/man-doing-hex-trap-bar-cafe-deadlifts-squats-vector-38652184.png'), muscleGroup: 2 },
        { id:31, name: 'man-doing-incline-dumbbell-bench-press-exercise-vector-40857882.png', imgSRC: require('../assets/exDefaultImages/man-doing-incline-dumbbell-bench-press-exercise-vector-40857882.png'), muscleGroup: 0 },
        { id:32, name: 'man-doing-incline-dumbbell-curl-flat-vector-42798005.png', imgSRC: require('../assets/exDefaultImages/man-doing-incline-dumbbell-curl-flat-vector-42798005.png'), muscleGroup: 4 },
        { id:33, name: 'man-doing-inverted-rows-reverse-pull-ups-exercise-vector-40050137.png', imgSRC: require('../assets/exDefaultImages/man-doing-inverted-rows-reverse-pull-ups-exercise-vector-40050137.png'), muscleGroup: 1 },
        { id:34, name: 'man-doing-kneeling-cable-lat-pulldown-exercise-vector-49217590.png', imgSRC: require('../assets/exDefaultImages/man-doing-kneeling-cable-lat-pulldown-exercise-vector-49217590.png'), muscleGroup: 1 },
        { id:35, name: 'man-doing-lateral-side-shoulder-dumbbell-raises-vector-39115273.png', imgSRC: require('../assets/exDefaultImages/man-doing-lateral-side-shoulder-dumbbell-raises-vector-39115273.png'), muscleGroup: 3 },
        { id:36, name: 'man-doing-leaning-one-arm-or-single-handed-vector-47840759.png', imgSRC: require('../assets/exDefaultImages/man-doing-leaning-one-arm-or-single-handed-vector-47840759.png'), muscleGroup: 4 },
        { id:37, name: 'man-doing-lever-front-pulldown-lat-machine-pull-vector-49059660.png', imgSRC: require('../assets/exDefaultImages/man-doing-lever-front-pulldown-lat-machine-pull-vector-49059660.png'), muscleGroup: 1 },
        { id:38, name: 'man-doing-low-pulley-tricep-extensions-cable-vector-49168878.png', imgSRC: require('../assets/exDefaultImages/man-doing-low-pulley-tricep-extensions-cable-vector-49168878.png'), muscleGroup: 4 },
        { id:39, name: 'man-doing-lunging-lunge-with-bicep-hammer-curls-vector-38659786.png', imgSRC: require('../assets/exDefaultImages/man-doing-lunging-lunge-with-bicep-hammer-curls-vector-38659786.png'), muscleGroup: 2 },
        { id:40, name: 'man-doing-lying-chest-press-machine-exercise-vector-48837157.png', imgSRC: require('../assets/exDefaultImages/man-doing-lying-chest-press-machine-exercise-vector-48837157.png'), muscleGroup: 0 },
        { id:41, name: 'man-doing-lying-crossover-bench-press-cable-vector-49137334.png', imgSRC: require('../assets/exDefaultImages/man-doing-lying-crossover-bench-press-cable-vector-49137334.png'), muscleGroup: 0 },
        { id:42, name: 'man-doing-lying-dumbbell-tricep-extensions-exercis-vector-38234626.png', imgSRC: require('../assets/exDefaultImages/man-doing-lying-dumbbell-tricep-extensions-exercis-vector-38234626.png'), muscleGroup: 4 },
        { id:43, name: 'man-doing-machine-bent-arm-chest-fly-exercise-vector-49078825.png', imgSRC: require('../assets/exDefaultImages/man-doing-machine-bent-arm-chest-fly-exercise-vector-49078825.png'), muscleGroup: 0 },
        { id:44, name: 'man-doing-one-arm-barbell-rows-exercise-vector-38659787.png', imgSRC: require('../assets/exDefaultImages/man-doing-one-arm-barbell-rows-exercise-vector-38659787.png'), muscleGroup: 1 },
        { id:45, name: 'man-doing-one-arm-dumbbell-preacher-curl-vector-34705876.png', imgSRC: require('../assets/exDefaultImages/man-doing-one-arm-dumbbell-preacher-curl-vector-34705876.png'), muscleGroup: 4 },
        { id:46, name: 'man-doing-one-arm-side-lateral-raises-shoulder-vector-47840754.png', imgSRC: require('../assets/exDefaultImages/man-doing-one-arm-side-lateral-raises-shoulder-vector-47840754.png'), muscleGroup: 3 },
        { id:47, name: 'man-doing-plie-squat-exercise-with-dumbbell-vector-48993649.png', imgSRC: require('../assets/exDefaultImages/man-doing-plie-squat-exercise-with-dumbbell-vector-48993649.png'), muscleGroup: 2 },
        { id:48, name: 'man-doing-pull-ups-exercise-flat-vector-38234639.png', imgSRC: require('../assets/exDefaultImages/man-doing-pull-ups-exercise-flat-vector-38234639.png'), muscleGroup: 1 },
        { id:49, name: 'man-doing-rear-delt-machine-flyes-exercise-vector-46760816.png', imgSRC: require('../assets/exDefaultImages/man-doing-rear-delt-machine-flyes-exercise-vector-46760816.png'), muscleGroup: 3 },
        { id:50, name: 'man-doing-rear-leg-raise-workout-with-machine-vector-48993650.png', imgSRC: require('../assets/exDefaultImages/man-doing-rear-leg-raise-workout-with-machine-vector-48993650.png'), muscleGroup: 2 },
        { id:51, name: 'man-doing-reverse-grip-incline-dumbbell-bench-vector-48837153.png', imgSRC: require('../assets/exDefaultImages/man-doing-reverse-grip-incline-dumbbell-bench-vector-48837153.png'), muscleGroup: 0 },
        { id:52, name: 'man-doing-reverse-incline-bench-barbell-curl-vector-49241935.png', imgSRC: require('../assets/exDefaultImages/man-doing-reverse-incline-bench-barbell-curl-vector-49241935.png'), muscleGroup: 4 },
        { id:53, name: 'man-doing-rope-pulldown-exercise-flat-vector-42772981.png', imgSRC: require('../assets/exDefaultImages/man-doing-rope-pulldown-exercise-flat-vector-42772981.png'), muscleGroup: 4 },
        { id:54, name: 'man-doing-seated-back-row-machine-exercise-vector-47499220.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-back-row-machine-exercise-vector-47499220.png'), muscleGroup: 1 },
        { id:55, name: 'man-doing-seated-dumbbell-bicep-hammer-curls-vector-48801275.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-dumbbell-bicep-hammer-curls-vector-48801275.png'), muscleGroup: 4 },
        { id:56, name: 'man-doing-seated-dumbbell-preacher-bicep-hammer-vector-48888213.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-dumbbell-preacher-bicep-hammer-vector-48888213.png'), muscleGroup: 4 },
        { id:57, name: 'man-doing-seated-dumbbell-preacher-bicep-hammer-vector-48900645.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-dumbbell-preacher-bicep-hammer-vector-48900645.png'), muscleGroup: 4 },
        { id:58, name: 'man-doing-seated-lat-pulldowns-flat-vector-39472110.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-lat-pulldowns-flat-vector-39472110.png'), muscleGroup: 1 },
        { id:59, name: 'man-doing-seated-lateral-raise-machine-power-vector-46483586.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-lateral-raise-machine-power-vector-46483586.png'), muscleGroup: 3 },
        { id:60, name: 'man-doing-seated-lever-machine-one-arm-row-vector-49373361.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-lever-machine-one-arm-row-vector-49373361.png'), muscleGroup: 1 },
        { id:61, name: 'man-doing-seated-low-cable-back-rows-exercise-vector-42772985.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-low-cable-back-rows-exercise-vector-42772985.png'), muscleGroup: 1 },
        { id:62, name: 'man-doing-seated-low-cable-back-rows-exercise-vector-44083694.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-low-cable-back-rows-exercise-vector-44083694.png'), muscleGroup: 1 },
        { id:63, name: 'man-doing-seated-machine-leg-extensions-exercise-vector-47456628.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-machine-leg-extensions-exercise-vector-47456628.png'), muscleGroup: 2 },
        { id:64, name: 'man-doing-seated-shoulder-hammer-overhead-vector-45434401.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-shoulder-hammer-overhead-vector-45434401.png'), muscleGroup: 3 },
        { id:65, name: 'man-doing-seated-tricep-press-overhead-extensions-vector-47448047.png', imgSRC: require('../assets/exDefaultImages/man-doing-seated-tricep-press-overhead-extensions-vector-47448047.png'), muscleGroup: 4 },
        { id:66, name: 'man-doing-single-arm-reverse-grip-cable-bicep-vector-48837160.png', imgSRC: require('../assets/exDefaultImages/man-doing-single-arm-reverse-grip-cable-bicep-vector-48837160.png'), muscleGroup: 4 },
        { id:67, name: 'man-doing-single-dumbbell-spider-hammer-curl-vector-48837169.png', imgSRC: require('../assets/exDefaultImages/man-doing-single-dumbbell-spider-hammer-curl-vector-48837169.png'), muscleGroup: 4 },
        { id:68, name: 'man-doing-smith-machine-barbell-bench-press-vector-40926274.png', imgSRC: require('../assets/exDefaultImages/man-doing-smith-machine-barbell-bench-press-vector-40926274.png'), muscleGroup: 0 },
        { id:69, name: 'man-doing-smith-machine-barbell-squat-exercise-vector-49364092.png', imgSRC: require('../assets/exDefaultImages/man-doing-smith-machine-barbell-squat-exercise-vector-49364092.png'), muscleGroup: 2 },
        { id:70, name: 'man-doing-smith-machine-bench-press-exercise-vector-49254757.png', imgSRC: require('../assets/exDefaultImages/man-doing-smith-machine-bench-press-exercise-vector-49254757.png'), muscleGroup: 0 },
        { id:71, name: 'man-doing-smith-machine-incline-bench-press-vector-49254759.png', imgSRC: require('../assets/exDefaultImages/man-doing-smith-machine-incline-bench-press-vector-49254759.png'), muscleGroup: 0 },
        { id:72, name: 'man-doing-smith-machine-leg-press-exercise-vector-47410591.png', imgSRC: require('../assets/exDefaultImages/man-doing-smith-machine-leg-press-exercise-vector-47410591.png'), muscleGroup: 2 },
        { id:73, name: 'man-doing-smith-machine-leg-press-exercise-vector-49201790.png', imgSRC: require('../assets/exDefaultImages/man-doing-smith-machine-leg-press-exercise-vector-49201790.png'), muscleGroup: 2 },
        { id:74, name: 'man-doing-smith-machine-shoulder-press-exercise-vector-42797997.png', imgSRC: require('../assets/exDefaultImages/man-doing-smith-machine-shoulder-press-exercise-vector-42797997.png'), muscleGroup: 3 },
        { id:75, name: 'man-doing-standing-calf-raise-with-assisted-machin-vector-44360414.png', imgSRC: require('../assets/exDefaultImages/man-doing-standing-calf-raise-with-assisted-machin-vector-44360414.png'), muscleGroup: 2 },
        { id:76, name: 'man-doing-standing-dumbbell-bicep-hammer-curls-vector-34705866.png', imgSRC: require('../assets/exDefaultImages/man-doing-standing-dumbbell-bicep-hammer-curls-vector-34705866.png'), muscleGroup: 4 },
        { id:77, name: 'man-doing-standing-dumbbell-calf-raises-exercise-vector-34708069.png', imgSRC: require('../assets/exDefaultImages/man-doing-standing-dumbbell-calf-raises-exercise-vector-34708069.png'), muscleGroup: 2 },
        { id:78, name: 'man-doing-straight-arm-lat-pulldown-exercise-vector-42870559.png', imgSRC: require('../assets/exDefaultImages/man-doing-straight-arm-lat-pulldown-exercise-vector-42870559.png'), muscleGroup: 1 },
        { id:79, name: 'man-doing-straight-arm-pulldown-pullovers-vector-38446346.png', imgSRC: require('../assets/exDefaultImages/man-doing-straight-arm-pulldown-pullovers-vector-38446346.png'), muscleGroup: 1 },
        { id:80, name: 'man-doing-sumo-barbell-deadlifts-exercise-vector-39115277.png', imgSRC: require('../assets/exDefaultImages/man-doing-sumo-barbell-deadlifts-exercise-vector-39115277.png'), muscleGroup: 2 },
        { id:81, name: 'man-doing-tricep-dip-exercise-vector-49364088.png', imgSRC: require('../assets/exDefaultImages/man-doing-tricep-dip-exercise-vector-49364088.png'), muscleGroup: 0 },
        { id:82, name: 'man-doing-triceps-presdown-exercise-vector-42922181.png', imgSRC: require('../assets/exDefaultImages/man-doing-triceps-presdown-exercise-vector-42922181.png'), muscleGroup: 4 },
        { id:83, name: 'man-doing-wrist-roller-forearm-blaster-vector-48792276.png', imgSRC: require('../assets/exDefaultImages/man-doing-wrist-roller-forearm-blaster-vector-48792276.png'), muscleGroup: 4 },
        { id:84, name: 'seated-calf-machine-raises-vector-44360420.png', imgSRC: require('../assets/exDefaultImages/seated-calf-machine-raises-vector-44360420.png'), muscleGroup: 2 },
        { id:85, name: 'woman-doing-leg-press-exercise-on-machine-vector-45471478.png', imgSRC: require('../assets/exDefaultImages/woman-doing-leg-press-exercise-on-machine-vector-45471478.png'), muscleGroup: 2 },
        { id:86, name: 'woman-doing-lying-leg-curls-exercise-vector-47304177.png', imgSRC: require('../assets/exDefaultImages/woman-doing-lying-leg-curls-exercise-vector-47304177.png'), muscleGroup: 2 },
        { id:87, name: 'woman-doing-seated-face-pull-rear-delt-vector-49568420.png', imgSRC: require('../assets/exDefaultImages/woman-doing-seated-face-pull-rear-delt-vector-49568420.png'), muscleGroup: 3 },
        { id:88, name: 'man-doing-stiff-legged-barbell-deadlift-vector-38515390.png', imgSRC: require('../assets/exDefaultImages/man-doing-stiff-legged-barbell-deadlift-vector-38515390.png'), muscleGroup: 1 },
        { id:89, name: 'man-doing-tricep-dip-exercise-vector-49364088.png', imgSRC: require('../assets/exDefaultImages/man-doing-tricep-dip-exercise-vector-49364088.png'), muscleGroup: 4 },

      ],
    
    //Exercises

    ejers: [
        { name: "Jalón al pecho cerrado", muscles: [5, 9], muscleGroups: [1], image: "man-doing-seated-lat-pulldowns-flat-vector-39472110.png" }, // Dorsal Ancho, Romboides
        { name: "Jalón al pecho abierto", muscles: [5, 9], muscleGroups: [1], image: "man-doing-seated-lat-pulldowns-flat-vector-39472110.png" }, // Dorsal Ancho, Romboides
        { name: "Jalón al pecho agarre neutro", muscles: [5, 9], muscleGroups: [1], image: "man-doing-seated-lat-pulldowns-flat-vector-39472110.png" }, // Dorsal Ancho, Romboides
        { name: "Jalón al pecho en máquina", muscles: [5, 9], muscleGroups: [1], image: "man-doing-lever-front-pulldown-lat-machine-pull-vector-49059660.png" }, // Dorsal Ancho, Romboides
        { name: "Dominadas", muscles: [5, 28, 30], muscleGroups: [1, 4], image: "man-doing-pull-ups-exercise-flat-vector-38234639.png" }, // Dorsal Ancho, Deltoide Posterior, Bíceps Braquial

        { name: "Remo con barra", muscles: [5, 7, 9], muscleGroups: [1], image: "man-doing-barbell-bent-over-row-exercise-from-side-vector-45412372.png" }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: "Remo con mancuerna", muscles: [5, 7, 9], muscleGroups: [1], image: "man-doing-one-arm-barbell-rows-exercise-vector-38659787.png" }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: "Remo con polea", muscles: [5, 7, 9], muscleGroups: [1], image: "man-doing-low-pulley-tricep-extensions-cable-vector-49168878.png" }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: "Remo en máquina horizontal", muscles: [5, 7, 9], muscleGroups: [1], image: "man-doing-seated-back-row-machine-exercise-vector-47499220.png" }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: "Remo en máquina vertical", muscles: [5, 7, 9], muscleGroups: [1], image: "man-doing-seated-lever-machine-one-arm-row-vector-49373361.png" }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: "Low row en máquina", muscles: [5, 7, 9], muscleGroups: [1], image: "man-doing-seated-low-cable-back-rows-exercise-vector-42772985.png" }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: "Remo inclinado", muscles: [5, 7, 9], muscleGroups: [1], image: "man-character-doing-dumbbell-incline-bench-row-vector-48801264.png" }, // Dorsal Ancho, Trapecio Medio, Romboides
        { name: "Remo en barra T", muscles: [5, 7, 9], muscleGroups: [1], image: "man-doing-bent-over-t-bar-row-with-chest-supported-vector-45433041.png" }, // Dorsal Ancho, Trapecio Medio, Romboides

        { name: "Curl Martillo", muscles: [30, 33], muscleGroups: [4], image: "man-doing-standing-dumbbell-bicep-hammer-curls-vector-34705866.png" }, // Bíceps Braquial, Braquiorradial
        { name: "Curl Martillo Sentado", muscles: [30, 33], muscleGroups: [4], image: "man-doing-seated-dumbbell-bicep-hammer-curls-vector-48801275.png" }, // Bíceps Braquial, Braquiorradial
        { name: "Curl Barra", muscles: [30], muscleGroups: [4], image: "man-doing-barbell-drag-bicep-curls-exercise-vector-45443642.png" }, // Bíceps Braquial
        { name: "Curl Mancuernas", muscles: [30], muscleGroups: [4], image: "man-doing-standing-dumbbell-bicep-hammer-curls-vector-34705866.png" }, // Bíceps Braquial
        { name: "Bíceps en máquina", muscles: [30], muscleGroups: [4], image: "lifting-barbell-in-a-gym-on-ez-bar-preacher-curl-vector-34705869.png" }, // Bíceps Braquial
        { name: "Bíceps en Scott", muscles: [30], muscleGroups: [4], image: "man-doing-one-arm-dumbbell-preacher-curl-vector-34705876.png" }, // Bíceps Braquial
        { name: "Bíceps Spider", muscles: [30], muscleGroups: [4], image: "man-doing-reverse-incline-bench-barbell-curl-vector-49241935.png" }, // Bíceps Braquial
        { name: "Bíceps Polea", muscles: [30], muscleGroups: [4], image: "man-doing-cable-hammer-bicep-curls-exercise-vector-34698172.png" }, // Bíceps Braquial
        { name: "Bíceps Polea Unilateral", muscles: [30], muscleGroups: [4], image: "man-doing-single-arm-reverse-grip-cable-bicep-vector-48837160.png" }, // Bíceps Braquial
        

        { name: "Tríceps polea", muscles: [31], muscleGroups: [4], image: "man-doing-triceps-presdown-exercise-vector-42922181.png" }, // Tríceps Braquial
        { name: "Tríceps polea Katana", muscles: [31], muscleGroups: [4], image: "man-doing-cable-rope-overhead-triceps-extensions-vector-37299924.png" }, // Tríceps Braquial
        { name: "Tríceps en máquina", muscles: [31], muscleGroups: [4], image: "man-doing-seated-tricep-press-overhead-extensions-vector-47448047.png" }, // Tríceps Braquial
        { name: "Press Francés", muscles: [31], muscleGroups: [4], image: "man-doing-lying-dumbbell-tricep-extensions-exercis-vector-38234626.png" }, // Tríceps Braquial

        { name: "Press Banca", muscles: [1, 3, 4], muscleGroups: [0], image: "man-doing-barbell-bench-press-chest-vector-34502753.png" }, // Pecho Medio, Pectoral Mayor, Pectoral Menor
        { name: "Press Banca Smith", muscles: [1, 3, 4], muscleGroups: [0], image: "man-doing-smith-machine-bench-press-exercise-vector-49254757.png" }, // Pecho Medio, Pectoral Mayor, Pectoral Menor
        { name: "Press Banca Mancuernas", muscles: [1, 3, 4], muscleGroups: [0], image: "man-doing-incline-dumbbell-bench-press-exercise-vector-40857882.png" }, // Pecho Medio, Pectoral Mayor, Pectoral Menor
        { name: "Press Banca Máquina", muscles: [1, 3, 4], muscleGroups: [0], image: "man-doing-hammer-strength-chest-bench-press-vector-49101873.png" }, // Pecho Medio, Pectoral Mayor, Pectoral Menor
        { name: "Press Banca Inclinado", muscles: [2, 3, 4], muscleGroups: [0], image: "incline-barbell-bench-press-exercise-vector-34861748.png" }, // Pecho Superior, Pectoral Mayor, Pectoral Menor
        { name: "Press Banca Inclinado Smith", muscles: [2, 3, 4], muscleGroups: [0], image: "man-doing-smith-machine-incline-bench-press-vector-49254759.png" }, // Pecho Superior, Pectoral Mayor, Pectoral Menor
        { name: "Press Banca Inclinado Mancuernas", muscles: [2, 3, 4], muscleGroups: [0], image: "man-doing-incline-dumbbell-bench-press-exercise-vector-40857882.png" }, // Pecho Superior, Pectoral Mayor, Pectoral Menor
        { name: "Press Banca Inclinado Máquina", muscles: [2, 3, 4], muscleGroups: [0], image: "man-doing-hammer-strength-chest-bench-press-vector-49101873.png" }, // Pecho Superior, Pectoral Mayor, Pectoral Menor
        { name: "Fondos", muscles: [1, 3, 31], muscleGroups: [0, 4], image: "man-doing-tricep-dip-exercise-vector-49364088.png" }, // Pecho Medio, Pectoral Mayor, Tríceps Braquial
        { name: "Aperturas / Butterfly", muscles: [1, 3, 4], muscleGroups: [0], image: "man-butterfliespec-deckseated-machine-flyes-flat-vector-34502820.png" }, // Pecho Medio, Pectoral Mayor, Pectoral Menor

        { name: "Elevaciones laterales", muscles: [27], muscleGroups: [3], image: "man-doing-lateral-side-shoulder-dumbbell-raises-vector-39115273.png" }, // Deltoide Medio
        { name: "Elevaciones laterales en polea", muscles: [27], muscleGroups: [3], image: "man-doing-cable-one-arm-lateral-raise-exercise-vector-42797996.png" }, // Deltoide Medio
        { name: "Elevaciones laterales en máquina", muscles: [27], muscleGroups: [3], image: "man-doing-seated-lateral-raise-machine-power-vector-46483586.png" }, // Deltoide Medio
        { name: "Press militar con mancuernas", muscles: [26, 27], muscleGroups: [3], image: "dumbbell-overhead-press-top-body-workout-vector-34405161.png" }, // Deltoide Anterior, Deltoide Medio
        { name: "Face pull", muscles: [28, 29], muscleGroups: [3, 1], image: "woman-doing-seated-face-pull-rear-delt-vector-49568420.png" }, // Deltoide Posterior, Manguito Rotador
        { name: "Press militar máquina", muscles: [26, 27], muscleGroups: [3], image: "man-doing-smith-machine-shoulder-press-exercise-vector-42797997.png" }, // Deltoide Anterior, Deltoide Medio
        { name: "Elevaciones frontales", muscles: [26], muscleGroups: [3], image: "man-doing-dumbbell-front-raise-exercise-vector-42782860.png" }, // Deltoide Anterior
        { name: "Elevaciones posteriores", muscles: [28], muscleGroups: [3], image: "man-doing-rear-delt-machine-flyes-exercise-vector-46760816.png" }, // Deltoide Posterior

        { name: "Sentadilla Libre", muscles: [13, 24, 38], muscleGroups: [2, 6], image: "man-doing-barbell-squat-exercise-vector-39117268.png" }, // Cuádriceps, Gemelos, Glúteo Mayor
        { name: "Sentadilla Smith", muscles: [13, 24, 38], muscleGroups: [2, 6], image: "man-doing-smith-machine-barbell-squat-exercise-vector-49364092.png" }, // Cuádriceps, Gemelos, Glúteo Mayor
        { name: "Peso muerto", muscles: [18, 24, 38], muscleGroups: [2, 6], image: "man-doing-sumo-barbell-deadlifts-exercise-vector-39115277.png" }, // Isquiotibiales, Gemelos, Glúteo Mayor
        { name: "Peso muerto rumano", muscles: [18, 24, 38], muscleGroups: [2, 6], image: "man-doing-stiff-legged-barbell-deadlift-vector-38515390.png" }, // Isquiotibiales, Gemelos, Glúteo Mayor
        { name: "Peso muerto sumo", muscles: [18, 24, 38], muscleGroups: [2, 6], image: "man-doing-sumo-barbell-deadlifts-exercise-vector-39115277.png" }, // Isquiotibiales, Gemelos, Glúteo Mayor
        { name: "Prensa pierna", muscles: [13, 24, 38], muscleGroups: [2, 6], image: "woman-doing-leg-press-exercise-on-machine-vector-45471478.png" }, // Cuádriceps, Gemelos, Glúteo Mayor
        { name: "Extensión de cuádriceps", muscles: [13, 14, 15, 16, 17], muscleGroups: [2], image: "man-doing-seated-machine-leg-extensions-exercise-vector-47456628.png" }, // Cuádriceps, Recto Femoral, Vasto Lateral, Vasto Medial, Vasto Intermedio
        { name: "Flexión de cuádriceps", muscles: [13, 14, 15, 16, 17], muscleGroups: [2], image: "man-doing-seated-machine-leg-extensions-exercise-vector-47456628.png" }, // Cuádriceps, Recto Femoral, Vasto Lateral, Vasto Medial, Vasto Intermedio
        { name: "Leg curl", muscles: [18, 19, 20, 21], muscleGroups: [2], image: "woman-doing-lying-leg-curls-exercise-vector-47304177.png" }, // Isquiotibiales, Bíceps Femoral, Semitendinoso, Semimembranoso
        { name: "Abductor", muscles: [23], muscleGroups: [2], image: "man-doing-exercise-using-abductor-thigh-machine-vector-48677624.png" }, // Abductores
        { name: "Aductor", muscles: [22], muscleGroups: [2], image: "man-doing-adductor-adduction-inner-thigh-machine-vector-38567794.png" }, // Aductores
        { name: "Gemelos en máquina", muscles: [24, 25], muscleGroups: [2], image: "seated-calf-machine-raises-vector-44360420.png" }, // Gemelos, Sóleo
        { name: "Gemelos en Smith", muscles: [24, 25], muscleGroups: [2], image: "man-doing-calf-raises-posture-exercise-vector-34493783.png" }, // Gemelos, Sóleo
        { name: "Gemelos en prensa", muscles: [24, 25], muscleGroups: [2], image: "man-doing-standing-calf-raise-with-assisted-machin-vector-44360414.png" } // Gemelos, Sóleo
    ]

    ,

    week:[
        {id:0,name:'Lunes',letter:'L'},
        {id:1,name:'Martes',letter:'M'},
        {id:2,name:'Miércoles',letter:'X'},
        {id:3,name:'Jueves',letter:'J'},
        {id:4,name:'Viernes',letter:'V'},
        {id:5,name:'Sábado',letter:'S'},
        {id:6,name:'Domingo',letter:'D'}
    ]

    
};