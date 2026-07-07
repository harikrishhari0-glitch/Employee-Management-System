import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Calendar, Clock, FileText, CheckSquare, Users } from 'lucide-react';

const Sidebar = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';

    const employeeLinks = [
        { name: 'Dashboard', path: '/', icon: <Home className="w-5 h-5" /> },
        { name: 'Apply Leave', path: '/apply', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Leave History', path: '/history', icon: <Clock className="w-5 h-5" /> },
        { name: 'Leave Balance', path: '/balance', icon: <FileText className="w-5 h-5" /> },
    ];

    const adminLinks = [
        { name: 'Dashboard', path: '/admin', icon: <Home className="w-5 h-5" /> },
        { name: 'All Requests', path: '/admin/requests', icon: <CheckSquare className="w-5 h-5" /> },
    ];

    const links = isAdmin ? adminLinks : employeeLinks;

    return (
        <aside className="w-64 bg-[#1e293b] text-white min-h-screen p-4 border-r border-slate-700/50">
            <div className="mb-8 p-4">
                <h2 className="text-2xl font-bold text-blue-500 tracking-tight">EMS</h2>
            </div>
            <nav className="space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            }`
                        }
                    >
                        {link.icon}
                        <span className="font-medium">{link.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
