import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  KeyRound,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { RDInfraLogo } from './RDInfraLogo';
import { loginAdmin } from '../services/adminAuth';
import { AdminSessionUser } from '../types';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminSessionUser) => void;
  onReturnToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onReturnToWebsite,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lockoutMinutes, setLockoutMinutes] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setErrorMessage('Please enter both your email/username and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const result = await loginAdmin(identifier.trim(), password, rememberMe);

    setIsLoading(false);

    if (result.success && result.user) {
      onLoginSuccess(result.user);
    } else {
      setErrorMessage(result.error || 'Invalid credentials. Access denied.');
      if (result.lockoutRemainingMinutes) {
        setLockoutMinutes(result.lockoutRemainingMinutes);
      }
    }
  };

  // Helper for quick testing of defined roles
  const handleQuickFill = (email: string, samplePass: string) => {
    setIdentifier(email);
    setPassword(samplePass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#0A4D92] selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0A4D92]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Bar: Return to Website */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <button
          onClick={onReturnToWebsite}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group cursor-pointer bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#0A4D92]" />
          <span>Return to Website</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-Bit SSL Encrypted Access</span>
        </div>
      </header>

      {/* Main Form Centerpiece */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md">
          {/* Brand Card */}
          <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl shadow-2xl p-8 backdrop-blur-xl transition-all duration-300">
            {/* RD INFRA Crest Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative p-3 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/60 shadow-inner">
                  <RDInfraLogo size="lg" showText={false} />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0A4D92] flex items-center justify-center border-2 border-slate-900">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              <div className="inline-block mb-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0A4D92] bg-blue-950/60 px-3 py-1 rounded-full border border-blue-900/40">
                  RD INFRA
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight font-display">
                Admin Portal
              </h1>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-medium">
                Authorized Access Only
              </p>
            </div>

            {/* Error / Alert Banner */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 text-sm flex items-start gap-3 animate-shake">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-rose-300">Authentication Alert</p>
                  <p className="text-xs text-rose-200/90 mt-0.5 leading-relaxed">{errorMessage}</p>
                  {lockoutMinutes && (
                    <p className="text-xs font-semibold text-rose-300 mt-2">
                      Lockout active: ~{lockoutMinutes} min remaining.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email / Username */}
              <div>
                <label
                  htmlFor="admin-identifier"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                >
                  Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-identifier"
                    type="text"
                    autoComplete="username"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="name@rd-infra.in or username"
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Password
                  </label>
                  <span className="text-[11px] text-slate-500">PBKDF2 Secured</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    disabled={isLoading}
                    className="w-full pl-10 pr-12 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D92] focus:border-transparent transition-all disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-[#0A4D92] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Keep session active</span>
                </label>
                <span className="text-slate-500">30 min auto-lock</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0A4D92] to-blue-700 hover:from-blue-700 hover:to-[#0A4D92] text-white font-semibold text-sm shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>
            </form>

            {/* Role Helper for Testing / Demo */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 text-xs">
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="w-full flex items-center justify-between text-slate-400 hover:text-slate-300 transition-colors py-1 cursor-pointer"
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <HelpCircle className="w-3.5 h-3.5 text-[#0A4D92]" />
                  <span>Authorized Personnel Guidance</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {showHelp ? 'Hide' : 'Show'}
                </span>
              </button>

              {showHelp && (
                <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2.5 text-slate-400">
                  <p className="text-[11px] text-slate-300 font-medium">
                    Test credentials for verification:
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900/90 border border-slate-800">
                      <div>
                        <div className="font-semibold text-slate-200">Mr. Ravinder Deshwal</div>
                        <div className="text-[10px] text-emerald-400">Super Admin • ravinder@rd-infra.in</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuickFill('ravinder@rd-infra.in', 'Admin@RD2026')}
                        className="text-[10px] bg-[#0A4D92] hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                      >
                        Autofill
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded bg-slate-900/90 border border-slate-800">
                      <div>
                        <div className="font-semibold text-slate-200">Operations Lead</div>
                        <div className="text-[10px] text-blue-400">Admin • operations@rd-infra.in</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuickFill('operations@rd-infra.in', 'Admin@RD2026')}
                        className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded transition-colors"
                      >
                        Autofill
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded bg-slate-900/90 border border-slate-800">
                      <div>
                        <div className="font-semibold text-slate-200">Content Editor</div>
                        <div className="text-[10px] text-amber-400">Editor • editor@rd-infra.in</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuickFill('editor@rd-infra.in', 'Admin@RD2026')}
                        className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded transition-colors"
                      >
                        Autofill
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1 italic">
                    All authentication is verified server-side with salt-hashed PBKDF2 cryptography.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer disclaimer */}
          <div className="text-center mt-6 text-slate-500 text-xs">
            <p>© {new Date().getFullYear()} RD INFRA. Strictly for authorized management only.</p>
            <p className="mt-1 text-[11px] text-slate-600">
              Unauthorized access attempts are monitored and logged.
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full text-center py-4 text-xs text-slate-600 z-10">
        RD INFRA Secure Real Estate Infrastructure • Gurugram & Delhi-NCR
      </footer>
    </div>
  );
};
