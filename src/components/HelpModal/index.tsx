import React, { FC } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">モンサクンの使い方</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <section>
              <h3 className="text-xl font-semibold mb-2">基本的な操作方法</h3>
              <p>
                算数文章題を作成するためのカードをドラッグ＆ドロップで配置します。
                正しい文章題になるように、適切なカードを選んで並べましょう。
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">問題の種類</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>あわせるはなし</strong> - 2種類のもの（例：リンゴとミカン）の数を合わせる話</li>
                <li><strong>ふえるはなし</strong> - 1種類のもの（例：リンゴ）が増える話</li>
                <li><strong>へるはなし</strong> - 1種類のもの（例：リンゴ）が減る話</li>
                <li><strong>くらべるはなし</strong> - 2種類のもの（例：リンゴとミカン）の数を比べる話</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">文の種類</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>存在文</strong> - ものがいくつあるかを示す文（例：「リンゴが5個あります。」）</li>
                <li><strong>関係文</strong> - ものどうしの関係や変化を示す文（例：「リンゴとミカンを合わせると8個あります。」）</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">正解の条件</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>もの：</strong> あわせるはなし、くらべるはなしでは2種類、ふえるはなし、へるはなしでは1種類のものが登場する</li>
                <li><strong>数字：</strong> 要求として提示される数式に含まれている数字をすべて含む</li>
                <li><strong>文構成：</strong> 算数文章題は2つの存在文と1つの関係文で構成される</li>
                <li><strong>文順序：</strong> ふえるはなし、へるはなしの時のみ、存在文、関係文、存在文の順序でなければいけない</li>
                <li><strong>物語種類：</strong> 要求された話の種類と一致する関係文のみを利用している</li>
              </ul>
            </section>
          </div>
        </div>
        
        <div className="bg-gray-100 px-6 py-3 flex justify-end rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
