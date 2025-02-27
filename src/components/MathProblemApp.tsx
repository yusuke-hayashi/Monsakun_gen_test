import React, { useState, useEffect, DragEvent } from 'react';
import CardArea from './CardArea/index.tsx';
import AnswerSpace from './AnswerSpace/index.tsx';
import ProblemSettings from './ProblemSettings/index.tsx';
import Feedback from './Feedback/index.tsx';
import HelpModal from './HelpModal/index.tsx';
import useProblemGenerator from '../hooks/useProblemGenerator.ts';
import { validateAnswer } from '../utils/validationUtils.ts';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-50 to-pink-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 楽しいヘッダー */}
        <div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl shadow-lg mb-6 overflow-hidden relative">
          <div className="absolute right-0 top-0 h-full w-1/4">
            <div className="absolute right-4 top-2">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
                <span className="text-4xl">🧮</span>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 relative z-10">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">モンサクン</h1>
            <p className="text-white text-lg">算数の文章題を作ろう！</p>
            
            <div className="absolute -bottom-10 -left-10 w-24 h-24 text-6xl transform rotate-12">
              ✏️
            </div>
          </div>
          
          <div className="flex justify-end p-2">
            <button 
              onClick={() => setShowHelpModal(true)}
              className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <span className="text-2xl">❓</span>
            </button>
          </div>
        </div>
        
        {/* 問題設定 */}
        <ProblemSettings 
          problemType={problemType}
          equation={equation}
          onProblemTypeChange={handleProblemTypeChange}
          onEquationChange={handleEquationChange}
          onGenerateProblem={handleGenerateProblem}
        />
        
        {/* カード表示エリア */}
        <CardArea
          cards={availableCards}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDropOnAvailable}
        />
        
        {/* 解答スペース */}
        <AnswerSpace 
          placedCards={placedCards}
          onDragOver={handleDragOver}
          onDrop={handleDropOnSlot}
          onDragStart={handleDragStart}
          onRemoveCard={handleRemoveCard}
          dragOverSlotIndex={dragOverSlotIndex}
          setDragOverSlotIndex={setDragOverSlotIndex}
        />
        
        {/* 回答チェックボタン */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={handleCheckAnswer}
            className="px-10 py-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-2xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all"
          >
            <div className="flex items-center">
              <span className="text-3xl mr-2">✅</span>
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