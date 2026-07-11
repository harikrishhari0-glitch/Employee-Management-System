import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-[#1e293b] shadow-sm border-b border-slate-700/50 h-16 flex items-center justify-between px-6">
            <div className="font-semibold text-xl text-blue-500 tracking-tight">EMS Leave Module</div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">{user?.name || 'Guest'}</span>
                </div>
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors">
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
