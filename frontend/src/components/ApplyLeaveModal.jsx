import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { employeeService } from '../services/api';
import { toast } from 'react-toastify';

const ApplyLeaveModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        leaveType: 'Casual Leave',
        startDate: '',
        endDate: '',
        reason: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.startDate || !formData.endDate || !formData.reason) {
            toast.error('Please fill all required fields');
            return;
        }

        setLoading(true);
        try {
            const res = await employeeService.applyLeave(formData);
            if (res.data.success) {
                toast.success('Leave applied successfully');
                if (onSuccess) onSuccess();
                onClose();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to apply leave');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 dark:bg-[#0f172a]/80 backdrop-blur-sm p-4 font-sans transition-colors duration-200">
            <div className="bg-white dark:bg-[#1e293b] rounded-xl w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors duration-200">
                <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Apply for Leave</h2>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-5">
                    <form id="leave-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Leave Type</label>
                            <select 
                                name="leaveType"
                                value={formData.leaveType}
                                onChange={handleChange}
                                className="w-full bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            >
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Earned Leave">Earned Leave</option>
                                <option value="Work From Home">Work From Home</option>
                                <option value="Emergency Leave">Emergency Leave</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Start Date</label>
                                <input 
                                    type="date" 
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:[color-scheme:dark]" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">End Date</label>
                                <input 
                                    type="date" 
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:[color-scheme:dark]" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Reason</label>
                            <textarea 
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                rows="3" 
                                className="w-full bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
                                placeholder="Please provide a brief reason for your leave request..."
                            ></textarea>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end gap-3 p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        form="leave-form"
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20 transition-colors disabled:opacity-70"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Submit Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeaveModal;
