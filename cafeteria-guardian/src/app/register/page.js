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
import { useAuth } from "../../../hooks/auth.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const credentials = { email, password };
      const result = await register(credentials);
      if (result) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Registration error:", error);
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
        backgroundColor: "#fffff",
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
          Register
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
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5, backgroundColor:"#000000" }}
        >
          Register
        </Button>

        <Typography sx={{ mt: 2 }}>
          Already have an account?{" "}
          <MuiLink component={Link} href="/" underline="hover">
            Log In here
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
}
