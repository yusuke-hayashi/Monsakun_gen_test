import React, { FC, DragEvent } from 'react';
import { Card as CardType } from '../../types/index.ts';
import Card from '../CardArea/Card.tsx';

interface AnswerSlotProps {
  slotIndex: number;
  card: CardType | null;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>, slotIndex: number) => void;
  onDragStart: (e: DragEvent<HTMLDivElement>, card: CardType, index: number, isPlaced: boolean, slotIndex: number) => void;
  onRemove: (slotIndex: number) => void;
}

const AnswerSlot: FC<AnswerSlotProps> = ({ 
  slotIndex, 
  card, 
  onDragOver, 
  onDrop, 
  onDragStart, 
  onRemove 
}) => {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    onDragOver(e);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    onDrop(e, slotIndex);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, cardData: CardType, index: number) => {
    onDragStart(e, cardData, index, true, slotIndex);
  };

  return (
    <div 
      className={`flex-1 p-4 border-2 rounded-lg min-h-24 flex items-center justify-center
        ${card ? 'border-gray-300' : 'border-dashed border-gray-300 hover:border-blue-300 hover:bg-blue-50'}
        transition-colors duration-200`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {card ? (
        <div className="relative w-full">
          <Card 
            card={card} 
            index={slotIndex}
            onDragStart={handleDragStart}
          />
          <button 
            onClick={() => onRemove(slotIndex)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
              flex items-center justify-center hover:bg-red-600 transition-colors"
            title="カードを取り除く"
          >
            ×
          </button>
        </div>
      ) : (
        <span className="text-gray-400">ここにカードをドロップ</span>
      )}
    </div>
  );
};

export default AnswerSlot;
