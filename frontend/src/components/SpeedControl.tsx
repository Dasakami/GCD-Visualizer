import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';
import { useUiStore } from '../store/uiStore';
import { PlaybackSpeed } from '../types';

export const SpeedControl = () => {
  const { playbackSpeed, setPlaybackSpeed } = useUiStore();

  const speeds: PlaybackSpeed[] = [0.5, 1, 2];

  return (
    <div className="flex items-center space-x-3">
      <Gauge className="w-5 h-5 text-slate-400" />
      <div className="flex space-x-2">
        {speeds.map((speed) => (
          <motion.button
            key={speed}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPlaybackSpeed(speed)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              playbackSpeed === speed
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {speed}x
          </motion.button>
        ))}
      </div>
    </div>
  );
};
