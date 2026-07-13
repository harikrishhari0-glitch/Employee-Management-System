import { FiDownload } from "react-icons/fi";
import "../../../../styles/reports/reportsHeader.css";

function ReportsHeader() {
  return (
    <div className="reports-header">

      <div className="reports-title">

        <h1>Reports & Analytics</h1>

        <p>Interactive data reports across all modules</p>

      </div>

      <button className="export-btn">

        <FiDownload size={18} />

        <span>Export</span>

      </button>

    </div>
  );
}

export default ReportsHeader;