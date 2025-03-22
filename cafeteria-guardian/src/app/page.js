"use client";
import Image from "next/image";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/auth.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const credentials = { email, password };
      const result = await login(credentials);
      if (result) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: "100%",
          padding: 4,
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Log In
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5 , backgroundColor: "#000000", color: "#fffff" }}
        >
          Log In
        </Button>

        <Typography color="#000000" sx={{ mt: 2}}>
          Don't have an account?{" "}
          <MuiLink component={Link} sx={{textDecoration:"none"}} href="/register" underline="hover">
            Register here
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
}
