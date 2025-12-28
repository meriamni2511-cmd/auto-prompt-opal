
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURE_CARDS, ICONS } from '../constants';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden relative">
      {/* Background Aurora Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl opal-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xl">O</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">OpalFlow AI</span>
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-sm font-medium"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8">
            <span className="opal-text-gradient font-bold">NEW</span>
            <span>Gemini 3 Pro Integration is Live</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            Polish your <br />
            <span className="opal-text-gradient">raw thoughts.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            OpalFlow AI transforms your unstructured ideas into viral content and professional prompts instantly. Connect your social accounts and auto-post with ease.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 opal-gradient rounded-full text-white font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <span>Get Started Free</span>
              {ICONS.Zap}
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto">
              View Showcase
            </button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
          {FEATURE_CARDS.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          &copy; 2024 OpalFlow AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
