import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { toast } from 'react-toastify';
import { Mail, Lock, Eye, EyeOff, Users, Building2, Briefcase, Activity } from 'lucide-react';

const stats = [
    { icon: Users,      value: '108',   label: 'Employees'   },
    { icon: Building2,  value: '6',     label: 'Departments' },
    { icon: Briefcase,  value: '8',     label: 'Open Roles'  },
    { icon: Activity,   value: '99.9%', label: 'Uptime'      },
];

const ROLES = ['Employee', 'HR', 'Admin'];

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState('Employee');
    const [activeTab, setActiveTab]       = useState('Password');
    const [email, setEmail]               = useState('');
    const [password, setPassword]         = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading]           = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const res = await authService.login({ email, password });
            if (res.data.success) {
                const { token, user: userData } = res.data.data;
                login(userData, token);
                toast.success(`Welcome back, ${userData.firstName}!`);
                if (userData.role === 'ADMIN' || userData.role === 'HR') {
                    navigate('/hr/leave-approval');
                } else {
                    navigate('/leave');
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c] flex" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

            {/* ── Left Panel ── */}
            <div className="hidden lg:flex w-[420px] flex-shrink-0 bg-[#0d1424] border-r border-slate-800/60 flex-col p-10">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-[15px]">Nexus Technologies</span>
                </div>

                {/* Headline */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white leading-tight mb-4">
                        People-first<br />workforce platform
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Streamline HR operations, track performance, and<br />
                        empower your team — all in one unified workspace.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {stats.map(({ icon: Icon, value, label }) => (
                        <div
                            key={label}
                            className="bg-[#131c30] border border-slate-800/60 rounded-xl p-4 hover:border-slate-700 transition-colors"
                        >
                            <Icon className="w-4 h-4 text-blue-400 mb-2" />
                            <p className="text-xl font-bold text-white leading-none mb-1">{value}</p>
                            <p className="text-slate-500 text-xs">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Right Panel ── */}
            <div className="flex-1 flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-[420px]">
                    {/* Heading */}
                    <div className="mb-7">
                        <h2 className="text-2xl font-bold text-white mb-1">Sign in</h2>
                        <p className="text-slate-500 text-sm">Welcome back to Nexus Technologies</p>
                    </div>

                    {/* Role Tabs */}
                    <div className="flex bg-[#131c30] border border-slate-800 rounded-xl p-1 mb-6">
                        {ROLES.map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => setSelectedRole(role)}
                                className={`flex-1 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 ${
                                    selectedRole === role
                                        ? 'bg-[#1e2d4a] text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>

                    {/* Password / OTP Sub-tabs */}
                    <div className="flex gap-5 mb-6 border-b border-slate-800">
                        {['Password', 'OTP'].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px ${
                                    activeTab === tab
                                        ? 'text-white border-blue-500'
                                        : 'text-slate-500 border-transparent hover:text-slate-300'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-[13px] font-medium text-slate-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="alex.chen@nexus.io"
                                    className="w-full bg-[#131c30] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-[13px] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-600/60 focus:ring-1 focus:ring-blue-600/30 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[13px] font-medium text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#131c30] border border-slate-800 rounded-xl pl-10 pr-11 py-3 text-[13px] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-600/60 focus:ring-1 focus:ring-blue-600/30 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    className="text-[12px] text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-[14px] transition-all duration-150 shadow-lg shadow-blue-600/20 mt-2"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
