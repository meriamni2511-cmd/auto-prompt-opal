
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiService } from '../services/geminiService';
import { Tone } from '../types';
import { ICONS, TONES } from '../constants';

const InputRefiner: React.FC = () => {
  const [rawText, setRawText] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishedOutput, setPolishedOutput] = useState('');
  const [selectedTone, setSelectedTone] = useState<Tone>('Professional');
  const [copied, setCopied] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [rawText]);

  const handlePolish = async () => {
    if (!rawText.trim()) return;
    setIsPolishing(true);
    setPolishedOutput('');
    
    try {
      const stream = geminiService.polishContentStream(rawText, selectedTone);
      for await (const chunk of stream) {
        setPolishedOutput(prev => prev + chunk);
      }
    } catch (err) {
      setPolishedOutput("Error: Could not polish content. Please check your connection.");
    } finally {
      setIsPolishing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(polishedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Refine your thoughts.</h1>
        <p className="text-gray-400">Transform raw drafts into professional posts or prompts in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Area */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 relative group">
            <textarea
              ref={textareaRef}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Dump your messy thoughts here..."
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 resize-none min-h-[150px] text-lg"
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <span className="text-xs text-gray-600 group-focus-within:text-gray-400 transition-colors">
                {rawText.length} characters
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {TONES.map(tone => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedTone === tone 
                    ? 'opal-gradient text-white' 
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>

          <button
            onClick={handlePolish}
            disabled={isPolishing || !rawText.trim()}
            className="w-full py-4 rounded-2xl opal-gradient text-white font-bold flex items-center justify-center space-x-3 disabled:opacity-50 disabled:grayscale transition-all active:scale-[0.98]"
          >
            {isPolishing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Generate Polish</span>
                {ICONS.Sparkles}
              </>
            )}
          </button>
        </div>

        {/* Output Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {polishedOutput ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl p-6 border-indigo-500/20 shadow-2xl shadow-indigo-500/5 min-h-[250px] flex flex-col"
              >
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-tighter">Polished Result</span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={copyToClipboard}
                      className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? ICONS.Check : ICONS.Copy}
                    </button>
                    <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 transition-colors">
                      {ICONS.Calendar}
                    </button>
                  </div>
                </div>
                <div className="flex-1 text-gray-200 leading-relaxed text-lg whitespace-pre-wrap">
                  {polishedOutput}
                  {isPolishing && <span className="inline-block w-2 h-5 bg-indigo-500 ml-1 animate-pulse" />}
                </div>
              </motion.div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border-white/5 min-h-[250px] flex flex-col items-center justify-center text-center space-y-4 opacity-50 border-dashed">
                <div className="p-4 bg-white/5 rounded-full text-gray-600">
                  {ICONS.Sparkles}
                </div>
                <p className="text-sm text-gray-500">Select a tone and hit Generate <br /> to see the magic happen.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InputRefiner;
