
import React from 'react';
import { 
  Sparkles, 
  Library, 
  Calendar, 
  Settings, 
  LayoutDashboard, 
  Send, 
  Copy, 
  Check, 
  Twitter, 
  Linkedin,
  Clock,
  Zap,
  Shield,
  Layers
} from 'lucide-react';

export const ICONS = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  Library: <Library className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Dashboard: <LayoutDashboard className="w-5 h-5" />,
  Send: <Send className="w-5 h-5" />,
  Copy: <Copy className="w-5 h-5" />,
  Check: <Check className="w-5 h-5" />,
  Twitter: <Twitter className="w-5 h-5" />,
  Linkedin: <Linkedin className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />
};

export const TONES = ['Professional', 'Viral', 'Academic', 'Casual', 'Creative'] as const;

export const FEATURE_CARDS = [
  {
    title: "AI Polishing",
    description: "Turn messy thoughts into crystal-clear, professional content in milliseconds.",
    icon: <Zap className="w-8 h-8 text-indigo-400" />
  },
  {
    title: "Multi-Platform",
    description: "Schedule and auto-post directly to Twitter and LinkedIn from one workspace.",
    icon: <Layers className="w-8 h-8 text-purple-400" />
  },
  {
    title: "Enterprise Security",
    description: "Your data is encrypted and managed with bank-grade security protocols.",
    icon: <Shield className="w-8 h-8 text-pink-400" />
  }
];
