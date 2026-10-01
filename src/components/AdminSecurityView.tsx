import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  UserCheck,
  AlertTriangle,
  Clock,
  Key,
  Users,
  Terminal,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AdminSessionUser, AdminAuditEntry } from '../types';
import { fetchAuditLogs, fetchActiveSessions, fetchAdminUsers } from '../services/adminAuth';

interface AdminSecurityViewProps {
  currentUser: AdminSessionUser;
  onRefreshSession?: () => void;
}

export const AdminSecurityView: React.FC<AdminSecurityViewProps> = ({ currentUser }) => {
  const [activeSubTab, setActiveSubTab] = useState<'audit' | 'sessions' | 'rbac' | 'password'>('audit');
  const [auditLogs, setAuditLogs] = useState<AdminAuditEntry[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [auditFilter, setAuditFilter] = useState<string>('ALL');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  const [isChangingPass, setIsChangingPass] = useState(false);

  const isSuperAdmin = currentUser.role === 'superadmin';

  const loadData = async () => {
    setIsLoading(true);
    try {
      const logs = await fetchAuditLogs();
      setAuditLogs(logs);

      if (isSuperAdmin) {
        const activeSessions = await fetchActiveSessions();
        setSessions(activeSessions);

        const adminUsers = await fetchAdminUsers();
        setUsers(adminUsers);
      }
    } catch (e) {
      console.error('Failed to load security data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser.role]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (!currentPassword) {
      setPassError('Current password is required.');
      return;
    }
    if (newPassword.length < 8) {
      setPassError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }

    setIsChangingPass(true);
    try {
      const token = sessionStorage.getItem('rd_infra_admin_token') || localStorage.getItem('rd_infra_admin_token');
      const res = await fetch('/api/admin/security/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPassSuccess('Password updated successfully. Changes are now active.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        loadData();
      } else {
        setPassError(data.error || 'Failed to update password.');
      }
    } catch (err: any) {
      setPassError(err.message || 'Network error while updating password.');
    } finally {
      setIsChangingPass(false);
    }
  };

  const filteredLogs = auditLogs.filter((log) => {
    if (auditFilter === 'ALL') return true;
    if (auditFilter === 'LOGIN') return log.action.includes('LOGIN') || log.action.includes('LOGOUT') || log.action.includes('SESSION');
    if (auditFilter === 'DIRECTOR') return log.action.includes('DIRECTOR');
    if (auditFilter === 'LEADS') return log.action.includes('LEAD');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>RD INFRA Security & Audit Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Administrative Access & Security Control
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Real-time audit logging, PBKDF2 authentication status, role permissions, and active session monitoring.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Logs</span>
            </button>
          </div>
        </div>

        {/* Security Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password Cipher</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">PBKDF2-SHA512</div>
            <div className="text-[10px] text-slate-500 mt-0.5">100,000 salted iterations</div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Session Protection</div>
            <div className="text-sm font-bold text-blue-400 mt-0.5">30-Min Inactivity</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Auto-lock & session wipe</div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rate Limiter</div>
            <div className="text-sm font-bold text-amber-400 mt-0.5">5 Max Attempts</div>
            <div className="text-[10px] text-slate-500 mt-0.5">15-min IP/user lockout</div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Role</div>
            <div className="text-sm font-bold text-purple-300 mt-0.5 capitalize">{currentUser.role}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {isSuperAdmin ? 'Full root authority' : 'Restricted scope'}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {[
          { id: 'audit', label: `Audit Log (${auditLogs.length})`, icon: Clock },
          { id: 'sessions', label: `Active Sessions ${isSuperAdmin ? `(${sessions.length})` : ''}`, icon: Terminal },
          { id: 'rbac', label: 'Role Permissions (RBAC)', icon: Users },
          { id: 'password', label: 'Change Password', icon: Key },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0A4D92] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: AUDIT LOG */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Security Audit Logs</h3>
              <p className="text-xs text-slate-500">
                Immutable trace of login events, profile alterations, and administrative activities.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {['ALL', 'LOGIN', 'DIRECTOR', 'LEADS'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAuditFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    auditFilter === filter
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Clock className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No audit events match the selected filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Administrator</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">IP Address</th>
                    <th className="py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLogs.map((log) => {
                    const isSuccess = log.status === 'success';
                    const isWarning = log.status === 'warning';
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-slate-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {log.adminName}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isSuccess
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : isWarning
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {isSuccess ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <XCircle className="w-3 h-3 text-rose-600" />
                            )}
                            <span className="capitalize">{log.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                          {log.ipAddress || '127.0.0.1'}
                        </td>
                        <td className="py-3 px-4 text-slate-500 max-w-xs truncate" title={log.details}>
                          {log.details || '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ACTIVE SESSIONS */}
      {activeSubTab === 'sessions' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Active Administrative Sessions</h3>
              <p className="text-xs text-slate-500">
                Concurrent logged-in administrator tokens stored in session cache.
              </p>
            </div>
            {!isSuperAdmin && (
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl font-medium">
                Super Admin required to view all tenant sessions.
              </span>
            )}
          </div>

          {!isSuperAdmin ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">Restricted Administrative Area</p>
              <p className="text-xs text-slate-500 mt-1">
                Viewing or invalidating other concurrent administrative sessions requires Super Admin credentials.
              </p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p className="text-xs">No active sessions retrieved.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessions.map((sess, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    sess.isCurrent
                      ? 'bg-blue-50/50 border-blue-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900">{sess.fullName}</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        sess.isCurrent
                          ? 'bg-[#0A4D92] text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {sess.isCurrent ? 'Current Device' : sess.role}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-600 font-mono">
                    <div>Username: {sess.username}</div>
                    <div>IP: {sess.ipAddress || '127.0.0.1'}</div>
                    <div>Login: {new Date(sess.createdAt).toLocaleTimeString()}</div>
                    <div>Expires: {new Date(sess.expiresAt).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ROLE-BASED ACCESS CONTROL (RBAC) */}
      {activeSubTab === 'rbac' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Role-Based Access Control (RBAC) Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Explicit permission matrix defining privileges across the RD INFRA administrative ecosystem.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Feature / Module</th>
                  <th className="py-3 px-4 text-emerald-300">Super Admin</th>
                  <th className="py-3 px-4 text-blue-300">Admin</th>
                  <th className="py-3 px-4 text-amber-300">Editor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-semibold">Director Profile & Executive Bio</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Full Edit / Publish</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Full Edit / Publish</td>
                  <td className="py-3 px-4 text-rose-500">View Only (No Edit)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Leads & Inquiry CRM</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Manage & Export</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Manage & Export</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">View & Update Status</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Property Listings (Buy/Rent/Sell)</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Full CRUD</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Full CRUD</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Create / Draft</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Project Portfolio Management</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Full CRUD</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Full CRUD</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Edit Content</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Security Audits & Session Revocation</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Full Access</td>
                  <td className="py-3 px-4 text-slate-500">Audit Logs Only</td>
                  <td className="py-3 px-4 text-rose-500">Restricted</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Admin Accounts & Credentials</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Manage All</td>
                  <td className="py-3 px-4 text-slate-500">Own Password Only</td>
                  <td className="py-3 px-4 text-slate-500">Own Password Only</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Sensitive Settings (Database, APIs)</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Super Admin Exclusive</td>
                  <td className="py-3 px-4 text-rose-500">Locked</td>
                  <td className="py-3 px-4 text-rose-500">Locked</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* User Directory for Superadmin */}
          {isSuperAdmin && users.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Authorized Administrator Directory
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {users.map((u) => (
                  <div key={u.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="font-bold text-xs text-slate-900">{u.fullName}</div>
                    <div className="text-[11px] text-slate-500">{u.email}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-[#0A4D92] bg-blue-50 px-2 py-0.5 rounded">
                        {u.role}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {u.lastLogin ? `Last login: ${new Date(u.lastLogin).toLocaleDateString()}` : 'No logins yet'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CHANGE PASSWORD */}
      {activeSubTab === 'password' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 max-w-lg space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Change Administrator Password</h3>
            <p className="text-xs text-slate-500">
              Update your individual credential. Password will be salted and hashed with PBKDF2-SHA512.
            </p>
          </div>

          {passError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{passError}</span>
            </div>
          )}

          {passSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{passSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D92]"
              />
            </div>

            <button
              type="submit"
              disabled={isChangingPass}
              className="w-full py-2.5 px-4 bg-[#0A4D92] hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isChangingPass ? (
                <span>Encrypting & Updating...</span>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
