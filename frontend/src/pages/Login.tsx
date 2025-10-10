import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { AuthForm } from '../components/AuthForm';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl mb-4"
            >
              <Calculator className="w-8 h-8 text-white" />
            </motion.div>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            НОД Визуализатор
          </h1>
        </motion.div>

        <AuthForm />
      </div>
    </div>
  );
};
