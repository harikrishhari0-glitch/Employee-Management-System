const pool = require('../config/db');

const getAllDepartments = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM departments ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch departments' });
    }
};

const createDepartment = async (req, res) => {
    try {
        const { name, manager_name, budget_allocation, description } = req.body;
        await pool.execute(
            'INSERT INTO departments (name, manager_name, budget_allocation, description) VALUES (?, ?, ?, ?)',
            [name, manager_name, budget_allocation, description]
        );
        res.status(201).json({ message: 'Department created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create department' });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute('DELETE FROM departments WHERE id = ?', [id]);
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete department' });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, manager_name, budget_allocation, description } = req.body;
        
        await pool.execute(
            'UPDATE departments SET name = ?, manager_name = ?, budget_allocation = ?, description = ? WHERE id = ?',
            [name, manager_name, budget_allocation, description, id]
        );
        
        res.status(200).json({ message: 'Department updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update department' });
    }
};

module.exports = { getAllDepartments, createDepartment, deleteDepartment, updateDepartment };