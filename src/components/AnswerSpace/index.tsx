import React, { FC, DragEvent } from 'react';
import AnswerSlot from './AnswerSlot.tsx';
import { Card as CardType } from '../../types/index.ts';

interface AnswerSpaceProps {
  placedCards: (CardType | null)[];
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>, slotIndex: number) => void;
  onDragStart: (
    e: DragEvent<HTMLDivElement>, 
    card: CardType, 
    index: number, 
    isPlaced: boolean, 
    slotIndex: number
  ) => void;
  onRemoveCard: (slotIndex: number) => void;
  dragOverSlotIndex?: number | null;
  setDragOverSlotIndex?: (index: number | null) => void;
}

const AnswerSpace: FC<AnswerSpaceProps> = ({ 
  placedCards, 
  onDragOver, 
  onDrop, 
  onDragStart, 
  onRemoveCard,
  dragOverSlotIndex,
  setDragOverSlotIndex
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-4 border-red-400">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">🧩</span>
        <h2 className="text-2xl font-bold text-red-600">答えを作ろう！</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {placedCards.map((card, idx) => (
          <AnswerSlot 
            key={idx}
            slotIndex={idx}
            card={card}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onRemove={onRemoveCard}
            dragOverSlotIndex={dragOverSlotIndex}
            setDragOverSlotIndex={setDragOverSlotIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswerSpace;