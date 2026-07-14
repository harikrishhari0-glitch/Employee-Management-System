import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsCards from "../../components/dashboard/StatsCards";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTasks from "../../components/dashboard/RecentTasks";

import { getDashboardData } from "../../services/dashboardService";

function EmployeeDashboard() {

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {

    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard API Error:", error);
      }
    };

    fetchDashboard();

  }, []);

  if (!dashboardData) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh] text-white">
          Loading Dashboard...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="space-y-6">

        <WelcomeBanner />

        <StatsCards
          stats={dashboardData.stats}
        />

        <div className="grid grid-cols-3 gap-6">

          <div className="col-span-2">

            <AttendanceChart
              data={dashboardData.attendance}
            />

          </div>

          <QuickActions />

        </div>

        <RecentTasks />

      </div>

    </Layout>
  );
}

export default EmployeeDashboard;