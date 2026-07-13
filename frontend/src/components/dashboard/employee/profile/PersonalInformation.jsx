import "../../../../styles/profile/personalInformation.css";

function PersonalInformation() {
  return (
    <div className="personal-info-card">

      <div className="personal-header">

        <h2>Personal Information</h2>

        <button className="save-btn">
          Save Changes
        </button>

      </div>

      <div className="personal-form">

        {/* First Name */}
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            defaultValue="Alex"
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            defaultValue="Chen"
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            defaultValue="alex.chen@nexus.io"
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            defaultValue="+1 (555) 012-4789"
          />
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            defaultValue="1993-08-14"
          />
        </div>

        {/* Nationality */}
        <div className="form-group">
          <label>Nationality</label>
          <input
            type="text"
            defaultValue="US Citizen"
          />
        </div>

        {/* Address */}
        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            rows="3"
            defaultValue="San Francisco, California, USA"
          />
        </div>

        {/* Emergency Contact */}
        <div className="form-group full-width">
          <label>Emergency Contact</label>
          <input
            type="text"
            defaultValue="Wei Chen (Spouse) - +1 (555) 987-6543"
          />
        </div>

      </div>

    </div>
  );
}

export default PersonalInformation;