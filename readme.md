# モンサクン - 算数文章題作成アプリケーション

モンサクンは、小学生向けの算数文章題作成学習アプリケーションです。ドラッグ＆ドロップのインターフェースを用いて、子どもたちが楽しく算数文章題の構成を学べるように設計されています。

## 機能

- 4種類の文章題タイプ（あわせるはなし、ふえるはなし、へるはなし、くらべるはなし）
- 直感的なドラッグ＆ドロップインターフェース
- 詳細なフィードバック機能
- レスポンシブデザイン

## 技術スタック

- React
- TypeScript
- TailwindCSS

## プロジェクト構造

```
src/
├── App.tsx                     # メインアプリケーションエントリーポイント
├── components/
│   ├── MathProblemApp.tsx      # メインアプリケーションコンポーネント
│   ├── CardArea/
│   │   ├── index.tsx           # カード表示エリアのメインコンポーネント
│   │   └── Card.tsx            # 個別のカードコンポーネント
│   ├── AnswerSpace/
│   │   ├── index.tsx           # 解答スペースのメインコンポーネント
│   │   └── AnswerSlot.tsx      # 個別のスロットコンポーネント
│   ├── ProblemSettings/
│   │   └── index.tsx           # 問題設定（話の種類、数式）コンポーネント
│   ├── Feedback/
│   │   └── index.tsx           # フィードバック表示コンポーネント
│   └── HelpModal/
│       └── index.tsx           # ヘルプ情報モーダルコンポーネント
├── hooks/
│   └── useProblemGenerator.ts  # 問題生成ロジックを扱うカスタムフック
├── utils/
│   ├── itemsData.ts            # アイテムカテゴリデータ
│   ├── cardUtils.ts            # カード操作のユーティリティ関数
│   └── validationUtils.ts      # 解答検証ロジック
└── types/
    └── index.ts                # 型定義
```

## 実行方法

### 開発環境のセットアップ

1. リポジトリをクローン
```bash
git clone https://github.com/your-username/monsakun.git
cd monsakun
```

2. 依存関係のインストール
```bash
npm install
# または
yarn install
```

3. 開発サーバーの起動
```bash
npm start
# または
yarn start
```

これで、アプリケーションが http://localhost:3000 で実行されます。

### ビルド方法

本番環境用のビルドを作成するには：

```bash
npm run build
# または
yarn build
```

ビルドされたファイルは `build` フォルダに出力されます。

## カスタマイズ

### アイテムカテゴリの追加

`utils/itemsData.ts` ファイルを編集して、新しいカテゴリやアイテムを追加できます：

```typescript
export const itemCategories: ItemCategories = {
  // 既存のカテゴリ
  食べ物: ['リンゴ', 'ミカン', ...],
  // 新しいカテゴリを追加
  スポーツ: ['サッカー', '野球', 'バスケットボール', 'テニス', ...],
};
```

### 問題タイプの追加

新しい問題タイプを追加するには、以下のファイルを更新する必要があります：

1. `types/index.ts` - 問題タイプの型定義を更新
2. `components/ProblemSettings/index.tsx` - 選択肢に新しいタイプを追加
3. `hooks/useProblemGenerator.ts` - 新しいタイプに対応する問題生成ロジックを追加
4. `utils/validationUtils.ts` - 新しいタイプに対応するバリデーションロジックを追加

## 今後の拡張予定

- 難易度レベルの導入
- 問題の保存と共有機能
- 学習進捗の追跡
- 模範解答の表示機能
- アニメーションの強化

## ライセンス

[MIT License](LICENSE)
