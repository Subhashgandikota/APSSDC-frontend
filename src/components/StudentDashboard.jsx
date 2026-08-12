import React, { useState } from 'react';
import { 
  IconGraduationCap, 
  IconUser, 
  IconFileText, 
  IconDownload, 
  IconPrinter, 
  IconCheckCircle, 
  IconBell, 
  IconSettings, 
  IconLogOut, 
  IconAward, 
  IconBookOpen,
  IconChevronRight,
  IconLock,
  IconCheck
} from './Icons';
import { printMarksheet } from '../utils/marksheetGenerator';

export default function StudentDashboard({ student, onLogout, emailLogs }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSem, setSelectedSem] = useState('IV');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  // Fallback default student if none logged in
  const currentStudent = student || {
    id: "std-001",
    rollNo: "23A81A0501",
    regNo: "REG2023CSE501",
    name: "Purna Sai Subhash",
    email: "subhashgandikota94@gmail.com",
    phone: "+91 98765 43210",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    year: "II Year",
    semester: "IV",
    academicYear: "2025-26",
    cgpa: 8.24,
    sgpa: 8.60,
    status: "PASS",
    parentName: "G. Venkateswara Rao",
    address: "Visakhapatnam, Andhra Pradesh, India",
    semesterResults: {
      "IV": {
        semester: "IV",
        academicYear: "2025-26",
        examDate: "April 2026",
        publishDate: "2026-06-15",
        sgpa: 8.60,
        cgpa: 8.24,
        status: "PASS",
        totalMax: 500,
        totalObtained: 410,
        subjects: [
          { code: "CS401", name: "Data Structures & Algorithms", maxMarks: 100, obtained: 82, internal: 26, external: 56, grade: "A+", gradePoints: 9, credits: 4, status: "PASS" },
          { code: "CS402", name: "Operating Systems", maxMarks: 100, obtained: 76, internal: 24, external: 52, grade: "A", gradePoints: 8, credits: 4, status: "PASS" },
          { code: "CS403", name: "Database Management Systems", maxMarks: 100, obtained: 88, internal: 28, external: 60, grade: "A+", gradePoints: 9, credits: 4, status: "PASS" },
          { code: "CS404", name: "Computer Networks", maxMarks: 100, obtained: 79, internal: 25, external: 54, grade: "A", gradePoints: 8, credits: 3, status: "PASS" },
          { code: "CS405", name: "Software Engineering", maxMarks: 100, obtained: 85, internal: 27, external: 58, grade: "A+", gradePoints: 9, credits: 3, status: "PASS" },
        ]
      }
    }
  };

  const activeResult = currentStudent.semesterResults?.[selectedSem] || Object.values(currentStudent.semesterResults || {})[0];
  const studentNotifications = emailLogs?.filter(e => e.recipient === currentStudent.email || e.type.includes('Result')) || [];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100/70 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Student Header Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
              {currentStudent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-extrabold text-slate-900">
                  Welcome, {currentStudent.name} 👋
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  ACTIVE STUDENT
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Roll No: <strong className="text-slate-800 font-mono">{currentStudent.rollNo}</strong> • Dept: <strong className="text-slate-800">{currentStudent.department}</strong> • Sem: <strong className="text-slate-800">{currentStudent.semester}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => printMarksheet(currentStudent, selectedSem)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
            >
              <IconDownload className="w-4 h-4" />
              Download Marksheet
            </button>
          </div>
        </div>

        {/* Layout Grid with Left Sidebar & Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-fit space-y-1">
            <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Student Menu
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'overview' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconAward className="w-4 h-4" />
              Overview
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'profile' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconUser className="w-4 h-4" />
              My Profile
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'results' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconBookOpen className="w-4 h-4" />
              My Results
            </button>

            <button
              onClick={() => setActiveTab('marksheets')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'marksheets' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconFileText className="w-4 h-4" />
              Marksheets
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'notifications' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-3">
                <IconBell className="w-4 h-4" />
                Notifications
              </span>
              {studentNotifications.length > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'notifications' ? 'bg-white/30 text-white' : 'bg-blue-100 text-blue-800'}`}>
                  {studentNotifications.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'settings' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconSettings className="w-4 h-4" />
              Settings
            </button>

            <div className="pt-3 border-t border-slate-100 mt-2">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                <IconLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                      <IconAward className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">CGPA</span>
                      <span className="text-2xl font-heading font-extrabold text-blue-600">{currentStudent.cgpa}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
                      <IconBookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">SGPA (Sem {selectedSem})</span>
                      <span className="text-2xl font-heading font-extrabold text-purple-600">{currentStudent.sgpa}</span>
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                      <IconCheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Result Status</span>
                      <span className="text-base font-heading font-extrabold text-emerald-600">PASS ✅</span>
                    </div>
                  </div>

                </div>

                {/* Latest Result Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded uppercase">
                        Latest Published Result
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                        B.Tech Semester IV Results
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('results')}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Full Details
                      <IconChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {activeResult && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl text-xs">
                        <div><span className="text-slate-500">Semester:</span> <strong className="block text-slate-900">{activeResult.semester}</strong></div>
                        <div><span className="text-slate-500">Total Marks:</span> <strong className="block text-slate-900">{activeResult.totalObtained} / {activeResult.totalMax}</strong></div>
                        <div><span className="text-slate-500">SGPA:</span> <strong className="block text-blue-600 text-sm font-bold">{activeResult.sgpa}</strong></div>
                        <div><span className="text-slate-500">Status:</span> <strong className="block text-emerald-600 font-bold">PASS ✅</strong></div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setActiveTab('results')}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow"
                        >
                          View Subject Marks
                        </button>
                        <button
                          onClick={() => printMarksheet(currentStudent, selectedSem)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all border border-slate-200 flex items-center gap-1.5"
                        >
                          <IconDownload className="w-4 h-4 text-blue-600" />
                          Download Marksheet PDF
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Tab 2: Profile */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-extrabold text-slate-900">Student Profile Information</h3>
                  <p className="text-xs text-slate-500">Official academic record registered in university database</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Full Name:</span>
                    <p className="text-slate-900 font-bold text-sm">{currentStudent.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Roll Number:</span>
                    <p className="text-slate-900 font-mono font-bold text-sm">{currentStudent.rollNo}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Registration No:</span>
                    <p className="text-slate-900 font-mono font-bold text-sm">{currentStudent.regNo}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Department:</span>
                    <p className="text-slate-900 font-bold text-sm">{currentStudent.departmentName}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Email Address:</span>
                    <p className="text-slate-900 font-bold text-sm">{currentStudent.email}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Phone Number:</span>
                    <p className="text-slate-900 font-bold text-sm">{currentStudent.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Parent / Guardian Name:</span>
                    <p className="text-slate-900 font-bold text-sm">{currentStudent.parentName}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Permanent Address:</span>
                    <p className="text-slate-900 font-bold text-sm">{currentStudent.address}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: My Results */}
            {activeTab === 'results' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Semester Examination Results</h3>
                    <p className="text-xs text-slate-500">View detailed subject-wise marks breakdown</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">Select Semester:</span>
                    <select
                      value={selectedSem}
                      onChange={(e) => setSelectedSem(e.target.value)}
                      className="bg-slate-50 border border-slate-300 font-bold text-xs rounded-xl px-3 py-2 text-slate-900 outline-none"
                    >
                      <option value="IV">Semester IV</option>
                      <option value="III">Semester III</option>
                    </select>
                  </div>
                </div>

                {activeResult ? (
                  <div className="space-y-6">
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="p-3">Subject</th>
                            <th className="p-3">Max</th>
                            <th className="p-3">Internal</th>
                            <th className="p-3">External</th>
                            <th className="p-3">Marks</th>
                            <th className="p-3">Grade</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {activeResult.subjects.map((s, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-3 font-bold text-slate-900">{s.name} ({s.code})</td>
                              <td className="p-3 text-slate-600">{s.maxMarks}</td>
                              <td className="p-3 text-slate-600">{s.internal}</td>
                              <td className="p-3 text-slate-600">{s.external}</td>
                              <td className="p-3 text-slate-900 font-extrabold">{s.obtained}</td>
                              <td className="p-3"><span className="bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded text-[11px]">{s.grade}</span></td>
                              <td className="p-3"><span className="text-emerald-600 font-bold">PASS ✅</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-900 text-white rounded-xl p-4 flex justify-between items-center text-xs">
                      <div>Total Marks: <strong>{activeResult.totalObtained} / {activeResult.totalMax}</strong></div>
                      <div>SGPA: <strong className="text-blue-400 font-bold text-sm">{activeResult.sgpa}</strong></div>
                      <div>Result: <span className="bg-emerald-500 text-white font-extrabold px-2.5 py-1 rounded">PASS ✅</span></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No results found for Semester {selectedSem}.</p>
                )}
              </div>
            )}

            {/* Tab 4: Marksheets */}
            {activeTab === 'marksheets' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Digital Marksheet Generator</h3>
                    <p className="text-xs text-slate-500">Generate and print official university marksheets with QR verification</p>
                  </div>
                  <button
                    onClick={() => printMarksheet(currentStudent, selectedSem)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow"
                  >
                    <IconPrinter className="w-4 h-4" />
                    Print / Save PDF
                  </button>
                </div>

                {/* Live Preview Box */}
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50 text-center space-y-4">
                  <IconFileText className="w-12 h-12 text-blue-600 mx-auto" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Semester {selectedSem} Official Marksheet Ready</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                      Includes official seal, grade points, SGPA ({currentStudent.sgpa}), CGPA ({currentStudent.cgpa}), and controller signatures.
                    </p>
                  </div>
                  <button
                    onClick={() => printMarksheet(currentStudent, selectedSem)}
                    className="bg-slate-900 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-slate-800 transition-all inline-flex items-center gap-2"
                  >
                    <IconDownload className="w-4 h-4 text-blue-400" />
                    Download Official Marksheet PDF
                  </button>
                </div>
              </div>
            )}

            {/* Tab 5: Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-extrabold text-slate-900">Student Notification Inbox</h3>
                  <p className="text-xs text-slate-500">Emails and updates dispatched to your registered address ({currentStudent.email})</p>
                </div>

                <div className="space-y-3">
                  {studentNotifications.map((notif) => (
                    <div key={notif.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-blue-600 uppercase">{notif.type}</span>
                        <span className="text-slate-400">{notif.timestamp}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{notif.subject}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-extrabold text-slate-900">Account & Security Settings</h3>
                  <p className="text-xs text-slate-500">Update password and security options</p>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPasswordSaved(true);
                    setTimeout(() => setPasswordSaved(false), 4000);
                  }}
                  className="space-y-4 text-xs max-w-md"
                >
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">Current Password</label>
                    <input
                      type="password"
                      required
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold outline-none"
                    />
                  </div>

                  {passwordSaved && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-600" />
                      Password updated successfully!
                    </div>
                  )}

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
