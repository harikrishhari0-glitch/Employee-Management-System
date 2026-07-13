import {
  HiOutlineCamera,
  HiOutlineEnvelope,
  HiOutlinePhone
} from "react-icons/hi2";

import "../../../../styles/profile/profileCard.css";

function ProfileCard() {
  return (
    <div className="profile-card">

      <div className="profile-image-wrapper">

        <img
          src="https://i.pravatar.cc/250?img=12"
          alt="profile"
          className="profile-image"
        />

        <button className="camera-btn">
          <HiOutlineCamera />
        </button>

      </div>

      <h2>Alex Chen</h2>

      <p className="designation">
        Senior Engineer
      </p>

      <span className="employee-id">
        EMP-2847
      </span>

      <div className="profile-divider"></div>

      <div className="contact-row">
        <HiOutlineEnvelope className="contact-icon"/>
        <span>alex.chen@nexus.io</span>
      </div>

      <div className="contact-row">
        <HiOutlinePhone className="contact-icon"/>
        <span>+1 (555) 012-4789</span>
      </div>

    </div>
  );
}

export default ProfileCard;