import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Loader2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { GcdVisualizer } from '../components/GcdVisualizer';
import { SpeedControl } from '../components/SpeedControl';
import { useGcd } from '../hooks/useGcd';
import { GcdResult } from '../types';

export const Calculate = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<GcdResult | null>(null);
  const { calculate, isLoading, error } = useGcd();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numA = parseInt(a);
    const numB = parseInt(b);

    if (numA <= 0 || numB <= 0) {
      return;
    }

    try {
      const data = await calculate({ a: numA, b: numB });
      setResult(data);
    } catch {
    }
  };

  const handleReset = () => {
    setResult(null);
    setA('');
    setB('');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
            <Calculator className="w-10 h-10 text-cyan-400" />
            <span>Расчет НОД</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Введите два натуральных числа, чтобы наглядно представить алгоритм Евклида
          </p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl"
          >
            <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Первая цифра (a)
                  </label>
                  <input
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-2xl font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="42"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Вторая цифра (b)
                  </label>
                  <input
                    type="number"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-2xl font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="18"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Вычисляем...</span>
                  </>
                ) : (
                  <span>Начните визуализацию</span>
                )}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <SpeedControl />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
              >
                Новый расчет
              </motion.button>
            </div>

            <GcdVisualizer steps={result.steps} result={result.result} />
          </motion.div>
        )}
      </div>
    </Layout>
  );
};
