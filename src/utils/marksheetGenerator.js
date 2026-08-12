export const printMarksheet = (student, selectedSemester = "IV") => {
  const result = student.semesterResults?.[selectedSemester] || Object.values(student.semesterResults || {})[0];
  if (!result) return;

  const printWindow = window.open('', '_blank', 'width=850,height=1100');
  if (!printWindow) {
    alert("Please allow popups to download/print marksheets.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Marksheet_${student.rollNo}_Sem_${result.semester}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; padding: 40px; margin: 0; }
          .header { text-align: center; border-bottom: 3px double #1d4ed8; padding-bottom: 20px; margin-bottom: 25px; }
          .logo { font-size: 26px; font-weight: bold; color: #1d4ed8; letter-spacing: 1px; }
          .sub-header { font-size: 14px; text-transform: uppercase; color: #64748b; margin-top: 4px; letter-spacing: 2px; }
          .title { font-size: 18px; font-weight: 800; background: #e0effe; color: #1e40af; display: inline-block; padding: 6px 20px; border-radius: 4px; margin-top: 15px; text-transform: uppercase; }
          
          .grid-info { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 14px; margin-bottom: 25px; background: #f8fafc; padding: 15px 20px; border-radius: 6px; border: 1px solid #e2e8f0; }
          .info-label { font-weight: 600; color: #475569; width: 140px; display: inline-block; }
          .info-val { font-weight: 700; color: #0f172a; }

          table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 13px; }
          th { background: #1d4ed8; color: white; padding: 10px 12px; text-align: left; font-weight: 600; }
          td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
          tr:nth-child(even) { background: #f8fafc; }
          
          .summary-box { display: flex; justify-content: space-between; align-items: center; background: #f1f5f9; border: 2px border-solid #cbd5e1; padding: 16px 24px; border-radius: 8px; font-size: 15px; }
          .status-pass { color: #15803d; font-weight: 800; font-size: 18px; }
          .status-fail { color: #b91c1c; font-weight: 800; font-size: 18px; }

          .footer-signatures { margin-top: 60px; display: flex; justify-content: space-between; text-align: center; font-size: 13px; color: #475569; }
          .sig-line { width: 180px; border-top: 1px solid #94a3b8; margin-bottom: 6px; }

          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🎓 STATE UNIVERSITY OF ENGINEERING & TECHNOLOGY</div>
          <div class="sub-header">Office of the Controller of Examinations • Official Marksheet</div>
          <div class="title">STATEMENT OF MARKS - SEMESTER ${result.semester}</div>
        </div>

        <div class="grid-info">
          <div><span class="info-label">Student Name:</span> <span class="info-val">${student.name}</span></div>
          <div><span class="info-label">Roll Number:</span> <span class="info-val">${student.rollNo}</span></div>
          <div><span class="info-label">Department:</span> <span class="info-val">${student.departmentName || student.department}</span></div>
          <div><span class="info-label">Academic Year:</span> <span class="info-val">${result.academicYear}</span></div>
          <div><span class="info-label">Examination:</span> <span class="info-val">${result.examDate}</span></div>
          <div><span class="info-label">Date of Issue:</span> <span class="info-val">${result.publishDate}</span></div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sub Code</th>
              <th>Subject Name</th>
              <th>Max</th>
              <th>Internal</th>
              <th>External</th>
              <th>Total</th>
              <th>Grade</th>
              <th>Credits</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${result.subjects.map(s => `
              <tr>
                <td><strong>${s.code}</strong></td>
                <td>${s.name}</td>
                <td>${s.maxMarks}</td>
                <td>${s.internal}</td>
                <td>${s.external}</td>
                <td><strong>${s.obtained}</strong></td>
                <td><span style="font-weight:700;">${s.grade}</span></td>
                <td>${s.credits}</td>
                <td><strong style="color: ${s.status === 'PASS' ? '#15803d' : '#b91c1c'}">${s.status}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="summary-box">
          <div>Total Marks: <strong>${result.totalObtained} / ${result.totalMax}</strong></div>
          <div>SGPA: <strong style="color:#1d4ed8; font-size:16px;">${result.sgpa}</strong></div>
          <div>CGPA: <strong style="color:#1d4ed8; font-size:16px;">${result.cgpa}</strong></div>
          <div>Result Status: <span class="${result.status === 'PASS' ? 'status-pass' : 'status-fail'}">${result.status} ${result.status === 'PASS' ? '✅' : '❌'}</span></div>
        </div>

        <div class="footer-signatures">
          <div>
            <div class="sig-line"></div>
            Verified By (Exam Cell)
          </div>
          <div>
            <div class="sig-line"></div>
            Head of Department
          </div>
          <div>
            <div class="sig-line"></div>
            Controller of Examinations
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
