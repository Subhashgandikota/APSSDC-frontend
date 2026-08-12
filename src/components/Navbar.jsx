import React, { useState } from 'react';
import { 
  IconGraduationCap, 
  IconUser, 
  IconShieldCheck, 
  IconMail, 
  IconLogOut, 
  IconSearch, 
  IconCheckCircle,
  IconChevronRight,
  IconSettings
} from './Icons';

export default function Navbar({ currentUser, setCurrentUser, currentView, setCurrentView, emailLogs, toggleSmtpDrawer }) {
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  const handleQuickDemo = (role) => {
    if (role === 'student') {
      setCurrentUser({
        role: 'student',
        id: 'std-001',
        rollNo: '23A81A0501',
        name: 'Purna Sai Subhash',
        email: 'subhashgandikota94@gmail.com',
        department: 'CSE',
        semester: 'IV'
      });
      setCurrentView('student-dashboard');
    } else if (role === 'faculty') {
      setCurrentUser({
        role: 'faculty',
        id: 'fac-101',
        name: 'Dr. K. V. Sharma',
        email: 'kvsharma@university.edu',
        department: 'CSE',
        designation: 'HOD - Computer Science'
      });
      setCurrentView('faculty-dashboard');
    } else if (role === 'admin') {
      setCurrentUser({
        role: 'admin',
        id: 'admin-001',
        name: 'Super Admin',
        email: 'admin@university.edu',
        department: 'Exam Branch'
      });
      setCurrentView('admin-dashboard');
    }
    setShowDemoMenu(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <IconGraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                SRMS <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">v2.5</span>
              </span>
              <span className="block text-xs text-slate-500 font-medium">Student Result Portal</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'home' 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentView('search')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'search' 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <IconSearch className="w-4 h-4 text-blue-600" />
              Quick Search
            </button>

            {/* Role Nav */}
            <button
              onClick={() => {
                if (currentUser?.role === 'student') setCurrentView('student-dashboard');
                else setCurrentView('login-student');
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView.includes('student')
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Student Portal
            </button>

            <button
              onClick={() => {
                if (currentUser?.role === 'faculty') setCurrentView('faculty-dashboard');
                else setCurrentView('login-faculty');
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView.includes('faculty')
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Faculty Portal
            </button>

            <button
              onClick={() => {
                if (currentUser?.role === 'admin') setCurrentView('admin-dashboard');
                else setCurrentView('login-admin');
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView.includes('admin')
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Admin Portal
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            
            {/* SMTP Live Email Drawer Trigger */}
            <button
              onClick={toggleSmtpDrawer}
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="SMTP Email System Logs"
            >
              <IconMail className="w-5 h-5" />
              {emailLogs?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {emailLogs.length}
                </span>
              )}
            </button>

            {/* Quick Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-colors border border-slate-200"
              >
                <span>⚡ Quick Login</span>
              </button>

              {showDemoMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Active User Role
                  </div>
                  <button
                    onClick={() => handleQuickDemo('student')}
                    className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Student (Subhash)
                    </span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">23A81A0501</span>
                  </button>
                  <button
                    onClick={() => handleQuickDemo('faculty')}
                    className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Faculty (Dr. Sharma)
                    </span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">HOD</span>
                  </button>
                  <button
                    onClick={() => handleQuickDemo('admin')}
                    className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      Admin (SuperUser)
                    </span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">Full</span>
                  </button>
                </div>
              )}
            </div>

            {/* Current User State or Login CTA */}
            {currentUser ? (
              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                    {currentUser.name}
                  </p>
                  <span className="text-[10px] capitalize bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Log out"
                >
                  <IconLogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('login-student')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md shadow-blue-500/20 active:scale-95"
              >
                Sign In
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
