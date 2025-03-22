"use client";
import { useState, useCallback } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "../../../config/firebaseconfig";

export default function ScanPage() {
  const [image, setImage] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [dragOver, setDragOver] = useState(false);

  async function uploadImage(file) {
    let downloadURL = null;
    try {
      const id = Date.now().toString();
      const storageRef = ref(storage, `foodpictures/${id}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${prog}%`);
          },
          (error) => {
            console.log("Error uploading image:", error);
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });

      downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("Download URL retrieved:", downloadURL);
    } catch (error) {
      console.log("Error uploading image:", error);
    }

    return downloadURL;
  }

  const handleImageUpload = async (file) => {
    setImage(URL.createObjectURL(file));
    const downloadURL = await uploadImage(file);
    if (downloadURL) {
      try {
        const response = await axios.post("/api/analyze", {
          imageUrl: downloadURL,
        });
        setAiResponse(response.data.result);
      } catch (error) {
        console.error("Error sending image URL to API:", error);
      }
    } else {
      console.error("Failed to upload image and retrieve URL.");
    }
  };

  const onDrop = useCallback(async (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      await handleImageUpload(file);
    }
  }, []);

  const onDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginTop: 4 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => (window.location.href = "/home")}
        sx={{ marginTop: 2, backgroundColor: "#000000", color: "#fffff" }}
      >
        Exit
      </Button>

      <Typography variant="h5" fontWeight="bold" mt={5}>
        Drag & Drop Image for AI Analysis
      </Typography>

      <Box
        sx={{
          border: "2px dashed #ccc",
          padding: 4,
          marginTop: 3,
          backgroundColor: dragOver ? "#f0f0f0" : "transparent",
          cursor: "pointer",
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Drag & Drop an image here or click to select
        </Typography>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="file-upload"
          onChange={handleFileInputChange}
        />
        <label htmlFor="file-upload">
          <Button variant="outlined" component="span">
            Select Image
          </Button>
        </label>
      </Box>

      {image && (
        <Box sx={{ marginTop: 3 }}>
          <img
            src={image}
            alt="Uploaded"
            style={{
              width: "300px",
              height: "auto",
              borderRadius: 8,
              objectFit: "contain",
              marginBottom: "16px",
            }}
          />
        </Box>
      )}

      {aiResponse && (
        <Typography variant="body1" color="red" sx={{ marginTop: 3 }}>
          AI Analysis: {aiResponse}
        </Typography>
      )}
    </Container>
  );
}
