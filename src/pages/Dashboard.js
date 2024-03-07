import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Grid } from "@mui/material";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userLoginData = localStorage.getItem("user");
    if (userLoginData) {
      setUserData(JSON.parse(userLoginData)[0]);
    }
  }, []);
  
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Sidebar />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
