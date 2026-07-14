const db = require("../config/db");

const {
  attendance,
  attendanceByDepartment,
  performance,
} = require("../data/dashboardData");

const leaveRequests = require("../data/leaveRequests");

const getStats = async () => {

    const [total] = await db.query(
        "SELECT COUNT(*) AS totalEmployees FROM employees"
    );

    const [active] = await db.query(
        "SELECT COUNT(*) AS activeEmployees FROM employees WHERE status='Active'"
    );

    return {
        totalEmployees: total[0].totalEmployees,
        activeEmployees: active[0].activeEmployees,
        onLeave: 8,
        avgAttendance: 94,
    };
};

const getDepartments = async () => {

    const [rows] = await db.query(`
        SELECT
        department AS name,
        COUNT(*) AS value
        FROM employees
        GROUP BY department
    `);

    return rows;
};

const getAttendance = async () => {
    return attendance;
};

const getAttendanceByDepartment = async () => {
    return attendanceByDepartment;
};

const getPerformance = async () => {
    return performance;
};

const getLeaveRequests = async () => {
    return leaveRequests;
};

module.exports = {
    getStats,
    getDepartments,
    getAttendance,
    getAttendanceByDepartment,
    getPerformance,
    getLeaveRequests,
};