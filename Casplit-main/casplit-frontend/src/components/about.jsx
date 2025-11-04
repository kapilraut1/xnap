import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Copyright from "./Copyright";

const About = () => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "background.paper",
          boxShadow: 2,
          my: 10,
          py: 10,
        }}
      >
        This is a final year project of three students - Kapil Raut, Kshitiz
        Mahato, and Ravi Shrestha.
        <p>
          Kapil has worked in frontend, Ravi in the backend, and Mr. Mahato has
          looked overall and supported both.
        </p>
      </Container>
    </>
  );
};

export default About;
