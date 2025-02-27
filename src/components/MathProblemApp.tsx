import React, { useState, useEffect, DragEvent } from 'react';
import CardArea from './CardArea/index.tsx';
import AnswerSpace from './AnswerSpace/index.tsx';
import ProblemSettings from './ProblemSettings/index.tsx';
import Feedback from './Feedback/index.tsx';
import HelpModal from './HelpModal/index.tsx';
import useProblemGenerator from '../hooks/useProblemGenerator.ts';
import { validateAnswer } from '../utils/validationUtils.ts';
import { ProblemType, Card } from '../types/index.ts';

const MathProblemApp: React.FC = () => {
  // 問題設定
  const [problemType, setProblemType] = useState<ProblemType>('あわせるはなし');
  const [equation, setEquation] = useState('5 + 3 = 8');
  
  // ドラッグ状態
  const [draggingCard, setDraggingCard] = useState<Card | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [isDraggingFromPlaced, setIsDraggingFromPlaced] = useState(false);
  const [originSlot, setOriginSlot] = useState<number | null>(null);
  const [dragOverSlotIndex, setDragOverSlotIndex] = useState<number | null>(null);
  
  // フィードバック状態
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  
  // ヘルプモーダル状態
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  // 問題生成カスタムフック
  const { 
    availableCards, 
    placedCards, 
    generateProblem, 
    updatePlacedCards,
    getAllItems
  } = useProblemGenerator();

  // 問題設定の変更ハンドラー
  const handleProblemTypeChange = (type: ProblemType) => {
    setProblemType(type);
  };

  const handleEquationChange = (eq: string) => {
    setEquation(eq);
  };

  // 問題生成ハンドラー
  const handleGenerateProblem = () => {
    generateProblem(problemType, equation);
    setFeedback('');
    setIsCorrect(null);
    setErrorMessages([]);
    setDraggingCard(null);
    setDraggingIndex(null);
    setIsDraggingFromPlaced(false);
    setOriginSlot(null);
  };

  // ドラッグ開始ハンドラー
  const handleDragStart = (
    e: DragEvent<HTMLDivElement>, 
    card: Card, 
    index: number, 
    isPlaced: boolean = false, 
    slotIndex: number | null = null
  ) => {
    e.dataTransfer.setData('application/json', JSON.stringify(card));
    
    // ドラッギング情報を設定
    setDraggingCard(card);
    setDraggingIndex(index);
    setIsDraggingFromPlaced(isPlaced);
    setOriginSlot(slotIndex);
    
    // ドラッグエフェクトをセット
    e.dataTransfer.effectAllowed = 'move';
  };
  
  // ドラッグオーバーハンドラー
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  // ドロップハンドラー（利用可能なカード領域）
  const handleDropOnAvailable = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (!isDraggingFromPlaced || draggingCard === null || originSlot === null) {
      return;
    }
    
    // カードをプレイスカードから削除
    const newPlacedCards = [...placedCards];
    newPlacedCards[originSlot] = null;
    updatePlacedCards(newPlacedCards);
    
    // ドラッグ状態をリセット
    resetDragState();
  };
  
  // ドロップハンドラー（スロット）
  const handleDropOnSlot = (e: DragEvent<HTMLDivElement>, slotIndex: number) => {
    e.preventDefault();
    
    if (draggingCard === null) {
      return;
    }
    
    const newPlacedCards = [...placedCards];
    
    // 同じスロットへのドロップなら何もしない
    if (isDraggingFromPlaced && originSlot === slotIndex) {
      return;
    }
    
    // カードを配置
    if (isDraggingFromPlaced && originSlot !== null) {
      // カードをスロット間で移動
      const temp = newPlacedCards[slotIndex];
      newPlacedCards[slotIndex] = draggingCard;
      newPlacedCards[originSlot] = temp;
    } else {
      // 利用可能なカードからスロットへ
      newPlacedCards[slotIndex] = draggingCard;
    }
    
    updatePlacedCards(newPlacedCards);
    
    // ドラッグ状態をリセット
    resetDragState();
    
    // フィードバックをリセット
    setFeedback('');
    setIsCorrect(null);
    setErrorMessages([]);
  };
  
  // スロットからカードを取り除く
  const handleRemoveCard = (slotIndex: number) => {
    const newPlacedCards = [...placedCards];
    newPlacedCards[slotIndex] = null;
    updatePlacedCards(newPlacedCards);
    
    // フィードバックをリセット
    setFeedback('');
    setIsCorrect(null);
    setErrorMessages([]);
  };

  // ドラッグ状態のリセット
  const resetDragState = () => {
    setDraggingCard(null);
    setDraggingIndex(null);
    setIsDraggingFromPlaced(false);
    setOriginSlot(null);
    setDragOverSlotIndex(null);
  };
  
  // 回答をチェックする関数
  const handleCheckAnswer = () => {
    // バリデーション実行
    const { isValid, errorMessages } = validateAnswer(
      placedCards, 
      problemType, 
      equation, 
      getAllItems()
    );
    
    // 結果を設定
    setIsCorrect(isValid);
    setErrorMessages(errorMessages);
    
    if (isValid) {
      setFeedback('すごい！せいかいだよ！');
    } else {
      setFeedback('ざんねん！もういちどチャレンジしてみよう！');
    }
  };
  
  // コンポーネント初期化時に問題を生成
  useEffect(() => {
    handleGenerateProblem();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー - 黄色からオレンジへのグラデーション */}
        <div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-xl shadow-lg mb-4 p-4 relative">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">モンサクン</h1>
              <p className="text-white">算数の文章題を作ろう！</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center shadow">
                <span className="text-2xl">🧮</span>
              </div>
              <button 
                onClick={() => setShowHelpModal(true)}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100"
              >
                <span className="text-3xl">❓</span>
              </button>
            </div>
          </div>
          <div className="absolute -bottom-3 -left-3 text-4xl transform rotate-12">
            ✏️
          </div>
        </div>
        
        {/* 問題設定エリア - 青い枠 */}
        <ProblemSettings 
          problemType={problemType}
          equation={equation}
          onProblemTypeChange={handleProblemTypeChange}
          onEquationChange={handleEquationChange}
          onGenerateProblem={handleGenerateProblem}
        />
        
        {/* カードエリア - 緑の枠 */}
        <div className="bg-white rounded-xl shadow-md mb-4 p-4 border-2 border-green-400">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🎴</span>
            <h2 className="text-xl font-bold text-green-600">カード</h2>
          </div>
          
          <div 
            className="bg-green-50 rounded-lg border-2 border-dashed border-green-300 p-2"
            onDragOver={handleDragOver}
            onDrop={handleDropOnAvailable}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-orange-100 rounded-lg p-3 shadow cursor-grab"
                  draggable
                  onDragStart={(e) => handleDragStart(e, card, idx)}
                >
                  <div className="text-gray-800 mb-2">{card.text}</div>
                  <div className="inline-block px-2 py-1 bg-orange-200 rounded-full text-sm font-bold text-orange-800">
                    {card.type === '存在文' ? '📦 ' : '🔗 '}{card.type}
                  </div>
                </div>
              ))}
              {availableCards.length === 0 && (
                <div className="col-span-full text-center py-4 text-gray-500">
                  カードをドロップして戻すことができるよ！
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 解答スペース - 赤の枠 */}
        <div className="bg-white rounded-xl shadow-md mb-4 p-4 border-2 border-red-400">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🧩</span>
            <h2 className="text-xl font-bold text-red-600">答えを作ろう！</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {placedCards.map((card, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-lg min-h-32 flex items-center justify-center
                  ${card ? 'bg-white shadow border border-gray-200' : 
                    idx % 3 === 0 ? 'bg-pink-50 border-2 border-dashed border-pink-300' : 
                    idx % 3 === 1 ? 'bg-purple-50 border-2 border-dashed border-purple-300' :
                    'bg-blue-50 border-2 border-dashed border-blue-300'}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropOnSlot(e, idx)}
              >
                {card ? (
                  <div className="relative w-full">
                    <div className="bg-orange-100 rounded-lg p-3 shadow">
                      <div className="text-gray-800 mb-2">{card.text}</div>
                      <div className="inline-block px-2 py-1 bg-orange-200 rounded-full text-sm font-bold text-orange-800">
                        {card.type === '存在文' ? '📦 ' : '🔗 '}{card.type}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveCard(idx)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                        flex items-center justify-center hover:bg-red-600 shadow"
                    >
                      ✖️
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl mb-1">{idx === 0 ? '1️⃣' : idx === 1 ? '2️⃣' : '3️⃣'}</span>
                    <span className="text-gray-500 text-center text-sm">ここにカードをドロップしてね！</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 回答チェックボタン */}
        <div className="flex justify-center mb-4">
          <button 
            onClick={handleCheckAnswer}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-lg shadow-md transition-colors"
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">✅</span>
              答え合わせをする
            </div>
          </button>
        </div>
        
        {/* フィードバック */}
        {feedback && (
          <Feedback 
            feedback={feedback}
            isCorrect={isCorrect}
            errorMessages={errorMessages}
          />
        )}
        
        {/* ヘルプモーダル */}
        <HelpModal 
          isOpen={showHelpModal} 
          onClose={() => setShowHelpModal(false)} 
        />
      </div>
    </div>
  );
};

export default MathProblemApp;