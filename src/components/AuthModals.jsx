import React, { useState } from 'react';
import { 
  IconGraduationCap, 
  IconBookOpen, 
  IconShieldCheck, 
  IconMail, 
  IconLock, 
  IconX, 
  IconCheckCircle, 
  IconRefreshCw,
  IconChevronRight
} from './Icons';
import { sendSmtpEmail } from '../utils/smtpService';

export default function AuthModals({ type, setCurrentView, setCurrentUser, students, faculty, emailLogs, setEmailLogs }) {
  const [identifier, setIdentifier] = useState(
    type === 'login-student' ? '23A81A0501' : 
    type === 'login-faculty' ? 'kvsharma@university.edu' : 'admin@university.edu'
  );
  const [password, setPassword] = useState('password123');
  const [step, setStep] = useState('credentials'); // credentials -> otp -> success
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your Roll Number or Email ID.');
      return;
    }

    let foundUser = null;
    let userRole = '';

    if (type === 'login-student') {
      userRole = 'student';
      foundUser = students.find(s => s.rollNo.toUpperCase() === identifier.trim().toUpperCase() || s.email.toLowerCase() === identifier.trim().toLowerCase());
      if (!foundUser) {
        // Fallback default student for demo
        foundUser = students[0];
      }
    } else if (type === 'login-faculty') {
      userRole = 'faculty';
      foundUser = faculty.find(f => f.email.toLowerCase() === identifier.trim().toLowerCase() || f.facultyId.toUpperCase() === identifier.trim().toUpperCase());
      if (!foundUser) {
        foundUser = faculty[0];
      }
    } else if (type === 'login-admin') {
      userRole = 'admin';
      foundUser = {
        role: 'admin',
        id: 'admin-001',
        name: 'Super Admin',
        email: identifier.trim() || 'admin@university.edu',
        department: 'Exam Cell'
      };
    }

    // Generate 6-digit OTP and send via SMTP Email Simulator
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    sendSmtpEmail({
      recipient: foundUser.email || 'user@university.edu',
      subject: `🔐 Your SRMS Portal OTP Code: ${otp}`,
      type: 'OTP Verification',
      studentName: foundUser.name,
      rollNo: foundUser.rollNo || foundUser.facultyId || 'ADMIN',
      data: { otp },
      emailLogs,
      setEmailLogs
    });

    // Advance to OTP step
    setStep('otp');
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    setError('');

    if (otpInput.trim() !== generatedOtp && otpInput.trim() !== '123456') {
      setError(`Invalid OTP code! Check the live SMTP log or enter the generated OTP: ${generatedOtp}`);
      return;
    }

    // Success authentication!
    let foundUser = null;
    if (type === 'login-student') {
      foundUser = students.find(s => s.rollNo.toUpperCase() === identifier.trim().toUpperCase()) || students[0];
      setCurrentUser({ ...foundUser, role: 'student' });
      setCurrentView('student-dashboard');
    } else if (type === 'login-faculty') {
      foundUser = faculty.find(f => f.email.toLowerCase() === identifier.trim().toLowerCase()) || faculty[0];
      setCurrentUser({ ...foundUser, role: 'faculty' });
      setCurrentView('faculty-dashboard');
    } else {
      setCurrentUser({ role: 'admin', id: 'admin-001', name: 'Super Admin', email: 'admin@university.edu' });
      setCurrentView('admin-dashboard');
    }
  };

  const title = type === 'login-student' ? 'Student Login Portal' : type === 'login-faculty' ? 'Faculty Login Portal' : 'Admin Login Portal';
  const roleColor = type === 'login-student' ? 'blue' : type === 'login-faculty' ? 'emerald' : 'purple';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        
        <button
          onClick={() => setCurrentView('home')}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <IconX className="w-5 h-5" />
        </button>

        {step === 'credentials' && !forgotPassword && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white bg-${roleColor}-600 shadow-lg shadow-${roleColor}-600/30`}>
                {type === 'login-student' && <IconGraduationCap className="w-8 h-8" />}
                {type === 'login-faculty' && <IconBookOpen className="w-8 h-8" />}
                {type === 'login-admin' && <IconShieldCheck className="w-8 h-8" />}
              </div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">{title}</h2>
              <p className="text-xs text-slate-500">Sign in to your account using registered credentials</p>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {type === 'login-student' ? 'Roll Number / Email' : 'Email Address / Faculty ID'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3 font-semibold text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-bold text-slate-700 uppercase tracking-wider">Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotPassword(true)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3 font-semibold text-slate-900 outline-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                Continue to OTP Verification
                <IconChevronRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-400">Default Demo Credentials pre-filled for easy testing!</span>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-emerald-600 bg-emerald-50 border border-emerald-200">
                <IconMail className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">Email OTP Verification</h2>
              <p className="text-xs text-slate-500">
                We sent a 6-digit OTP code to your email. Check live SMTP drawer or enter code below.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-center text-xs text-blue-800">
              Generated OTP: <strong className="text-base text-blue-900 tracking-wider font-mono">{generatedOtp}</strong>
            </div>

            <form onSubmit={handleOtpVerify} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="e.g. 849201"
                  className="w-full text-center text-2xl tracking-[8px] font-mono font-bold bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl py-3 text-slate-900 outline-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold text-center">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <IconCheckCircle className="w-5 h-5" />
                Verify & Enter Portal
              </button>
            </form>
          </div>
        )}

        {/* Forgot Password Flow */}
        {forgotPassword && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-heading font-extrabold text-slate-900">Reset Your Password</h2>
              <p className="text-xs text-slate-500">Enter your email or roll number to receive password reset OTP</p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                sendSmtpEmail({
                  recipient: identifier || 'user@university.edu',
                  subject: '🔑 Password Reset Request - SRMS Portal',
                  type: 'Password Reset',
                  data: { otp: '924108' },
                  emailLogs,
                  setEmailLogs
                });
                alert('Password reset link & OTP sent via SMTP service! Check SMTP Drawer.');
                setForgotPassword(false);
              }} 
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">Registered Email / Roll No</label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3 font-semibold text-slate-900 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl transition-all"
              >
                Send Password Reset OTP
              </button>
              <button
                type="button"
                onClick={() => setForgotPassword(false)}
                className="w-full text-slate-500 font-semibold py-2 text-xs"
              >
                Back to Sign In
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
