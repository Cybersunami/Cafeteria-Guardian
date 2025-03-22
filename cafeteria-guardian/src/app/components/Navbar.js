"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Kanit } from "next/font/google";
import { useAuth } from "../../../hooks/auth.js";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Navbar() {
  const router = useRouter();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Scan", path: "/scan" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#000000" }}
        className={kanit.className}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer", color: "#ffffff" }}
            onClick={() => router.push("/")}
          >
            Cafeteria Guardian
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems.map((item) => (
              <Typography
                key={item.name}
                sx={{
                  marginLeft: 3,
                  cursor: "pointer",
                  color: "#ffffff",
                  "&:hover": { color: "#fff" },
                }}
                onClick={() => router.push(item.path)}
              >
                {item.name}
              </Typography>
            ))}

            <Typography
              sx={{
                marginLeft: 3,
                cursor: "pointer",
                color: "#ffffff",
                "&:hover": { color: "#fff" },
              }}
              onClick={handleLogout}
            >
              Logout
            </Typography>
          </Box>

          <IconButton
            sx={{ display: { md: "none" }, color: "#ffffff" }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  handleDrawerToggle();
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>{item.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
