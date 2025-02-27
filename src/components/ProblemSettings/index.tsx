import React, { FC, useState } from 'react';
import { ProblemType } from '../../types/index.ts';

interface ProblemSettingsProps {
  problemType: ProblemType;
  equation: string;
  onProblemTypeChange: (type: ProblemType) => void;
  onEquationChange: (equation: string) => void;
  onGenerateProblem: () => void;
}

const ProblemSettings: FC<ProblemSettingsProps> = ({
  problemType,
  equation,
  onProblemTypeChange,
  onEquationChange,
  onGenerateProblem
}) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="w-full mb-6 p-4 bg-gray-100 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">要求仕様</h2>
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="p-1 text-blue-500 hover:text-blue-700 focus:outline-none"
          title="仕様の詳細を表示/非表示"
        >
          <span className="text-lg">?</span>
        </button>
      </div>
      
      {showHelp && (
        <div className="mb-4 p-3 bg-white rounded border border-gray-300">
          <h3 className="font-medium mb-2">算数文章題のルール：</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li><strong>もの：</strong> あわせるはなし、くらべるはなしでは2種類、ふえるはなし、へるはなしでは1種類のものが登場します。</li>
            <li><strong>文構成：</strong> 2つの存在文(ものがいくつあるか)と1つの関係文(話の種類を決める文)が必要です。</li>
            <li><strong>文順序：</strong> ふえるはなし、へるはなしでは「存在文、関係文、存在文」の順序にする必要があります。</li>
            <li><strong>物語種類：</strong> 指定された話の種類に合った関係文を使う必要があります。</li>
            <li><strong>数字：</strong> 式に含まれる数字をすべて使う必要があります。</li>
          </ul>
        </div>
      )}
      
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-fit">
          <label className="block mb-1 font-medium">話の種類:</label>
          <select 
            value={problemType} 
            onChange={(e) => onProblemTypeChange(e.target.value as ProblemType)}
            className="w-full p-2 border rounded"
          >
            <option value="あわせるはなし">あわせるはなし</option>
            <option value="ふえるはなし">ふえるはなし</option>
            <option value="へるはなし">へるはなし</option>
            <option value="くらべるはなし">くらべるはなし</option>
          </select>
        </div>
        <div className="flex-1 min-w-fit">
          <label className="block mb-1 font-medium">数式:</label>
          <input 
            type="text" 
            value={equation} 
            onChange={(e) => onEquationChange(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="例: 5 + 3 = 8"
          />
        </div>
        <div className="flex items-end">
          <button 
            onClick={onGenerateProblem}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition shadow"
          >
            問題を生成
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemSettings;
