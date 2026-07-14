import React, { useState, useEffect } from 'react';
import CreateDepartmentModal from './CreateDepartmentModal';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDept, setEditingDept] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // NEW: Tracks what you type in the search bar

    const fetchDepartments = async () => {
        try {
            const res = await fetch('/api/departments');
            if (res.ok) {
                const data = await res.json();
                setDepartments(data);
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    };

    const deleteDepartment = async (id) => {
        await fetch(`/api/departments/${id}`, { method: 'DELETE' });
        fetchDepartments();
    };

    useEffect(() => { fetchDepartments(); }, []);

    // NEW: This filters the departments array based on the search query
    const filteredDepartments = departments.filter((dept) => 
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.manager_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Department Management</h1>
                    {/* Updated to show the count of the filtered list */}
                    <p className="text-gray-500 text-sm">{filteredDepartments.length} active departments</p>
                </div>
                
                <div className="flex items-center space-x-4">
                    {/* NEW: Search Bar */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            🔍
                        </span>
                        <input 
                            type="text" 
                            placeholder="Search departments..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none w-64 shadow-sm"
                        />
                    </div>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center"
                    >
                        + Create Department
                    </button>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 gap-6">
                {/* Updated to map over filteredDepartments instead of departments */}
                {filteredDepartments.map((dept) => (
                    <div key={dept.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                                    {dept.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">{dept.name}</h2>
                                    <p className="text-sm text-gray-500">{dept.manager_name}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 font-bold">⋮</button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            <div className="bg-gray-50 p-3 rounded-xl text-center">
                                <div className="text-lg font-bold text-gray-900">0</div>
                                <div className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">Members</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl text-center">
                                <div className="text-lg font-bold text-gray-900">${dept.budget_allocation}</div>
                                <div className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">Budget</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-xl text-center">
                                <div className="text-lg font-bold text-green-600">+3</div>
                                <div className="text-[10px] text-green-700 font-bold tracking-wider uppercase">This Mo.</div>
                            </div>
                        </div>
                        
                        <button className="w-full py-2 mb-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                            👤 View Team
                        </button>
                        <div className="flex justify-end space-x-3 pt-2 border-t border-gray-100">
                            <button onClick={() => setEditingDept(dept)} className="p-2 text-gray-400 hover:text-blue-600">✏️</button>
                            <button onClick={() => deleteDepartment(dept.id)} className="p-2 text-gray-400 hover:text-red-600">🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State (Shows if search finds nothing) */}
            {filteredDepartments.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No departments found matching "{searchQuery}"</p>
                </div>
            )}

            {/* Modal Logic */}
            {(isModalOpen || editingDept) && (
                <CreateDepartmentModal 
                    deptToEdit={editingDept} 
                    closeModal={() => { setIsModalOpen(false); setEditingDept(null); }} 
                    refresh={fetchDepartments} 
                />
            )}
        </div>
    );
};

export default DepartmentList;