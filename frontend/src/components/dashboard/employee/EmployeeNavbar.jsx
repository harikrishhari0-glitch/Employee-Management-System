import "../../../styles/employeeNavbar.css";

function EmployeeNavbar() {
  return (
    <header className="employee-navbar">

      <input
        type="text"
        placeholder="Search..."
        className="search-box"
      />

      <div className="employee-info">

        <div className="avatar">
          AC
        </div>

      </div>

    </header>
  );
}

export default EmployeeNavbar;