import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { employeeService } from '../../services/api';
import { LEAVE_TYPES } from '../../constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const startDate = watch('startDate');
    const endDate = watch('endDate');

    const calculateDays = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (end >= start) {
                return ((end - start) / (1000 * 60 * 60 * 24)) + 1;
            }
        }
        return 0;
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await employeeService.applyLeave(data);
            if (res.data.success) {
                toast.success('Leave applied successfully');
                navigate('/history');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to apply leave');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-[#1e293b] p-8 rounded-xl shadow-lg border border-slate-700/50">
            <h1 className="text-2xl font-bold text-white mb-6 tracking-tight">Apply for Leave</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300">Leave Type</label>
                    <select 
                        {...register('leaveType', { required: 'Leave type is required' })}
                        className="mt-1 block w-full rounded-md border-slate-700 shadow-sm border p-2 bg-slate-800 text-white focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select a type...</option>
                        {LEAVE_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.leaveType && <span className="text-red-400 text-xs">{errors.leaveType.message}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Start Date</label>
                        <input 
                            type="date"
                            {...register('startDate', { required: 'Start date is required' })}
                            className="mt-1 block w-full rounded-md border-slate-700 shadow-sm border p-2 bg-slate-800 text-white focus:ring-blue-500 focus:border-blue-500 [color-scheme:dark]"
                        />
                        {errors.startDate && <span className="text-red-400 text-xs">{errors.startDate.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300">End Date</label>
                        <input 
                            type="date"
                            {...register('endDate', { required: 'End date is required' })}
                            className="mt-1 block w-full rounded-md border-slate-700 shadow-sm border p-2 bg-slate-800 text-white focus:ring-blue-500 focus:border-blue-500 [color-scheme:dark]"
                        />
                        {errors.endDate && <span className="text-red-400 text-xs">{errors.endDate.message}</span>}
                    </div>
                </div>

                <div className="bg-slate-800 p-4 rounded-md border border-slate-700/50">
                    <span className="text-blue-400 font-medium">Total Days: {calculateDays()}</span>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300">Reason</label>
                    <textarea 
                        rows="3"
                        {...register('reason', { required: 'Reason is required' })}
                        className="mt-1 block w-full rounded-md border-slate-700 shadow-sm border p-2 bg-slate-800 text-white focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                    {errors.reason && <span className="text-red-400 text-xs">{errors.reason.message}</span>}
                </div>

                <button type="submit" disabled={loading || calculateDays() <= 0} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default ApplyLeave;
