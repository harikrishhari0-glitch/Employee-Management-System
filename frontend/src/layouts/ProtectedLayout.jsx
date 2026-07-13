import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const ProtectedLayout = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#0a0f1c] text-slate-400 text-sm">
            Loading...
        </div>
    );

    if (!user) return <Navigate to="/login" replace />;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex h-screen bg-[#0a0f1c] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0d1525] p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ProtectedLayout;
