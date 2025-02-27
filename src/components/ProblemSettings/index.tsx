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
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-4 border-blue-400">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">📝</span>
        <h2 className="text-2xl font-bold text-blue-600">もんだいの しゅるい</h2>
      </div>
      
      {showHelp && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-300">
          <h3 className="font-bold mb-2 text-yellow-800 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            算数文章題のルール：
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-block bg-yellow-200 rounded-full p-1 mr-2 text-xl">🍎</span>
              <span className="text-gray-700"><strong>もの：</strong> あわせるはなし、くらべるはなしでは2種類、ふえるはなし、へるはなしでは1種類のものが登場します。</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-yellow-200 rounded-full p-1 mr-2 text-xl">📏</span>
              <span className="text-gray-700"><strong>文構成：</strong> 2つの存在文(ものがいくつあるか)と1つの関係文(話の種類を決める文)が必要です。</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-yellow-200 rounded-full p-1 mr-2 text-xl">🔄</span>
              <span className="text-gray-700"><strong>文順序：</strong> ふえるはなし、へるはなしでは「存在文、関係文、存在文」の順序にする必要があります。</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-yellow-200 rounded-full p-1 mr-2 text-xl">📚</span>
              <span className="text-gray-700"><strong>物語種類：</strong> 指定された話の種類に合った関係文を使う必要があります。</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-yellow-200 rounded-full p-1 mr-2 text-xl">🔢</span>
              <span className="text-gray-700"><strong>数字：</strong> 式に含まれる数字をすべて使う必要があります。</span>
            </li>
          </ul>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-bold text-purple-600 text-lg">話の種類:</label>
          <div className="relative">
            <select 
              value={problemType} 
              onChange={(e) => onProblemTypeChange(e.target.value as ProblemType)}
              className="w-full p-3 bg-yellow-50 border-2 border-yellow-400 rounded-xl text-lg focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 appearance-none"
            >
              <option value="あわせるはなし">あわせるはなし</option>
              <option value="ふえるはなし">ふえるはなし</option>
              <option value="へるはなし">へるはなし</option>
              <option value="くらべるはなし">くらべるはなし</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block mb-2 font-bold text-purple-600 text-lg">数式:</label>
          <div className="relative">
            <input 
              type="text" 
              value={equation} 
              onChange={(e) => onEquationChange(e.target.value)}
              className="w-full p-3 bg-green-50 border-2 border-green-400 rounded-xl text-lg focus:ring-4 focus:ring-green-200 focus:border-green-500"
              placeholder="例: 5 + 3 = 8"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-2xl">🔢</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-end">
          <button 
            onClick={onGenerateProblem}
            className="w-full p-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xl font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-2">🎮</span>
              問題を作る！
            </div>
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="flex items-center px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl transition-colors"
          title="仕様の詳細を表示/非表示"
        >
          <span className="text-xl mr-1">💡</span>
          <span>{showHelp ? 'ヒントを隠す' : 'ヒントを見る'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProblemSettings;