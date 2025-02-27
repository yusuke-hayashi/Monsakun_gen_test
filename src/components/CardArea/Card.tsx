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
      className={`card p-2 bg-white border rounded cursor-pointer transition-all select-none
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}
        ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onClick={onClick}
      data-card-index={index}
      data-card-type={card.type}
    >
      <div className="card-content">
        {card.text}
      </div>
      {/* カードタイプのバッジ（オプション - UIが複雑になりすぎないように隠してもよい） */}
      <div className={`text-xs mt-1 inline-block px-1 rounded 
        ${card.type === '存在文' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
        {card.type}
      </div>
    </div>
  );
};

export default Card;
