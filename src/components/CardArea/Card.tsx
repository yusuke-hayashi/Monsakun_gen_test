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
      className={`p-3 rounded-lg ${
        card.type === '存在文' ? 'bg-orange-100' : 'bg-orange-100'
      } shadow-md hover:shadow-lg transition-all select-none
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onClick={onClick}
      data-card-index={index}
      data-card-type={card.type}
    >
      <div className="card-content text-gray-800 mb-2">
        {card.text}
      </div>
      <div className={`inline-block px-2 py-1 rounded-full text-sm font-bold ${
        card.type === '存在文' 
          ? 'bg-orange-200 text-orange-800' 
          : 'bg-orange-200 text-orange-800'
      }`}>
        {card.type === '存在文' ? '📦 ' : '🔗 '}{card.type}
      </div>
    </div>
  );
};

export default Card;