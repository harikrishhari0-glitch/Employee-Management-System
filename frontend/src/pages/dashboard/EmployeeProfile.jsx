import EmployeeSidebar from "../../components/dashboard/employee/EmployeeSidebar";
import EmployeeNavbar from "../../components/dashboard/employee/EmployeeNavbar";
import ProfileLayout from "../../components/dashboard/employee/profile/ProfileLayout";

function Profile() {
  return (
    <div className="employee-dashboard">

      <EmployeeSidebar />

      <div className="employee-main">

        <EmployeeNavbar />

        <ProfileLayout />

      </div>

    </div>
  );
}

export default Profile;