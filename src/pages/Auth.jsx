import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Lock, Mail, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import Logo from '../components/common/Logo';

function formatAuthError(err) {
  const code = err?.code || '';
  switch (code) {
    case 'auth/unauthorized-domain':
      return `Domain "${window.location.hostname}" is not authorized in Firebase Console. Add it under Authentication → Settings → Authorized domains.`;
    case 'auth/popup-blocked':
      return 'Popup was blocked by your browser. Please allow popups for this site and try again.';
    case 'auth/popup-closed-by-user':
      return `Google sign-in popup was closed. If it closed automatically, ensure "${window.location.hostname}" is added under Firebase Console → Authentication → Settings → Authorized domains.`;
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email address or password. Please check your credentials and try again.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/operation-not-allowed':
      return 'This sign-in provider is not enabled yet in Firebase Console → Authentication → Sign-in method.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a moment before trying again.';
    default:
      return err?.message || 'Authentication failed. Please try again.';
  }
}

export default function Auth({ onNavigate, setToast }) {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, user } = useAuth();
  const { isDark } = useTheme();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return (
      <div className={`min-h-screen pt-32 pb-20 text-center space-y-4 transition-colors duration-500 ${
        isDark ? 'bg-[#0B0B0D] text-[#F5F4F0]' : 'bg-[#FFFFFF] text-[#121214]'
      }`}>
        <h2 className={`text-2xl font-bold font-display ${isDark ? 'text-white' : 'text-[#121214]'}`}>
          Already Signed In as {user.displayName || user.email}
        </h2>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/dashboard')}
            className="px-5 py-2.5 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#996515] text-[#0B0B0D] font-bold text-xs uppercase rounded-xl cursor-pointer font-mono"
          >
            My Collector Dashboard
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/cars')}
            className={`px-5 py-2.5 border font-bold text-xs uppercase rounded-xl cursor-pointer font-mono ${
              isDark ? 'bg-[#171719] border-[#242426] text-[#F5F4F0]' : 'bg-white border-[#B8860B]/35 text-[#121214]'
            }`}
          >
            Go to Automotive Fleet
          </button>
        </div>
      </div>
    );
  }

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const signedInUser = await loginWithGoogle();
      if (signedInUser) {
        if (setToast) setToast({ message: 'Welcome to VELOCITY VIP', type: 'success' });
        onNavigate('/dashboard');
      }
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'register' && password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
        if (setToast) setToast({ message: 'Signed in successfully', type: 'success' });
      } else {
        await registerWithEmail(email, password, displayName);
        if (setToast) setToast({ message: 'Registration complete. Welcome!', type: 'success' });
      }
      onNavigate('/dashboard');
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen pt-28 pb-24 flex items-center justify-center transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0D] text-[#F5F4F0]' : 'bg-gradient-to-b from-[#FFFFFF] via-[#FDF9EE] to-[#FFFFFF] text-[#121214]'
    }`}>
      <div className="w-full max-w-md px-4">
        <div className={`p-8 rounded-3xl border shadow-2xl space-y-6 backdrop-blur-xl ${
          isDark
            ? 'bg-[#131316]/95 border-[#25252A]'
            : 'bg-white border-[#B8860B]/30 shadow-[0_20px_50px_-15px_rgba(184,134,11,0.18)]'
        }`}>
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <Logo size="md" showTagline={false} />
            </div>
            <h2 className={`text-xl font-bold font-display ${isDark ? 'text-[#F5F4F0]' : 'text-[#121214]'}`}>
              {mode === 'login' ? 'VIP Collector Access' : 'Create VIP Member Profile'}
            </h2>
            <p className={`text-xs ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
              {mode === 'login' ? 'Sign in to access saved allocations and orders' : 'Register for priority supercar allocations'}
            </p>
          </div>

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full py-3 px-4 font-semibold text-xs rounded-xl flex items-center justify-center gap-3 shadow-sm transition-all cursor-pointer border ${
              isDark
                ? 'bg-white hover:bg-neutral-100 text-[#0B0B0D] border-transparent'
                : 'bg-white hover:bg-[#FAF3DF] text-[#121214] border-[#B8860B]/35'
            }`}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with Google Account
          </button>

          <div className="flex items-center gap-3 text-xs font-mono text-[#A7A9AC]/70">
            <div className={`flex-1 h-px ${isDark ? 'bg-[#25252A]' : 'bg-[#B8860B]/20'}`} />
            <span>OR EMAIL SIGN IN</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-[#25252A]' : 'bg-[#B8860B]/20'}`} />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className={`block text-xs font-mono mb-1 ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A7A9AC]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-colors ${
                      isDark
                        ? 'bg-[#0B0B0D] border-[#25252A] text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#D4AF37]'
                        : 'bg-white border-[#B8860B]/35 text-[#121214] placeholder-[#857E70] focus:border-[#B8860B]'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-xs font-mono mb-1 ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A7A9AC]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-colors ${
                    isDark
                      ? 'bg-[#0B0B0D] border-[#25252A] text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#D4AF37]'
                      : 'bg-white border-[#B8860B]/35 text-[#121214] placeholder-[#857E70] focus:border-[#B8860B]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-mono mb-1 ${isDark ? 'text-[#A7A9AC]' : 'text-[#55524B]'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A7A9AC]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-colors ${
                    isDark
                      ? 'bg-[#0B0B0D] border-[#25252A] text-[#F5F4F0] placeholder-[#A7A9AC]/40 focus:border-[#D4AF37]'
                      : 'bg-white border-[#B8860B]/35 text-[#121214] placeholder-[#857E70] focus:border-[#B8860B]'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#996515] hover:brightness-110 text-[#0B0B0D] font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-mono disabled:opacity-60"
            >
              {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Create VIP Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setError('');
                setMode(mode === 'login' ? 'register' : 'login');
              }}
              className={`text-xs transition-colors cursor-pointer ${
                isDark ? 'text-[#A7A9AC] hover:text-[#E5BE5E]' : 'text-[#55524B] hover:text-[#85570D]'
              }`}
            >
              {mode === 'login' ? "Don't have a VIP profile? Create account" : "Already registered? Sign in"}
            </button>
          </div>

          <div className={`flex items-center justify-center gap-1.5 text-[11px] pt-2 border-t font-mono ${
            isDark ? 'text-[#A7A9AC] border-[#25252A]' : 'text-[#55524B] border-[#B8860B]/20'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" /> 256-Bit Firebase Authentication
          </div>
        </div>
      </div>
    </div>
  );
}
