"use client";
import { Container, Typography, Box, Link } from "@mui/material";
import { motion } from "framer-motion";
import { LinkedIn } from "@mui/icons-material"; 
import Navbar from "../components/Navbar"; 

export default function About() {
  return (
    <Container maxWidth="md">
      <Navbar />

      {/* Animated Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            textAlign: "center",
            marginTop: 6,
            padding: 4,
            backgroundColor: "#f4f4f4",
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            About Cafeteria Guardian
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2, color: "#555" }}>
            Created by Christian and Misa, our application utilizes image
            recognition to detect potential health risks in artifacts. Developed
            as part of a hackathon project, this tool provides instant analysis
            by identifying contamination, deterioration, or hazardous materials.
            By streamlining artifact evaluation, we enhance public safety and
            empower users with critical insights to prevent exposure to harmful
            substances. This innovation promotes informed decision-making,
            ensuring a safer environment for individuals and businesses handling
            artifacts.
          </Typography>

          {/* LinkedIn Links */}
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Link
              href="https://www.linkedin.com/in/christian-wantong-12680624b/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                color: "#0072b1",
              }}
            >
              <LinkedIn /> <Typography>Christian's LinkedIn</Typography>
            </Link>

            <Link
              href="https://www.linkedin.com/in/misa-w-91ba87306/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                color: "#0072b1",
              }}
            >
              <LinkedIn /> <Typography>Misa's LinkedIn</Typography>
            </Link>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
}
