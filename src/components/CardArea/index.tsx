import React, { FC, DragEvent } from 'react';
import Card from './Card';
import { Card as CardType } from '../../types';

interface CardAreaProps {
  cards: CardType[];
  onDragStart: (e: DragEvent<HTMLDivElement>, card: CardType, index: number) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
}

const CardArea: FC<CardAreaProps> = ({ cards, onDragStart, onDragOver, onDrop }) => {
  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-semibold mb-2">カード</h2>
      <div 
        className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg min-h-16 border-2 border-dashed border-gray-300"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {cards.map((card, idx) => (
          <Card
            key={idx}
            card={card}
            index={idx}
            onDragStart={onDragStart}
          />
        ))}
        {cards.length === 0 && (
          <div className="w-full text-center text-gray-500 py-4">
            ここにカードをドロップして戻すことができます
          </div>
        )}
      </div>
    </div>
  );
};

export default CardArea;
