import React, { useState, useEffect, DragEvent } from 'react';
import CardArea from './CardArea';
import AnswerSpace from './AnswerSpace';
import ProblemSettings from './ProblemSettings';
import Feedback from './Feedback';
import HelpModal from './HelpModal';
import { Card, ProblemType } from '../types';
import useProblemGenerator from '../hooks/useProblemGenerator';
import { validateAnswer } from '../utils/validationUtils';

const MathProblemApp: React.FC = () => {
  // 問題設定
  const [problemType, setProblemType] = useState<ProblemType>('あわせるはなし');
  const [equation, setEquation] = useState('5 + 3 = 8');
  
  // ドラッグ状態
  const [draggingCard, setDraggingCard] = useState<Card | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [isDraggingFromPlaced, setIsDraggingFromPlaced] = useState(false);
  const [originSlot, setOriginSlot] = useState<number | null>(null);
  
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
      setFeedback('正解です！素晴らしい文章題ができました。');
    } else {
      setFeedback('不正解です。以下の問題を確認してください。');
    }
  };
  
  // コンポーネント初期化時に問題を生成
  useEffect(() => {
    handleGenerateProblem();
  }, []);
  
  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">算数文章題作成アプリケーション「モンサクン」</h1>
        <button
          onClick={() => setShowHelpModal(true)}
          className="text-blue-500 hover:text-blue-700"
          title="ヘルプを表示"
        >
          <span className="text-lg">ヘルプ</span>
        </button>
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
      />
      
      {/* 回答チェックボタン */}
      <button 
        onClick={handleCheckAnswer}
        className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition shadow mb-4"
      >
        答え合わせ
      </button>
      
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
  );
};

export default MathProblemApp;
