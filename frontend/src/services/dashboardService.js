import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

export const getDashboardData = async () => {

  try {

    const [
      stats,
      attendance,
      attendanceByDepartment,
      departments,
      performance,
      leaveRequests,
    ] = await Promise.all([

      axios.get(`${API_URL}/stats`),
      axios.get(`${API_URL}/attendance`),
      axios.get(`${API_URL}/attendance-department`),
      axios.get(`${API_URL}/departments`),
      axios.get(`${API_URL}/performance`),
      axios.get(`${API_URL}/leave-requests`),

    ]);

    return {

      stats: stats.data,
      attendance: attendance.data,
      attendanceByDepartment: attendanceByDepartment.data,
      departments: departments.data,
      performance: performance.data,
      leaveRequests: leaveRequests.data,

    };

  } catch (error) {

    console.error("Dashboard Service Error:", error);

    throw error;

  }

};