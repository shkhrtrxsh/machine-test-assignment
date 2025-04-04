import React, { createContext, useContext, useState, useEffect } from 'react';
import { Answer, Step, Question } from '../types/questionnaire';
import { steps } from '../data/questions';

interface QuestionnaireContextType {
  currentStepIndex: number;
  answers: Answer[];
  setCurrentStepIndex: (index: number) => void;
  setAnswer: (answer: Answer) => void;
  getAnswer: (questionId: string) => Answer | undefined;
  visibleQuestions: Question[];
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([]);

  const setAnswer = (answer: Answer) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === answer.questionId);
      if (existing !== -1) {
        const newAnswers = [...prev];
        newAnswers[existing] = answer;
        return newAnswers;
      }
      return [...prev, answer];
    });
  };

  const getAnswer = (questionId: string) => {
    return answers.find((a) => a.questionId === questionId);
  };

  useEffect(() => {
    const currentStep = steps[currentStepIndex];
    let updatedQuestions = [...currentStep.questions];

    // Filter questions based on previous answers
    answers.forEach((answer) => {
      const question = currentStep.questions.find((q) => q.id === answer.questionId);
      if (question?.nextQuestions && answer.value) {
        const nextQuestionIds = question.nextQuestions[answer.value as string];
        if (nextQuestionIds) {
          updatedQuestions = updatedQuestions.filter((q) => 
            nextQuestionIds.includes(q.id) || !q.id.includes(question.id)
          );
        }
      }
    });

    setVisibleQuestions(updatedQuestions);
  }, [currentStepIndex, answers]);

  return (
    <QuestionnaireContext.Provider
      value={{
        currentStepIndex,
        answers,
        setCurrentStepIndex,
        setAnswer,
        getAnswer,
        visibleQuestions,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};