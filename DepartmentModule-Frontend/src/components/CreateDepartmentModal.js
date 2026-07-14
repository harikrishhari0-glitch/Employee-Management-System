import React, { useState, useEffect } from 'react';

const CreateDepartmentModal = ({ closeModal, refresh, deptToEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        manager_name: '',
        budget_allocation: '',
        description: ''
    });

    useEffect(() => {
        if (deptToEdit) {
            setFormData({
                name: deptToEdit.name,
                manager_name: deptToEdit.manager_name,
                budget_allocation: deptToEdit.budget_allocation,
                description: deptToEdit.description || ''
            });
        }
    }, [deptToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const url = deptToEdit ? `/api/departments/${deptToEdit.id}` : '/api/departments';
        const method = deptToEdit ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            refresh();
            closeModal();
        } catch (error) {
            console.error("Failed to save department", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-6 text-gray-900">
                    {deptToEdit ? 'Edit Department' : 'Create New Department'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                        <input 
                            type="text" name="name" value={formData.name} onChange={handleChange} required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none" 
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Manager Name</label>
                        <input 
                            type="text" name="manager_name" value={formData.manager_name} onChange={handleChange} required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none" 
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget Allocation</label>
                        <input 
                            type="number" step="0.01" name="budget_allocation" value={formData.budget_allocation} onChange={handleChange} required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none" 
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                            name="description" value={formData.description} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none" 
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                            {deptToEdit ? 'Save Changes' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDepartmentModal;