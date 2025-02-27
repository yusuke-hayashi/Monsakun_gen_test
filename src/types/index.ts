// 問題の種類
export type ProblemType = 'あわせるはなし' | 'ふえるはなし' | 'へるはなし' | 'くらべるはなし';

// 文の種類
export type SentenceType = '存在文' | '関係文';

// カードオブジェクト
export interface Card {
  text: string;
  type: SentenceType;
}

// バリデーションエラーメッセージ
export type ValidationError = string;

// アイテムカテゴリーマップ
export interface ItemCategories {
  [category: string]: string[];
}
