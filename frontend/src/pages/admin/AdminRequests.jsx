import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/api';
import { toast } from 'react-toastify';
import StatusBadge from '../../components/StatusBadge';

const AdminRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await adminService.getAllLeaves();
            setRequests(res.data.data);
        } catch (error) {
            toast.error('Failed to load requests');
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        let remark = action === 'approve' ? 'Approved by Admin' : '';
        if (action === 'reject') {
            remark = window.prompt("Reason for rejection:");
            if (!remark) {
                toast.error("Rejection remark is mandatory");
                return;
            }
        }
        
        try {
            if (action === 'approve') {
                await adminService.approveLeave(id, remark);
                toast.success('Leave approved');
            } else {
                await adminService.rejectLeave(id, remark);
                toast.success('Leave rejected');
            }
            fetchRequests();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Action failed');
        }
    };

    if (loading) return <div>Loading requests...</div>;

    return (
        <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight mb-6">All Leave Requests</h1>
            <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl overflow-hidden shadow-lg shadow-black/20">
                <table className="min-w-full divide-y divide-slate-700/50">
                    <thead className="bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {requests.map(req => (
                            <tr key={req.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">{req.userName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{req.leaveType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{req.startDate} to {req.endDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={req.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    {req.status === 'PENDING' && (
                                        <>
                                            <button onClick={() => handleAction(req.id, 'approve')} className="text-white bg-green-600/80 px-3 py-1 rounded hover:bg-green-600 transition-colors shadow-sm shadow-green-500/20">Approve</button>
                                            <button onClick={() => handleAction(req.id, 'reject')} className="text-white bg-red-600/80 px-3 py-1 rounded hover:bg-red-600 transition-colors shadow-sm shadow-red-500/20">Reject</button>
                                        </>
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

export default AdminRequests;
