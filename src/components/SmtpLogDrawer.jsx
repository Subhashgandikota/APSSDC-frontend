import React, { useState } from 'react';
import { IconMail, IconX, IconCheckCircle, IconSend, IconRefreshCw, IconEye } from './Icons';

export default function SmtpLogDrawer({ isOpen, onClose, emailLogs, setEmailLogs }) {
  const [selectedEmail, setSelectedEmail] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <IconMail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base">SMTP Email System Simulator</h3>
              <p className="text-xs text-slate-400">Nodemailer Dispatcher Logs ({emailLogs.length} emails)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <IconX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {selectedEmail ? (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedEmail(null)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 mb-2"
              >
                ← Back to email list
              </button>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
                <div><span className="text-slate-500 font-medium">To:</span> <strong className="text-slate-900">{selectedEmail.recipient}</strong></div>
                <div><span className="text-slate-500 font-medium">Subject:</span> <strong className="text-slate-900">{selectedEmail.subject}</strong></div>
                <div><span className="text-slate-500 font-medium">Timestamp:</span> <span className="text-slate-600">{selectedEmail.timestamp}</span></div>
                <div><span className="text-slate-500 font-medium">Status:</span> <span className="text-emerald-600 font-bold">DELIVERED ✅</span></div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                <div dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }} />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {emailLogs.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No emails dispatched yet. Trigger an OTP login or publish results to inspect logs!
                </div>
              ) : (
                emailLogs.map((log) => (
                  <div
                    key={log.id}
                    onClick={() => setSelectedEmail(log)}
                    className="p-4 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-xl transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-blue-600 uppercase tracking-wider text-[11px]">{log.type}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{log.timestamp}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {log.subject}
                    </h4>

                    <div className="flex justify-between items-center text-[11px] text-slate-500">
                      <span className="truncate max-w-[240px]">To: {log.recipient}</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <IconCheckCircle className="w-3.5 h-3.5" />
                        Delivered
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
          <span>SMTP Host: smtp.university.edu:587</span>
          <button
            onClick={onClose}
            className="bg-slate-900 text-white font-bold px-4 py-2 rounded-lg text-xs"
          >
            Close Logs
          </button>
        </div>

      </div>
    </div>
  );
}
