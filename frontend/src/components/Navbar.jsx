import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Sun, Moon, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Always start in dark mode to match the target design
        document.documentElement.classList.add('dark');
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Guest';
    const initials = user ? `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase() : 'G';
    const roleName = user?.role === 'ADMIN' ? 'Administrator' : 'Senior Engineer';

    return (
        <nav className="bg-[#0d1424] border-b border-slate-800/60 h-14 flex items-center justify-between px-6 flex-shrink-0">
            {/* Search Bar */}
            <div className="relative w-56">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-9 pr-3 py-1.5 bg-[#131c30] border border-slate-800 rounded-lg text-[13px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-600/50 transition-colors"
                    placeholder="Search..."
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#131c30] border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all"
                    title="Toggle theme"
                >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* Notifications */}
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#131c30] border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 right-1.5 block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                </button>

                {/* Divider */}
                <div className="w-px h-5 bg-slate-800"></div>

                {/* User Info */}
                <div className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xs">
                        {initials}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] font-semibold text-white leading-tight">{fullName}</span>
                        <span className="text-[10px] text-slate-500">{roleName}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="ml-1 text-slate-600 hover:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
