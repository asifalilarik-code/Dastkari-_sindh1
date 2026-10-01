import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Smartphone, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  KeyRound, 
  User, 
  Briefcase, 
  Palette 
} from 'lucide-react';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginAs, 
    currentRole 
  } = useApp();

  const [authMode, setAuthMode] = useState<'phone' | 'email' | 'roles'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('+92 300 8274192');
  const [otpCode, setOtpCode] = useState(['5', '1', '9', '2', '8', '4']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState('asifalilarik51@gmail.com');
  const [password, setPassword] = useState('••••••••••');
  const [selectedRoleForLogin, setSelectedRoleForLogin] = useState<UserRole>('buyer');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRoleForLogin, phoneNumber, 'Asif Ali Larik');
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRoleForLogin, email, email.split('@')[0]);
  };

  const handleGoogleOAuth = () => {
    loginAs(selectedRoleForLogin, 'asifalilarik51@gmail.com', 'Asif Ali Larik (Google)');
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6DECE] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DECE] bg-[#FAF8F5]">
          <div>
            <h3 className="font-serif-heading text-lg font-bold text-[#201D1C]">
              Dastkari Sindh Portal Login
            </h3>
            <p className="text-xs text-[#7A6F68]">
              Role-Based Access for Patrons, Artisans, and Admin
            </p>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-[#554D47] hover:text-[#201D1C] rounded-full hover:bg-[#F1EAE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E6DECE] bg-[#F1EAE0] text-xs font-semibold">
          <button
            onClick={() => setAuthMode('phone')}
            className={`flex-1 py-2.5 text-center cursor-pointer transition-colors ${
              authMode === 'phone' ? 'bg-white text-[#9C4127] border-b-2 border-[#9C4127]' : 'text-[#7A6F68]'
            }`}
          >
            Phone OTP (SMS)
          </button>
          <button
            onClick={() => setAuthMode('email')}
            className={`flex-1 py-2.5 text-center cursor-pointer transition-colors ${
              authMode === 'email' ? 'bg-white text-[#9C4127] border-b-2 border-[#9C4127]' : 'text-[#7A6F68]'
            }`}
          >
            Email & OAuth
          </button>
          <button
            onClick={() => setAuthMode('roles')}
            className={`flex-1 py-2.5 text-center cursor-pointer transition-colors ${
              authMode === 'roles' ? 'bg-white text-[#9C4127] border-b-2 border-[#9C4127]' : 'text-[#7A6F68]'
            }`}
          >
            Quick Switcher
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          
          {/* Role selector picker */}
          <div>
            <label className="block text-[11px] font-semibold text-[#7A6F68] uppercase tracking-wider mb-1.5">
              Select Your Portal Role:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRoleForLogin('buyer')}
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                  selectedRoleForLogin === 'buyer'
                    ? 'border-[#9C4127] bg-[#FAF3E8] font-bold text-[#9C4127]'
                    : 'border-[#D8CFBE] bg-white text-[#554D47]'
                }`}
              >
                <User className="w-3.5 h-3.5 mx-auto mb-1" />
                <span>Buyer</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRoleForLogin('admin')}
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                  selectedRoleForLogin === 'admin'
                    ? 'border-[#9C4127] bg-[#FAF3E8] font-bold text-[#9C4127]'
                    : 'border-[#D8CFBE] bg-white text-[#554D47]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 mx-auto mb-1" />
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRoleForLogin('artisan')}
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                  selectedRoleForLogin === 'artisan'
                    ? 'border-[#1B2B4C] bg-[#F4F6FA] font-bold text-[#1B2B4C]'
                    : 'border-[#D8CFBE] bg-white text-[#554D47]'
                }`}
              >
                <Palette className="w-3.5 h-3.5 mx-auto mb-1" />
                <span>Artisan</span>
              </button>
            </div>
          </div>

          {/* MODE 1: PHONE OTP (DOMESTIC PAKISTAN REQUIREMENT) */}
          {authMode === 'phone' && (
            <div className="space-y-4">
              {!isOtpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4A433F] mb-1">
                      Mobile Number (Pakistan or International)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#9C4127]"
                      />
                    </div>
                    <span className="text-[10px] text-[#8C827A] mt-1 block">
                      A 6-digit SMS verification code will be sent to your device.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Send 6-Digit SMS OTP</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center space-y-1">
                    <p className="text-xs font-semibold text-[#201D1C]">
                      Enter Verification Code
                    </p>
                    <p className="text-[11px] text-[#7A6F68]">
                      Sent via SMS to <span className="font-mono text-[#201D1C]">{phoneNumber}</span>
                    </p>
                  </div>

                  {/* 6-Digit OTP inputs */}
                  <div className="flex justify-center gap-2">
                    {otpCode.map((digit, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const newCode = [...otpCode];
                          newCode[i] = e.target.value;
                          setOtpCode(newCode);
                        }}
                        className="w-10 h-11 text-center bg-white border border-[#D8CFBE] rounded-lg text-base font-mono font-bold text-[#201D1C] focus:border-[#9C4127] focus:outline-none"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Verify & Access as {selectedRoleForLogin.toUpperCase()}</span>
                  </button>

                  <div className="flex justify-between items-center text-[11px] text-[#7A6F68]">
                    <button
                      type="button"
                      onClick={() => setIsOtpSent(false)}
                      className="hover:underline cursor-pointer"
                    >
                      Change Phone Number
                    </button>
                    <span>Resend in <strong className="font-mono">0:45</strong></span>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* MODE 2: EMAIL & GOOGLE OAUTH */}
          {authMode === 'email' && (
            <div className="space-y-4">
              {/* Google One-Tap */}
              <button
                type="button"
                onClick={handleGoogleOAuth}
                className="w-full py-2.5 bg-white hover:bg-[#FAF8F5] border border-[#D8CFBE] rounded-lg text-xs font-semibold text-[#201D1C] flex items-center justify-center gap-2.5 cursor-pointer shadow-xs transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.25 21.31 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.13z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.58l4.01 3.13c.95-2.83 3.6-4.96 6.72-4.96z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px bg-[#E6DECE] flex-1" />
                <span className="text-[10px] uppercase font-mono text-[#8C827A]">or Email</span>
                <div className="h-px bg-[#E6DECE] flex-1" />
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#D8CFBE] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#9C4127]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#9C4127] hover:bg-[#83341E] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Sign In as {selectedRoleForLogin.toUpperCase()}</span>
                </button>
              </form>
            </div>
          )}

          {/* MODE 3: QUICK ONE-TAP ROLE SWITCHER */}
          {authMode === 'roles' && (
            <div className="space-y-3">
              <p className="text-xs text-[#665D56]">
                Instantly explore the app as any of the three required portal personas:
              </p>

              <button
                type="button"
                onClick={() => loginAs('buyer', 'asifalilarik51@gmail.com', 'Asif Ali Larik')}
                className="w-full p-3 bg-white hover:bg-[#FAF8F5] border border-[#D8CFBE] rounded-xl text-left flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <span className="font-bold text-xs text-[#201D1C] block">Buyer / Collector Portal</span>
                  <span className="text-[11px] text-[#7A6F68]">Browse textiles, wishlist, scale inspector, and order history</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9C4127] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => loginAs('admin', 'admin@dastkari.org', 'Guild Administrator')}
                className="w-full p-3 bg-white hover:bg-[#FAF8F5] border border-[#D8CFBE] rounded-xl text-left flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <span className="font-bold text-xs text-[#9C4127] block">Admin & Catalog Console</span>
                  <span className="text-[11px] text-[#7A6F68]">GMV analytics, order state machine, stock editor & DB schema</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9C4127] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => loginAs('artisan', 'hashim.soomro@bhitshah.guild', 'Ustad Mohammad Hashim')}
                className="w-full p-3 bg-white hover:bg-[#FAF8F5] border border-[#D8CFBE] rounded-xl text-left flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <span className="font-bold text-xs text-[#1B2B4C] block">Artisan / Vendor Guild View</span>
                  <span className="text-[11px] text-[#7A6F68]">View direct cooperative payout, workshop orders & craft batch status</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#1B2B4C] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E6DECE] bg-[#FAF8F5] text-center text-[11px] text-[#7A6F68]">
          <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-[#2E6F40]" />
          <span>Encrypted with HttpOnly JWT session tokens & SMS rate-limiting</span>
        </div>

      </div>
    </div>
  );
};
