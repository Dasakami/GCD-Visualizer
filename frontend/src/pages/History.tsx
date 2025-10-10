import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History as HistoryIcon, Loader2, AlertCircle } from 'lucide-react';
import { Layout } from '../components/Layout';
import { HistoryCard } from '../components/HistoryCard';
import { GcdVisualizer } from '../components/GcdVisualizer';
import { useGcd } from '../hooks/useGcd';
import { HistoryItem } from '../types';

export const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const { getHistory, deleteHistoryItem, isLoading } = useGcd();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch {
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHistoryItem(id);
      setHistory(history.filter((item) => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch {
    }
  };

  const handleClick = (id: string) => {
    const item = history.find((h) => h.id === id);
    if (item) {
      setSelectedItem(item);
    }
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
            <HistoryIcon className="w-10 h-10 text-cyan-400" />
            <span>История расчетов</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Просмотрите свои предыдущие расчеты НОД
          </p>
        </motion.div>

        {isLoading && !selectedItem ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-12 text-center"
          >
            <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Еще нет Истории</h3>
            <p className="text-slate-400 mb-6">
              Начните вычислять НОД, чтобы просмотреть свою историю здесь
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    Просмотр: НОД ({selectedItem.a}, {selectedItem.b}) = {selectedItem.result}
                  </h2>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
                  >
                    Вернуться к списку
                  </button>
                </div>
                <GcdVisualizer steps={selectedItem.steps} result={selectedItem.result} />
              </motion.div>
            )}

            {!selectedItem && (
              <AnimatePresence>
                {history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <HistoryCard
                      item={item}
                      onDelete={handleDelete}
                      onClick={handleClick}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
