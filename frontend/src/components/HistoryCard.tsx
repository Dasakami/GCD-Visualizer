import { motion } from 'framer-motion';
import { Clock, Trash2, ChevronRight } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryCardProps {
  item: HistoryItem;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

export const HistoryCard = ({ item, onDelete, onClick }: HistoryCardProps) => {
  const formattedDate = new Date(item.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-slate-900/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-6 shadow-xl cursor-pointer group"
      onClick={() => onClick(item.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
              <span className="text-cyan-400 font-mono font-bold">{item.a}</span>
            </div>
            <span className="text-slate-500">×</span>
            <div className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
              <span className="text-purple-400 font-mono font-bold">{item.b}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
            <span className="text-white font-bold">НОД: {item.result}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <span className="text-sm text-slate-500">
          {item.steps.length} шага в расчете
        </span>
        <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};
