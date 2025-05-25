export interface PredictionRequest {
  sleep: number;
  screen: number;
  social: number;
  exercise: string;
  stress: string;
  diet: string;
}

export interface PredictionResponse {
  predictions: {
        DecisionTree: string,
        GradientBoosting: string,
        KNN: string,
        LogisticRegression: string,
        RandomForest: string,
        SVM: string,
        [key: string]: string;


  },
  accuracies: {
    RandomForest: string;
    LogisticRegression: string;
    KNN: string;
    DecisionTree: string;
    GradientBoosting: string;
    SVM: string;
    [key: string]: string;
  };
}

export interface QuestionData {
  id: string;
  title: string;
  question: string;
  type: 'slider' | 'select';
  options?: { value: string, label: string }[];
  min?: number;
  max?: number;
  value: any;
}

export const defaultQuestions: QuestionData[] = [
  {
    id: 'sleep',
    title: 'Horas de sueño',
    question: '¿Cuántas horas duermes al día en promedio?',
    type: 'slider',
    min: 1,
    max: 12,
    value: 8
  },
  {
    id: 'screen',
    title: 'Tiempo de pantalla',
    question: '¿Cuántas horas pasas frente a pantallas al día?',
    type: 'slider',
    min: 0,
    max: 16,
    value: 8
  },
  {
    id: 'social',
    title: 'Socialización',
    question: '¿Cuántas horas dedicas a socializar con amigos o familia diariamente?',
    type: 'slider',
    min: 0,
    max: 10,
    value: 2
  },
  {
    id: 'exercise',
    title: 'Ejercicio',
    question: '¿Qué nivel de actividad física realizas regularmente?',
    type: 'select',
    options: [
      { value: 'High', label: 'Alto (4+ días por semana)' },
      { value: 'Low', label: 'Bajo (caminar ocasionalmente)' },
      { value: 'Moderate', label: 'Moderado (2-3 días por semana)' }
    ],
    value: 'Low'
  },
  {
    id: 'stress',
    title: 'Nivel de estrés',
    question: '¿Cómo describirías tu nivel de estrés habitual?',
    type: 'select',
    options: [
      { value: 'High', label: 'Alto' },
      { value: 'Low', label: 'Bajo' },
      { value: 'Moderate', label: 'Moderado' }
    ],
    value: 'High'
  },
  {
    id: 'diet',
    title: 'Dieta',
    question: '¿Qué tipo de dieta sigues?',
    type: 'select',
    options: [
      { value: 'Balanced', label: 'Equilibrada' },
      { value: 'Junk Food', label: 'Comida rápida' },
      { value: 'Keto', label: 'Cetogénica' },
      { value: 'Vegan', label: 'Vegana' },
      { value: 'Vegetarian', label: 'Vegetariana' }
    ],
    value: 'Vegetarian'
  }
];