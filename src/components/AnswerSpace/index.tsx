import React, { FC, DragEvent } from 'react';
import AnswerSlot from './AnswerSlot';
import { Card as CardType } from '../../types';

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
}

const AnswerSpace: FC<AnswerSpaceProps> = ({ 
  placedCards, 
  onDragOver, 
  onDrop, 
  onDragStart, 
  onRemoveCard 
}) => {
  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-semibold mb-2">解答スペース</h2>
      <div className="flex flex-col md:flex-row gap-4">
        {placedCards.map((card, idx) => (
          <AnswerSlot 
            key={idx}
            slotIndex={idx}
            card={card}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onRemove={onRemoveCard}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswerSpace;
