const express = require('express');
const db      = require('../config/db');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// ── GET /api/leaves/balance ──────────────────────────────────────────
router.get('/balance', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, leave_type AS leaveType, allocated_days AS allocatedDays,
                    used_days AS usedDays, balance
             FROM leave_balance
             WHERE user_id = ?
             ORDER BY leave_type`,
            [req.user.id]
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ── GET /api/leaves/history ─────────────────────────────────────────
router.get('/history', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT lr.id, lr.leave_type AS leaveType, lr.start_date AS startDate,
                    lr.end_date AS endDate, lr.reason, lr.status,
                    lr.admin_remark AS adminRemark, lr.created_at AS createdAt,
                    CONCAT(u.first_name, ' ', u.last_name) AS userName
             FROM leave_requests lr
             JOIN users u ON u.id = lr.user_id
             WHERE lr.user_id = ?
             ORDER BY lr.created_at DESC`,
            [req.user.id]
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ── POST /api/leaves/apply ──────────────────────────────────────────
router.post('/apply', async (req, res) => {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const start = new Date(startDate);
    const end   = new Date(endDate);

    if (end < start) {
        return res.status(400).json({ success: false, message: 'End date cannot be before start date' });
    }

    const requestedDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;

    try {
        // Check for overlapping leaves
        const [overlap] = await db.query(
            `SELECT COUNT(*) AS count FROM leave_requests
             WHERE user_id = ? AND status NOT IN ('CANCELLED', 'REJECTED')
             AND NOT (end_date < ? OR start_date > ?)`,
            [req.user.id, startDate, endDate]
        );
        if (overlap[0].count > 0) {
            return res.status(400).json({ success: false, message: 'Leave dates overlap with an existing request' });
        }

        // Check balance
        const [balRows] = await db.query(
            'SELECT * FROM leave_balance WHERE user_id = ? AND leave_type = ?',
            [req.user.id, leaveType]
        );
        if (balRows.length === 0) {
            return res.status(400).json({ success: false, message: `No balance found for: ${leaveType}` });
        }
        if (balRows[0].balance < requestedDays) {
            return res.status(400).json({ success: false, message: 'Insufficient leave balance' });
        }

        // Insert leave request
        const [result] = await db.query(
            `INSERT INTO leave_requests (user_id, leave_type, start_date, end_date, reason, status)
             VALUES (?, ?, ?, ?, ?, 'PENDING')`,
            [req.user.id, leaveType, startDate, endDate, reason]
        );

        const [newLeave] = await db.query(
            `SELECT id, leave_type AS leaveType, start_date AS startDate, end_date AS endDate,
                    reason, status, created_at AS createdAt
             FROM leave_requests WHERE id = ?`,
            [result.insertId]
        );

        res.status(201).json({ success: true, message: 'Leave applied successfully', data: newLeave[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ── PUT /api/leaves/cancel/:id ──────────────────────────────────────
router.put('/cancel/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            'SELECT * FROM leave_requests WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Leave request not found' });
        }
        if (rows[0].status !== 'PENDING') {
            return res.status(400).json({ success: false, message: 'Only pending leaves can be cancelled' });
        }
        await db.query("UPDATE leave_requests SET status = 'CANCELLED' WHERE id = ?", [id]);
        res.json({ success: true, message: 'Leave cancelled successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
