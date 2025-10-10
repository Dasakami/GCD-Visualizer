import { motion } from 'framer-motion';
import { User as UserIcon, Mail, LogOut, Shield } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';

export const Profile = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
            <UserIcon className="w-10 h-10 text-cyan-400" />
            <span>Профиле</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Управляйте настройками и предпочтениями своей учетной записи
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">Информация аккаунта</h2>
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Электронный адрес</div>
                  <div className="text-lg font-medium text-white">{user?.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Статус аккаунта</div>
                  <div className="text-lg font-medium text-white flex items-center space-x-2">
                    <span>Активный</span>
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Действия</h2>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={logout}
              className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-xl text-red-400 font-medium transition-all flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Выйти</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Обо мне</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Добро пожаловать визуализатор НОД, готовым приложением, созданным для демонстрации
              красота и эффективность алгоритма Евклида с помощью интерактивных визуализаций.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Zustand'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
