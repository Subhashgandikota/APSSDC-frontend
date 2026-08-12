import React, { useState } from 'react';
import { 
  IconBookOpen, 
  IconUsers, 
  IconEdit, 
  IconCheckCircle, 
  IconPlus, 
  IconSearch, 
  IconLogOut, 
  IconCheck, 
  IconAward,
  IconBell
} from './Icons';

export default function FacultyDashboard({ facultyUser, students, setStudents, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState('CS401');
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [tempMarks, setTempMarks] = useState({ internal: 26, external: 56 });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeFaculty = facultyUser || {
    id: "fac-101",
    facultyId: "FAC-CSE-01",
    name: "Dr. K. V. Sharma",
    email: "kvsharma@university.edu",
    department: "CSE",
    designation: "Professor & HOD",
    assignedSubjects: ["CS401 - Data Structures & Algorithms", "CS403 - Database Management Systems"],
    totalStudents: 120
  };

  const handleSaveMarks = (studentId) => {
    const internal = parseInt(tempMarks.internal) || 0;
    const external = parseInt(tempMarks.external) || 0;
    const total = internal + external;
    const grade = total >= 90 ? 'O' : total >= 80 ? 'A+' : total >= 70 ? 'A' : total >= 60 ? 'B+' : total >= 50 ? 'B' : 'F';
    const status = total >= 40 ? 'PASS' : 'FAIL';

    const updatedStudents = students.map(s => {
      if (s.id === studentId || s.rollNo === studentId) {
        const res = s.semesterResults?.["IV"] || { subjects: [] };
        const updatedSubjects = res.subjects.map(sub => {
          if (sub.code === selectedSubject) {
            return {
              ...sub,
              internal,
              external,
              obtained: total,
              grade,
              status
            };
          }
          return sub;
        });

        return {
          ...s,
          semesterResults: {
            ...s.semesterResults,
            "IV": {
              ...res,
              subjects: updatedSubjects,
              totalObtained: updatedSubjects.reduce((acc, curr) => acc + curr.obtained, 0)
            }
          }
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    setEditingStudentId(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100/70 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center font-bold text-xl shadow-md">
              <IconBookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-extrabold text-slate-900">
                  Welcome, {activeFaculty.name} 👋
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  FACULTY PORTAL
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {activeFaculty.designation} • Dept: <strong className="text-slate-800">{activeFaculty.department}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-200 flex items-center gap-2 transition-all"
            >
              <IconLogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-fit space-y-1">
            <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Faculty Controls
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconAward className="w-4 h-4" />
              Overview
            </button>

            <button
              onClick={() => setActiveTab('subjects')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'subjects' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconBookOpen className="w-4 h-4" />
              My Subjects
            </button>

            <button
              onClick={() => setActiveTab('enter-marks')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'enter-marks' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconEdit className="w-4 h-4" />
              Enter / Update Marks
            </button>

            <button
              onClick={() => setActiveTab('view-students')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'view-students' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconUsers className="w-4 h-4" />
              Assigned Students
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <IconBookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Assigned Subjects</span>
                      <span className="text-2xl font-extrabold text-slate-900">{activeFaculty.assignedSubjects.length}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <IconUsers className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Total Students</span>
                      <span className="text-2xl font-extrabold text-slate-900">{activeFaculty.totalStudents}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <IconCheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Marks Entry Status</span>
                      <span className="text-base font-extrabold text-emerald-600">SUBMITTED ✅</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Recent Faculty Activity</h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-slate-800">✓ Mid-2 Marks uploaded for CS401 (Data Structures)</span>
                      <span className="text-slate-400">2 hours ago</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-slate-800">✓ External Lab Evaluation completed for CSE IV Sem</span>
                      <span className="text-slate-400">Yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enter / Update Marks */}
            {activeTab === 'enter-marks' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Student Marks Entry & Evaluation</h3>
                    <p className="text-xs text-slate-500">Input internal & external marks for students in your assigned subjects</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">Subject:</span>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="bg-slate-50 border border-slate-300 font-bold text-xs rounded-xl px-3 py-2 text-slate-900 outline-none"
                    >
                      <option value="CS401">CS401 - Data Structures</option>
                      <option value="CS402">CS402 - Operating Systems</option>
                      <option value="CS403">CS403 - DBMS</option>
                    </select>
                  </div>
                </div>

                {savedSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-emerald-600" />
                    Student marks updated and re-calculated successfully!
                  </div>
                )}

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Roll Number</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Internal (Max 30)</th>
                        <th className="p-3">External (Max 70)</th>
                        <th className="p-3">Total (100)</th>
                        <th className="p-3">Grade</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {students.map((st) => {
                        const res = st.semesterResults?.["IV"]?.subjects?.find(s => s.code === selectedSubject) || { internal: 25, external: 55, obtained: 80, grade: 'A' };
                        const isEditing = editingStudentId === st.id;

                        return (
                          <tr key={st.id} className="hover:bg-slate-50">
                            <td className="p-3 font-mono font-bold text-slate-900">{st.rollNo}</td>
                            <td className="p-3 font-bold text-slate-900">{st.name}</td>
                            
                            <td className="p-3">
                              {isEditing ? (
                                <input
                                  type="number"
                                  max={30}
                                  value={tempMarks.internal}
                                  onChange={(e) => setTempMarks({ ...tempMarks, internal: e.target.value })}
                                  className="w-16 bg-white border border-blue-600 rounded px-2 py-1 font-bold text-slate-900"
                                />
                              ) : (
                                <span>{res.internal}</span>
                              )}
                            </td>

                            <td className="p-3">
                              {isEditing ? (
                                <input
                                  type="number"
                                  max={70}
                                  value={tempMarks.external}
                                  onChange={(e) => setTempMarks({ ...tempMarks, external: e.target.value })}
                                  className="w-16 bg-white border border-blue-600 rounded px-2 py-1 font-bold text-slate-900"
                                />
                              ) : (
                                <span>{res.external}</span>
                              )}
                            </td>

                            <td className="p-3 font-extrabold text-slate-900">{res.obtained}</td>
                            <td className="p-3">
                              <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                                {res.grade}
                              </span>
                            </td>

                            <td className="p-3">
                              {isEditing ? (
                                <button
                                  onClick={() => handleSaveMarks(st.id)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1 rounded transition-colors"
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingStudentId(st.id);
                                    setTempMarks({ internal: res.internal, external: res.external });
                                  }}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] px-3 py-1 rounded border border-slate-300 transition-colors flex items-center gap-1"
                                >
                                  <IconEdit className="w-3 h-3" />
                                  Edit
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* My Subjects & View Students */}
            {(activeTab === 'subjects' || activeTab === 'view-students') && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900">Assigned Department Students</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                      <tr>
                        <th className="p-3">Roll No</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">SGPA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {students.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold font-mono text-slate-900">{s.rollNo}</td>
                          <td className="p-3 font-bold text-slate-900">{s.name}</td>
                          <td className="p-3 text-slate-600">{s.department}</td>
                          <td className="p-3 text-slate-600">{s.email}</td>
                          <td className="p-3 font-bold text-emerald-600">{s.sgpa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
