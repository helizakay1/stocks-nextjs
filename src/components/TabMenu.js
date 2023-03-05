function TabMenu({ onTabClick, activeTab, tabNames }) {
  return (
    <ul className="tabs-list">
      {tabNames.map((tab) => {
        return (
          <li
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`tab-item ${activeTab === tab.id ? "active-tab" : ""}`}
          >
            {tab.label}
          </li>
        );
      })}
    </ul>
  );
}

export default TabMenu;
