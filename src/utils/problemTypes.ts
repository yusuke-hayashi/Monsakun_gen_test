import { ProblemType } from '../types';

/**
 * 問題タイプの定義
 */
export const PROBLEM_TYPES: ProblemType[] = [
  'あわせるはなし',
  'ふえるはなし',
  'へるはなし',
  'くらべるはなし'
];

/**
 * 問題タイプに関する詳細情報
 */
interface ProblemTypeInfo {
  type: ProblemType;
  description: string;
  example: string;
  relationSentenceKeywords: string[];
  requiredItemCount: number;
  requiredOrderCheck: boolean;
}

/**
 * 各問題タイプの詳細定義
 */
export const PROBLEM_TYPE_INFO: Record<ProblemType, ProblemTypeInfo> = {
  'あわせるはなし': {
    type: 'あわせるはなし',
    description: '2種類のものの数を合わせる話',
    example: 'リンゴが5個、ミカンが3個あります。合わせると何個でしょう？',
    relationSentenceKeywords: ['合わせる', '合わせると'],
    requiredItemCount: 2,
    requiredOrderCheck: false
  },
  'ふえるはなし': {
    type: 'ふえるはなし',
    description: '1種類のものが増える話',
    example: 'リンゴが5個あります。3個増えると何個でしょう？',
    relationSentenceKeywords: ['増え', '増加'],
    requiredItemCount: 1,
    requiredOrderCheck: true
  },
  'へるはなし': {
    type: 'へるはなし',
    description: '1種類のものが減る話',
    example: 'リンゴが8個あります。3個減ると何個でしょう？',
    relationSentenceKeywords: ['減', '減少'],
    requiredItemCount: 1,
    requiredOrderCheck: true
  },
  'くらべるはなし': {
    type: 'くらべるはなし',
    description: '2種類のものの数を比べる話',
    example: 'リンゴが8個、ミカンが5個あります。リンゴはミカンより何個多いでしょう？',
    relationSentenceKeywords: ['より', '多い', '少ない', '差'],
    requiredItemCount: 2,
    requiredOrderCheck: false
  }
};

/**
 * 問題タイプに必要なアイテム数を取得する関数
 */
export const getRequiredItemCount = (type: ProblemType): number => {
  return PROBLEM_TYPE_INFO[type].requiredItemCount;
};

/**
 * 問題タイプに順序チェックが必要かどうかを取得する関数
 */
export const isOrderCheckRequired = (type: ProblemType): boolean => {
  return PROBLEM_TYPE_INFO[type].requiredOrderCheck;
};

/**
 * 関係文が問題タイプに合致しているかをチェックする関数
 */
export const matchesRelationSentence = (type: ProblemType, text: string): boolean => {
  const keywords = PROBLEM_TYPE_INFO[type].relationSentenceKeywords;
  return keywords.some(keyword => text.toLowerCase().includes(keyword));
};

/**
 * 問題タイプの説明を取得する関数
 */
export const getProblemTypeDescription = (type: ProblemType): string => {
  return PROBLEM_TYPE_INFO[type].description;
};

/**
 * 問題タイプの例文を取得する関数
 */
export const getProblemTypeExample = (type: ProblemType): string => {
  return PROBLEM_TYPE_INFO[type].example;
};
