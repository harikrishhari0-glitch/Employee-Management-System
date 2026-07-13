import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRightLeft } from 'lucide-react';

// ─── Module 5: Leave Management (Harsha) ───────────────────────────
import { Calendar, CheckSquare } from 'lucide-react';
// ───────────────────────────────────────────────────────────────────

// ─── Module 1: Dashboard ── Add your imports here ──────────────────
// import { LayoutDashboard } from 'lucide-react';
// ───────────────────────────────────────────────────────────────────

// ─── Module 2: Attendance ── Add your imports here ─────────────────
// import { Clock } from 'lucide-react';
// ───────────────────────────────────────────────────────────────────

// ─── Module 3: Payroll ── Add your imports here ────────────────────
// import { DollarSign } from 'lucide-react';
// ───────────────────────────────────────────────────────────────────

// ─── Module 4: Training ── Add your imports here ───────────────────
// import { BookOpen } from 'lucide-react';
// ───────────────────────────────────────────────────────────────────

const Sidebar = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'HR';

    // ── Employee Nav Links ───────────────────────────────────────────
    // Each team member: add your link object to this array.
    // Format: { name: 'Page Name', path: '/path', icon: IconComponent }
    const employeeLinks = [

        // Module 1: Dashboard ── add here
        // { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },

        // Module 2: Attendance ── add here
        // { name: 'Attendance', path: '/attendance', icon: Clock },

        // Module 5: Leave Management (Harsha)
        { name: 'Leave', path: '/leave', icon: Calendar },

        // Module 3: Payroll ── add here
        // { name: 'Payroll', path: '/payroll', icon: DollarSign },

        // Module 4: Training ── add here
        // { name: 'Training', path: '/training', icon: BookOpen },
    ];

    // ── Admin / HR Nav Links ────────────────────────────────────────
    const adminLinks = [

        // Module 1: Dashboard ── add here
        // { name: 'Dashboard', path: '/hr/dashboard', icon: LayoutDashboard },

        // Module 5: Leave Approval (Harsha)
        { name: 'Leave Approval', path: '/hr/leave-approval', icon: CheckSquare },
    ];
    // ────────────────────────────────────────────────────────────────

    const links = isAdmin ? adminLinks : employeeLinks;
    const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'User';
    const initials = user
        ? `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase()
        : 'U';
    const roleName = user?.role === 'ADMIN' ? 'Administrator'
                   : user?.role === 'HR'    ? 'HR Manager'
                   : 'Employee';

    return (
        <aside className="w-56 bg-[#0d1424] flex flex-col border-r border-slate-800/60 min-h-screen">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-4 py-4 border-b border-slate-800/60">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <span className="text-white font-semibold text-base tracking-tight">Nexus HR</span>
            </div>

            {/* Section Label */}
            <div className="px-4 pt-5 pb-2">
                <p className="text-[10px] font-semibold tracking-widest text-slate-600 uppercase">
                    {isAdmin ? 'Admin Portal' : 'Employee Portal'}
                </p>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-2 py-1 space-y-0.5">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${isActive
                                    ? 'bg-[#1a2744] text-white'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-400' : ''}`} />
                                    <span>{link.name}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-3 border-t border-slate-800/60">
                <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-800/40 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-white truncate">{fullName}</p>
                        <p className="text-[10px] text-slate-500 truncate">{roleName}</p>
                    </div>
                    <ArrowRightLeft className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
