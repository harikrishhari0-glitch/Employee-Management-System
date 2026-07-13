import { useState } from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

import PersonalTab from "./personal/PersonalTab";
import EmploymentTab from "./employment/EmploymentTab";
import SkillsTab from "./skills/SkillsTab";
import DocumentsTab from "./documents/DocumentsTab";
import EmergencyTab from "./emergency/EmergencyTab";

import "../../../../styles/profile/profileLayout.css";

function ProfileLayout() {

  const [activeTab, setActiveTab] = useState("Personal");

  return (
    <div className="profile-page">

      <ProfileHeader />

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "Personal" && <PersonalTab />}

      {activeTab === "Employment" && <EmploymentTab />}

      {activeTab === "Skills" && <SkillsTab />}

      {activeTab === "Documents" && <DocumentsTab />}

      {activeTab === "Emergency" && <EmergencyTab />}

    </div>
  );
}

export default ProfileLayout;