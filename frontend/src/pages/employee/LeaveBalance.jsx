import React, { useEffect, useState } from 'react';
import { employeeService } from '../../services/api';
import { toast } from 'react-toastify';

const LeaveBalance = () => {
    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await employeeService.getBalance();
                setBalances(res.data.data);
            } catch (error) {
                toast.error('Failed to load balances');
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    }, []);

    if (loading) return <div>Loading balances...</div>;

    return (
        <div>
            <h1 className="text-2xl font-semibold text-white mb-6 tracking-tight">My Leave Balances</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {balances.map((b, idx) => (
                    <div key={idx} className="bg-[#1e293b] rounded-xl shadow-lg shadow-black/20 border border-slate-700/50 p-6">
                        <h3 className="text-lg font-bold text-white border-b border-slate-700/50 pb-2 mb-4">{b.leaveType}</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Allocated</span>
                                <span className="font-semibold text-slate-300">{b.allocatedDays}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Used</span>
                                <span className="font-semibold text-red-400">{b.usedDays}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-slate-700/50 mt-2">
                                <span className="font-bold text-slate-300">Available</span>
                                <span className="font-bold text-green-400 text-lg">{b.balance}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaveBalance;
