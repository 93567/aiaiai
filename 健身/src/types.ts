export interface ExerciseRecord {
  name: string;
  completed: boolean;
  setsTarget: string;
  weight: string;
  notes: string;
}

export interface CheckinData {
  id: string; 
  day: number;
  date: string;
  type: 'Push' | 'Pull' | 'Legs' | 'Rest';
  rpe: number; 
  bodyWeight: number;
  dailyNotes: string;
  exercises: ExerciseRecord[];
  status: 'draft' | 'sealed';
}

export interface PlanItem {
  name: string;
  sets: string;
}

export type CustomPlan = Record<'Push' | 'Pull' | 'Legs' | 'Rest', PlanItem[]>;
