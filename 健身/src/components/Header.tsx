import React from 'react';
import { Play, Archive, ActivitySquare, Target, Cpu } from 'lucide-react';

interface HeaderProps {
  currentDay: number;
  isTodayCheckedIn: boolean;
  hasLiveWorkout: boolean;
  onOpenWorkout: () => void;
}

export default function Header({ currentDay, isTodayCheckedIn, hasLiveWorkout, onOpenWorkout }: HeaderProps) {
  const currentPhase = Math.floor((currentDay - 1) / 100) + 1;
  const progressPercent = Math.min(((currentDay % 100 || 100) / 100) * 100, 100);

  return (
    <header className="relative bg-white border-b-[8px] border-slate-800 shadow-sm overflow-hidden">
      {/* Mecha background accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
      <div className="absolute top-0 right-10 w-32 h-20 bg-slate-100 border-l-2 border-r-2 border-b-2 border-slate-200 cut-corner-br hidden md:block z-0"></div>
      <div className="absolute top-8 right-16 w-16 h-4 hazard-stripes-sm hidden md:block opacity-30 z-0"></div>

      {/* Decorative Decals */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-slate-400 font-bold opacity-60 flex items-center">
        <Target size={12} className="mr-1" /> SYS_INIT_OK
      </div>
      <div className="absolute top-4 left-4 h-4 w-12 mecha-barcode opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="text-center md:text-left flex-1 relative">
            <div className="inline-flex items-center space-x-2 bg-slate-100 border-2 border-slate-700 px-3 py-1 mb-6 shadow-[3px_3px_0px_#94a3b8] cut-corner-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 bg-orange-600"></span>
              </span>
              <span className="text-xs font-black text-slate-700 tracking-wider">训练状态监控: 正常</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-4 text-slate-800 flex flex-wrap justify-center md:justify-start items-center">
              战术塑形打卡<span className="text-white bg-blue-600 px-3 py-1 ml-4 text-xl md:text-2xl lg:text-3xl cut-corner-diag shadow-[4px_4px_0px_#1e293b] flex items-center"><Cpu size={24} className="mr-2" /> P{currentPhase}</span>
            </h1>
            <div className="flex items-center justify-center md:justify-start">
              <span className="w-8 h-1 bg-orange-500 mr-4"></span>
              <p className="text-slate-500 font-bold tracking-widest text-sm md:text-base uppercase">体系化记录 · 科学防伤 · 持续突破</p>
            </div>
          </div>

          <div className="w-full md:w-auto mech-panel p-6 md:p-8 min-w-[340px] cut-corner-tl bg-mecha-hex relative">
             {/* Rivet decals */}
             <div className="absolute top-4 right-4 w-2 h-2 rounded-full border border-slate-400 shadow-inner bg-slate-200"></div>
             <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full border border-slate-400 shadow-inner bg-slate-200"></div>
             <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full border border-slate-400 shadow-inner bg-slate-200"></div>

             <div className="flex justify-between items-end mb-6 border-b-2 border-slate-300 pb-4 relative z-10">
               <div>
                 <div className="text-[11px] text-slate-500 font-bold uppercase mb-2 tracking-widest flex items-center">
                    <span className="w-2 h-2 bg-slate-400 mr-2"></span> 持续运转天数
                 </div>
                 <div className="flex items-baseline border-l-4 border-slate-800 pl-3">
                    <span className="text-5xl font-black text-slate-800 leading-none">{currentDay}</span>
                    <span className="text-lg text-slate-400 font-bold ml-1 uppercase">DAYS</span>
                 </div>
               </div>
               
               <div className="text-right">
                  <div className="text-[11px] text-slate-500 font-bold uppercase mb-2 tracking-widest flex items-center justify-end">
                    今日状态 <span className="w-2 h-2 bg-slate-400 ml-2"></span>
                  </div>
                  {hasLiveWorkout ? (
                    <div className="text-orange-600 font-black text-sm animate-pulse border-2 border-orange-500 px-3 py-1 bg-orange-50 cut-corner-sm">打卡进行中 (LIVE)</div>
                  ) : isTodayCheckedIn ? (
                    <div className="text-blue-600 font-black text-sm border-2 border-blue-500 px-3 py-1 bg-blue-50 cut-corner-sm flex items-center"><CheckIcon className="mr-1 w-4 h-4"/> 已完成打卡</div>
                  ) : (
                    <div className="text-slate-500 font-black text-sm border-2 border-slate-300 px-3 py-1 bg-white cut-corner-sm">待执行</div>
                  )}
               </div>
             </div>

             <div className="relative z-10">
               <button 
                 onClick={onOpenWorkout}
                 className={`w-full py-4 px-6 text-sm md:text-base flex items-center justify-center mech-button cut-corner-diag ${
                   hasLiveWorkout 
                     ? 'mech-button-primary' 
                     : isTodayCheckedIn 
                       ? '' 
                       : 'mech-button-blue'
                 }`}
               >
                 {hasLiveWorkout ? (
                   <>
                     <ActivitySquare size={20} className="mr-2" />
                     继续今日打卡记录
                   </>
                 ) : isTodayCheckedIn ? (
                   <>
                     <Archive size={20} className="mr-2" />
                     查阅 / 修改今日详情
                   </>
                 ) : (
                   <>
                     <Play size={20} className="mr-2" />
                     开始今日训练打卡
                   </>
                 )}
               </button>
             </div>
             
             {/* Progress Bar */}
             <div className="mt-8 relative z-10">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 font-mono">
                  <span>当前阶段达成率</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-3 bg-slate-200 w-full border-2 border-slate-800 overflow-hidden relative">
                  <div className="h-full bg-blue-600 transition-all duration-500 relative border-r-2 border-white" style={{ width: `${progressPercent}%` }}>
                     <div className="absolute right-0 top-0 bottom-0 w-8 hazard-stripes"></div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const CheckIcon = ({ className = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="4" strokeLinecap="square">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
