
import React, { useState } from 'react';
import { View } from '../types';
import { ICONS } from '../constants';
import InputRefiner from './InputRefiner';
import PromptLibrary from './PromptLibrary';
import Scheduler from './Scheduler';
import Settings from './Settings';

interface DashboardProps {
  initialView: View;
  onLogout: () => void;
  onChangeView: (v: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ initialView, onLogout, onChangeView }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: View.DASHBOARD, label: 'Refiner', icon: ICONS.Sparkles },
    { id: View.LIBRARY, label: 'Library', icon: ICONS.Library },
    { id: View.SCHEDULER, label: 'Scheduler', icon: ICONS.Calendar },
    { id: View.SETTINGS, label: 'Settings', icon: ICONS.Settings },
  ];

  return (
    <div className="flex h-screen bg-[#050505]">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } border-r border-white/5 transition-all duration-300 flex flex-col p-4 z-20 bg-[#050505]`}
      >
        <div className="flex items-center space-x-3 mb-12 px-2">
          <div className="w-8 h-8 rounded-lg opal-gradient flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          {isSidebarOpen && <span className="font-bold text-lg">OpalFlow</span>}
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-colors ${
                initialView === item.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-colors"
          >
            <div className="rotate-180 flex-shrink-0">{ICONS.Send}</div>
            {isSidebarOpen && <span className="text-sm font-medium">Log out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center space-x-4">
             <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-white"
             >
               {ICONS.Dashboard}
             </button>
             <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest">
               {menuItems.find(m => m.id === initialView)?.label}
             </h2>
          </div>
          <div className="flex items-center space-x-4">
             <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-indigo-300">
               1,240 Credits Left
             </div>
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 border border-white/20" />
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {initialView === View.DASHBOARD && <InputRefiner />}
          {initialView === View.LIBRARY && <PromptLibrary />}
          {initialView === View.SCHEDULER && <Scheduler />}
          {initialView === View.SETTINGS && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
