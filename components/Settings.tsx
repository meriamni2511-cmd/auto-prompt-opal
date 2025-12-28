
import React from 'react';
import { ICONS } from '../constants';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-400 mb-10">Manage your account, integrations, and preferences.</p>

      <div className="space-y-8">
        {/* Profile Section */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-6">Profile Details</h3>
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-3xl font-bold">JD</div>
            <div className="space-y-1">
              <h4 className="font-bold text-lg">John Doe</h4>
              <p className="text-gray-500 text-sm">Pro Subscriber &bull; Since Nov 2024</p>
              <button className="text-indigo-400 text-xs font-bold hover:underline">Change Profile Picture</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
              <input type="email" value="john@example.com" disabled className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Display Name</label>
              <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-2">Integrations</h3>
          <p className="text-sm text-gray-500 mb-8">Connect your social accounts for automated posting.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                  {ICONS.Twitter}
                </div>
                <div>
                  <h4 className="font-bold">Twitter (X)</h4>
                  <p className="text-xs text-gray-500">Connected as @johndoe_ai</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-colors">Disconnect</button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  {ICONS.Linkedin}
                </div>
                <div>
                  <h4 className="font-bold">LinkedIn</h4>
                  <p className="text-xs text-gray-500">Not connected</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">Connect</button>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="glass-card rounded-2xl p-8 border-indigo-500/10">
           <div className="flex items-center space-x-3 mb-6">
              <h3 className="text-xl font-semibold">API Settings</h3>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-bold">DEV MODE</span>
           </div>
           <div className="space-y-4">
             <div className="space-y-2">
               <label className="text-xs font-bold text-gray-500 uppercase">Personal API Key</label>
               <div className="flex space-x-2">
                 <input type="password" value="••••••••••••••••••••••••" disabled className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400" />
                 <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">{ICONS.Copy}</button>
               </div>
             </div>
             <p className="text-[10px] text-gray-600">Use this key to integrate OpalFlow polishing directly into your own applications via our SDK.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
