import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, Sparkles } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1, type: 'spring' }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 opacity-50 blur-xl absolute inset-0"
              />
              <div className="relative w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center border-4 border-cyan-500/30">
                <Calculator className="w-16 h-16 text-cyan-400" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            НОД Визуализатор
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed"
          >
            Ощутите красоту алгоритма Евклида с помощью
            <br />
            потрясающих интерактивных визуализаций
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center space-x-2"
              >
                <span>Начать</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: '🎨',
              title: 'Красивые анимации',
              description: 'Наблюдай, как алгоритмы оживают в плавных и захватывающих анимациях',
            },
            {
              icon: '📚',
              title: 'Изучай теорию',
              description: 'Пойми математику, лежащую в основе алгоритма наибольшего общего делителя',
            },
            {
              icon: '📊',
              title: 'Отслеживай историю',
              description: 'Сохраняй и просматривай свои прошлые вычисления в любое время',
            },

          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900/50 backdrop-blur-xl rounded-full border border-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 text-sm">
              Готов к работе • С открытым исходным кодом • Создан с использованием React
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
