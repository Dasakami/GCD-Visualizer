import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-slate-900/50 rounded-full border-4 border-cyan-500/30 mb-8"
        >
          <AlertCircle className="w-12 h-12 text-cyan-400" />
        </motion.div>

        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-slate-400 mb-8">
          Упс! Страница, которую вы ищете, не существует.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center space-x-2 mx-auto"
          >
            <Home className="w-5 h-5" />
            <span>Вернуться в главную страницу</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};
