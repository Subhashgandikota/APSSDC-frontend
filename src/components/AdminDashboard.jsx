import React, { useState } from 'react';
import { 
  IconShieldCheck, 
  IconUsers, 
  IconBookOpen, 
  IconBuilding, 
  IconPlus, 
  IconTrash, 
  IconEdit, 
  IconSearch, 
  IconMail, 
  IconFileText, 
  IconCheckCircle, 
  IconLogOut, 
  IconRefreshCw,
  IconSend,
  IconCheck,
  IconX
} from './Icons';
import { sendSmtpEmail } from '../utils/smtpService';

export default function AdminDashboard({ 
  students, 
  setStudents, 
  faculty, 
  setFaculty, 
  departments, 
  setDepartments,
  emailLogs,
  setEmailLogs,
  onLogout 
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    email: '',
    department: 'CSE',
    semester: 'IV',
    cgpa: 8.0,
    sgpa: 8.2
  });

  const [publishSuccess, setPublishSuccess] = useState(false);
  const [searchStudentTerm, setSearchStudentTerm] = useState('');

  // Handle Add Student
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `std-${Date.now()}`,
      rollNo: newStudent.rollNo.toUpperCase(),
      regNo: `REG2023${newStudent.department}${Math.floor(100 + Math.random() * 900)}`,
      name: newStudent.name,
      email: newStudent.email,
      phone: "+91 98765 00000",
      department: newStudent.department,
      departmentName: newStudent.department === 'CSE' ? 'Computer Science & Engineering' : 'Electronics & Communication',
      year: "II Year",
      semester: newStudent.semester,
      academicYear: "2025-26",
      cgpa: parseFloat(newStudent.cgpa) || 8.0,
      sgpa: parseFloat(newStudent.sgpa) || 8.2,
      status: "PASS",
      parentName: "Parent Name",
      address: "Andhra Pradesh, India",
      semesterResults: {
        "IV": {
          semester: "IV",
          academicYear: "2025-26",
          examDate: "April 2026",
          publishDate: new Date().toISOString().split('T')[0],
          sgpa: parseFloat(newStudent.sgpa) || 8.2,
          cgpa: parseFloat(newStudent.cgpa) || 8.0,
          status: "PASS",
          totalMax: 500,
          totalObtained: 400,
          subjects: [
            { code: "CS401", name: "Data Structures & Algorithms", maxMarks: 100, obtained: 80, internal: 25, external: 55, grade: "A+", gradePoints: 9, credits: 4, status: "PASS" },
            { code: "CS402", name: "Operating Systems", maxMarks: 100, obtained: 78, internal: 24, external: 54, grade: "A", gradePoints: 8, credits: 4, status: "PASS" },
            { code: "CS403", name: "Database Management Systems", maxMarks: 100, obtained: 82, internal: 26, external: 56, grade: "A+", gradePoints: 9, credits: 4, status: "PASS" },
            { code: "CS404", name: "Computer Networks", maxMarks: 100, obtained: 80, internal: 25, external: 55, grade: "A", gradePoints: 8, credits: 3, status: "PASS" },
            { code: "CS405", name: "Software Engineering", maxMarks: 100, obtained: 80, internal: 25, external: 55, grade: "A+", gradePoints: 9, credits: 3, status: "PASS" },
          ]
        }
      }
    };

    setStudents([created, ...students]);

    // Send Welcome Email via SMTP Service
    sendSmtpEmail({
      recipient: created.email,
      subject: '🎉 Welcome to Student Result Portal',
      type: 'Welcome Email',
      studentName: created.name,
      rollNo: created.rollNo,
      emailLogs,
      setEmailLogs
    });

    setShowAddStudentModal(false);
    setNewStudent({ name: '', rollNo: '', email: '', department: 'CSE', semester: 'IV', cgpa: 8.0, sgpa: 8.2 });
  };

  // Handle Delete Student
  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  // Handle Publish All Results -> Dispatches SMTP emails to all students!
  const handlePublishResults = () => {
    students.forEach(st => {
      sendSmtpEmail({
        recipient: st.email,
        subject: `🎓 B.Tech Semester IV Results Published - ${st.name}`,
        type: 'Result Published',
        studentName: st.name,
        rollNo: st.rollNo,
        data: {
          semester: 'IV',
          academicYear: '2025-26',
          sgpa: st.sgpa,
          cgpa: st.cgpa,
          status: st.status
        },
        emailLogs,
        setEmailLogs
      });
    });

    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 5000);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchStudentTerm.toLowerCase()) || 
    s.rollNo.toLowerCase().includes(searchStudentTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100/70 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Admin Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 to-purple-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
              <IconShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-extrabold text-slate-900">
                  Admin Master Dashboard
                </h1>
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-300">
                  SUPERUSER ACCESS
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Examination Branch • Academic Year 2025-26
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePublishResults}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <IconSend className="w-4 h-4" />
              Publish Results & Dispatch Emails
            </button>

            <button
              onClick={onLogout}
              className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-200 transition-all flex items-center gap-2"
            >
              <IconLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {publishSuccess && (
          <div className="mb-6 p-4 bg-emerald-600 text-white rounded-2xl font-bold text-xs flex items-center justify-between shadow-lg animate-in fade-in">
            <div className="flex items-center gap-3">
              <IconCheckCircle className="w-6 h-6 text-emerald-200" />
              <span>Results officially published! Automated result notification emails dispatched via Nodemailer SMTP to all students.</span>
            </div>
            <button onClick={() => setPublishSuccess(false)} className="text-white">
              <IconX className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Top 5 Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Students</span>
            <span className="text-2xl font-extrabold text-blue-600 font-heading">{students.length + 1247}</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Faculty</span>
            <span className="text-2xl font-extrabold text-purple-600 font-heading">{faculty.length + 45}</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Departments</span>
            <span className="text-2xl font-extrabold text-emerald-600 font-heading">{departments.length + 3}</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Results</span>
            <span className="text-2xl font-extrabold text-slate-900 font-heading">8,540</span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Published</span>
            <span className="text-2xl font-extrabold text-emerald-600 font-heading">7,920</span>
          </div>

        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-fit space-y-1">
            <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Admin Menu
            </div>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'dashboard' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconShieldCheck className="w-4 h-4" />
              Dashboard Overview
            </button>

            <button
              onClick={() => setActiveTab('manage-students')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'manage-students' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconUsers className="w-4 h-4" />
              Manage Students ({students.length})
            </button>

            <button
              onClick={() => setActiveTab('manage-faculty')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'manage-faculty' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconBookOpen className="w-4 h-4" />
              Manage Faculty
            </button>

            <button
              onClick={() => setActiveTab('manage-depts')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'manage-depts' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <IconBuilding className="w-4 h-4" />
              Departments & Subjects
            </button>

            <button
              onClick={() => setActiveTab('smtp-logs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'smtp-logs' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-3">
                <IconMail className="w-4 h-4" />
                SMTP Email System
              </span>
              <span className="text-[10px] bg-red-100 text-red-700 font-extrabold px-2 py-0.5 rounded-full">
                {emailLogs.length}
              </span>
            </button>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Quick Actions Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-extrabold text-slate-900">Admin Quick Actions</h3>
                  <p className="text-xs text-slate-500">Perform instant administrative operations</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setShowAddStudentModal(true)}
                    className="p-5 bg-blue-50 border border-blue-200 rounded-2xl hover:bg-blue-100 text-blue-900 font-bold text-xs flex flex-col items-center gap-3 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconPlus className="w-5 h-5" />
                    </div>
                    + Add New Student
                  </button>

                  <button
                    onClick={() => setActiveTab('manage-faculty')}
                    className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex flex-col items-center gap-3 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconPlus className="w-5 h-5" />
                    </div>
                    + Add Faculty
                  </button>

                  <button
                    onClick={handlePublishResults}
                    className="p-5 bg-purple-50 border border-purple-200 rounded-2xl hover:bg-purple-100 text-purple-900 font-bold text-xs flex flex-col items-center gap-3 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconSend className="w-5 h-5" />
                    </div>
                    Publish All Results
                  </button>
                </div>
              </div>
            )}

            {/* Manage Students */}
            {activeTab === 'manage-students' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Manage Registered Students</h3>
                    <p className="text-xs text-slate-500">Add, view, edit or remove student database records</p>
                  </div>

                  <div className="flex gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search roll no or name..."
                        value={searchStudentTerm}
                        onChange={(e) => setSearchStudentTerm(e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold outline-none"
                      />
                      <IconSearch className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>

                    <button
                      onClick={() => setShowAddStudentModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                    >
                      <IconPlus className="w-4 h-4" />
                      Add Student
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                      <tr>
                        <th className="p-3">Roll No</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Dept</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">SGPA</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {filteredStudents.map(st => (
                        <tr key={st.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-900">{st.rollNo}</td>
                          <td className="p-3 font-bold text-slate-900">{st.name}</td>
                          <td className="p-3 text-slate-600">{st.department}</td>
                          <td className="p-3 text-slate-600">{st.email}</td>
                          <td className="p-3 font-bold text-blue-600">{st.sgpa}</td>
                          <td className="p-3">
                            <button
                              onClick={() => handleDeleteStudent(st.id)}
                              className="text-red-600 hover:text-red-800 font-bold p-1 hover:bg-red-50 rounded"
                            >
                              <IconTrash className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SMTP System & Logs */}
            {activeTab === 'smtp-logs' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">SMTP Email System Logs</h3>
                    <p className="text-xs text-slate-500">Live logs of all automated emails dispatched by Nodemailer service</p>
                  </div>
                  <button
                    onClick={() => {
                      sendSmtpEmail({
                        recipient: 'test.student@university.edu',
                        subject: '🧪 Test SMTP Connection Email',
                        type: 'Test Email',
                        studentName: 'Test User',
                        emailLogs,
                        setEmailLogs
                      });
                    }}
                    className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <IconSend className="w-4 h-4 text-emerald-400" />
                    Test SMTP Connection
                  </button>
                </div>

                <div className="space-y-3">
                  {emailLogs.map(log => (
                    <div key={log.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-blue-600 uppercase">{log.type}</span>
                        <span className="text-slate-400 font-mono">{log.timestamp}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{log.subject}</h4>
                      <p className="text-xs text-slate-600 font-mono">Recipient: {log.recipient}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Manage Faculty & Departments */}
            {(activeTab === 'manage-faculty' || activeTab === 'manage-depts') && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900">Faculty & Department Management</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                      <tr>
                        <th className="p-3">Faculty ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Designation</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Assigned Subjects</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {faculty.map(f => (
                        <tr key={f.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-900">{f.facultyId}</td>
                          <td className="p-3 font-bold text-slate-900">{f.name}</td>
                          <td className="p-3 text-slate-600">{f.designation}</td>
                          <td className="p-3 text-slate-600">{f.department}</td>
                          <td className="p-3 text-slate-600">{f.assignedSubjects?.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Add Student Modal */}
        {showAddStudentModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">+ Register New Student</h3>
                <button onClick={() => setShowAddStudentModal(false)} className="text-slate-400">
                  <IconX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddStudentSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="e.g. Sriram Kumar"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    required
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                    placeholder="e.g. 23A81A0504"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 uppercase outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Email Address</label>
                  <input
                    type="email"
                    required
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="e.g. sriram@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Department</label>
                    <select
                      value={newStudent.department}
                      onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 outline-none"
                    >
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Semester</label>
                    <select
                      value={newStudent.semester}
                      onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 outline-none"
                    >
                      <option value="IV">Semester IV</option>
                      <option value="III">Semester III</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow"
                >
                  Create Record & Send Welcome Email
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
