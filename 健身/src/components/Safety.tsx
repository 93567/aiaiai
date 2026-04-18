import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Safety() {
  return (
    <section>
      <div className="mb-12 border-b-4 border-slate-800 pb-6 relative">
        <div className="absolute bottom-0 right-0 w-32 h-2 bg-red-600"></div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 flex items-center">
          <ShieldAlert className="mr-4 text-red-600" size={40} />
          安全原则：护腰指南
        </h2>
        <p className="text-slate-500 font-bold tracking-widest text-sm uppercase flex items-center">
           考虑到有腰椎间盘突出病史，请严格遵守以下红绿榜单 <span className="w-8 h-4 mecha-barcode ml-4 opacity-50 block"></span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {/* Red Light */}
        <div className="bg-white p-8 border-4 border-slate-800 relative shadow-[8px_8px_0px_#1e293b] text-slate-800 group hover:-translate-y-1 transition-transform cut-corner-diag">
          
          <div className="absolute top-4 right-4 text-red-100 group-hover:text-red-50 transition-colors z-0">
            <AlertTriangle size={120} strokeWidth={1} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-8 flex items-center tracking-normal border-b-4 border-red-500 pb-4 relative z-10 w-max pr-8">
             <span className="w-4 h-4 bg-red-600 mr-3 rotate-45"></span>
             危险动作红榜
          </h3>
          
          <ul className="space-y-6 relative z-10 font-bold">
            {safetyRedList.map((item, idx) => (
              <li key={idx} className="flex items-start bg-slate-50 p-5 border border-slate-200">
                <div className="shrink-0 mr-4 mt-0.5">
                  <span className="font-black text-lg block w-8 h-8 flex flex-col items-center justify-center bg-red-600 text-white cut-corner-sm">X</span>
                </div>
                <div>
                  <strong className="text-slate-800 text-[16px] block mb-2 font-black">{item.title}</strong>
                  <span className="text-sm text-slate-600 block leading-relaxed">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Green Light */}
        <div className="bg-white p-8 border-4 border-slate-800 relative shadow-[8px_8px_0px_#1e293b] text-slate-800 group hover:-translate-y-1 transition-transform cut-corner-diag mt-4 md:mt-0">
          
          <div className="absolute top-4 right-4 text-blue-50 group-hover:text-blue-100 transition-colors z-0">
            <CheckCircle2 size={120} strokeWidth={1} />
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-8 flex items-center tracking-normal border-b-4 border-blue-500 pb-4 relative z-10 w-max pr-8">
            <span className="w-4 h-4 bg-blue-600 mr-3 rotate-45"></span>
            推荐安全替换动作
          </h3>
          
          <ul className="space-y-6 relative z-10 font-bold">
            {safetyGreenList.map((item, idx) => (
              <li key={idx} className="flex items-start bg-slate-50 p-5 border border-slate-200">
                <div className="shrink-0 mr-4 mt-0.5">
                   <span className="font-black text-lg block w-8 h-8 flex flex-col items-center justify-center bg-blue-600 text-white cut-corner-sm">V</span>
                </div>
                <div>
                  <strong className="text-slate-800 text-[16px] block mb-2 font-black">{item.title}</strong>
                  <span className="text-sm text-slate-600 block leading-relaxed">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const safetyRedList = [
  { title: "绝对禁止大重量深蹲/硬拉", desc: "脊柱在垂直方向承受极大重量，极易压迫病变或脆弱的椎间盘，发生二次凸出的风险极高。" },
  { title: "俯身杠铃划船", desc: "躯干弯曲的同时还要对抗重物的拉力，对下背部产生的剪切力极大，很容易导致腰部急性扭伤。" },
  { title: "仰卧起坐", desc: "在仰卧起坐重复弯曲脊柱的过程中，会将椎间盘向后挤压，对有伤病隐患的人非常不友好。" },
  { title: "无后背支撑的推举", desc: "例如站姿推举，容易在发力时不自觉地“反弓”下腰背（塌腰），这会把所有压力都集中在腰椎上。" }
];

const safetyGreenList = [
  { title: "保加利亚单腿蹲 (替深蹲)", desc: "单腿动作只需很小的哑铃重量就能充分刺激大腿肌肉，同时因为上半身保持直立，腰椎承压极小。" },
  { title: "胸前支撑式划船 (替俯身划船)", desc: "利用上斜板或者器械垫住胸口，让器械来承受腰部的代偿压力，背部发力更孤立安全。" },
  { title: "平板支撑 (替换仰卧起坐)", desc: "通过肌肉等长收缩来锻炼真正的核心稳定性，不仅不伤脊柱，反而能像天然的护腰一样保护腰椎。" },
  { title: "带靠背的坐姿推肩 (替换站姿推举)", desc: "一定要把整个后背紧密贴合在椅背上，即使推大重量，脊柱也能得到椅背的分担保护。" }
];
