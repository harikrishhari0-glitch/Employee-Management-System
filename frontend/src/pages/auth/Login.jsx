import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { toast } from 'react-toastify';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await authService.login(data);
            if (res.data.success) {
                const { token, user: userData } = res.data.data;
                login(userData, token);
                toast.success(res.data.message);
                if (userData.role === 'ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center font-sans">
            <div className="bg-[#1e293b] p-8 rounded-xl shadow-lg shadow-black/20 w-full max-w-md border border-slate-700/50">
                <h1 className="text-2xl font-bold text-center text-white mb-6 tracking-tight">Login to EMS</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Email</label>
                        <input 
                            {...register('email', { required: 'Email is required' })}
                            className="mt-1 block w-full rounded-md border-slate-700 shadow-sm border p-2 bg-slate-800 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="admin@company.com"
                        />
                        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Password</label>
                        <input 
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="mt-1 block w-full rounded-md border-slate-700 shadow-sm border p-2 bg-slate-800 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-400 text-xs">{errors.password.message}</span>}
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 shadow-sm shadow-blue-500/20">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
