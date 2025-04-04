import React from 'react';
import { motion } from 'framer-motion';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import { steps } from '../data/questions';

export const QuestionnaireSummary: React.FC = () => {
  const { answers } = useQuestionnaire();

  const getQuestionText = (questionId: string): string => {
    for (const step of steps) {
      const question = step.questions.find(q => q.id === questionId);
      if (question) {
        return question.text;
      }
    }
    return '';
  };

  const getAnswerDisplay = (questionId: string, value: string | number | Date): string => {
    for (const step of steps) {
      const question = step.questions.find(q => q.id === questionId);
      if (question) {
        if (question.type === 'multiple-choice') {
          const option = question.options?.find(opt => opt.value === value);
          return option?.label || value.toString();
        } else if (question.type === 'date') {
          return new Date(value).toLocaleDateString();
        }
      }
    }
    return value.toString();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white shadow-xl rounded-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary of Your Answers</h2>
      <div className="space-y-4">
        {answers.map((answer) => (
          <motion.div
            key={answer.questionId}
            variants={item}
            className="border-b border-gray-200 pb-4 last:border-0"
          >
            <h3 className="text-sm font-medium text-gray-500">
              {getQuestionText(answer.questionId)}
            </h3>
            <p className="mt-1 text-lg text-gray-900">
              {getAnswerDisplay(answer.questionId, answer.value)}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};