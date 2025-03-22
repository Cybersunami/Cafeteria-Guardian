"use client";
import { Button, Container, Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Kanit } from "next/font/google";
import Navbar from "../components/Navbar";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Navbar />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "90vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundImage: "url('/giphy.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
            position: "relative",
            color: "#fff",
            textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" fontWeight="bold">
              Cafeteria Guardian
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
              Scan, Detect, and Stay Safe. AI-Powered Food Analysis.
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginTop: 4,
                padding: "10px 20px",
                fontSize: "1.2rem",
                backgroundColor: "#000000",
                "&:hover": { backgroundColor: "000000" },
              }}
              onClick={() => router.push("/scan")}
            >
              Scan Now
            </Button>
          </motion.div>
        </Box>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{
          padding: "50px 0",
          backgroundColor: "#fff",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Box
              sx={{
                textAlign: "center",
                backgroundColor: "#91bba4",
                padding: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold" mt={2} color="#000000">
                Photo recognition
              </Typography>
              <Typography variant="body1" mt={1} color="#000000">
                Instantly snap, import or drag a picture for valuable health
                insights.
              </Typography>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Box
              sx={{
                textAlign: "center",
                backgroundColor: "#91bba4",
                padding: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold" mt={2} color="#000000">
                AI-Powered Analysis
              </Typography>
              <Typography variant="body1" mt={1} color="#000000">
                Upload food images and let AI detect potential health risks.
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          background: "#505c54",
          color: "#fff",
        }}
      >
        <Typography variant="body2">
          &copy; 2025 Cafeteria Guardian. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}
