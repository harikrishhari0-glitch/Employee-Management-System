import Layout from "../../components/layout/Layout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsCards from "../../components/dashboard/StatsCards";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTasks from "../../components/dashboard/RecentTasks";

function EmployeeDashboard() {
  return (
    <Layout>
      <div className="space-y-6">

        <WelcomeBanner />

        <StatsCards />

        <div className="grid grid-cols-3 gap-6">

          <div className="col-span-2">
            <AttendanceChart />
          </div>

          <QuickActions />

        </div>

        <RecentTasks />

      </div>
    </Layout>
  );
}

export default EmployeeDashboard;
