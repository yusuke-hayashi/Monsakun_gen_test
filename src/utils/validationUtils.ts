import { Card, ProblemType, ValidationError } from '../types';
import { extractItemsFromCards } from './cardUtils';

// 回答をチェックする関数
export const validateAnswer = (
  placedCards: (Card | null)[],
  problemType: ProblemType,
  equation: string,
  allItemsList: string[]
): { isValid: boolean; errorMessages: ValidationError[] } => {
  // すべてのスロットが埋まっているか確認
  if (placedCards.includes(null)) {
    return {
      isValid: false,
      errorMessages: ['すべてのスロットにカードを配置してください。']
    };
  }

  // 非nullのカードのみで作業するため型アサーション
  const cards = placedCards as Card[];
  
  // 抽出した数値
  const numbers = equation.match(/\d+/g)?.map(Number) || [];
  
  // エラーメッセージリスト
  const errorMessages: ValidationError[] = [];
  
  // もの（登場する種類）のチェック
  const items = extractItemsFromCards(cards, allItemsList);
  
  // 条件：あわせるはなし、くらべるはなしでは2種類のものが登場
  // 条件：ふえるはなし、へるはなしでは1種類のものが登場
  if ((problemType === 'あわせるはなし' || problemType === 'くらべるはなし') && items.size !== 2) {
    errorMessages.push('あわせるはなし、くらべるはなしでは2種類のものが登場する必要があります。');
  } else if ((problemType === 'ふえるはなし' || problemType === 'へるはなし') && items.size !== 1) {
    errorMessages.push('ふえるはなし、へるはなしでは1種類のものが登場する必要があります。');
  }
  
  // 文の構成チェック：カードのタイプで判定
  const existentialSentences = cards.filter(card => card.type === '存在文');
  const relationSentences = cards.filter(card => card.type === '関係文');
  
  if (existentialSentences.length !== 2 || relationSentences.length !== 1) {
    errorMessages.push('文構成：2つの存在文と1つの関係文が必要です。');
  }
  
  // 文の順序チェック（ふえるはなし、へるはなしの場合）
  if ((problemType === 'ふえるはなし' || problemType === 'へるはなし') && 
      existentialSentences.length === 2 && relationSentences.length === 1) {
    
    const first = cards[0];
    const second = cards[1];
    const third = cards[2];
    
    const correctOrder = 
      first.type === '存在文' && 
      second.type === '関係文' && 
      third.type === '存在文';
    
    if (!correctOrder) {
      errorMessages.push('文順序：ふえるはなし、へるはなしの場合は「存在文、関係文、存在文」の順序が必要です。');
    }
  }
  
  // 物語種類のチェック - 話の種類に合った関係文があるか
  let hasCorrectRelation = false;
  
  if (relationSentences.length === 1) {
    const relationText = relationSentences[0].text.toLowerCase();
    
    if (problemType === 'あわせるはなし' && relationText.includes('合わせる')) {
      hasCorrectRelation = true;
    } else if (problemType === 'くらべるはなし' && relationText.includes('より') && 
              (relationText.includes('多い') || relationText.includes('少ない'))) {
      hasCorrectRelation = true;
    } else if (problemType === 'ふえるはなし' && relationText.includes('増え')) {
      hasCorrectRelation = true;
    } else if (problemType === 'へるはなし' && relationText.includes('減り')) {
      hasCorrectRelation = true;
    }
  }
  
  if (!hasCorrectRelation) {
    errorMessages.push('物語種類：要求された話の種類と一致する関係文を使用する必要があります。');
  }
  
  // 式の整合性チェック - 選択されたカードに数式の数字が含まれているか
  const allSelectedText = cards.map(card => card.text).join(' ');
  const numberCheck = numbers.every(number => allSelectedText.includes(String(number)));
  
  if (!numberCheck && numbers.length > 0) {
    errorMessages.push('数字：提示された数式の数字がすべて含まれている必要があります。');
  }
  
  return {
    isValid: errorMessages.length === 0,
    errorMessages
  };
};
