
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';

interface ScheduledJob {
  id: string;
  day: number;
  platform: 'Twitter' | 'LinkedIn';
  title: string;
  time: string;
  status: 'Pending' | 'Published' | 'Failed';
}

const Scheduler: React.FC = () => {
  const [jobs, setJobs] = useState<ScheduledJob[]>([
    { id: '1', day: 15, platform: 'Twitter', title: 'Launch Reveal', time: '10:00 AM', status: 'Pending' },
    { id: '2', day: 12, platform: 'LinkedIn', title: 'Case Study: AI Efficiency', time: '02:30 PM', status: 'Published' },
    { id: '3', day: 10, platform: 'Twitter', title: 'Tip: Refinement Chains', time: '09:00 AM', status: 'Failed' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState<{
    title: string;
    platform: 'Twitter' | 'LinkedIn';
    day: number;
    time: string;
    status: 'Pending' | 'Published' | 'Failed';
  }>({
    title: '',
    platform: 'Twitter',
    day: new Date().getDate(),
    time: '12:00',
    status: 'Pending',
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = Array.from({ length: 35 }, (_, i) => i + 1);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const job: ScheduledJob = {
      id: Math.random().toString(36).substr(2, 9),
      ...newJob,
    };
    setJobs([...jobs, job]);
    setIsModalOpen(false);
    setNewJob({ title: '', platform: 'Twitter', day: new Date().getDate(), time: '12:00', status: 'Pending' });
  };

  const getStatusStyles = (status: ScheduledJob['status']) => {
    switch (status) {
      case 'Published':
        return {
          bg: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400',
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500',
          icon: ICONS.Check,
        };
      case 'Failed':
        return {
          bg: 'bg-red-500/5 border-red-500/20 text-red-400',
          badge: 'bg-red-500/20 text-red-400 border-red-500/30',
          dot: 'bg-red-500',
          icon: ICONS.Shield,
        };
      case 'Pending':
      default:
        return {
          bg: 'bg-amber-500/5 border-amber-500/20 text-amber-400',
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-500',
          icon: ICONS.Clock,
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Post Scheduler</h1>
          <p className="text-gray-400">Automate your social presence across platforms.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-4 mr-4 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Published</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Pending</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Failed</span>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 opal-gradient rounded-xl text-sm font-semibold hover:opacity-90 flex items-center space-x-2 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all text-white"
          >
            <span>New Content Job</span>
            {ICONS.Zap}
          </button>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-8 border-white/5 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex items-center justify-between mb-8 relative z-10">
           <h3 className="text-xl font-bold text-white">December 2024</h3>
           <div className="flex items-center space-x-2">
             <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-400 transition-colors">
               <span className="rotate-180 inline-block text-gray-500">{ICONS.Send}</span>
             </button>
             <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-400 transition-colors">
               <span className="text-gray-500">{ICONS.Send}</span>
             </button>
           </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 relative z-10">
          {days.map(day => (
            <div key={day} className="bg-[#0b0b0b] p-4 text-center text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
              {day}
            </div>
          ))}
          {calendarDays.map((day, idx) => {
            const date = day > 31 ? day - 31 : day;
            const isToday = date === new Date().getDate() && day <= 31;
            const dayJobs = jobs.filter(j => j.day === date && day <= 31);

            return (
              <div 
                key={idx} 
                className={`bg-[#050505] p-3 min-h-[160px] transition-all hover:bg-white/[0.03] relative group border-r border-b border-white/5 ${day > 31 ? 'opacity-20' : ''}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-sm font-medium ${isToday ? 'w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/30' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {date}
                  </span>
                  <button 
                    onClick={() => {
                      if (day <= 31) {
                        setNewJob(prev => ({ ...prev, day: date }));
                        setIsModalOpen(true);
                      }
                    }}
                    className="p-1 text-gray-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {ICONS.Check}
                  </button>
                </div>
                
                <div className="space-y-2 overflow-y-auto max-h-[100px] custom-scrollbar pr-1">
                  {dayJobs.map((job) => {
                    const statusStyle = getStatusStyles(job.status);
                    return (
                      <div 
                        key={job.id} 
                        className={`p-2.5 rounded-xl border flex flex-col space-y-2 transition-all cursor-pointer hover:brightness-110 shadow-sm ${statusStyle.bg}`}
                        title={`${job.time} - ${job.title} (${job.status})`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex-shrink-0 w-3 h-3 text-white opacity-60">
                            {job.platform === 'Twitter' ? ICONS.Twitter : ICONS.Linkedin}
                          </span>
                          {/* Explicit Status Badge */}
                          <div className={`px-1.5 py-0.5 rounded-md border text-[8px] font-black uppercase tracking-tighter ${statusStyle.badge}`}>
                            {job.status}
                          </div>
                        </div>
                        
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold truncate leading-tight text-white/90">{job.title}</span>
                          <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-white/5">
                            <span className="text-[8px] opacity-60 font-medium">{job.time}</span>
                            <span className="flex-shrink-0 w-2.5 h-2.5 opacity-60">
                              {statusStyle.icon}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-md rounded-3xl p-8 relative z-10 shadow-2xl border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Schedule New Post</h2>
              
              <form onSubmit={handleCreateJob} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Post Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Weekly Roundup"
                    value={newJob.title}
                    onChange={e => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Target Platform</label>
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                      <button
                        type="button"
                        onClick={() => setNewJob(prev => ({ ...prev, platform: 'Twitter' }))}
                        className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${newJob.platform === 'Twitter' ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        {ICONS.Twitter}
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewJob(prev => ({ ...prev, platform: 'LinkedIn' }))}
                        className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${newJob.platform === 'LinkedIn' ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        {ICONS.Linkedin}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Publish Time</label>
                    <input 
                      required
                      type="time"
                      value={newJob.time}
                      onChange={e => setNewJob(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Pending', 'Published', 'Failed'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setNewJob(prev => ({ ...prev, status: status as any }))}
                        className={`py-2 px-1 rounded-xl border text-[10px] font-bold transition-all ${
                          newJob.status === status 
                          ? status === 'Pending' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' :
                            status === 'Published' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' :
                            'bg-red-500/20 border-red-500/50 text-red-400'
                          : 'bg-white/5 border-white/10 text-gray-500'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Day of Month (Dec)</label>
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(31)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewJob(prev => ({ ...prev, day: i + 1 }))}
                        className={`w-full aspect-square text-xs font-medium rounded-lg flex items-center justify-center border transition-all ${newJob.day === i + 1 ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 font-semibold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 opal-gradient text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                  >
                    Schedule Job
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scheduler;
