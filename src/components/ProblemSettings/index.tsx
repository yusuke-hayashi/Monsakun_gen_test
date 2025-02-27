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
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border-2 border-blue-400">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">📝</span>
        <h2 className="text-xl font-bold text-blue-600">もんだいの しゅるい</h2>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block mb-1 font-medium text-blue-700">話の種類:</label>
          {/* ドロップダウンセレクトボックス */}
          <select 
            value={problemType} 
            onChange={(e) => onProblemTypeChange(e.target.value as ProblemType)}
            className="w-full p-2 bg-yellow-50 border-2 border-yellow-300 rounded-lg focus:outline-none"
          >
            <option value="あわせるはなし">あわせるはなし</option>
            <option value="ふえるはなし">ふえるはなし</option>
            <option value="へるはなし">へるはなし</option>
            <option value="くらべるはなし">くらべるはなし</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1 font-medium text-blue-700">数式:</label>
          <input 
            type="text" 
            value={equation} 
            onChange={(e) => onEquationChange(e.target.value)}
            className="w-full p-2 bg-green-50 border-2 border-green-300 rounded-lg focus:outline-none"
            placeholder="例: 5 + 3 = 8"
          />
        </div>
        
        <button 
          onClick={onGenerateProblem}
          className="w-full p-3 bg-purple-500 hover:bg-purple-600 text-white text-lg font-bold rounded-lg shadow-md transition-colors"
        >
          問題を作る！
        </button>
      </div>
      
      {showHelp && (
        <div className="mt-3 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-300">
          <h3 className="font-bold mb-2">算数文章題のルール</h3>
          <ul className="space-y-2 text-sm">
            <li>あわせるはなし、くらべるはなしでは2種類、ふえるはなし、へるはなしでは1種類のものが登場</li>
            <li>2つの存在文と1つの関係文が必要</li>
          </ul>
        </div>
      )}
      
      <div className="mt-3 flex justify-end">
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm"
        >
          {showHelp ? 'ヒントを隠す' : 'ヒントを見る'}
        </button>
      </div>
    </div>
  );
};

export default ProblemSettings;