import React, { useState, useEffect } from 'react';
import { Timer, Play, Square, RotateCcw, Activity } from 'lucide-react';

export default function RestTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 5000); // Stop flashing after 5s
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const addTime = (seconds: number) => {
    setTimeLeft(prev => prev + seconds);
    setIsFlashing(false);
  };

  const startTimer = () => {
    if (timeLeft > 0) setIsActive(true);
    setIsFlashing(false);
  };

  const stopTimer = () => {
    setIsActive(false);
    setIsFlashing(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setIsFlashing(false);
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section>
      <div className="mb-12 border-b-4 border-slate-800 pb-6 relative">
        <div className="absolute bottom-0 right-0 w-32 h-2 bg-orange-500"></div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 flex items-center">
          <Timer className="mr-4 text-orange-600" size={40} />
          战术休整计时模块
        </h2>
        <p className="text-slate-500 font-bold tracking-widest text-sm uppercase flex items-center">
           组间冷却监控 / 严格把控重组时间 <span className="w-8 h-4 mecha-barcode ml-4 opacity-50 block"></span>
        </p>
      </div>

      <div className="mech-panel p-6 md:p-10 bg-white cut-corner-diag relative overflow-hidden">
        {/* Decorations */}
        <div className="absolute top-4 right-4 font-mono text-[10px] text-slate-400 font-bold hidden sm:block pointer-events-none">TIMER-MODULE</div>
        <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-400 font-bold hidden sm:block pointer-events-none">A-01</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Main Display */}
          <div className="flex flex-col">
            <div className={`flex-1 border-4 border-slate-800 py-16 md:py-20 flex justify-center items-center relative overflow-hidden transition-colors shadow-inner cut-corner-sm ${
              isFlashing ? 'bg-red-600 text-white animate-pulse shadow-[inset_0_0_50px_rgba(153,27,27,0.5)]' : 'bg-slate-900 text-orange-500'
            }`}>
               {/* scanline effect */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none"></div>
               {isActive && <div className="absolute top-4 right-4 animate-ping"><Activity size={24} className="text-orange-500" /></div>}
               
               <div className={`font-mono text-7xl md:text-[8rem] font-black tracking-widest leading-none z-10 ${
                 isFlashing ? 'drop-shadow-lg' : 'drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]'
               }`}>
                 {formatTime(timeLeft)}
               </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col justify-end space-y-6">
            <div>
              <div className="text-[11px] text-slate-500 font-bold uppercase mb-3 tracking-widest flex items-center">
                <span className="w-2 h-2 bg-slate-400 mr-2"></span> 补充冷却时间
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button onClick={() => addTime(30)} className="font-black text-slate-700 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 transition-colors py-4 text-xl cut-corner-sm shadow-[2px_2px_0px_#cbd5e1] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">+30<span className="text-sm font-bold text-slate-500 ml-1">S</span></button>
                <button onClick={() => addTime(60)} className="font-black text-slate-700 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 transition-colors py-4 text-xl cut-corner-sm shadow-[2px_2px_0px_#cbd5e1] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">+60<span className="text-sm font-bold text-slate-500 ml-1">S</span></button>
                <button onClick={() => addTime(90)} className="font-black text-slate-700 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 transition-colors py-4 text-xl cut-corner-sm shadow-[2px_2px_0px_#cbd5e1] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">+90<span className="text-sm font-bold text-slate-500 ml-1">S</span></button>
                <button onClick={() => addTime(120)} className="font-black text-slate-700 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 transition-colors py-4 text-xl cut-corner-sm shadow-[2px_2px_0px_#cbd5e1] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">+120<span className="text-sm font-bold text-slate-500 ml-1">S</span></button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {!isActive ? (
                <button 
                  onClick={startTimer} 
                  disabled={timeLeft === 0} 
                  className="sm:col-span-2 py-4 md:py-5 flex items-center justify-center text-lg md:text-xl font-black bg-blue-600 text-white border-2 border-blue-900 hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-500 transition-colors cut-corner-sm shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[2px_2px_0px_#1e3a8a] hover:translate-y-[2px] hover:translate-x-[2px]"
                >
                   <Play size={24} className="mr-2" /> 启动引擎
                </button>
              ) : (
                <button 
                  onClick={stopTimer} 
                  className="sm:col-span-2 py-4 md:py-5 flex items-center justify-center text-lg md:text-xl font-black bg-orange-500 text-white border-2 border-orange-800 hover:bg-orange-600 transition-colors cut-corner-sm shadow-[4px_4px_0px_#7c2d12] hover:shadow-[2px_2px_0px_#7c2d12] hover:translate-y-[2px] hover:translate-x-[2px]"
                >
                   <Square size={24} className="mr-2" /> 暂停倒数
                </button>
              )}
              <button 
                onClick={resetTimer} 
                className="py-4 md:py-5 flex items-center justify-center text-lg font-black text-slate-600 bg-white border-2 border-slate-400 hover:bg-slate-100 transition-colors cut-corner-sm shadow-[4px_4px_0px_#94a3b8] hover:shadow-[2px_2px_0px_#94a3b8] hover:translate-y-[2px] hover:translate-x-[2px]"
              >
                 <RotateCcw size={20} className="mr-2" /> 重置
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
