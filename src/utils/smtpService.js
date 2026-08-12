// SMTP Email Dispatcher Service Simulator

export const sendSmtpEmail = ({ recipient, subject, type, studentName, rollNo, data = {}, emailLogs = [], setEmailLogs }) => {
  const newId = `email-${Date.now().toString().slice(-4)}`;
  const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  let bodyHtml = '';

  if (type === 'Result Published') {
    bodyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background: #ffffff;">
        <h2 style="color: #1d4ed8; margin-top: 0;">🎓 Student Result Management System</h2>
        <p>Dear <strong>${studentName || 'Student'}</strong> (Roll No: <strong>${rollNo || 'N/A'}</strong>),</p>
        <p>Your examination result for <strong>Semester ${data.semester || 'IV'} (${data.academicYear || '2025-26'})</strong> has been officially published!</p>
        <div style="background: #f8fafc; border-left: 4px solid #1d4ed8; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 4px 0;"><strong>SGPA:</strong> <span style="color: #047857; font-size: 18px; font-weight: bold;">${data.sgpa || '8.60'}</span></p>
          <p style="margin: 4px 0;"><strong>CGPA:</strong> <span style="color: #047857; font-size: 18px; font-weight: bold;">${data.cgpa || '8.24'}</span></p>
          <p style="margin: 4px 0;"><strong>Result Status:</strong> <span style="background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${data.status || 'PASS'} ✅</span></p>
        </div>
        <p>Log in to your Student Dashboard to download your official digital marksheet PDF.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 30px;">
        <p style="font-size: 12px; color: #64748b;">Automated SMTP Notification via Nodemailer Service.</p>
      </div>
    `;
  } else if (type === 'OTP Verification') {
    const otpCode = data.otp || Math.floor(100000 + Math.random() * 900000);
    bodyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background: #ffffff;">
        <h2 style="color: #1d4ed8; margin-top: 0;">🔐 Email OTP Verification</h2>
        <p>Hello <strong>${studentName || 'User'}</strong>,</p>
        <p>Your 6-digit One-Time Password (OTP) for authenticating into the Student Result Management Portal is:</p>
        <div style="background: #e0effe; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e40af; padding: 16px; margin: 20px 0; border-radius: 8px;">
          ${otpCode}
        </div>
        <p>This code expires in 10 minutes. Please do not share this OTP with anyone.</p>
      </div>
    `;
  } else if (type === 'Welcome Email') {
    bodyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background: #ffffff;">
        <h2 style="color: #1d4ed8; margin-top: 0;">🎉 Welcome to Student Result Portal</h2>
        <p>Welcome <strong>${studentName}</strong>,</p>
        <p>Your student account (Roll No: <strong>${rollNo}</strong>) has been registered successfully.</p>
        <p>You can now check semester results, download digital marksheets, and receive instant academic notifications.</p>
      </div>
    `;
  } else if (type === 'Password Reset') {
    bodyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background: #ffffff;">
        <h2 style="color: #dc2626; margin-top: 0;">🔑 Password Reset Request</h2>
        <p>Hello <strong>${studentName || recipient}</strong>,</p>
        <p>We received a request to reset your SRMS portal password.</p>
        <p>Use OTP Code: <strong>${data.otp || '924108'}</strong> to authorize password reset.</p>
      </div>
    `;
  } else {
    bodyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background: #ffffff;">
        <h2 style="color: #1d4ed8;">📧 SRMS System Notification</h2>
        <p>To: ${recipient}</p>
        <p>${data.message || 'Notification sent from Student Result Management System.'}</p>
      </div>
    `;
  }

  const newLog = {
    id: newId,
    recipient,
    subject: subject || `${type} - SRMS Notification`,
    type,
    timestamp,
    status: 'DELIVERED',
    bodyHtml
  };

  const updatedLogs = [newLog, ...emailLogs];
  if (setEmailLogs) {
    setEmailLogs(updatedLogs);
  }
  return newLog;
};
