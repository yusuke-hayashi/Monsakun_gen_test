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
  dragOverSlotIndex?: number | null;
  setDragOverSlotIndex?: (index: number | null) => void;
}

const AnswerSlot: FC<AnswerSlotProps> = ({ 
  slotIndex, 
  card, 
  onDragOver, 
  onDrop, 
  onDragStart, 
  onRemove,
  dragOverSlotIndex,
  setDragOverSlotIndex
}) => {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    onDragOver(e);
    if (setDragOverSlotIndex) {
      setDragOverSlotIndex(slotIndex);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    onDrop(e, slotIndex);
    if (setDragOverSlotIndex) {
      setDragOverSlotIndex(null);
    }
  };

  const handleDragLeave = () => {
    if (setDragOverSlotIndex && dragOverSlotIndex === slotIndex) {
      setDragOverSlotIndex(null);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, cardData: CardType, index: number) => {
    onDragStart(e, cardData, index, true, slotIndex);
  };

  return (
    <div 
      className={`p-4 rounded-xl min-h-32 flex items-center justify-center
        ${dragOverSlotIndex === slotIndex && !card ? 'bg-yellow-100 border-yellow-400' : ''}
        ${card ? 'bg-white shadow-md border-2 border-gray-200' : `
          ${slotIndex % 3 === 0 ? 'bg-pink-50 border-2 border-dashed border-pink-300' : 
            slotIndex % 3 === 1 ? 'bg-purple-50 border-2 border-dashed border-purple-300' :
            'bg-blue-50 border-2 border-dashed border-blue-300'} 
          hover:bg-yellow-50`}
        transition-all duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
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
            className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full 
              flex items-center justify-center hover:bg-red-600 shadow-md transition-all transform hover:scale-110"
            title="カードを取り除く"
          >
            ✖️
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl mb-2">{slotIndex === 0 ? '1️⃣' : slotIndex === 1 ? '2️⃣' : '3️⃣'}</span>
          <span className="text-gray-500 text-center">ここにカードをドロップしてね！</span>
        </div>
      )}
    </div>
  );
};

export default AnswerSlot;