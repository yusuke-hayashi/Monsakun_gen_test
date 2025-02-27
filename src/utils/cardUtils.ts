import { Card } from '../types';

// カードをシャッフルする関数
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// 数式から数値を抽出する関数
export const extractNumbersFromEquation = (equation: string): number[] => {
  return equation.match(/\d+/g)?.map(Number) || [5, 3, 8];
};

// 式を解析して演算子を特定する関数
export const analyzeEquation = (equation: string): { hasPlus: boolean; hasMinus: boolean } => {
  return {
    hasPlus: equation.includes('+'),
    hasMinus: equation.includes('-')
  };
};

// アイテム名の抽出を行う関数
export const extractItemsFromCards = (cards: (Card | null)[], itemList: string[]): Set<string> => {
  const items = new Set<string>();
  
  cards.forEach(card => {
    if (!card) return;
    
    const itemText = card.text;
    itemList.forEach(item => {
      if (itemText.includes(item)) {
        items.add(item);
      }
    });
  });
  
  return items;
};
