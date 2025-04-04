import React from 'react';
import { motion } from 'framer-motion';
import { Question, Answer } from '../types/questionnaire';
import { useQuestionnaire } from '../context/QuestionnaireContext';

interface QuestionInputProps {
  question: Question;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ question }) => {
  const { setAnswer, getAnswer } = useQuestionnaire();
  const currentAnswer = getAnswer(question.id);

  const handleChange = (value: string | number | Date) => {
    setAnswer({ questionId: question.id, value });
  };

  const inputVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  switch (question.type) {
    case 'text':
      return (
        <motion.div variants={inputVariants} initial="initial" animate="animate">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={currentAnswer?.value as string || ''}
            onChange={(e) => handleChange(e.target.value)}
            required={question.required}
          />
          {question.required && !currentAnswer?.value && (
            <p className="mt-1 text-sm text-red-500">This field is required</p>
          )}
        </motion.div>
      );

    case 'number':
      return (
        <motion.div variants={inputVariants} initial="initial" animate="animate">
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={currentAnswer?.value as number || ''}
            onChange={(e) => handleChange(Number(e.target.value))}
            required={question.required}
          />
          {question.required && !currentAnswer?.value && (
            <p className="mt-1 text-sm text-red-500">This field is required</p>
          )}
        </motion.div>
      );

    case 'date':
      return (
        <motion.div variants={inputVariants} initial="initial" animate="animate">
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={currentAnswer?.value as string || ''}
            onChange={(e) => handleChange(new Date(e.target.value))}
            required={question.required}
          />
          {question.required && !currentAnswer?.value && (
            <p className="mt-1 text-sm text-red-500">This field is required</p>
          )}
        </motion.div>
      );

    case 'multiple-choice':
      return (
        <motion.div variants={inputVariants} initial="initial" animate="animate" className="space-y-2">
          {question.options?.map((option) => (
            <motion.label
              key={option.id}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={currentAnswer?.value === option.value}
                onChange={(e) => handleChange(e.target.value)}
                required={question.required}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-700">{option.label}</span>
            </motion.label>
          ))}
          {question.required && !currentAnswer?.value && (
            <p className="mt-1 text-sm text-red-500">Please select an option</p>
          )}
        </motion.div>
      );

    default:
      return null;
  }
};