import React, { FC } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto border-4 border-yellow-400">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="text-4xl mr-3">📚</span>
              <h2 className="text-3xl font-bold text-purple-600">モンサクンの使い方</h2>
            </div>
            <button 
              onClick={onClose}
              className="bg-red-100 hover:bg-red-200 text-red-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-2xl">✖️</span>
            </button>
          </div>
          
          <div className="space-y-8">
            <section className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-2">🎮</span>
                <h3 className="text-2xl font-bold text-blue-600">基本的な操作方法</h3>
              </div>
              <p className="text-lg text-gray-700">
                算数文章題を作成するためのカードをドラッグ＆ドロップで配置します。
                正しい文章題になるように、適切なカードを選んで並べましょう。
              </p>
              <div className="mt-3 bg-white p-3 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <span className="text-3xl mr-2">👆</span>
                  <p className="text-blue-800">カードをドラッグして答えのところに置こう！</p>
                </div>
              </div>
            </section>
            
            <section className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-2">📝</span>
                <h3 className="text-2xl font-bold text-green-600">問題の種類</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-green-100">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 bg-blue-100 text-blue-800">
                    🧩 あわせるはなし
                  </span>
                  <p className="text-gray-700">2種類のもの（例：リンゴとミカン）の数を合わせる話</p>
                  <div className="mt-2 text-center text-2xl">🍎 + 🍊 = ?</div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-green-100">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 bg-green-100 text-green-800">
                    ⬆️ ふえるはなし
                  </span>
                  <p className="text-gray-700">1種類のもの（例：リンゴ）が増える話</p>
                  <div className="mt-2 text-center text-2xl">🍎 + 🍎🍎 = 🍎🍎🍎</div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-green-100">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 bg-red-100 text-red-800">
                    ⬇️ へるはなし
                  </span>
                  <p className="text-gray-700">1種類のもの（例：リンゴ）が減る話</p>
                  <div className="mt-2 text-center text-2xl">🍎🍎🍎 - 🍎 = 🍎🍎</div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-green-100">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 bg-purple-100 text-purple-800">
                    📊 くらべるはなし
                  </span>
                  <p className="text-gray-700">2種類のもの（例：リンゴとミカン）の数を比べる話</p>
                  <div className="mt-2 text-center text-2xl">🍎🍎🍎 ⟺ 🍊</div>
                </div>
              </div>
            </section>
            
            <section className="bg-pink-50 p-4 rounded-xl border-2 border-pink-200">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-2">📋</span>
                <h3 className="text-2xl font-bold text-pink-600">文の種類</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-pink-100">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 bg-green-100 text-green-800">
                    📦 存在文
                  </span>
                  <p className="text-gray-700">ものがいくつあるかを示す文</p>
                  <div className="mt-2 p-2 bg-green-50 rounded-lg text-center">
                    「リンゴが5個あります。」
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-pink-100">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-2 bg-blue-100 text-blue-800">
                    🔗 関係文
                  </span>
                  <p className="text-gray-700">ものどうしの関係や変化を示す文</p>
                  <div className="mt-2 p-2 bg-blue-50 rounded-lg text-center">
                    「リンゴとミカンを合わせると8個あります。」
                  </div>
                </div>
              </div>
            </section>
            
            <section className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-2">🎯</span>
                <h3 className="text-2xl font-bold text-yellow-600">正解のルール</h3>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="inline-block text-2xl mr-2">🧩</span>
                    <span className="text-gray-700">
                      <strong>もの：</strong> あわせるはなし、くらべるはなしでは2種類、ふえるはなし、へるはなしでは1種類のものが登場する
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block text-2xl mr-2">🔢</span>
                    <span className="text-gray-700">
                      <strong>数字：</strong> 要求として提示される数式に含まれている数字をすべて含む
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block text-2xl mr-2">📋</span>
                    <span className="text-gray-700">
                      <strong>文構成：</strong> 算数文章題は2つの存在文と1つの関係文で構成される
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block text-2xl mr-2">🔄</span>
                    <span className="text-gray-700">
                      <strong>文順序：</strong> ふえるはなし、へるはなしの時のみ、存在文、関係文、存在文の順序でなければいけない
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block text-2xl mr-2">🎮</span>
                    <span className="text-gray-700">
                      <strong>物語種類：</strong> 要求された話の種類と一致する関係文のみを利用している
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-4 flex justify-end rounded-b-3xl">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-2">👍</span>
              わかった！
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;