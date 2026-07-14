const express = require('express');
const router = express.Router();
const { getAllDepartments, createDepartment, deleteDepartment, updateDepartment } = require('../controllers/departmentController');

router.get('/', getAllDepartments);
router.post('/', createDepartment);
router.delete('/:id', deleteDepartment);
router.put('/:id', updateDepartment); 

module.exports = router;