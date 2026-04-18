export interface Exercise {
  english: string;
  target: string;
  machineDesc: string;
  steps: string[];
  safety: string;
}

export const exercisesDict: Record<string, Exercise> = {
  "坐姿器械上斜推胸": { english: "Incline Machine Chest Press", target: "胸肌上部", machineDesc: "固定轨道上斜推胸机。调整座位使把手齐平上胸。", steps: ["背部贴紧靠背，挺胸沉肩。","呼气向前上方推起，手肘不锁死。","控制重量缓慢退回（3秒）。"], safety: "严禁大圆肩或含胸推举。" },
  "哑铃/杠铃平板卧推": { english: "Flat Dumbbell/Barbell Bench Press", target: "胸肌中部", machineDesc: "平板卧推椅。", steps: ["平躺在椅子上，双脚踩实地面。","肩胛骨收紧，背部自然微弓。","呼气推起，吸气控制下放至胸口。"], safety: "必须有保护者或在保护架内进行杠铃卧推，哑铃下放不用过深以免伤肩。" },
  "蝴蝶机夹胸": { english: "Pec Deck Fly", target: "胸部中缝", machineDesc: "夹胸器械，手臂高度齐平胸部。", steps: ["想象手肘发力向中间合拢。","顶峰停顿挤压。","控制张开，感受拉伸。"], safety: "背部贴紧，严禁含胸发力。" },
  "坐姿器械推肩": { english: "Seated Machine Shoulder Press", target: "前/中三角肌", machineDesc: "固定轨道推肩机。调节座椅高度使把手齐平肩膀。", steps: ["背部和臀部紧贴靠背。","双手握把，呼气向上推起，手肘微屈不锁死。","吸气控制下放至起始位置。"], safety: "腰背贴死靠背，禁止腰部离开靠背代偿。" },
  "器械侧平举": { english: "Machine Lateral Raise", target: "中三角肌", machineDesc: "固定轨道的侧平举器械。坐在座椅上，手肘或小臂顶住发力垫。", steps: ["挺胸收腹，背部贴紧靠背。","用肩膀侧面的力量，带动手肘向两侧顶起，直到大臂与地面平行。","控制重量缓慢放下，感受肌肉拉伸。"], safety: "固定器械完美限制了身体的晃动，彻底杜绝了借腰部甩重量的隐患，实现腰椎零压力。" },
  "绳索下压": { english: "Cable Tricep Pushdown", target: "肱三头肌", machineDesc: "龙门架高位绳索或短杆。", steps: ["手肘死死贴住体侧肋骨。","呼气向下压到底。","吸气慢慢抬起小臂。"], safety: "收紧核心，手肘严禁前后移动。" },
  "高位下拉": { english: "Lat Pulldown", target: "背阔肌宽度", machineDesc: "压腿垫卡紧大腿。", steps: ["身体微后倾锁定。","用手肘向腰部砸的力量下拉。","控制放回。"], safety: "禁止拉动时前后摇晃借力。" },
  "胸部支撑器械划船": { english: "Chest-Supported Machine Row", target: "背部厚度", machineDesc: "胸垫划船机。", steps: ["胸口死压垫子。","向后拉动把手，夹紧肩胛骨。","控制放回。"], safety: "胸口全程不离垫，保持挺胸。" },
  "直臂下拉": { english: "Straight-Arm Pulldown", target: "背阔肌下部", machineDesc: "龙门架高位直杆。", steps: ["手臂伸直锁定。","利用背部力量下压至大腿前。","控制回升。"], safety: "核心收紧，严禁弯曲腰椎代偿下压。" },
  "反向蝴蝶机": { english: "Reverse Pec Deck Fly", target: "后三角肌", machineDesc: "反向使用夹胸机，胸口顶靠背。", steps: ["向后方水平展开双臂。","感受肩膀后侧收缩。","控制放回。"], safety: "胸口贴紧靠背。" },
  "哑铃弯举": { english: "Dumbbell Bicep Curl", target: "肱二头肌", machineDesc: "双手持哑铃。", steps: ["大臂贴体侧不动。","向上弯曲举起。","缓慢放下。"], safety: "禁止甩腰借力。" },
  "哑铃箭步蹲": { english: "Dumbbell Split Squat", target: "大腿整体 / 臀部", machineDesc: "双手持轻哑铃，寻空地进行。", steps: ["双脚前后宽距站立，后脚跟抬起。","保持上半身绝对直立，笔直向下沉至后膝轻触地。","前脚掌发力，笔直向上站起。双脚不移动。"], safety: "上半身不可前倾后仰，保持躯干像柱子一样直上直下，确保腰椎零压力。" },
  "坐姿腿屈伸": { english: "Seated Leg Extension", target: "股四头肌", machineDesc: "膝盖对准机器转轴。", steps: ["向上踢起至几乎伸直。","缓慢放下重量（3秒）。"], safety: "背靠贴紧，勿用极大重量。" },
  "坐姿腿弯举": { english: "Seated Leg Curl", target: "腘绳肌", machineDesc: "大腿上方压垫压紧。", steps: ["向下/向后压到底。","缓慢放回。"], safety: "靠背贴紧，大腿压实。" },
  "哑铃小腿提踵": { english: "Dumbbell Calf Raise", target: "小腿", machineDesc: "手持哑铃，前脚掌踩台阶边缘。", steps: ["双腿伸直，尽力垫高脚尖。","缓慢降下脚尖至感受到拉伸。"], safety: "保持躯干中立。" },
  "平板支撑": { english: "Plank", target: "核心稳定群", machineDesc: "一张瑜伽垫。", steps: ["手肘和脚尖撑地，身体呈一条直线。","核心死死收紧，想象有人要一拳打在你的肚子上。","维持动作直到目标时间（如1分钟）。"], safety: "腰椎绝对不能塌下去！如果感觉到腰酸而不是肚子酸，说明动作变形或核心没力了，必须立刻停止休息。" }
};

import { CustomPlan } from '../types';

export const defaultPlanStructure: CustomPlan = {
  Push: [
    { name: '坐姿器械上斜推胸', sets: '4组 x 8-12次' },
    { name: '哑铃/杠铃平板卧推', sets: '4组 x 8-12次' },
    { name: '蝴蝶机夹胸', sets: '4组 x 12-15次' },
    { name: '坐姿器械推肩', sets: '4组 x 8-12次' },
    { name: '器械侧平举', sets: '4组 x 12-15次' },
    { name: '绳索下压', sets: '4组 x 10-15次' },
    { name: '平板支撑', sets: '3组 x 60秒' }
  ],
  Pull: [
    { name: '高位下拉', sets: '4组 x 8-12次' },
    { name: '胸部支撑器械划船', sets: '4组 x 8-12次' },
    { name: '直臂下拉', sets: '4组 x 12-15次' },
    { name: '反向蝴蝶机', sets: '4组 x 12-15次' },
    { name: '哑铃弯举', sets: '4组 x 10-15次' },
    { name: '平板支撑', sets: '3组 x 60秒' }
  ],
  Legs: [
    { name: '哑铃箭步蹲', sets: '4组 x 8-10次/腿' },
    { name: '坐姿腿屈伸', sets: '4组 x 12-15次' },
    { name: '坐姿腿弯举', sets: '4组 x 10-15次' },
    { name: '哑铃小腿提踵', sets: '4组 x 15-20次' },
    { name: '平板支撑', sets: '3组 x 60秒' }
  ],
  Rest: []
};
