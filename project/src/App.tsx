import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QuestionnaireProvider,
  useQuestionnaire,
} from "./context/QuestionnaireContext";
import { ProgressBar } from "./components/ProgressBar";
import { QuestionStep } from "./components/QuestionStep";
import { QuestionnaireSummary } from "./components/QuestionnaireSummary";
import { steps } from "./data/questions";

function Questionnaire() {
  const { currentStepIndex, setCurrentStepIndex, answers, visibleQuestions } =
    useQuestionnaire();

  const handlePrevious = () => {
    setCurrentStepIndex(Math.max(0, currentStepIndex - 1));
  };

  const handleNext = () => {
    setCurrentStepIndex(Math.min(steps.length - 1, currentStepIndex + 1));
  };

  const isStepValid = () => {
    return visibleQuestions.every((question) => {
      if (!question.required) return true;
      const answer = answers.find((a) => a.questionId === question.id);
      return answer && answer.value !== undefined && answer.value !== "";
    });
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-lg p-8"
        >
          <ProgressBar current={currentStepIndex} total={steps.length} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <QuestionStep step={steps[currentStepIndex]} />
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  currentStepIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1 || !isStepValid()}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  currentStepIndex === steps.length - 1 || !isStepValid()
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        </motion.div>

        {isLastStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <QuestionnaireSummary />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <QuestionnaireProvider>
      <Questionnaire />
    </QuestionnaireProvider>
  );
}

export default App;
