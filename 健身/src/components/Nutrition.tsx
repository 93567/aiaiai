import React from 'react';
import { Utensils, Zap, Database, AlertOctagon } from 'lucide-react';

export default function Nutrition() {
  return (
    <section>
      <div className="mb-12 border-b-4 border-slate-800 pb-6 relative">
        <div className="absolute bottom-0 right-0 w-32 h-2 bg-blue-600"></div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 flex items-center">
          <Utensils className="mr-4 text-orange-600" size={40} />
          健身饮食营养建议
        </h2>
        <p className="text-slate-500 font-bold tracking-widest text-sm uppercase flex items-center">
           合理摄入三大营养素，肌肉恢复的关键 <span className="w-8 h-4 mecha-barcode ml-4 opacity-50 block"></span>
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Protein */}
        <div className="mech-panel p-8 bg-white hover:-translate-y-1 transition-transform relative z-10 cut-corner-diag">
          
          <div className="relative z-10">
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center">
              <span className="w-3 h-3 bg-slate-800 mr-2 border border-slate-600"></span> 肌肉的主要成分
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">蛋白质摄入</h3>
            
            <div className="flex items-end mb-6 border-b-2 border-slate-200 pb-6 relative">
              <span className="text-5xl font-black text-slate-800 leading-none">120<span className="text-2xl text-slate-300 mx-1">-</span>140</span>
              <span className="text-sm font-bold text-slate-500 mb-1 ml-2">克 / 每天</span>
            </div>
            
            <ul className="text-sm text-slate-600 space-y-4 font-bold">
              <li className="flex items-start">
                <div className="mt-1 mr-3 text-slate-800"><CheckIcon /></div>
                <span className="leading-relaxed">建议每天吃 2-3 个完整的鸡蛋（蛋黄包含很多必要营养，不要丢弃）。</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 text-slate-800"><CheckIcon /></div>
                <span className="leading-relaxed">主要蛋白质来源：鸡胸肉、瘦牛肉或鱼类虾类水产。</span>
              </li>
              <li className="flex items-start bg-slate-50 p-4 border-l-4 border-slate-800 mt-4 leading-relaxed">
                <div className="text-slate-800 mr-3 mt-0.5"><CheckIcon /></div>
                <span>强烈建议在力量训练结束后的 30 分钟内，喝一份乳清蛋白粉来快速补充。</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Carbs */}
        <div className="mech-panel p-8 bg-white border-2 border-slate-800 hover:-translate-y-1 transition-transform relative z-20 shadow-[6px_6px_0px_#e2e8f0] lg:-mt-4 lg:mb-4 cut-corner-sm">
          <div className="absolute top-2 right-2 w-2 h-2 bg-slate-300 rounded-full"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-slate-300 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-600 mr-2 border border-blue-400"></span> 力量来源
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">碳水化合物</h3>
            
            <p className="text-sm font-bold text-slate-600 mb-6 border-b-2 border-slate-200 pb-6 leading-relaxed">
              碳水是我们运动的主要能量来源。在练腿或推胸等大训练量前，请务必吃足碳水，否则会头晕没力气。
            </p>
            
            <ul className="text-sm text-slate-600 space-y-4 font-bold">
              <li className="flex items-start">
                <div className="mt-1 mr-3 text-blue-600"><CheckIcon /></div>
                <span className="leading-relaxed">可以将日常的主食（白米饭/面条）替换一半为粗粮，例如燕麦、糙米、红薯。</span>
              </li>
              <li className="flex items-start bg-blue-50 p-4 border border-blue-200 mt-6 shadow-sm">
                <div className="text-blue-600 mr-3 mt-0.5"><AlertOctagon size={20} strokeWidth={3} /></div>
                <span className="leading-relaxed"><strong className="text-blue-800 block text-base mb-1">【营养摄入时机】</strong> 训练前的一餐必须有碳水；而如果今天休息不训练，晚餐可以适当减少主食量。</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Fats */}
        <div className="mech-panel p-8 bg-white hover:-translate-y-1 transition-transform relative z-10 cut-corner-tl">
          
          <div className="relative z-10">
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center">
              <span className="w-3 h-3 bg-slate-800 mr-2 border border-slate-600"></span> 维持内分泌健康
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">优质脂肪</h3>
            
            <p className="text-sm font-bold text-slate-600 mb-6 border-b-2 border-slate-200 pb-6 leading-relaxed">
              完全无油的水煮饮食是不健康的，脂肪是维持激素水平（特别是睾酮）和关节润滑的重要物质。
            </p>
            
            <ul className="text-sm text-slate-600 space-y-4 font-bold">
              <li className="flex items-start">
                <div className="mt-1 mr-3 text-slate-800"><CheckIcon /></div>
                <span className="leading-relaxed">每天可以吃一小把（约掌心大小）的原味坚果（如核桃、杏仁）。</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 text-slate-800"><CheckIcon /></div>
                <span className="leading-relaxed">推荐使用橄榄油来进行日常的煎炒烹饪。</span>
              </li>
              <li className="flex items-start bg-red-50 p-4 border border-red-200 mt-6 shadow-sm relative">
                <div className="absolute top-0 right-0 w-8 h-2 hazard-stripes"></div>
                <div className="text-red-600 mr-3 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <span className="leading-relaxed"><strong className="text-red-700 block text-base mb-1">【请尽量避开】</strong> 反式脂肪（人造奶油/大量代可可脂）、以及外卖中过度重油重盐的劣质脂肪。</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const CheckIcon = ({ className = "currentColor" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="4" strokeLinecap="square">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
