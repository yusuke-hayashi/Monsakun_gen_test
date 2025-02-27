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
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border-2 border-red-400">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">🧩</span>
        <h2 className="text-xl font-bold text-red-600">答えを作ろう！</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {placedCards.map((card, idx) => (
          <div 
            key={idx}
            className={`p-3 rounded-lg min-h-32 flex items-center justify-center
              ${dragOverSlotIndex === idx && !card ? 'bg-yellow-100 border-yellow-400' : ''}
              ${card ? 'bg-white shadow border border-gray-200' : 
                idx % 3 === 0 ? 'bg-pink-50 border-2 border-dashed border-pink-300' : 
                idx % 3 === 1 ? 'bg-purple-50 border-2 border-dashed border-purple-300' :
                'bg-blue-50 border-2 border-dashed border-blue-300'}`}
            onDragOver={(e) => {
              onDragOver(e);
              if (setDragOverSlotIndex) {
                setDragOverSlotIndex(idx);
              }
            }}
            onDragLeave={() => {
              if (setDragOverSlotIndex && dragOverSlotIndex === idx) {
                setDragOverSlotIndex(null);
              }
            }}
            onDrop={(e) => {
              onDrop(e, idx);
              if (setDragOverSlotIndex) {
                setDragOverSlotIndex(null);
              }
            }}
          >
            {card ? (
              <div className="relative w-full">
                <div 
                  className="bg-orange-100 rounded-lg p-3 shadow cursor-grab"
                  draggable
                  onDragStart={(e) => onDragStart(e, card, idx, true, idx)}
                >
                  <div className="text-gray-800 mb-2">{card.text}</div>
                  <div className="inline-block px-2 py-1 bg-orange-200 rounded-full text-sm font-bold text-orange-800">
                    {card.type === '存在文' ? '📦 ' : '🔗 '}{card.type}
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveCard(idx)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                    flex items-center justify-center hover:bg-red-600 shadow"
                >
                  ✖️
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl mb-1">{idx === 0 ? '1️⃣' : idx === 1 ? '2️⃣' : '3️⃣'}</span>
                <span className="text-gray-500 text-center text-sm">ここにカードをドロップしてね！</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerSpace;