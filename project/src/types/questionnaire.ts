export type QuestionType = 'text' | 'date' | 'number' | 'multiple-choice';

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: Option[];
  nextQuestions?: Record<string, string[]>;
}

export interface Step {
  id: string;
  title: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: string | number | Date;
}