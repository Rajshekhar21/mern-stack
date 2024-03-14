// CrudPage.js
import React from "react";
import { Box, Typography } from "@mui/joy";
import BottomNav from "../components/Footer";
import Breadcrumb from "../components/BreadCumb";

const HomePage = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.surface",
        height: "100vh",
      }}
    >
      <Breadcrumb title="Welcome !" navigation={false} />
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 0,
        }}
      >
        <Typography variant="h3">Home Page</Typography>
        <Typography variant="body1">
          Welcome to my CRUD demo application. Here, I have created CRUD
          operations using ReactJS with Material-UI components. The server is
          built with Node.js and Express, and the database used is MongoDB. Feel
          free to explore the functionality. Thank you!
        </Typography>
      </Box>
      <BottomNav />
    </Box>
  );
};

export default HomePage;
