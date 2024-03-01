import React from "react";
import "../Dashboard/dashboard.css";
import PieChart from "./PieChart";
import { useContext } from "react";
import { CompanyContext } from "../Context/CompanyContext";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  alignContent: "center",
  textAlign: "left",
  color: theme.palette.text.secondary,
  height: "90%",
}));

const Dashboard = () => {
  const [company, setCompany] = useContext(CompanyContext);
  const B2BCompany = company.filter((item) => {
    return item.compType === "B2B";
  });
  const B2CCompany = company.filter((item) => {
    return item.compType === "B2C";
  });

  const inactiveCompany = company.filter((item) => {
    return item.stage === "Inactive";
  });
  const activeCompany = company.filter((item) => {
    return item.stage === "Active";
  });

  return (
    <>
      <h2 className="dashH1">Dashboard</h2>
      <div className="charts">
        <Box
          component="section"
          width={'50%'}
          my={2}
          display="flex"
          alignItems="center"
          gap={4}
          // p={2}
          sx={{ border: "1px solid #365486" , borderRadius: '3px',padding:'none', marginRight: '10px', height:'30%', boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}}
        >
          <PieChart
            text={"Company Type"}
            element1={{ value1: B2BCompany.length, name1: "B2B" }}
            element2={{ value2: B2CCompany.length, name2: "B2C" }}
            colors={["#365486", "#7FC7D9"]}
          ></PieChart>
        </Box>
        <Box
          component="section"
          width={'50%'}
          my={2}
          display="flex"
          alignItems="center"
          gap={4}
          // p={2}
          sx={{ border: "1px solid #365486" , borderRadius: '3px',padding:'none', marginRight: '10px', height:'30%', boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}}
        >
          <PieChart 
            text={"Stage"}
            element1={{ value1: activeCompany.length, name1: "Active" }}
            element2={{ value2: inactiveCompany.length, name2: "Inactive" }}
            colors={["#A2FF86", "#4FC0D0"]}
          ></PieChart>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
