import { useState } from "react";
import TabContent from "./TabContent";
import TabMenu from "./TabMenu";
import { TabsEnum } from "../constants/tabs";

function Tab() {
  const TAB_NAMES = [
    { id: TabsEnum.Overview, label: "Overview" },
    { id: TabsEnum.History, label: "History" },
  ];
  const [activeTab, setActiveTab] = useState(TAB_NAMES[0].id);
  const onTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="tab">
      <TabMenu
        onTabClick={onTabClick}
        activeTab={activeTab}
        tabNames={TAB_NAMES}
      />
      <TabContent content={activeTab} />
    </div>
  );
}

export default Tab;
