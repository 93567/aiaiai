import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Plan from './components/Plan';
import Heatmap from './components/Heatmap';
import Nutrition from './components/Nutrition';
import Safety from './components/Safety';
import RestTimer from './components/RestTimer';
import WorkoutModal from './components/WorkoutModal';
import { CheckinData, CustomPlan, PlanItem } from './types';
import { defaultPlanStructure } from './data/exercises';

export default function App() {
  const [history, setHistory] = useState<CheckinData[]>([]);
  const [customPlan, setCustomPlan] = useState<CustomPlan>(defaultPlanStructure);
  
  const [liveWorkout, setLiveWorkout] = useState<CheckinData | null>(null);
  const [editingWorkout, setEditingWorkout] = useState<CheckinData | null>(null);
  
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('workout_history_v8');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      } else {
        const oldHistory = localStorage.getItem('workout_history_v7');
        if (oldHistory) setHistory(JSON.parse(oldHistory));
      }

      const savedPlan = localStorage.getItem('custom_plan_v8');
      if (savedPlan) {
        setCustomPlan(JSON.parse(savedPlan));
      } else {
        const oldPlan = localStorage.getItem('custom_plan_v7');
        if (oldPlan) {
           const parsed = JSON.parse(oldPlan);
           const upgradedPlan: any = {};
           for (const key of ['Push', 'Pull', 'Legs', 'Rest']) {
             upgradedPlan[key] = (parsed[key] || []).map((item: any) => 
               typeof item === 'string' ? { name: item, sets: '4组 x 8-12次' } : item
             );
           }
           setCustomPlan(upgradedPlan as CustomPlan);
        }
      }

      const savedLive = localStorage.getItem('live_workout_v8');
      if (savedLive) {
        setLiveWorkout(JSON.parse(savedLive));
      } else {
        const oldLive = localStorage.getItem('live_workout_v7');
        if (oldLive) setLiveWorkout(JSON.parse(oldLive));
      }
    } catch (e) { console.error("Error loading saved data", e); }
  }, []);

  const handleSealRecord = (data: CheckinData) => {
    if (data.status === 'sealed' && history.find(h => h.id === data.id)) {
      const newHistory = history.map(h => h.id === data.id ? data : h);
      setHistory(newHistory);
      localStorage.setItem('workout_history_v8', JSON.stringify(newHistory));
      setEditingWorkout(null);
      return;
    }
    
    const finalData = { ...data, status: 'sealed' as const };
    const newHistory = [...history, finalData];
    setHistory(newHistory);
    localStorage.setItem('workout_history_v8', JSON.stringify(newHistory));
    
    setLiveWorkout(null);
    localStorage.removeItem('live_workout_v8');
  };

  const handleLiveWorkoutUpdate = (data: CheckinData) => {
    if (data.status === 'sealed') return;
    setLiveWorkout(data);
    localStorage.setItem('live_workout_v8', JSON.stringify(data));
  };

  const updateCustomPlan = (newPlan: CustomPlan) => {
    setCustomPlan(newPlan);
    localStorage.setItem('custom_plan_v8', JSON.stringify(newPlan));
  };

  const currentDay = history.length + 1;
  const isTodayCheckedIn = history.length > 0 && history[history.length - 1].date === new Date().toLocaleDateString();

  return (
    <div className="font-sans antialiased bg-slate-100 bg-mecha-grid text-slate-800 min-h-screen relative overflow-x-hidden">
      
      <Header 
        currentDay={currentDay}
        isTodayCheckedIn={isTodayCheckedIn}
        hasLiveWorkout={!!liveWorkout}
        onOpenWorkout={() => {
          if (!liveWorkout && !isTodayCheckedIn) {
            const initData: CheckinData = {
              id: Date.now().toString(),
              day: currentDay,
              date: new Date().toLocaleDateString(),
              type: 'Push',
              rpe: 7,
              bodyWeight: 0,
              dailyNotes: '',
              status: 'draft',
              exercises: customPlan['Push'].map((item: PlanItem) => ({ 
                name: item.name, 
                completed: false, 
                setsTarget: item.sets,
                weight: '', 
                notes: '' 
              }))
            };
            handleLiveWorkoutUpdate(initData);
          }
        }}
      />
      
      <main className="relative z-10 pb-10 space-y-12 max-w-7xl mx-auto pt-10 px-4">
        <Plan customPlan={customPlan} onUpdatePlan={updateCustomPlan} />
        <RestTimer />
        <Heatmap history={history} onEditRecord={setEditingWorkout} />
        <Nutrition />
        <Safety />
      </main>
      
      <footer className="bg-slate-800 text-slate-400 py-16 text-center border-t-4 border-slate-900 relative mt-20">
        <div className="absolute top-0 left-0 w-full h-1 hazard-stripes"></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center relative z-10">
          <div className="w-16 h-8 mecha-barcode mb-6 opacity-30"></div>
          <p className="font-black tracking-widest text-slate-200 mb-2 text-xl">TRACKER B-100</p>
          <p className="opacity-90 text-sm font-bold mt-2 tracking-wide text-slate-500">
            持续健身打卡与伤病防护指南
          </p>
        </div>
      </footer>
      
      {(liveWorkout || editingWorkout) && (
        <WorkoutModal 
          isOpen={!!liveWorkout || !!editingWorkout}
          onClose={() => setEditingWorkout(null)}
          workoutData={editingWorkout || liveWorkout!}
          onUpdate={editingWorkout ? () => {} : handleLiveWorkoutUpdate}
          onSeal={handleSealRecord}
          customPlan={customPlan}
        />
      )}
    </div>
  );
}
