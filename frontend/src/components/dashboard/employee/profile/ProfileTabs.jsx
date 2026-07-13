function ProfileTabs({ activeTab, setActiveTab }) {

  const tabs = [
    "Personal",
    "Employment",
    "Skills",
    "Documents",
    "Emergency",
  ];

  return (

    <div className="profile-tabs">

      {tabs.map((tab) => (

        <button
          key={tab}
          className={activeTab === tab ? "tab active" : "tab"}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>

      ))}

    </div>

  );
}

export default ProfileTabs;