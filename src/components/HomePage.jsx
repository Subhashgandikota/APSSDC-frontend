import React, { useState } from 'react';
import { 
  IconSearch, 
  IconGraduationCap, 
  IconUser, 
  IconShieldCheck, 
  IconFileText, 
  IconDownload, 
  IconPrinter, 
  IconCheckCircle,
  IconBell,
  IconChevronRight,
  IconX,
  IconBookOpen,
  IconAward
} from './Icons';
import { printMarksheet } from '../utils/marksheetGenerator';

export default function HomePage({ students, notices, setCurrentView, setSelectedStudentForView }) {
  const [searchRollNo, setSearchRollNo] = useState('');
  const [selectedSem, setSelectedSem] = useState('IV');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [activeNotice, setActiveNotice] = useState(null);

  const handleSearch = (e) => {
    e?.preventDefault();
    setSearchError('');
    setSearchResult(null);

    const term = searchRollNo.trim().toUpperCase();
    if (!term) {
      setSearchError('Please enter a valid Roll Number (e.g., 23A81A0501)');
      return;
    }

    const found = students.find(s => s.rollNo.toUpperCase() === term || s.id.toUpperCase() === term);

    if (found) {
      setSearchResult(found);
    } else {
      setSearchError(`No student record found for Roll Number: "${term}". Try searching "23A81A0501" or "23A81A0502".`);
    }
  };

  const handleQuickFill = (roll) => {
    setSearchRollNo(roll);
    const found = students.find(s => s.rollNo === roll);
    if (found) {
      setSearchResult(found);
      setSearchError('');
    }
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Top Banner & Quick Result Search */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 shadow-xl">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <IconGraduationCap className="w-4 h-4 text-blue-400" />
            Official Academic Examination Cell
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            STUDENT RESULT MANAGEMENT SYSTEM
          </h1>

          <p className="text-blue-100 text-sm sm:text-lg max-w-2xl mx-auto font-medium">
            Manage &amp; Publish Results
          </p>

          {/* Clean Quick Result Search Box */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-left max-w-2xl mx-auto mt-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <IconSearch className="w-5 h-5 text-blue-600" />
                Check Results Instantly
              </h2>
              <span className="text-xs text-slate-500">No login required</span>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Enter Roll Number (e.g. 24CSE101)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchRollNo}
                    onChange={(e) => setSearchRollNo(e.target.value)}
                    placeholder="e.g. 23A81A0501"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none uppercase transition-all"
                  />
                  <div className="absolute right-3 top-2.5 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleQuickFill('23A81A0501')}
                      className="text-[11px] bg-blue-100 text-blue-700 hover:bg-blue-200 font-bold px-2 py-1 rounded transition-colors"
                      title="Test with Subhash Roll No"
                    >
                      Fill Demo
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Semester
                  </label>
                  <select
                    value={selectedSem}
                    onChange={(e) => setSelectedSem(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all"
                  >
                    <option value="IV">Semester IV (Regular 2026)</option>
                    <option value="III">Semester III (2025)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-98"
                  >
                    <IconSearch className="w-4 h-4" />
                    View Result
                  </button>
                </div>
              </div>
            </form>

            {searchError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg flex items-center gap-2 animate-in fade-in">
                <span>⚠️ {searchError}</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Result Display Section (If searched) */}
      {searchResult && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <span className="text-xs bg-blue-400/30 text-blue-100 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Official Statement of Marks
                </span>
                <h3 className="text-xl font-heading font-extrabold mt-2">
                  Semester {selectedSem} Examination Result
                </h3>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => printMarksheet(searchResult, selectedSem)}
                  className="bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow transition-all"
                >
                  <IconDownload className="w-4 h-4 text-blue-600" />
                  Download Marksheet PDF
                </button>
                <button
                  onClick={() => printMarksheet(searchResult, selectedSem)}
                  className="bg-blue-800 text-white hover:bg-blue-700 font-bold text-xs px-3 py-2.5 rounded-lg flex items-center gap-1.5 transition-all"
                >
                  <IconPrinter className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => setSearchResult(null)}
                  className="bg-blue-950/40 hover:bg-blue-950 text-white p-2.5 rounded-lg transition-all"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Student Info Card */}
            <div className="p-6 bg-slate-50/80 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block font-medium">Student Name:</span>
                <strong className="text-slate-900 text-sm">{searchResult.name}</strong>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Roll Number:</span>
                <strong className="text-slate-900 text-sm">{searchResult.rollNo}</strong>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Department:</span>
                <strong className="text-slate-900 text-sm">{searchResult.departmentName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Academic Year:</span>
                <strong className="text-slate-900 text-sm">{searchResult.academicYear}</strong>
              </div>
            </div>

            {/* Subject Marks Table */}
            {(() => {
              const res = searchResult.semesterResults?.[selectedSem] || Object.values(searchResult.semesterResults || {})[0];
              if (!res) {
                return (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No detailed subject breakdown available for Semester {selectedSem}.
                  </div>
                );
              }

              return (
                <div className="p-6 space-y-6">
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="p-3">Subject Name</th>
                          <th className="p-3">Max</th>
                          <th className="p-3">Internal</th>
                          <th className="p-3">External</th>
                          <th className="p-3">Marks</th>
                          <th className="p-3">Grade</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium">
                        {res.subjects.map((sub, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 text-slate-900 font-bold">
                              <div>{sub.name}</div>
                              <span className="text-[10px] text-slate-400 font-normal">{sub.code} • {sub.credits} Credits</span>
                            </td>
                            <td className="p-3 text-slate-600">{sub.maxMarks}</td>
                            <td className="p-3 text-slate-600">{sub.internal}</td>
                            <td className="p-3 text-slate-600">{sub.external}</td>
                            <td className="p-3 text-slate-900 font-extrabold">{sub.obtained}</td>
                            <td className="p-3">
                              <span className="bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded text-[11px]">
                                {sub.grade}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <IconCheckCircle className="w-3.5 h-3.5" />
                                PASS
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Footer Box */}
                  <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Total Marks</span>
                        <span className="text-lg font-extrabold text-white">{res.totalObtained} / {res.totalMax}</span>
                      </div>
                      <div className="h-8 w-px bg-slate-700"></div>
                      <div>
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">SGPA</span>
                        <span className="text-lg font-extrabold text-blue-400">{res.sgpa}</span>
                      </div>
                      <div className="h-8 w-px bg-slate-700"></div>
                      <div>
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">CGPA</span>
                        <span className="text-lg font-extrabold text-emerald-400">{res.cgpa}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300 font-medium">Result Status:</span>
                      <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-extrabold px-3 py-1 rounded-lg flex items-center gap-1.5">
                        ✅ PASS
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </section>
      )}

      {/* Quick Access Portals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-extrabold text-slate-900">
            Quick Portal Access
          </h2>
          <p className="text-xs text-slate-500 mt-1">Select your role to access dedicated management dashboards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Student Login Card */}
          <div 
            onClick={() => setCurrentView('login-student')}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IconGraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Student Login
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Log in with Roll Number to view complete semester history, profile, SGPA/CGPA breakdown, and download official marksheets.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Access your Cloud dashboard</span>
              <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Faculty Login Card */}
          <div 
            onClick={() => setCurrentView('login-faculty')}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IconBookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Faculty Login
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Faculty portal to manage assigned subject students, enter/update mid and semester marks, and submit subject results.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Access your Cloud dashboard</span>
              <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Admin Login Card */}
          <div 
            onClick={() => setCurrentView('login-admin')}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all cursor-pointer group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IconShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                Admin Login
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete administration control: Manage students, faculty, departments, subjects, publish results, and view SMTP email logs.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>Go to Dashboard</span>
              <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Latest Academic Notices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <IconBell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Latest Academic Notices</h3>
                <p className="text-xs text-slate-500">Official updates from the Controller of Examinations</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {notices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setActiveNotice(notice)}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 p-3 rounded-xl transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {notice.important && (
                      <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2 py-0.5 rounded">
                        IMPORTANT
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-blue-600">{notice.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    {notice.title}
                  </h4>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>📅 {notice.date}</span>
                  <IconChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice Details Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{activeNotice.category}</span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{activeNotice.title}</h3>
              </div>
              <button onClick={() => setActiveNotice(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <IconX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeNotice.content}
            </p>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <span>Date: {activeNotice.date}</span>
              <button
                onClick={() => setActiveNotice(null)}
                className="bg-slate-900 text-white font-bold px-4 py-2 rounded-lg text-xs"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
