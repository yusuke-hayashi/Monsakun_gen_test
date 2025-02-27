import { ItemCategories } from '../types/index.ts';

// カテゴリ別のアイテムリスト
export const itemCategories: ItemCategories = {
  食べ物: ['リンゴ', 'ミカン', 'バナナ', 'ブドウ', 'イチゴ', 'メロン', 'スイカ', 'パイナップル'],
  動物: ['イヌ', 'ネコ', 'ウサギ', 'ハムスター', 'パンダ', 'コアラ', 'ペンギン', 'キリン'],
  文房具: ['鉛筆', 'ノート', '消しゴム', '定規', 'クレヨン', 'はさみ', 'のり', 'ふでばこ'],
  おもちゃ: ['ブロック', 'ぬいぐるみ', 'ボール', 'ロボット', '人形', 'トランプ', 'こま', 'ビー玉'],
  乗り物: ['自転車', '電車', 'バス', '車', '飛行機', '船', 'ヘリコプター', 'タクシー'],
  家具: ['椅子', '机', 'ベッド', '本棚', 'テーブル', 'ソファ', 'たんす', '照明'],
};

// ランダムなカテゴリからランダムなアイテムを取得する関数
export const getRandomItem = (excludeItems: string[] = []): string => {
  // カテゴリをランダムに選択
  const categories = Object.keys(itemCategories);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
  // 選択したカテゴリからアイテムをランダムに選択（除外リストにないもの）
  const categoryItems = itemCategories[randomCategory];
  const availableItems = categoryItems.filter(item => !excludeItems.includes(item));
  
  // 使用可能なアイテムが残っていない場合は別のカテゴリを試す
  if (availableItems.length === 0) {
    // 再帰的に別のカテゴリを試みる
    return getRandomItem(excludeItems);
  }
  
  return availableItems[Math.floor(Math.random() * availableItems.length)];
};

// 特定のカテゴリから複数の異なるアイテムを取得する関数
export const getItemsFromSameCategory = (count: number, excludeItems: string[] = []): string[] => {
  // カテゴリをランダムに選択
  const categories = Object.keys(itemCategories);
  
  // 十分なアイテム数を持つカテゴリのみをフィルタリング
  const validCategories = categories.filter(category => {
    const availableItems = itemCategories[category].filter(item => !excludeItems.includes(item));
    return availableItems.length >= count;
  });
  
  if (validCategories.length === 0) {
    // 要求を満たすカテゴリがない場合は、異なるカテゴリからアイテムを選択
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(getRandomItem([...excludeItems, ...result]));
    }
    return result;
  }
  
  const randomCategory = validCategories[Math.floor(Math.random() * validCategories.length)];
  
  // 選択したカテゴリから指定数のアイテムをランダムに選択
  const categoryItems = itemCategories[randomCategory];
  const availableItems = categoryItems.filter(item => !excludeItems.includes(item));
  
  // 必要な数だけシャッフルして取得
  const shuffled = [...availableItems].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
