import React, { useEffect, useState } from 'react';
import { employeeService } from '../../services/api';
import { toast } from 'react-toastify';
import StatusBadge from '../../components/StatusBadge';

const LeaveHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await employeeService.getHistory();
            setHistory(res.data.data);
        } catch (error) {
            toast.error('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if(window.confirm('Are you sure you want to cancel this leave request?')) {
            try {
                await employeeService.cancelLeave(id);
                toast.success('Leave cancelled successfully');
                fetchHistory();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to cancel');
            }
        }
    };

    if (loading) return <div>Loading history...</div>;

    return (
        <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight mb-6">Leave History</h1>
            <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl overflow-hidden shadow-lg shadow-black/20">
                <table className="min-w-full divide-y divide-slate-700/50">
                    <thead className="bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {history.map(req => (
                            <tr key={req.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{req.leaveType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{req.startDate} to {req.endDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={req.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {req.status === 'PENDING' && (
                                        <button onClick={() => handleCancel(req.id)} className="text-red-400 hover:text-red-300">Cancel</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveHistory;
