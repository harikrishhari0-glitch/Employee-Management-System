import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, Check, X, Loader2 } from 'lucide-react';
import { adminService } from '../../services/api';
import { toast } from 'react-toastify';

const LeaveApproval = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [processedRequests, setProcessedRequests] = useState([]);
    const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [pendingRes, allRes, statsRes] = await Promise.all([
                adminService.getPendingLeaves(),
                adminService.getAllLeaves(),
                adminService.getDashboardStats()
            ]);

            if (pendingRes.data.success) {
                setPendingRequests(pendingRes.data.data);
            }
            if (allRes.data.success) {
                // Filter out pending from all leaves for the recently processed table
                const processed = allRes.data.data.filter(req => req.status !== 'PENDING');
                setProcessedRequests(processed);
            }
            if (statsRes.data.success) {
                setStats(statsRes.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch leave data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = async (id) => {
        try {
            const res = await adminService.approveLeave(id, 'Approved');
            if (res.data.success) {
                toast.success('Leave approved successfully');
                fetchData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to approve leave');
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await adminService.rejectLeave(id, 'Rejected');
            if (res.data.success) {
                toast.success('Leave rejected successfully');
                fetchData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reject leave');
        }
    };

    // Helper functions for UI mapping
    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const getColorClass = (name) => {
        const colors = ['bg-blue-600', 'bg-purple-600', 'bg-emerald-600', 'bg-pink-600', 'bg-orange-600', 'bg-indigo-600'];
        if (!name) return colors[0];
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    const getTypeStyle = (type) => {
        if (type?.toLowerCase().includes('annual')) return 'bg-blue-500/10 text-blue-400';
        if (type?.toLowerCase().includes('sick')) return 'bg-red-500/10 text-red-400';
        return 'bg-purple-500/10 text-purple-400';
    };

    const getStatusStyle = (status) => {
        if (status?.toUpperCase() === 'APPROVED') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        if (status?.toUpperCase() === 'REJECTED') return 'bg-red-500/10 text-red-400 border-red-500/20';
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    };

    const formatDateRange = (start, end) => {
        if (!start || !end) return '';
        const startDate = new Date(start);
        const endDate = new Date(end);
        const startStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const endStr = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (startStr === endStr) return startStr;
        if (startDate.getMonth() === endDate.getMonth()) {
            return `${startStr}–${endDate.getDate()}`;
        }
        return `${startStr}–${endStr}`;
    };

    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const diffTime = Math.abs(new Date(end) - new Date(start));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
        return diffDays;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="text-slate-900 dark:text-slate-300 font-sans max-w-6xl mx-auto pb-10 transition-colors duration-200">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Leave Approval</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Review and action pending leave requests</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div className="bg-white dark:bg-[#151e32] rounded-xl p-5 border border-slate-200 dark:border-slate-700/50 shadow-sm transition-colors duration-200">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-slate-500 text-xs font-semibold tracking-widest uppercase">Pending</h3>
                        <div className="bg-yellow-500/10 w-8 h-8 rounded flex items-center justify-center">
                            <Clock className="w-4 h-4 text-yellow-500" />
                        </div>
                    </div>
                    <div className="text-[32px] font-bold text-slate-900 dark:text-white leading-none">{stats.pending || 0}</div>
                </div>
                <div className="bg-white dark:bg-[#151e32] rounded-xl p-5 border border-slate-200 dark:border-slate-700/50 shadow-sm transition-colors duration-200">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-slate-500 text-xs font-semibold tracking-widest uppercase">Approved This Month</h3>
                        <div className="bg-emerald-500/10 w-8 h-8 rounded flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                    </div>
                    <div className="text-[32px] font-bold text-slate-900 dark:text-white leading-none">{stats.approved || 0}</div>
                </div>
                <div className="bg-white dark:bg-[#151e32] rounded-xl p-5 border border-slate-200 dark:border-slate-700/50 shadow-sm transition-colors duration-200">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-slate-500 text-xs font-semibold tracking-widest uppercase">Rejected</h3>
                        <div className="bg-red-500/10 w-8 h-8 rounded flex items-center justify-center">
                            <XCircle className="w-4 h-4 text-red-500" />
                        </div>
                    </div>
                    <div className="text-[32px] font-bold text-slate-900 dark:text-white leading-none">{stats.rejected || 0}</div>
                </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white dark:bg-[#151e32] rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm mb-8 overflow-hidden transition-colors duration-200">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800/50">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">Pending Requests ({pendingRequests.length})</h2>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/50 p-2">
                    {pendingRequests.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">No pending requests</div>
                    ) : (
                        pendingRequests.map((req) => (
                            <div key={req.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-lg transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0 ${getColorClass(req.userName)}`}>
                                        {getInitials(req.userName)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-medium text-slate-900 dark:text-white">{req.userName}</h4>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${getTypeStyle(req.leaveType)}`}>
                                                {req.leaveType}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {formatDateRange(req.startDate, req.endDate)} &middot; {calculateDays(req.startDate, req.endDate)} {calculateDays(req.startDate, req.endDate) === 1 ? 'day' : 'days'} &middot; {req.reason}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 ml-14 md:ml-0">
                                    <button onClick={() => handleApprove(req.id)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors text-[13px] font-medium border border-emerald-500/20">
                                        <Check className="w-4 h-4" /> Approve
                                    </button>
                                    <button onClick={() => handleReject(req.id)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors text-[13px] font-medium border border-red-500/20">
                                        <X className="w-4 h-4" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Recently Processed Table */}
            <div className="bg-white dark:bg-[#151e32] rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden transition-colors duration-200">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800/50">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">Recently Processed</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                            <tr className="text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-800/50">
                                <th className="px-5 py-4 font-medium">Employee</th>
                                <th className="px-5 py-4 font-medium">Type</th>
                                <th className="px-5 py-4 font-medium">Dates</th>
                                <th className="px-5 py-4 font-medium">Days</th>
                                <th className="px-5 py-4 font-medium">Remark</th>
                                <th className="px-5 py-4 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-[13px]">
                            {processedRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">No processed requests found</td>
                                </tr>
                            ) : (
                                processedRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs ${getColorClass(req.userName)}`}>
                                                    {getInitials(req.userName)}
                                                </div>
                                                <span className="font-medium text-slate-900 dark:text-slate-200">{req.userName}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{req.leaveType}</td>
                                        <td className="px-5 py-4 text-slate-900 dark:text-slate-300 font-medium">{formatDateRange(req.startDate, req.endDate)}</td>
                                        <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{calculateDays(req.startDate, req.endDate)}</td>
                                        <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{req.adminRemark || '-'}</td>
                                        <td className="px-5 py-4 text-right">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(req.status)}`}>
                                                {req.status?.toLowerCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeaveApproval;
