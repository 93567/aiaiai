import React, { useState } from 'react';
import { CheckinData, ExerciseRecord } from '../types';
import { Check, X, Flame, CalendarDays, Activity, Edit2, ShieldAlert } from 'lucide-react';

interface HeatmapProps {
  history: CheckinData[];
  onEditRecord: (data: CheckinData) => void;
}

export default function Heatmap({ history, onEditRecord }: HeatmapProps) {
  const [selectedCheckin, setSelectedCheckin] = useState<CheckinData | null>(null);
  
  // Calculate grid size dynamically: minimum 100 days, expand as needed 
  const totalDays = Math.max(100, Math.ceil(history.length / 14) * 14 + 14);
  
  const getColorForType = (type?: string, rpe?: number) => {
    if (!type) return 'bg-slate-200 border-2 border-slate-300 hover:border-slate-500';
    if (type === 'Rest') return 'bg-slate-700 border-2 border-slate-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]';
    
    if (rpe && rpe >= 8) return 'bg-red-600 border-2 border-red-800 shadow-[2px_2px_0px_#991b1b]';
    if (rpe && rpe >= 5) return 'bg-orange-500 border-2 border-orange-700 shadow-[2px_2px_0px_#9a3412]';
    return 'bg-blue-500 border-2 border-blue-700 shadow-[2px_2px_0px_#1e3a8a]';
  };

  const getDayData = (dayIndex: number): CheckinData | undefined => {
    return history.find(h => h.day === dayIndex);
  };

  const currentStreak = () => {
    let streak = 0;
    if (history.length === 0) return 0;
    const maxDay = Math.max(...history.map(h => h.day));
    for (let i = maxDay; i > 0; i--) {
      if (getDayData(i)) streak++;
      else break;
    }
    return streak;
  };

  const completedExercisesCount = (exercises: ExerciseRecord[]) => {
    return exercises ? exercises.filter(e => e.completed).length : 0;
  };

  const getStatusLabel = (type?: string, rpe?: number) => {
    if (!type) return '未打卡';
    if (type === 'Rest') return '休息日';
    if (rpe && rpe >= 8) return '高强度训练';
    return '正常训练';
  };

  return (
    <section>
      <div className="mb-12 border-b-4 border-slate-800 pb-6 relative">
        <div className="absolute bottom-0 right-0 w-48 h-2 bg-orange-500"></div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 flex items-center">
          <CalendarDays className="mr-4 text-blue-600" size={40} />
          持续打卡历史记录
        </h2>
        <p className="text-slate-500 font-bold tracking-widest text-sm uppercase flex items-center">
           记录你每一天的流汗与进步 <span className="w-4 h-4 mecha-barcode ml-4 opacity-50"></span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 mech-panel p-6 md:p-8 bg-white overflow-x-auto relative z-10 cut-corner-sm">
           <div className="min-w-[500px]">
             <div className="flex justify-between items-end mb-8 border-b-2 border-slate-200 pb-4">
                <div>
                  <h4 className="font-black text-slate-800 text-xl tracking-wide flex items-center">
                     打卡热力图
                  </h4>
                  <div className="flex gap-4 mt-3 text-xs font-bold text-slate-600 uppercase">
                    <span className="flex items-center"><div className="w-3.5 h-3.5 bg-slate-200 border-2 border-slate-300 mr-2"></div> 未打卡</span>
                    <span className="flex items-center"><div className="w-3.5 h-3.5 bg-slate-700 border-2 border-slate-800 mr-2"></div> 休息日</span>
                    <span className="flex items-center"><div className="w-3.5 h-3.5 bg-blue-500 border-2 border-blue-700 mr-2"></div> 适当训练</span>
                    <span className="flex items-center"><div className="w-3.5 h-3.5 bg-red-600 border-2 border-red-800 mr-2"></div> 高强度训练</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">系统打卡总数</div>
                  <div className="text-4xl font-black text-slate-800 leading-none">{history.length} <span className="text-base text-slate-400">TICKETS</span></div>
                </div>
             </div>

             <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-2.5">
               {Array.from({ length: totalDays }).map((_, i) => {
                 const day = i + 1;
                 const data = getDayData(day);
                 return (
                   <button 
                     key={day}
                     onClick={() => data && setSelectedCheckin(data)}
                     className={`aspect-square transition-all duration-200 relative group focus:outline-none z-10 ${getColorForType(data?.type, data?.rpe)} ${!data ? 'cursor-default' : 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:z-20'}`}
                   >
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 border-2 border-slate-700 text-white text-xs font-bold py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30 shadow-md flex items-center">
                        第 {day} 天: {getStatusLabel(data?.type, data?.rpe)}
                      </span>
                   </button>
                 );
               })}
             </div>
           </div>
        </div>

        {/* Detailed Diary Section */}
        <div className="lg:col-span-1 space-y-4 flex flex-col h-full">
          <div className="mech-card border-l-[8px] border-l-orange-500 p-6 bg-slate-50 flex items-center justify-between shadow-sm">
            <div>
              <h4 className="text-sm font-black text-slate-600 tracking-widest mb-1 flex items-center">
                <Flame size={20} className="mr-2 text-orange-500"/> 当前连续打卡
              </h4>
              <div className="text-5xl font-black text-slate-800 flex items-baseline mt-2 font-mono">
                {currentStreak()} <span className="text-lg text-slate-500 ml-2 font-bold tracking-widest font-sans">天</span>
              </div>
            </div>
            <div className="w-8 h-12 mecha-barcode opacity-20"></div>
          </div>

          <div className="mech-card bg-white p-0 flex-1 flex flex-col max-h-[600px] relative z-20 shadow-md overflow-hidden cut-corner-tl">
             <div className="absolute top-2 right-2 font-mono text-[10px] text-slate-300 font-bold">INFO-PANEL</div>
             {selectedCheckin ? (
               <div className="flex flex-col h-full overflow-hidden p-6 relative">
                 <div className="flex justify-between items-start mb-5 border-b-2 border-slate-200 pb-4 shrink-0">
                   <div>
                     <h4 className="font-black text-slate-800 text-3xl leading-none mb-3">第 {selectedCheckin.day} 天打卡详情</h4>
                     <p className="text-sm font-bold text-slate-500">日期: {selectedCheckin.date}</p>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                     <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 text-white shadow-[2px_2px_0px_rgba(0,0,0,0.2)] border-2 cut-corner-sm ${selectedCheckin.type === 'Rest' ? 'bg-slate-700 border-slate-900' : 'bg-blue-600 border-blue-900'}`}>
                       {selectedCheckin.type === 'Push' ? '推胸日' : selectedCheckin.type === 'Pull' ? '拉背日' : selectedCheckin.type === 'Legs' ? '练腿日' : '休息日'}
                     </span>
                     <button 
                       onClick={() => onEditRecord(selectedCheckin)}
                       className="text-xs flex items-center font-bold text-slate-500 hover:text-blue-600 transition-colors mt-2 border border-slate-200 px-2 py-1 bg-slate-50 hover:bg-blue-50"
                     >
                       <Edit2 size={14} className="mr-1"/> 修改记录
                     </button>
                   </div>
                 </div>
                 
                 <div className="overflow-y-auto hide-scrollbar flex-1 -mx-2 px-2 pb-4 space-y-5">
                   
                   {selectedCheckin.type !== 'Rest' && (
                     <div className="flex gap-3">
                       <div className="bg-slate-50 flex-1 p-4 border-2 border-slate-200 flex flex-col justify-center items-center shadow-inner">
                         <span className="text-xs font-bold text-slate-500 mb-1">疲劳度 (RPE)</span>
                         <span className="font-black text-3xl text-orange-600">{selectedCheckin.rpe}<span className="text-base font-bold text-slate-400">/10</span></span>
                       </div>
                       <div className="bg-slate-50 flex-1 p-4 border-2 border-slate-200 flex flex-col justify-center items-center shadow-inner">
                         <span className="text-xs font-bold text-slate-500 mb-1">当前体重</span>
                         <span className="font-black text-3xl text-slate-800">{selectedCheckin.bodyWeight}<span className="text-base font-bold text-slate-400 ml-1">kg</span></span>
                       </div>
                     </div>
                   )}

                   {selectedCheckin.dailyNotes && (
                     <div className="bg-slate-50 p-4 border-l-[6px] border-l-blue-500 border-y border-r border-slate-200 relative">
                       <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                       <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                       <strong className="text-slate-800 text-sm font-black block mb-2 border-b border-slate-200 pb-2">今日总结与感悟</strong>
                       <p className="text-slate-700 text-sm font-medium leading-relaxed">{selectedCheckin.dailyNotes}</p>
                     </div>
                   )}

                   {selectedCheckin.type !== 'Rest' && selectedCheckin.exercises && selectedCheckin.exercises.length > 0 && (
                     <div className="pt-2">
                       <strong className="text-slate-800 text-base font-black block mb-4 flex items-center border-b-2 border-slate-800 pb-2">
                         <Activity size={18} className="mr-2 text-blue-600"/> 
                         动作完成清单
                         <span className="text-sm font-bold text-slate-500 ml-2">({completedExercisesCount(selectedCheckin.exercises)}/{selectedCheckin.exercises.length})</span>
                       </strong>
                       <div className="space-y-3">
                         {selectedCheckin.exercises.map((ex, idx) => (
                           <div key={idx} className={`p-4 border-2 text-sm transition-colors relative ${ex.completed ? 'bg-white border-blue-400 shadow-[2px_2px_0px_#93c5fd]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                             {/* Small rivet decor */}
                             {ex.completed && <div className="absolute top-2 right-2 w-1 h-1 bg-blue-300 rounded-full"></div>}

                             <div className="flex items-center justify-between font-black">
                               <span className={ex.completed ? 'text-slate-800 text-base tracking-wide' : 'line-through decoration-slate-400'}>{ex.name}</span>
                               {ex.completed ? <Check size={20} className="text-blue-600" strokeWidth={3}/> : <X size={20} className="opacity-40"/>}
                             </div>
                             {ex.completed && (ex.weight || ex.notes) && (
                               <div className="mt-4 pt-3 border-t-2 border-slate-100 space-y-2 text-sm font-bold bg-slate-50/50 -mx-2 px-2 -mb-2 pb-2">
                                 {ex.weight && <p className="flex items-center"><span className="text-slate-400 w-14 inline-block">重量次数:</span> <span className="text-slate-800 bg-white px-2 py-0.5 border-2 border-slate-300">{ex.weight}</span></p>}
                                 {ex.notes && <p className="flex"><span className="text-slate-400 w-14 shrink-0">备注说明:</span> <span className="text-slate-700">{ex.notes}</span></p>}
                               </div>
                             )}
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50">
                 <div className="w-24 h-24 bg-white border-4 border-slate-200 flex flex-col justify-center items-center mb-6 rounded-full text-slate-300 shadow-inner">
                    <ShieldAlert size={40} />
                 </div>
                 <p className="text-base font-black text-slate-500 tracking-wider">请点击左侧热力图<br/>查看某天的详细打卡记录</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
