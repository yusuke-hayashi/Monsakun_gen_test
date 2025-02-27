import React, { FC, DragEvent } from 'react';
import Card from './Card.tsx';
import { Card as CardType } from '../../types/index.ts';

interface CardAreaProps {
  cards: CardType[];
  onDragStart: (e: DragEvent<HTMLDivElement>, card: CardType, index: number) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
}

const CardArea: FC<CardAreaProps> = ({ cards, onDragStart, onDragOver, onDrop }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-4 border-green-400">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">🎴</span>
        <h2 className="text-2xl font-bold text-green-600">カード</h2>
      </div>
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-green-50 rounded-xl border-2 border-dashed border-green-300"
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
          <div className="col-span-full text-center py-8">
            <span className="text-4xl block mb-3">🃏</span>
            <span className="text-gray-500 text-lg">ここにカードをドロップして戻すことができるよ！</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardArea;