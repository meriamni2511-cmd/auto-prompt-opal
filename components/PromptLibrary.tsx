
import React, { useState } from 'react';
import { ICONS } from '../constants';

const MockHistory = [
  { id: '1', title: 'Viral AI Tech Post', tone: 'Viral', date: '2 hours ago', content: 'AI is changing the world faster than we thought. Here are 3 tools you need to know...' },
  { id: '2', title: 'Product Launch Email', tone: 'Professional', date: 'Yesterday', content: 'Dear valued customers, we are thrilled to announce the official launch of OpalFlow...' },
  { id: '3', title: 'Philosophy of Mind', tone: 'Academic', date: '3 days ago', content: 'The ontological implications of large language models suggest a shift in cognitive paradigms...' },
  { id: '4', title: 'Funny Dev Joke', tone: 'Casual', date: '1 week ago', content: "I told my computer I needed a break. It responded with 'Internal Server Error'..." },
];

const PromptLibrary: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredItems = MockHistory.filter(h => 
    h.title.toLowerCase().includes(search.toLowerCase()) || 
    h.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Your Library</h1>
          <p className="text-gray-400">Retrieve and reuse your most polished masterpieces.</p>
        </div>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500/50 transition-all text-sm outline-none w-full md:w-64"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400">
             {ICONS.Dashboard}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="glass-card rounded-2xl p-6 hover:border-white/20 transition-all group flex flex-col h-64">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                 <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                   item.tone === 'Viral' ? 'bg-pink-500/20 text-pink-400' :
                   item.tone === 'Professional' ? 'bg-indigo-500/20 text-indigo-400' :
                   'bg-gray-500/20 text-gray-400'
                 }`}>
                   {item.tone}
                 </span>
                 <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400">{ICONS.Copy}</button>
                 <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400">{ICONS.Calendar}</button>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-3 line-clamp-1">{item.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-4 flex-1">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptLibrary;
