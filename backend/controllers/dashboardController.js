const dashboardService = require("../services/dashboardService");

const getDashboardStats = async (req, res) => {

    try {

        const stats = await dashboardService.getStats();

        res.json(stats);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

const getDepartments = async (req, res) => {

    try {

        const departments =
            await dashboardService.getDepartments();

        res.json(departments);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

const getAttendance = async (req, res) => {

    try {

        const attendance =
            await dashboardService.getAttendance();

        res.json(attendance);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

const getAttendanceByDepartment = async (req, res) => {

    try {

        const attendance =
            await dashboardService.getAttendanceByDepartment();

        res.json(attendance);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

const getPerformance = async (req, res) => {

    try {

        const performance =
            await dashboardService.getPerformance();

        res.json(performance);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

const getLeaveRequests = async (req, res) => {

    try {

        const requests =
            await dashboardService.getLeaveRequests();

        res.json(requests);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

module.exports = {
    getDashboardStats,
    getDepartments,
    getAttendance,
    getAttendanceByDepartment,
    getPerformance,
    getLeaveRequests,
};