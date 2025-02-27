import React, { FC } from 'react';
import { ValidationError } from '../../types';

interface FeedbackProps {
  feedback: string;
  isCorrect: boolean | null;
  errorMessages?: ValidationError[];
}

const Feedback: FC<FeedbackProps> = ({ feedback, isCorrect, errorMessages = [] }) => {
  if (!feedback) return null;

  return (
    <div className={`w-full p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'} transition-all`}>
      <h2 className="text-xl font-semibold mb-2">フィードバック</h2>
      
      <div className="mb-2">
        {isCorrect ? (
          <div className="flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            <p className="text-green-800">{feedback}</p>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="text-red-600 mr-2">✗</span>
            <p className="text-red-800">{feedback}</p>
          </div>
        )}
      </div>
      
      {!isCorrect && errorMessages.length > 0 && (
        <div className="mt-2">
          <ul className="list-disc pl-5 text-red-700 space-y-1">
            {errorMessages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Feedback;
