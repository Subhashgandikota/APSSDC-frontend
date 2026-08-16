import React from 'react';
import { IconGraduationCap, IconShieldCheck, IconMail, IconServer } from './Icons';

export default function Footer({ setCurrentView }) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-heading font-extrabold text-lg">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <IconGraduationCap className="w-5 h-5" />
              </div>
              SRMS Portal
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official Student Result Management System. View semester results, SGPA/CGPA breakdown, and download verified marksheets in seconds.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Home Page</button></li>
              <li><button onClick={() => setCurrentView('search')} className="hover:text-white transition-colors">Quick Result Search</button></li>
              <li><button onClick={() => setCurrentView('login-student')} className="hover:text-white transition-colors">Student Login</button></li>
              <li><button onClick={() => setCurrentView('login-faculty')} className="hover:text-white transition-colors">Faculty Portal</button></li>
              <li><button onClick={() => setCurrentView('login-admin')} className="hover:text-white transition-colors">Admin Dashboard</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Portals & Services</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><IconShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Role-Based Access Control</li>
              <li className="flex items-center gap-1.5"><IconMail className="w-3.5 h-3.5 text-emerald-400" /> SMTP Email Notifications</li>
              <li className="flex items-center gap-1.5"><IconServer className="w-3.5 h-3.5 text-purple-400" /> Automated Marksheet Generation</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">System Information</h4>
            <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700 space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Status:</span> <span className="text-emerald-400 font-semibold">● Online</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Academic Year:</span> <span className="text-slate-200">2025-26</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Exam Branch:</span> <span className="text-slate-200">Controller of Exams</span></div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Student Result Management System. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-slate-400 italic text-center text-xs max-w-xl">
              "Your academic journey is more than marks and grades—it's about learning, growth, challenges, and achievements. Stay connected, stay organized, and move toward a brighter future"
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
