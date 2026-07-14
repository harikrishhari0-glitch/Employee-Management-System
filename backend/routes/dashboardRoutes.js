const express = require("express");

const router = express.Router();

const dashboardController =
require("../controllers/dashboardController");

router.get(
    "/stats",
    dashboardController.getDashboardStats
);

router.get(
    "/departments",
    dashboardController.getDepartments
);

router.get(
    "/attendance",
    dashboardController.getAttendance
);

router.get(
    "/attendance-department",
    dashboardController.getAttendanceByDepartment
);

router.get(
    "/performance",
    dashboardController.getPerformance
);

// NEW ROUTE
router.get(
    "/leave-requests",
    dashboardController.getLeaveRequests
);

module.exports = router;