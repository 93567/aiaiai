import React, { useState } from 'react';
import { CustomPlan, PlanItem } from '../types';
import { exercisesDict, Exercise } from '../data/exercises';
import ExerciseModal from './ExerciseModal';
import { Settings, Plus, Trash2, Edit2, Search, ArrowUp, ArrowDown, Save } from 'lucide-react';

type TabType = 'Push' | 'Pull' | 'Legs' | 'Rest';

interface PlanProps {
  customPlan: CustomPlan;
  onUpdatePlan: (plan: CustomPlan) => void;
}

export default function Plan({ customPlan, onUpdatePlan }: PlanProps) {
  const [activeTab, setActiveTab] = useState<TabType>('Push');
  const [selectedExercise, setSelectedExercise] = useState<{name: string, data: Exercise | null} | null>(null);
  const [isEditingPlan, setIsEditingPlan] = useState(false);

  // Local state for editing to avoid changing the main state until saved
  const [editingItems, setEditingItems] = useState<PlanItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemSets, setNewItemSets] = useState('4组 x 8-12次');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Sync when entering edit mode
  const enterEditMode = () => {
    setEditingItems([...customPlan[activeTab]]);
    setIsAddingNew(false);
    setIsEditingPlan(true);
  };

  const saveEditMode = () => {
    const newPlan = { ...customPlan };
    newPlan[activeTab] = editingItems;
    onUpdatePlan(newPlan);
    setIsEditingPlan(false);
  };

  const handleRemoveExercise = (index: number) => {
    const newItems = [...editingItems];
    newItems.splice(index, 1);
    setEditingItems(newItems);
  };

  const handleUpdateItem = (index: number, field: 'name'|'sets', value: string) => {
    const newItems = [...editingItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setEditingItems(newItems);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newItems = [...editingItems];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setEditingItems(newItems);
    } else if (direction === 'down' && index < editingItems.length - 1) {
      const newItems = [...editingItems];
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
      setEditingItems(newItems);
    }
  };

  const commitNewItem = () => {
    if (newItemName.trim()) {
      setEditingItems([...editingItems, { name: newItemName.trim(), sets: newItemSets }]);
      setNewItemName('');
      setNewItemSets('4组 x 8-12次');
      setIsAddingNew(false);
    }
  };

  // Provide a function to change tab that cancels edit mode
  const handleTabChange = (tab: TabType) => {
    if (isEditingPlan) {
      if (!window.confirm("编辑未保存，确定要放弃修改切换面板吗？")) return;
      setIsEditingPlan(false);
    }
    setActiveTab(tab);
  };

  const currentExercises = isEditingPlan ? editingItems : (customPlan[activeTab] || []);

  const getTypeLabel = (type: TabType) => {
    switch(type) {
      case 'Push': return '推胸日 (Push)';
      case 'Pull': return '拉背日 (Pull)';
      case 'Legs': return '练腿日 (Legs)';
      case 'Rest': return '休息日 (Rest)';
    }
  };

  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row items-baseline justify-between border-b-4 border-slate-300 pb-4 relative">
        <div className="absolute bottom-0 right-0 w-32 h-4 hazard-stripes"></div>
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-2 flex items-center">
             自定义训练计划
          </h2>
          <p className="text-slate-500 font-bold tracking-widest text-sm">你可以随时修改、调整顺序或删除专属你的抗阻动作库。</p>
        </div>
      </div>

      <div className="mech-panel p-2 bg-white cut-corner-diag">
        {/* Decorations */}
        <div className="absolute top-2 right-6 font-mono text-[10px] text-slate-400 font-bold hidden sm:block">CFG-MODULE</div>
        
        {/* Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 p-2 relative z-20 border-b-2 border-slate-100">
          {(['Push', 'Pull', 'Legs', 'Rest'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => handleTabChange(tab)} 
              className={`py-4 px-2 text-center transition-all border-2 text-sm md:text-base font-black cut-corner-sm ${
                activeTab === tab 
                ? 'border-blue-600 bg-blue-600 text-white shadow-[4px_4px_0px_#93c5fd]' 
                : 'border-slate-300 bg-slate-50 text-slate-500 hover:border-slate-400 hover:-translate-y-0.5 shadow-[2px_2px_0px_#cbd5e1]'
              }`}
            >
              <span className="block text-[10px] opacity-60 mb-0.5 font-mono">TYPE-{tab.charAt(0)}</span>
              {getTypeLabel(tab)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8 bg-slate-50 border-2 border-slate-200 min-h-[350px] relative">
          
          <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-slate-200">
             <div className="flex items-center text-slate-800 font-black text-lg">
                <Settings className="mr-2 text-blue-600" size={20}/> 
                动作清单列表
             </div>
            {activeTab !== 'Rest' && (
              isEditingPlan ? (
                <button 
                  onClick={saveEditMode}
                  className="flex items-center text-sm font-black px-4 py-2 border-2 transition-colors border-green-600 bg-green-600 text-white hover:bg-green-700 shadow-[2px_2px_0px_#86efac] cut-corner-sm"
                >
                  <Save size={16} className="mr-2" /> 保存配置
                </button>
              ) : (
                <button 
                  onClick={enterEditMode}
                  className="flex items-center text-sm font-black px-4 py-2 border-2 transition-colors bg-white border-slate-800 hover:bg-slate-100 shadow-[2px_2px_0px_#cbd5e1] text-slate-800 cut-corner-sm"
                >
                  <Edit2 size={16} className="mr-2" /> 修改计划
                </button>
              )
            )}
          </div>

          {activeTab === 'Rest' ? (
            <div className="text-center py-16 px-4 bg-white border-2 border-dashed border-slate-300 cut-corner-br">
              <div className="text-slate-400 font-black text-3xl tracking-widest mb-4">REST DAY</div>
              <div className="w-16 h-1 bg-slate-300 mx-auto mb-4"></div>
              <p className="text-slate-500 font-bold max-w-md mx-auto leading-relaxed">
                休息日无需安排训练动作。让肌肉得到充分的恢复与生长才是进步的关键。
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentExercises.length === 0 && !isAddingNew && (
                <div className="text-center py-12 text-slate-400 font-bold border-2 border-dashed border-slate-300 bg-white">目前计划为空，请点击上方“修改计划”进行添加。</div>
              )}
              
              {currentExercises.map((item, idx) => {
                const isSystemKnown = !!exercisesDict[item.name];
                
                if (isEditingPlan) {
                  return (
                    <div key={idx} className="flex flex-col lg:flex-row gap-4 bg-white border-2 border-orange-300 p-4 shadow-[2px_2px_0px_#fdba74] relative cut-corner-sm">
                      
                      <div className="flex gap-2 items-center lg:flex-col lg:mr-2">
                        <button disabled={idx === 0} onClick={() => handleMove(idx, 'up')} className="p-1.5 bg-slate-100 border border-slate-300 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 transition-colors">
                          <ArrowUp size={16} />
                        </button>
                        <button disabled={idx === currentExercises.length - 1} onClick={() => handleMove(idx, 'down')} className="p-1.5 bg-slate-100 border border-slate-300 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 transition-colors">
                          <ArrowDown size={16} />
                        </button>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">动作名称</label>
                          <input 
                            type="text" 
                            value={item.name}
                            onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-300 p-2 text-slate-800 font-black text-lg focus:outline-none focus:border-orange-500 shadow-inner"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">目标组数/次数</label>
                          <input 
                            type="text" 
                            value={item.sets}
                            onChange={(e) => handleUpdateItem(idx, 'sets', e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-300 p-2 text-slate-600 font-bold text-sm focus:outline-none focus:border-orange-500 shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="flex items-end justify-end">
                        <button 
                          onClick={() => handleRemoveExercise(idx)}
                          className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white border-2 border-red-200 hover:border-red-600 transition-colors font-bold text-sm flex items-center cut-corner-sm"
                        >
                          <Trash2 size={16} className="mr-1" /> 删除
                        </button>
                      </div>
                    </div>
                  );
                }

                // Render Mode
                return (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-white border-2 border-slate-300 p-4 hover:border-blue-500 transition-colors shadow-[2px_2px_0px_#e2e8f0] relative group cut-corner-sm">
                    <div className="flex flex-col mb-3 md:mb-0">
                      <div className="flex items-center">
                        <div className="bg-slate-800 text-white font-black text-sm px-2 py-1 mr-4 border-2 border-slate-900 shadow-[2px_2px_0px_#cbd5e1]">
                          M-{idx + 1}
                        </div>
                        <h4 className="font-black text-slate-800 text-lg md:text-xl tracking-tight">{item.name}</h4>
                        {!isSystemKnown && <span className="ml-3 text-[10px] font-black text-orange-600 border-2 border-orange-500 px-2 py-0.5 bg-orange-50 hidden sm:inline-block">自定义扩展</span>}
                      </div>
                      <div className="flex items-center mt-3 ml-12">
                        <div className="flex items-center bg-slate-50 px-3 py-1.5 border border-slate-200">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-slate-500 font-bold text-sm">{item.sets}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end w-full md:w-auto">
                        <button 
                          onClick={() => setSelectedExercise({ name: item.name, data: exercisesDict[item.name] || null })}
                          disabled={!isSystemKnown}
                          className={`flex items-center font-black px-4 py-2.5 border-2 transition-colors shadow-sm cut-corner-sm ${
                            isSystemKnown 
                            ? 'mech-button-blue' 
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed hidden md:flex'
                          }`}
                        >
                          <Search size={16} className="mr-1.5" /> 动作详情与指导
                        </button>
                    </div>
                  </div>
                );
              })}

              {isEditingPlan && (
                <>
                  {isAddingNew ? (
                    <div className="bg-blue-50 border-2 border-dashed border-blue-400 p-4 relative cut-corner-sm mt-6">
                      <h4 className="text-blue-800 font-black mb-4 flex items-center border-b border-blue-200 pb-2">
                        <Plus size={18} className="mr-2" /> 配置新动作模块
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                         <div>
                            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">动作名称</label>
                            <input 
                              type="text" 
                              value={newItemName}
                              onChange={(e) => setNewItemName(e.target.value)}
                              placeholder="新动作名称"
                              className="w-full bg-white border-2 border-blue-300 p-2 text-slate-800 font-bold focus:outline-none focus:border-blue-600"
                            />
                         </div>
                         <div>
                            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">目标组数/次数</label>
                            <input 
                              type="text" 
                              value={newItemSets}
                              onChange={(e) => setNewItemSets(e.target.value)}
                              className="w-full bg-white border-2 border-blue-300 p-2 text-slate-800 font-bold focus:outline-none focus:border-blue-600"
                            />
                         </div>
                      </div>
                      <div className="flex gap-3 justify-end mt-2">
                         <button onClick={() => setIsAddingNew(false)} className="px-4 py-2 font-bold text-slate-500 hover:bg-slate-200 border-2 border-transparent transition-colors">取消</button>
                         <button onClick={commitNewItem} className="px-4 py-2 bg-blue-600 text-white border-2 border-blue-800 hover:bg-blue-700 font-black shadow-[2px_2px_0px_#1d4ed8] transition-colors cut-corner-sm">确认添加</button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsAddingNew(true)}
                      className="w-full flex items-center justify-center font-black text-blue-600 border-2 border-dashed border-blue-400 bg-blue-50/50 p-5 hover:bg-blue-100 hover:border-blue-600 transition-colors mt-6 shadow-sm cut-corner-sm"
                    >
                      <Plus size={24} className="mr-2" /> 配置新动作
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <ExerciseModal
        exercise={selectedExercise?.data || null}
        exerciseName={selectedExercise?.name || ''}
        onClose={() => setSelectedExercise(null)}
      />
    </section>
  );
}
