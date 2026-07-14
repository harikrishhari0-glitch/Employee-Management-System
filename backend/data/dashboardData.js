const attendance = [
  { month: "Jan", attendance: 91 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 97 },
  { month: "Jun", attendance: 94 },
];

const attendanceByDepartment = [
  { department: "Engineering", attendance: 96 },
  { department: "Design", attendance: 98 },
  { department: "Marketing", attendance: 91 },
  { department: "Sales", attendance: 89 },
  { department: "HR", attendance: 99 },
  { department: "Finance", attendance: 97 },
];

const performance = [
  { rating: "5.0", employees: 8 },
  { rating: "4.5", employees: 24 },
  { rating: "4.0", employees: 38 },
  { rating: "3.5", employees: 22 },
  { rating: "3.0", employees: 12 },
  { rating: "<3", employees: 4 },
];

module.exports = {
  attendance,
  attendanceByDepartment,
  performance,
};