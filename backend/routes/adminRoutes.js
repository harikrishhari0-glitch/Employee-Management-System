const express = require('express');
const db      = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware, adminOnly);

// ── GET /api/admin/leaves ───────────────────────────────────────────
router.get('/leaves', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT lr.id, lr.leave_type AS leaveType, lr.start_date AS startDate,
                    lr.end_date AS endDate, lr.reason, lr.status,
                    lr.admin_remark AS adminRemark, lr.created_at AS createdAt,
                    lr.user_id AS userId,
                    CONCAT(u.first_name, ' ', u.last_name) AS userName, u.email
             FROM leave_requests lr
             JOIN users u ON u.id = lr.user_id
             ORDER BY lr.created_at DESC`
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ── GET /api/admin/pending ──────────────────────────────────────────
router.get('/pending', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT lr.id, lr.leave_type AS leaveType, lr.start_date AS startDate,
                    lr.end_date AS endDate, lr.reason, lr.status,
                    lr.created_at AS createdAt, lr.user_id AS userId,
                    CONCAT(u.first_name, ' ', u.last_name) AS userName, u.email
             FROM leave_requests lr
             JOIN users u ON u.id = lr.user_id
             WHERE lr.status = 'PENDING'
             ORDER BY lr.created_at ASC`
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ── PUT /api/admin/approve/:id ──────────────────────────────────────
router.put('/approve/:id', async (req, res) => {
    const { id }     = req.params;
    const { remark } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM leave_requests WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Leave not found' });

        const leave = rows[0];
        if (leave.status !== 'PENDING') {
            return res.status(400).json({ success: false, message: 'Leave is not pending' });
        }

        const requestedDays = Math.ceil(
            Math.abs(new Date(leave.end_date) - new Date(leave.start_date)) / (1000 * 60 * 60 * 24)
        ) + 1;

        // Check balance before approving
        const [balRows] = await db.query(
            'SELECT * FROM leave_balance WHERE user_id = ? AND leave_type = ?',
            [leave.user_id, leave.leave_type]
        );
        if (balRows.length === 0 || balRows[0].balance < requestedDays) {
            return res.status(400).json({ success: false, message: 'Employee has insufficient balance' });
        }

        // Deduct balance
        await db.query(
            `UPDATE leave_balance
             SET used_days = used_days + ?, balance = balance - ?, updated_at = NOW()
             WHERE user_id = ? AND leave_type = ?`,
            [requestedDays, requestedDays, leave.user_id, leave.leave_type]
        );

        // Approve request
        await db.query(
            "UPDATE leave_requests SET status = 'APPROVED', admin_remark = ?, updated_at = NOW() WHERE id = ?",
            [remark || '', id]
        );

        res.json({ success: true, message: 'Leave approved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ── PUT /api/admin/reject/:id ───────────────────────────────────────
router.put('/reject/:id', async (req, res) => {
    const { id }     = req.params;
    const { remark } = req.body;

    if (!remark || remark.trim() === '') {
        return res.status(400).json({ success: false, message: 'Remark is mandatory for rejection' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM leave_requests WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Leave not found' });
        if (rows[0].status !== 'PENDING') {
            return res.status(400).json({ success: false, message: 'Leave is not pending' });
        }

        await db.query(
            "UPDATE leave_requests SET status = 'REJECTED', admin_remark = ?, updated_at = NOW() WHERE id = ?",
            [remark, id]
        );
        res.json({ success: true, message: 'Leave rejected' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ── GET /api/admin/dashboard ────────────────────────────────────────
router.get('/dashboard', async (req, res) => {
    try {
        const [[pending]]  = await db.query("SELECT COUNT(*) AS count FROM leave_requests WHERE status = 'PENDING'");
        const [[approved]] = await db.query("SELECT COUNT(*) AS count FROM leave_requests WHERE status = 'APPROVED' AND DATE(updated_at) = CURDATE()");
        const [[rejected]] = await db.query("SELECT COUNT(*) AS count FROM leave_requests WHERE status = 'REJECTED' AND DATE(updated_at) = CURDATE()");
        const [[onLeave]]  = await db.query("SELECT COUNT(DISTINCT user_id) AS count FROM leave_requests WHERE status = 'APPROVED' AND start_date <= CURDATE() AND end_date >= CURDATE()");

        res.json({
            success: true,
            data: {
                pendingRequests:  pending.count,
                approvedToday:    approved.count,
                rejectedToday:    rejected.count,
                employeesOnLeave: onLeave.count,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
