export const adminDashboardData = {
  stats: [
    {
      title: "Total Employees",
      value: 250,
      change: "+12%",
      color: "#4F46E5",
      icon: "employees",
    },
    {
      title: "Active Employees",
      value: 228,
      change: "+8%",
      color: "#22C55E",
      icon: "active",
    },
    {
      title: "Departments",
      value: 8,
      change: "+2",
      color: "#F59E0B",
      icon: "department",
    },
    {
      title: "Monthly Payroll",
      value: "₹15.2L",
      change: "+5%",
      color: "#EF4444",
      icon: "payroll",
    },
  ],

  employeeGrowth: [
    { month: "Jan", employees: 120 },
    { month: "Feb", employees: 132 },
    { month: "Mar", employees: 145 },
    { month: "Apr", employees: 160 },
    { month: "May", employees: 178 },
    { month: "Jun", employees: 195 },
  ],

  departmentDistribution: [
    { name: "IT", value: 40 },
    { name: "HR", value: 20 },
    { name: "Finance", value: 15 },
    { name: "Sales", value: 25 },
  ],

  recentActivities: [
    {
      id: 1,
      user: "Rohan Sharma",
      action: "joined IT Department",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Payroll",
      action: "processed successfully",
      time: "Today",
    },
    {
      id: 3,
      user: "Priya Patel",
      action: "requested leave",
      time: "Yesterday",
    },
    {
      id: 4,
      user: "HR",
      action: "updated employee profile",
      time: "Yesterday",
    },
  ],
};