import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AuthModals from './components/AuthModals';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard';
import SmtpLogDrawer from './components/SmtpLogDrawer';
import { initialMockData } from './data/mockData';

export default function App() {
  // Load state from localStorage or fallback to initialMockData
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('srms_students');
    return saved ? JSON.parse(saved) : initialMockData.students;
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('srms_faculty');
    return saved ? JSON.parse(saved) : initialMockData.faculty;
  });

  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('srms_departments');
    return saved ? JSON.parse(saved) : initialMockData.departments;
  });

  const [notices, setNotices] = useState(initialMockData.notices);

  const [emailLogs, setEmailLogs] = useState(() => {
    const saved = localStorage.getItem('srms_email_logs');
    return saved ? JSON.parse(saved) : initialMockData.emailLogs;
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // home, search, login-student, login-faculty, login-admin, student-dashboard, faculty-dashboard, admin-dashboard
  const [smtpDrawerOpen, setSmtpDrawerOpen] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('srms_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('srms_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('srms_email_logs', JSON.stringify(emailLogs));
  }, [emailLogs]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        currentView={currentView}
        setCurrentView={setCurrentView}
        emailLogs={emailLogs}
        toggleSmtpDrawer={() => setSmtpDrawerOpen(!smtpDrawerOpen)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {(currentView === 'home' || currentView === 'search') && (
          <HomePage
            students={students}
            notices={notices}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView.startsWith('login-') && (
          <div>
            <HomePage
              students={students}
              notices={notices}
              setCurrentView={setCurrentView}
            />
            <AuthModals
              type={currentView}
              setCurrentView={setCurrentView}
              setCurrentUser={setCurrentUser}
              students={students}
              faculty={faculty}
              emailLogs={emailLogs}
              setEmailLogs={setEmailLogs}
            />
          </div>
        )}

        {currentView === 'student-dashboard' && (
          <StudentDashboard
            student={currentUser}
            onLogout={() => {
              setCurrentUser(null);
              setCurrentView('home');
            }}
            emailLogs={emailLogs}
          />
        )}

        {currentView === 'faculty-dashboard' && (
          <FacultyDashboard
            facultyUser={currentUser}
            students={students}
            setStudents={setStudents}
            onLogout={() => {
              setCurrentUser(null);
              setCurrentView('home');
            }}
          />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            students={students}
            setStudents={setStudents}
            faculty={faculty}
            setFaculty={setFaculty}
            departments={departments}
            setDepartments={setDepartments}
            emailLogs={emailLogs}
            setEmailLogs={setEmailLogs}
            onLogout={() => {
              setCurrentUser(null);
              setCurrentView('home');
            }}
          />
        )}
      </main>

      {/* SMTP Email Log Drawer */}
      <SmtpLogDrawer
        isOpen={smtpDrawerOpen}
        onClose={() => setSmtpDrawerOpen(false)}
        emailLogs={emailLogs}
        setEmailLogs={setEmailLogs}
      />

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

    </div>
  );
}