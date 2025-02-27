import React, { FC, DragEvent } from 'react';
import { Card as CardType } from '../../types/index.ts';

interface CardProps {
  card: CardType;
  index: number;
  isSelected?: boolean;
  isDraggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLDivElement>, card: CardType, index: number) => void;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ 
  card, 
  index, 
  isSelected = false, 
  isDraggable = true,
  onDragStart,
  onClick 
}) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (onDragStart && isDraggable) {
      onDragStart(e, card, index);
    }
  };

  return (
    <div 
      className={`p-4 rounded-xl ${
        card.type === '存在文' ? 'bg-orange-100 border-l-4 border-orange-500' : 'bg-blue-100 border-l-4 border-blue-500'
      } shadow-md hover:shadow-lg transition-all transform hover:scale-105 select-none
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
        ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onClick={onClick}
      data-card-index={index}
      data-card-type={card.type}
    >
      <div className="card-content font-medium text-gray-800 text-lg">
        {card.text}
      </div>
      <div className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-bold ${
        card.type === '存在文' 
          ? 'bg-orange-200 text-orange-800' 
          : 'bg-blue-200 text-blue-800'
      }`}>
        {card.type === '存在文' ? '📦 ' : '🔗 '}{card.type}
      </div>
    </div>
  );
};

export default Card;