import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        pendingRequests: 0,
        approvedToday: 0,
        rejectedToday: 0,
        employeesOnLeave: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await adminService.getDashboardStats();
                if (res.data.success) {
                    setStats({
                        pendingRequests: res.data.data.pendingRequests || 0,
                        approvedToday: res.data.data.approvedToday || 0,
                        rejectedToday: res.data.data.rejectedToday || 0,
                        employeesOnLeave: res.data.data.employeesOnLeave || 0
                    });
                }
            } catch (err) {
                toast.error("Failed to load dashboard stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-white mb-6 tracking-tight">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#1e293b] rounded-xl shadow-lg shadow-black/20 p-6 border border-slate-700/50 border-l-4 border-l-yellow-500">
                    <h3 className="text-slate-400 text-sm font-medium">Pending Requests</h3>
                    <p className="text-3xl font-bold text-white mt-1">{stats.pendingRequests}</p>
                </div>
                <div className="bg-[#1e293b] rounded-xl shadow-lg shadow-black/20 p-6 border border-slate-700/50 border-l-4 border-l-green-500">
                    <h3 className="text-slate-400 text-sm font-medium">Approved Today</h3>
                    <p className="text-3xl font-bold text-white mt-1">{stats.approvedToday}</p>
                </div>
                <div className="bg-[#1e293b] rounded-xl shadow-lg shadow-black/20 p-6 border border-slate-700/50 border-l-4 border-l-red-500">
                    <h3 className="text-slate-400 text-sm font-medium">Rejected Today</h3>
                    <p className="text-3xl font-bold text-white mt-1">{stats.rejectedToday}</p>
                </div>
                <div className="bg-[#1e293b] rounded-xl shadow-lg shadow-black/20 p-6 border border-slate-700/50 border-l-4 border-l-blue-500">
                    <h3 className="text-slate-400 text-sm font-medium">Employees on Leave</h3>
                    <p className="text-3xl font-bold text-white mt-1">{stats.employeesOnLeave}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
