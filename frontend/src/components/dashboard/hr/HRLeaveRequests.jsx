import { Check, X } from "lucide-react";
import "./HRLeaveRequests.css";

const requests = [
  {
    initials: "MS",
    color: "#8B5CF6",
    name: "Maria Santos",
    details: "Annual · Jul 15–19 (5d) · Family vacation",
  },
  {
    initials: "JP",
    color: "#10B981",
    name: "James Park",
    details: "Sick · Jul 5 (1d) · Medical appointment",
  },
  {
    initials: "TW",
    color: "#EF4444",
    name: "Tom Walker",
    details: "Personal · Jul 8–9 (2d) · Personal errands",
  },
];

function HRLeaveRequests() {
  return (
    <div className="leave-card">

      <h3>Pending Leave Requests</h3>

      {requests.map((item) => (
        <div className="leave-item" key={item.name}>

          <div className="leave-user">

            <div
              className="avatar"
              style={{ background: item.color }}
            >
              {item.initials}
            </div>

            <div>

              <h4>{item.name}</h4>

              <p>{item.details}</p>

            </div>

          </div>

          <div className="leave-actions">

            <button className="approve">
              <Check size={18} />
            </button>

            <button className="reject">
              <X size={18} />
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}

export default HRLeaveRequests;