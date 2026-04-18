import React, { useState, useEffect } from 'react';
import { CheckinData, ExerciseRecord, CustomPlan } from '../types';
import { Check, Flame, Scale, PenTool, Database, Terminal, XSquare, Save } from 'lucide-react';

interface WorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutData: CheckinData;
  onUpdate: (data: CheckinData) => void;
  onSeal: (data: CheckinData) => void;
  customPlan: CustomPlan;
}

export default function WorkoutModal({ isOpen, onClose, workoutData, onUpdate, onSeal, customPlan }: WorkoutModalProps) {
  const [localData, setLocalData] = useState<CheckinData>(workoutData);
  const isEditingHostory = workoutData.status === 'sealed';

  useEffect(() => {
    setLocalData(workoutData);
  }, [workoutData]);

  if (!isOpen) return null;

  const syncLocal = (newData: CheckinData) => {
    setLocalData(newData);
    if (!isEditingHostory) onUpdate(newData);
  };

  const handleTypeChange = (newType: 'Push' | 'Pull' | 'Legs' | 'Rest') => {
    if (isEditingHostory) return; 
    const newEx = newType !== 'Rest' 
        ? customPlan[newType].map((item: any) => ({ name: item.name || item, completed: false, setsTarget: item.sets || '4组 x 8-12次', weight: '', notes: '' }))
        : [];
    syncLocal({ ...localData, type: newType, exercises: newEx });
  };

  const updateExercise = (index: number, field: keyof ExerciseRecord, value: any) => {
    const newEx = [...localData.exercises];
    newEx[index] = { ...newEx[index], [field]: value };
    syncLocal({ ...localData, exercises: newEx });
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'Push': return '推胸日';
      case 'Pull': return '拉背日';
      case 'Legs': return '练腿日';
      case 'Rest': return '休息日';
      default: return type;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={isEditingHostory ? onClose : undefined}></div>
      
      <div className="w-full md:w-[95vw] max-w-3xl bg-slate-100 border-x border-t border-slate-400 sm:border-2 md:rounded-t-none shadow-2xl relative z-10 flex flex-col transform transition-all duration-300 max-h-[95vh] sm:max-h-[85vh] cut-corner-sm">
        
        {/* Header Ribbon */}
        <div className="h-2 w-full hazard-stripes"></div>

        {/* Header */}
        <div className="px-5 py-5 bg-white border-b-4 border-slate-800 flex justify-between items-center z-20 shadow-sm relative">
          <div className="absolute top-2 right-12 font-mono text-[10px] text-slate-300 font-bold">OP-PANEL</div>
          <div className="flex items-center space-x-4">
            <div className="bg-slate-800 text-white p-2.5 border-2 border-slate-900 shadow-[2px_2px_0px_#94a3b8] cut-corner-sm">
              <Terminal size={24} />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-bold block mb-1">
                {isEditingHostory ? '修改历史打卡记录' : '今日打卡面板'}
              </span>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                第 <span className="text-orange-600 px-1">{localData.day}</span> 天 
                <span className="text-sm font-bold text-slate-400 ml-3">[{localData.date}]</span>
              </h3>
            </div>
          </div>
          {isEditingHostory ? (
            <button onClick={onClose} className="p-2 border-2 border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors bg-white">
              <XSquare size={24} />
            </button>
          ) : (
            <div className="animate-pulse text-sm font-black text-white px-3 py-1.5 bg-orange-600 shadow-[2px_2px_0px_#7c2d12] cut-corner-sm flex items-center">
               <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
               进行中
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 relative z-10 bg-slate-100 bg-mecha-grid">
          <div className="space-y-6 max-w-2xl mx-auto">
            
            {/* Workout Type */}
            <div className="mech-card p-6 bg-white shadow-sm cut-corner-br border-b-[6px]">
              <label className="flex items-center text-sm font-black text-slate-800 mb-5 border-b-2 border-slate-100 pb-2">
                <span className="w-3 h-3 bg-blue-600 mr-2 shadow-[2px_2px_0px_#93c5fd]"></span>
                选定今日训练部位
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['Push', 'Pull', 'Legs', 'Rest'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTypeChange(t)}
                    className={`py-3.5 px-2 text-sm font-black transition-all border-2 cut-corner-sm ${
                      localData.type === t 
                        ? 'border-blue-600 bg-blue-600 text-white shadow-[4px_4px_0px_#93c5fd]'
                        : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50 shadow-[2px_2px_0px_#cbd5e1]'
                    }`}
                  >
                    {getTypeLabel(t)}
                  </button>
                ))}
              </div>
            </div>

            {/* LIVE EXERCISE TRACKER */}
            {localData.type !== 'Rest' && (
              <div className="mech-card p-6 bg-white shadow-sm cut-corner-br border-b-[6px]">
                <label className="flex items-center text-sm font-black text-slate-800 mb-5 border-b-2 border-slate-100 pb-2">
                  <Database size={20} className="text-orange-500 mr-2" />
                  动作清单 (每完成一项请勾选)
                </label>
                <div className="space-y-4">
                  {localData.exercises.map((ex, index) => (
                    <div key={index} className={`border-2 p-5 transition-all relative ${ex.completed ? 'bg-blue-50 border-blue-400 shadow-[4px_4px_0px_#93c5fd]' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                      {ex.completed && <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>}
                      <div className="flex justify-between items-center cursor-pointer" onClick={() => updateExercise(index, 'completed', !ex.completed)}>
                        <h4 className={`font-black text-lg transition-colors pl-2 ${ex.completed ? 'text-blue-900' : 'text-slate-600'}`}>{ex.name}</h4>
                        <div className={`w-8 h-8 border-2 flex items-center justify-center transition-colors shadow-sm bg-white cut-corner-sm ${ex.completed ? 'border-blue-600 text-blue-600' : 'border-slate-300 text-transparent'}`}>
                          <Check size={20} strokeWidth={4} />
                        </div>
                      </div>
                      
                      {ex.completed && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 pt-5 border-t-2 border-blue-200">
                          <div>
                            <label className="text-xs font-bold text-slate-600 mb-2 block">实际使用的重量与组数 (目标: {ex.setsTarget || '不限'})</label>
                            <input 
                              type="text" 
                              value={ex.weight} 
                              onChange={e => updateExercise(index, 'weight', e.target.value)} 
                              className="w-full bg-white border-2 border-slate-300 p-3 text-sm text-slate-800 font-bold focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-400 shadow-inner"
                              placeholder="例如: 50kg x 12次" 
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 mb-2 block">动作感受或备注</label>
                            <input 
                              type="text" 
                              value={ex.notes} 
                              onChange={e => updateExercise(index, 'notes', e.target.value)} 
                              className="w-full bg-white border-2 border-slate-300 p-3 text-sm text-slate-800 font-bold focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-400 shadow-inner"
                              placeholder="发力感、或者哪里不舒服..." 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metrics */}
            {localData.type !== 'Rest' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mech-card p-6 bg-white shadow-sm cut-corner-diag">
                  <div className="flex justify-between items-end mb-4 border-b-2 border-slate-100 pb-3">
                    <label className="flex items-center text-sm font-black text-slate-800">
                      <Flame size={20} className="mr-2 text-orange-500" />
                      当前疲劳度 (RPE)
                    </label>
                    <span className="text-orange-600 font-black text-3xl leading-none">{localData.rpe}<span className="text-sm font-bold text-slate-400">/10</span></span>
                  </div>
                  <input 
                    type="range" min="1" max="10" value={localData.rpe} onChange={(e) => syncLocal({...localData, rpe: parseInt(e.target.value)})}
                    className="w-full mt-4" 
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-400 mt-4 relative">
                    <span>1 (轻松)</span>
                    <span className="absolute left-1/2 -translate-x-1/2">5 (适中)</span>
                    <span>10 (力竭)</span>
                  </div>
                </div>

                <div className="mech-card p-6 bg-white shadow-sm cut-corner-diag">
                  <label className="flex items-center text-sm font-black text-slate-800 mb-5 border-b-2 border-slate-100 pb-3">
                    <Scale size={20} className="mr-2 text-blue-600" />
                    当前体重 (KG)
                  </label>
                  <div className="relative mt-2">
                    <input 
                      type="number" step="0.1" value={localData.bodyWeight || ''} onChange={e => syncLocal({...localData, bodyWeight: parseFloat(e.target.value)||0})}
                      className="w-full bg-slate-50 border-2 border-slate-300 px-4 py-3 pb-2 text-slate-800 font-black text-3xl focus:outline-none focus:border-blue-600 transition-colors shadow-inner"
                      placeholder="0.0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Daily System Log */}
            <div className="mech-card p-6 bg-white shadow-sm cut-corner-br border-b-[6px]">
              <label className="flex items-center text-sm font-black text-slate-800 mb-4 border-b-2 border-slate-100 pb-3">
                <PenTool size={20} className="mr-2 text-slate-600" />
                今日总结
              </label>
              <textarea 
                value={localData.dailyNotes} onChange={e => syncLocal({...localData, dailyNotes: e.target.value})}
                placeholder="记录今天的心情、饮食情况或是其他想说的话..."
                className="w-full bg-slate-50 border-2 border-slate-300 p-4 text-sm text-slate-800 font-bold focus:outline-none focus:border-blue-600 h-32 resize-none placeholder:text-slate-400 shadow-inner"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 bg-slate-200 border-t-4 border-slate-800 z-10 flex flex-col md:flex-row gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          {localData.status === 'draft' && (
            <button 
              onClick={onClose}
              className="flex-1 py-4 border-2 border-slate-400 text-slate-600 bg-white hover:bg-slate-50 font-black text-base tracking-wide transition-all shadow-sm cut-corner-sm"
            >
              后台挂起 (稍后继续)
            </button>
          )}
          <button 
            onClick={() => onSeal(localData)}
            className="flex-[2] py-4 font-black text-base md:text-xl tracking-widest transition-all flex items-center justify-center space-x-2 mech-button-primary cut-corner-sm"
          >
            <Save size={24} className="mr-2" />
            <span>{isEditingHostory ? '确认修改并保存' : '完成今日打卡并保存'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
