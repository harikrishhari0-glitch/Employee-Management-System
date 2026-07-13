import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import ApplyLeaveModal from '../../components/ApplyLeaveModal';
import { employeeService } from '../../services/api';
import { toast } from 'react-toastify';

const LEAVE_CONFIG = {
    'Casual Leave':    { color: 'bg-purple-500', bar: 'bg-purple-500',  icon: '🟣', iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    'Sick Leave':      { color: 'bg-red-500',    bar: 'bg-red-500',     icon: '🔴', iconColor: 'text-red-400',    iconBg: 'bg-red-500/10',    border: 'border-red-500/20'    },
    'Earned Leave':    { color: 'bg-blue-500',   bar: 'bg-blue-500',    icon: '🔵', iconColor: 'text-blue-400',   iconBg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
    'Work From Home':  { color: 'bg-emerald-500',bar: 'bg-emerald-500', icon: '🟢', iconColor: 'text-emerald-400',iconBg: 'bg-emerald-500/10',border: 'border-emerald-500/20'},
    'Emergency Leave': { color: 'bg-orange-500', bar: 'bg-orange-500',  icon: '🟠', iconColor: 'text-orange-400', iconBg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    'Annual Leave':    { color: 'bg-blue-500',   bar: 'bg-blue-500',    icon: '🔵', iconColor: 'text-blue-400',   iconBg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
    'Sick':            { color: 'bg-red-500',    bar: 'bg-red-500',     icon: '🔴', iconColor: 'text-red-400',    iconBg: 'bg-red-500/10',    border: 'border-red-500/20'    },
    'Personal Leave':  { color: 'bg-purple-500', bar: 'bg-purple-500',  icon: '🟣', iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    'Comp Off Leave':  { color: 'bg-emerald-500',bar: 'bg-emerald-500', icon: '🟢', iconColor: 'text-emerald-400',iconBg: 'bg-emerald-500/10',border: 'border-emerald-500/20'},
};

const getConfig = (type) => {
    if (!type) return { bar: 'bg-slate-500', iconColor: 'text-slate-400', iconBg: 'bg-slate-500/10', border: 'border-slate-500/20' };
    const direct = LEAVE_CONFIG[type];
    if (direct) return direct;
    const lower = type.toLowerCase();
    if (lower.includes('annual') || lower.includes('earned')) return LEAVE_CONFIG['Annual Leave'];
    if (lower.includes('sick')) return LEAVE_CONFIG['Sick Leave'];
    if (lower.includes('casual') || lower.includes('personal')) return LEAVE_CONFIG['Casual Leave'];
    if (lower.includes('work') || lower.includes('home') || lower.includes('comp')) return LEAVE_CONFIG['Work From Home'];
    if (lower.includes('emergency')) return LEAVE_CONFIG['Emergency Leave'];
    return { bar: 'bg-slate-500', iconColor: 'text-slate-400', iconBg: 'bg-slate-500/10', border: 'border-slate-500/20' };
};

// Calendar SVG icons per leave type color
const CalendarIcon = ({ colorClass }) => (
    <svg className={`w-4 h-4 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
);

const LeaveManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leaveBalances, setLeaveBalances] = useState([]);
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [balRes, histRes] = await Promise.all([
                employeeService.getBalance(),
                employeeService.getHistory()
            ]);
            if (balRes.data.success) setLeaveBalances(balRes.data.data);
            if (histRes.data.success) setLeaveHistory(histRes.data.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch leave data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const getTypeBadge = (type) => {
        const cfg = getConfig(type);
        const lower = (type || '').toLowerCase();
        if (lower.includes('annual') || lower.includes('earned')) return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
        if (lower.includes('sick')) return 'bg-red-500/20 text-red-300 border border-red-500/30';
        if (lower.includes('casual') || lower.includes('personal')) return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
        if (lower.includes('work') || lower.includes('home') || lower.includes('comp')) return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
        if (lower.includes('emergency')) return 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    };

    const getShortType = (type) => {
        if (!type) return 'Leave';
        const lower = type.toLowerCase();
        if (lower.includes('annual') || lower.includes('earned')) return 'Annual';
        if (lower.includes('sick')) return 'Sick';
        if (lower.includes('casual')) return 'Casual';
        if (lower.includes('personal')) return 'Personal';
        if (lower.includes('work from home') || lower.includes('wfh')) return 'WFH';
        if (lower.includes('comp')) return 'Comp Off';
        if (lower.includes('emergency')) return 'Emergency';
        return type.split(' ')[0];
    };

    const getStatusBadge = (status) => {
        if (status?.toUpperCase() === 'APPROVED') return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
        if (status?.toUpperCase() === 'REJECTED') return 'bg-red-500/20 text-red-300 border border-red-500/30';
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
    };

    const formatDateRange = (start, end) => {
        if (!start || !end) return '';
        const s = new Date(start);
        const e = new Date(end);
        const sStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const eStr = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (sStr === eStr) return sStr;
        if (s.getMonth() === e.getMonth()) return `${sStr}–${e.getDate()}`;
        return `${sStr}–${eStr}`;
    };

    const calcDays = (start, end) => {
        if (!start || !end) return 0;
        return Math.ceil(Math.abs(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
    };

    const getAppliedDate = (req) => {
        if (req.createdAt) return new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const d = new Date(req.startDate);
        d.setDate(d.getDate() - 5);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-white mb-0.5">Leave Management</h1>
                    <p className="text-slate-500 text-sm">Apply for leave and track your balance</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Apply for Leave
                </button>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {leaveBalances.map((b, idx) => {
                    const cfg = getConfig(b.leaveType);
                    const pct = b.allocatedDays > 0 ? Math.min((b.usedDays / b.allocatedDays) * 100, 100) : 0;
                    return (
                        <div
                            key={idx}
                            className="bg-[#131c30] rounded-xl p-4 border border-slate-800/60 flex flex-col gap-3 hover:border-slate-700 transition-colors"
                        >
                            {/* Icon */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.iconBg} border ${cfg.border}`}>
                                <CalendarIcon colorClass={cfg.iconColor} />
                            </div>
                            {/* Label */}
                            <div>
                                <p className="text-slate-400 text-[12px] font-medium mb-1">{b.leaveType}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-white">{b.balance}</span>
                                    <span className="text-slate-500 text-sm">/ {b.allocatedDays}d</span>
                                </div>
                            </div>
                            {/* Progress bar */}
                            <div>
                                <div className="w-full bg-slate-800 rounded-full h-[3px] mb-1.5 overflow-hidden">
                                    <div className={`h-[3px] rounded-full ${cfg.bar}`} style={{ width: `${pct}%` }} />
                                </div>
                                <p className="text-slate-600 text-[11px]">{b.usedDays} used</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Leave History */}
            <div className="bg-[#131c30] rounded-xl border border-slate-800/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800/60">
                    <h2 className="text-[15px] font-semibold text-white">Leave History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-500 text-[12px] border-b border-slate-800/60">
                                <th className="px-5 py-3 font-medium">Type</th>
                                <th className="px-5 py-3 font-medium">Dates</th>
                                <th className="px-5 py-3 font-medium">Days</th>
                                <th className="px-5 py-3 font-medium">Reason</th>
                                <th className="px-5 py-3 font-medium">Applied</th>
                                <th className="px-5 py-3 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveHistory.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-5 py-10 text-center text-slate-600 text-sm">
                                        No leave history found
                                    </td>
                                </tr>
                            ) : (
                                leaveHistory.map((h) => (
                                    <tr key={h.id} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold ${getTypeBadge(h.leaveType)}`}>
                                                {getShortType(h.leaveType)}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-slate-300 text-[13px]">
                                            {formatDateRange(h.startDate, h.endDate)}
                                        </td>
                                        <td className="px-5 py-3.5 text-slate-400 text-[13px]">
                                            {calcDays(h.startDate, h.endDate)}
                                        </td>
                                        <td className="px-5 py-3.5 text-slate-400 text-[13px] max-w-[180px] truncate">
                                            {h.reason}
                                        </td>
                                        <td className="px-5 py-3.5 text-slate-500 text-[13px]">
                                            {getAppliedDate(h)}
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(h.status)}`}>
                                                {h.status?.toLowerCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ApplyLeaveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchData} />
        </div>
    );
};

export default LeaveManagement;
