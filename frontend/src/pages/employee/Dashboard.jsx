import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeService } from '../../services/api';
import { toast } from 'react-toastify';
import { Calendar, Plus, HelpCircle } from 'lucide-react';
import ApplyLeaveModal from '../../components/ApplyLeaveModal';

const Dashboard = () => {
    const [balances, setBalances] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [balRes, histRes] = await Promise.all([
                    employeeService.getBalance(),
                    employeeService.getHistory()
                ]);
                setBalances(balRes.data.data);
                setHistory(histRes.data.data);
            } catch (error) {
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-full flex items-center justify-center text-slate-300">Loading dashboard...</div>;

    const getLeaveColor = (type) => {
        if (!type) return 'bg-gray-500 text-gray-500 border-gray-500';
        if (type.includes('Earned') || type.includes('Annual')) return 'bg-blue-500 text-blue-500 border-blue-500';
        if (type.includes('Sick')) return 'bg-red-500 text-red-500 border-red-500';
        if (type.includes('Personal') || type.includes('Casual')) return 'bg-purple-500 text-purple-500 border-purple-500';
        return 'bg-green-500 text-green-500 border-green-500'; // Comp Off / WFH
    };

    const getLeaveBadgeStyle = (type) => {
        if (!type) return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
        if (type.includes('Earned') || type.includes('Annual')) return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
        if (type.includes('Sick')) return 'bg-red-500/20 text-red-400 border border-red-500/30';
        if (type.includes('Personal') || type.includes('Casual')) return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
    };

    const getStatusStyle = (status) => {
        if (status === 'APPROVED') return 'text-green-400 border border-green-500/30 bg-green-500/10 px-3 py-1 rounded-full text-xs font-medium';
        if (status === 'REJECTED') return 'text-red-400 border border-red-500/30 bg-red-500/10 px-3 py-1 rounded-full text-xs font-medium';
        return 'text-yellow-400 border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 rounded-full text-xs font-medium';
    };

    const getDays = (start, end) => {
        if (!start || !end) return 0;
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
        return diffDays;
    };
    
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Calculate usage per month for the chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const usageData = months.map(m => ({ month: m, count: 0, color: 'bg-blue-500' }));
    
    history.forEach(h => {
        if (h.status?.toUpperCase() === 'APPROVED' || h.status?.toUpperCase() === 'PENDING') {
            const d = new Date(h.startDate);
            const mIdx = d.getMonth();
            if (!isNaN(mIdx)) {
                usageData[mIdx].count += getDays(h.startDate, h.endDate);
                const cClass = getLeaveColor(h.leaveType).split(' ')[0];
                usageData[mIdx].color = cClass;
            }
        }
    });

    const maxUsage = Math.max(...usageData.map(d => d.count), 8); // at least 8 for scale

    return (
        <div className="relative font-sans w-full">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">Leave Management</h1>
                        <p className="text-slate-400 text-sm mt-1">Apply for leave and track your balance</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm shadow-blue-500/20"
                    >
                        <Plus size={18} /> Apply for Leave
                    </button>
                </div>

                {/* Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {balances.map(bal => {
                        const colorClass = getLeaveColor(bal.leaveType);
                        const [bgCol, textCol] = colorClass.split(' ');
                        const percentage = (bal.usedDays / bal.allocatedDays) * 100 || 0;
                        
                        return (
                            <div key={bal.id} className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5 shadow-lg shadow-black/20 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-2 rounded-lg bg-slate-800 border border-slate-700 ${textCol}`}>
                                            <Calendar size={18} />
                                        </div>
                                    </div>
                                    <h3 className="text-slate-300 font-medium mb-1">{bal.leaveType}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-white">{bal.usedDays}</span>
                                        <span className="text-slate-500 text-sm">/ {bal.allocatedDays}d</span>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
                                        <div className={`h-1.5 rounded-full ${bgCol}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                                    </div>
                                    <p className="text-xs text-slate-500">{bal.usedDays} used</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* History Table */}
                <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl overflow-hidden shadow-lg shadow-black/20">
                    <div className="p-5 border-b border-slate-700/50">
                        <h2 className="text-lg font-semibold text-white">Leave History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-700/50 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium">Type</th>
                                    <th className="px-6 py-4 font-medium">Dates</th>
                                    <th className="px-6 py-4 font-medium">Days</th>
                                    <th className="px-6 py-4 font-medium">Reason</th>
                                    <th className="px-6 py-4 font-medium">Applied</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50 text-sm">
                                {history.length > 0 ? history.map(req => (
                                    <tr key={req.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLeaveBadgeStyle(req.leaveType)}`}>
                                                {req.leaveType ? req.leaveType.split(' ')[0] : 'Leave'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
                                            {formatDate(req.startDate)} {req.startDate !== req.endDate ? `- ${formatDate(req.endDate)}` : ''}
                                        </td>
                                        <td className="px-6 py-4 text-slate-300 font-medium whitespace-nowrap">
                                            {getDays(req.startDate, req.endDate)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 truncate max-w-[200px]">
                                            {req.reason}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                                            {formatDate(req.createdAt || req.startDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={getStatusStyle(req.status)}>{req.status.toLowerCase()}</span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No leave history found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Usage Chart */}
                <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5 shadow-lg shadow-black/20">
                    <h2 className="text-lg font-semibold text-white mb-6">Leave Usage - {new Date().getFullYear()}</h2>
                    
                    <div className="h-48 flex items-end justify-between relative pl-8 pb-6 mt-4">
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-slate-500">
                            <span>{maxUsage}</span>
                            <span>{Math.floor(maxUsage/2)}</span>
                            <span>0</span>
                        </div>
                        
                        {/* Grid lines */}
                        <div className="absolute left-6 right-0 top-2 border-b border-dashed border-slate-700/50"></div>
                        <div className="absolute left-6 right-0 top-1/2 border-b border-dashed border-slate-700/50"></div>
                        <div className="absolute left-6 right-0 bottom-6 border-b border-slate-700/50"></div>
                        
                        {/* Bars */}
                        {usageData.map((d, i) => {
                            const height = `${(d.count / maxUsage) * 100}%`;
                            return (
                                <div key={i} className="flex flex-col items-center justify-end w-full h-full relative z-10 group">
                                    {d.count > 0 && (
                                        <div 
                                            className={`w-2 md:w-3 rounded-t-sm ${d.color} transition-all duration-300 group-hover:opacity-80 group-hover:w-3 md:group-hover:w-4`}
                                            style={{ height: height }}
                                        >
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg transition-opacity pointer-events-none">
                                                {d.count} days
                                            </div>
                                        </div>
                                    )}
                                    <span className="text-xs text-slate-500 absolute -bottom-6">{d.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            {/* Floating Help Icon */}
            <button className="fixed bottom-6 right-6 p-3 bg-slate-800 border border-slate-700 text-slate-400 rounded-full hover:bg-slate-700 hover:text-white transition-colors shadow-lg shadow-black/30">
                <HelpCircle size={20} />
            </button>

            {/* Apply Leave Modal */}
            <ApplyLeaveModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={() => window.location.reload()} 
            />
        </div>
    );
};

export default Dashboard;

