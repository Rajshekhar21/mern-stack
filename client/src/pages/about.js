import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/joy";
import BottomNav from "../components/Footer";
import Breadcrumb from "../components/BreadCumb";

const AboutPage = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.surface",
        minHeight: "90vh",
        pb: 10,
      }}
    >
      <Breadcrumb title="About" navigation={true} />
      <Box
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
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ mb: 3 }}>
            About Me
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2 }}>
                My Skills and Experience
              </Typography>
              <img
                src="/path/to/your/image.jpg"
                alt="Skills and Experience"
                style={{ width: "100%", marginBottom: "16px" }}
              />
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse aliquet id ipsum vel sollicitudin.
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Contact Me
            </Typography>
            <Typography>
              If you'd like to get in touch or discuss potential opportunities,
              feel free to reach out.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => {
                console.log("Contact button clicked");
              }}
            >
              Contact Me
            </Button>
          </Box>
        </Container>
      </Box>
      <BottomNav />
    </Box>
  );
};

export default AboutPage;
