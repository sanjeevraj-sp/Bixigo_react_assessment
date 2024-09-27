import React, { useState } from "react"; 
import MyMoves from "./MyMoves";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckArrowRight, faUser, faFileInvoiceDollar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "../Stylesheets/HomeTabs.css";

const HomeTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0); 

  const tabStyles = (index) => ({
    borderLeft: "4px solid transparent",
    color: selectedTab === index ? "#ef553b" : "black",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    "&.Mui-selected": {
      color: "#ef553b",
      backgroundColor: "#fae4df",
      fontFamily: "'Lato', sans-serif",
      fontWeight: 590,
    },
    "&:hover": {
      backgroundColor: "#fae4df",
    },
  });

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <>
      <Tabs
        aria-label="Vertical tabs"
        orientation="vertical"
        sx={{ minWidth: 400, height: 160 }}
      >
        <TabList>
          <Tab sx={tabStyles(0)} onClick={() => handleTabChange(0)}>
            <FontAwesomeIcon icon={faTruckArrowRight} style={{ color: selectedTab === 0 ? "#ef553b" : "black" }} /> MY MOVES
          </Tab>
          <Tab sx={tabStyles(1)} onClick={() => handleTabChange(1)}>
            <FontAwesomeIcon icon={faUser} style={{ color: selectedTab === 1 ? "#ef553b" : "black" }} /> MY PROFILE
          </Tab>
          <Tab sx={tabStyles(2)} onClick={() => handleTabChange(2)}>
            <FontAwesomeIcon icon={faFileInvoiceDollar} style={{ color: selectedTab === 2 ? "#ef553b" : "black" }} /> GET QUOTE
          </Tab>
          <Tab sx={tabStyles(3)} onClick={() => handleTabChange(3)}>
            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: selectedTab === 3 ? "#ef553b" : "black" }} /> LOGOUT
          </Tab>
        </TabList>
        <TabPanel value={0}>
          <MyMoves />
        </TabPanel>
        <TabPanel value={1}>
          <b>MY PROFILE</b> tab panel
        </TabPanel>
        <TabPanel value={2}>
          <b>GET QUOTE</b> tab panel
        </TabPanel>
      </Tabs>
    </>
  );
};

export default HomeTabs;
