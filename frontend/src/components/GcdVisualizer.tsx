import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Sparkles } from 'lucide-react';
import { GcdStep } from '../types';
import { useUiStore } from '../store/uiStore';

interface GcdVisualizerProps {
  steps: GcdStep[];
  result: number;
}

export const GcdVisualizer = ({ steps, result }: GcdVisualizerProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { playbackSpeed } = useUiStore();

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  useEffect(() => {
    if (isPlaying && !isLastStep) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 1000 / playbackSpeed);

      return () => clearTimeout(timer);
    } else if (isPlaying && isLastStep) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStepIndex, isLastStep, playbackSpeed]);

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderCircleVisualization = () => {
    const maxValue = Math.max(currentStep.a, currentStep.b);
    const scaleA = (currentStep.a / maxValue) * 200;
    const scaleB = (currentStep.b / maxValue) * 200;

    return (
      <div className="flex items-center justify-center space-x-8 mb-12">
        <motion.div
          key={`a-${currentStepIndex}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative"
        >
          <motion.div
            className="rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-2xl shadow-cyan-500/50 flex items-center justify-center"
            style={{ width: scaleA, height: scaleA }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white font-bold text-3xl">{currentStep.a}</span>
          </motion.div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-cyan-400 font-medium">
            a
          </div>
        </motion.div>

        {currentStep.quotient !== undefined && currentStep.quotient > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-purple-400 font-mono text-2xl"
          >
            ÷
          </motion.div>
        )}

        <motion.div
          key={`b-${currentStepIndex}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
          className="relative"
        >
          <motion.div
            className="rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-2xl shadow-purple-500/50 flex items-center justify-center"
            style={{ width: scaleB, height: scaleB }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white font-bold text-3xl">{currentStep.b}</span>
          </motion.div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-purple-400 font-medium">
            b
          </div>
        </motion.div>

        {currentStep.remainder !== undefined && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: -50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: 'spring', delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-2xl shadow-pink-500/50 flex items-center justify-center"
              style={{
                width: (currentStep.remainder / maxValue) * 200,
                height: (currentStep.remainder / maxValue) * 200,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white font-bold text-2xl">
                {currentStep.remainder}
              </span>
            </motion.div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-pink-400 font-medium">
              остаток
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 shadow-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">
              Шаг {currentStep.step} из {steps.length}
            </h3>
            {isLastStep && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30"
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-bold">
                  НОД: {result}
                </span>
              </motion.div>
            )}
          </div>

          <div className="w-full bg-slate-800/50 rounded-full h-2 mb-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {renderCircleVisualization()}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-lg font-mono text-cyan-400 mb-2">
                {currentStep.operation || `${currentStep.a} mod ${currentStep.b}`}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentStep.explanation ||
                  `Делим ${currentStep.a} на ${currentStep.b}. Частное = ${currentStep.quotient}, остаток = ${currentStep.remainder}.`}
              </p>
              {currentStep.quotient !== undefined && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                    <div className="text-sm text-purple-400 mb-1">Частное</div>
                    <div className="text-2xl font-bold text-white">
                      {currentStep.quotient}
                    </div>
                  </div>
                  <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-500/30">
                    <div className="text-sm text-pink-400 mb-1">Остаток</div>
                    <div className="text-2xl font-bold text-white">
                      {currentStep.remainder}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <SkipBack className="w-5 h-5 text-cyan-400" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={isLastStep}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <SkipForward className="w-5 h-5 text-cyan-400" />
          </motion.button>
        </div>

        {isLastStep && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30">
              <p className="text-cyan-400 font-medium">
                Алгоритм завершён! НОД исходных чисел равен {result}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
