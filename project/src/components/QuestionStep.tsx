import React from 'react';
import { Step } from '../types/questionnaire';
import { QuestionInput } from './QuestionInput';
import { useQuestionnaire } from '../context/QuestionnaireContext';

interface QuestionStepProps {
  step: Step;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({ step }) => {
  const { visibleQuestions } = useQuestionnaire();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
      {visibleQuestions.map((question) => (
        <div key={question.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {question.text}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <QuestionInput question={question} />
        </div>
      ))}
    </div>
  );
};