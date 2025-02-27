import React, { FC } from 'react';
import { ValidationError } from '../../types/index.ts';

interface FeedbackProps {
  feedback: string;
  isCorrect: boolean | null;
  errorMessages?: ValidationError[];
}

const Feedback: FC<FeedbackProps> = ({ feedback, isCorrect, errorMessages = [] }) => {
  if (!feedback) return null;

  return (
    <div className={`p-6 rounded-2xl shadow-lg mb-6 ${
      isCorrect 
        ? 'bg-gradient-to-r from-green-50 to-green-100 border-l-8 border-green-500' 
        : 'bg-gradient-to-r from-red-50 to-red-100 border-l-8 border-red-500'
    } transition-all`}>
      <div className="flex items-center mb-4">
        <div className={`${
          isCorrect ? 'bg-green-500' : 'bg-red-500'
        } text-white rounded-full p-2 mr-3`}>
          {isCorrect ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
          {feedback}
        </h2>
      </div>
      
      {isCorrect ? (
        <div className="ml-14">
          <p className="text-green-800 text-lg">とても素晴らしい文章題ができました！</p>
          <div className="flex mt-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-3xl">⭐</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="ml-14">
          <p className="text-red-800 text-lg mb-4">もう一度チャレンジしてみよう！</p>
          
          {errorMessages.length > 0 && (
            <ul className="space-y-3 bg-white bg-opacity-50 p-4 rounded-xl">
              {errorMessages.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block text-xl mr-2">❌</span>
                  <span className="text-red-700">{error}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 text-3xl">
            <span className="mr-2">💪</span>
            <span className="mr-2">🧠</span>
            <span className="mr-2">👍</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;