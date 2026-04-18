import React from 'react';
import { Exercise } from '../data/exercises';

interface ExerciseModalProps {
  exercise: Exercise | null;
  exerciseName: string;
  onClose: () => void;
}

export default function ExerciseModal({ exercise, exerciseName, onClose }: ExerciseModalProps) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-[90vw] max-w-lg rounded-3xl shadow-2xl relative z-10 max-h-[85vh] flex flex-col overflow-hidden transform transition-all duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">{exercise.target}</span>
            <h3 className="text-2xl font-black text-slate-900 leading-none">{exerciseName}</h3>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 text-4xl leading-none transition-colors">&times;</button>
        </div>
        <div className="p-8 overflow-y-auto">
          <div className="mb-8">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">器械设定</h4>
            <p className="text-base text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {exercise.machineDesc}
            </p>
          </div>
          <div className="mb-8">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">执行指令</h4>
            <ul className="text-base text-slate-700 space-y-3">
              {exercise.steps.map((step, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-slate-400 mr-3 font-bold">{idx + 1}.</span>
                  <span className="text-slate-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h4 className="text-sm font-bold text-amber-800 uppercase tracking-widest mb-2 flex items-center">
              <span className="mr-2">⚠️</span>安全底线
            </h4>
            <p className="text-sm text-amber-900 leading-relaxed">{exercise.safety}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
