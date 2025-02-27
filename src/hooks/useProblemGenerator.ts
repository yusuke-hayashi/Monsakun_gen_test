import { useState, useCallback } from 'react';
import { Card, ProblemType } from '../types';
import { getRandomItem, getItemsFromSameCategory, itemCategories } from '../utils/itemsData';
import { shuffleArray, extractNumbersFromEquation, analyzeEquation } from '../utils/cardUtils';

const useProblemGenerator = () => {
  const [availableCards, setAvailableCards] = useState<Card[]>([]);
  const [placedCards, setPlacedCards] = useState<(Card | null)[]>([null, null, null]);

  // 問題生成関数
  const generateProblem = useCallback((problemType: ProblemType, equation: string) => {
    // 問題の種類に応じて適切なカードを生成
    let problemCards: Card[] = [];
    
    // 数式から数値を抽出
    const numbers = extractNumbersFromEquation(equation);
    
    // 式を解析して演算子を特定
    const { hasPlus, hasMinus } = analyzeEquation(equation);
    
    // ランダムにアイテムを選択
    let items: string[];
    if (problemType === 'あわせるはなし' || problemType === 'くらべるはなし') {
      // 2種類のアイテムが必要な場合は同じカテゴリから選ぶ
      items = getItemsFromSameCategory(2);
    } else {
      // 1種類のアイテムが必要な場合
      items = [getRandomItem()];
    }
    
    // 問題の種類に基づいてカードを生成（文の種類を明示的に指定）
    if (problemType === 'あわせるはなし') {
      if (hasPlus) {
        // a + b = c の形式の場合
        problemCards = [
          { text: `${items[0]}が${numbers[0]}個あります。`, type: '存在文' },
          { text: `${items[1]}が${numbers[1]}個あります。`, type: '存在文' },
          { text: `${items[0]}と${items[1]}を合わせると${numbers[2]}個あります。`, type: '関係文' }
        ];
      } else if (hasMinus) {
        // c - a = b または c - b = a の形式の場合
        problemCards = [
          { text: `${items[0]}と${items[1]}を合わせると${numbers[0]}個あります。`, type: '関係文' },
          { text: `${items[0]}が${numbers[1]}個あります。`, type: '存在文' },
          { text: `${items[1]}が${numbers[2]}個あります。`, type: '存在文' }
        ];
      } else {
        // 演算子が特定できない場合はデフォルト（加算）
        problemCards = [
          { text: `${items[0]}が${numbers[0]}個あります。`, type: '存在文' },
          { text: `${items[1]}が${numbers[1]}個あります。`, type: '存在文' },
          { text: `${items[0]}と${items[1]}を合わせると${numbers[0] + numbers[1]}個あります。`, type: '関係文' }
        ];
      }
    } else if (problemType === 'くらべるはなし') {
      if (hasMinus) {
        // a - b = c の形式の場合
        problemCards = [
          { text: `${items[0]}が${numbers[0]}個あります。`, type: '存在文' },
          { text: `${items[1]}が${numbers[1]}個あります。`, type: '存在文' },
          { text: `${items[0]}は${items[1]}より${numbers[2]}個多いです。`, type: '関係文' }
        ];
      } else {
        // 演算子が特定できない場合はデフォルト
        problemCards = [
          { text: `${items[0]}が${numbers[0]}個あります。`, type: '存在文' },
          { text: `${items[1]}が${numbers[1]}個あります。`, type: '存在文' },
          { text: `${items[0]}は${items[1]}より${Math.abs(numbers[0] - numbers[1])}個多いです。`, type: '関係文' }
        ];
      }
    } else if (problemType === 'ふえるはなし') {
      if (hasPlus) {
        // a + b = c の形式の場合
        problemCards = [
          { text: `${items[0]}が${numbers[0]}個あります。`, type: '存在文' },
          { text: `${items[0]}が${numbers[1]}個増えました。`, type: '関係文' },
          { text: `${items[0]}は全部で${numbers[2]}個になりました。`, type: '存在文' }
        ];
      } else {
        // 演算子が特定できない場合はデフォルト
        problemCards = [
          { text: `${items[0]}が${numbers[0]}個あります。`, type: '存在文' },
          { text: `${items[0]}が${numbers[1]}個増えました。`, type: '関係文' },
          { text: `${items[0]}は全部で${numbers[0] + numbers[1]}個になりました。`, type: '存在文' }
        ];
      }
    } else if (problemType === 'へるはなし') {
      if (hasMinus) {
        // a - b = c の形式の場合
        problemCards = [
          { text: `${items[0]}が${numbers[0]}個あります。`, type: '存在文' },
          { text: `${items[0]}が${numbers[1]}個減りました。`, type: '関係文' },
          { text: `${items[0]}は全部で${numbers[2]}個になりました。`, type: '存在文' }
        ];
      } else {
        // 演算子が特定できない場合はデフォルト
        problemCards = [
          { text: `${items[0]}が${numbers[0]}個あります。`, type: '存在文' },
          { text: `${items[0]}が${numbers[1]}個減りました。`, type: '関係文' },
          { text: `${items[0]}は全部で${numbers[0] - numbers[1]}個になりました。`, type: '存在文' }
        ];
      }
    }
    
    // ダミー用の別のアイテムを取得（同じカテゴリから）
    const getDummyItemsFromSameCategory = () => {
      // 使われているアイテムのカテゴリを特定
      let itemCategory: string | null = null;
      for (const category of Object.keys(itemCategories)) {
        if (itemCategories[category].some(item => items.includes(item))) {
          itemCategory = category;
          break;
        }
      }
      
      if (!itemCategory) {
        // カテゴリが特定できない場合は新たにカテゴリを選ぶ
        const categories = Object.keys(itemCategories);
        itemCategory = categories[Math.floor(Math.random() * categories.length)];
      }
      
      // 同じカテゴリから使われていないアイテムを選択
      const categoryItems = itemCategories[itemCategory];
      const availableItems = categoryItems.filter(item => !items.includes(item));
      
      // 必要な数だけシャッフルして取得
      const shuffled = [...availableItems].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 2);
    };
    
    const dummyItems = getDummyItemsFromSameCategory();
    
    // ダミーのカードを生成（数式の数字を使用、負の数は避ける）
    const generateDummyCards = () => {
      // 各数字の絶対値を取得（負の数を避ける）
      const safeNumbers = numbers.map(num => Math.abs(num));
      
      // 合計値や差分値を追加の選択肢として用意
      const sum = safeNumbers[0] + safeNumbers[1];
      const diff = Math.abs(safeNumbers[0] - safeNumbers[1]);
      
      // バリエーションを増やすための追加の数値（最大値+3くらいまで）
      const maxNumber = Math.max(...safeNumbers);
      const additionalNumbers = [maxNumber + 1, maxNumber + 2, maxNumber + 3];
      
      // 使用可能な数値プール
      const numberPool = [...safeNumbers, sum, diff, ...additionalNumbers];
      
      return [
        { text: `${dummyItems[0]}が${numberPool[0 % numberPool.length]}個あります。`, type: '存在文' },
        { text: `${dummyItems[1]}が${numberPool[1 % numberPool.length]}個あります。`, type: '存在文' },
        { text: `${dummyItems[0]}は${dummyItems[1]}より${numberPool[2 % numberPool.length]}個少ないです。`, type: '関係文' }
      ];
    };
    
    const dummyCards = generateDummyCards();
    
    // 全カードを結合してシャッフル
    const allCards = shuffleArray([...problemCards, ...dummyCards]);
    
    // 状態を更新
    setAvailableCards(allCards);
    setPlacedCards([null, null, null]);
    
    return allCards;
  }, []);
  
  // カードの配置更新
  const updatePlacedCards = useCallback((newPlacedCards: (Card | null)[]) => {
    setPlacedCards(newPlacedCards);
  }, []);

  // すべてのアイテムリストを取得（バリデーション用）
  const getAllItems = useCallback((): string[] => {
    return Object.values(itemCategories).flat();
  }, []);

  return {
    availableCards,
    placedCards,
    generateProblem,
    updatePlacedCards,
    getAllItems
  };
};

export default useProblemGenerator;
