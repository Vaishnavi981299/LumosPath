require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const twilio = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// SOS route
app.post("/send-sos", async (req, res) => {
  const { name, lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Location missing" });
  }

  const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

  const message = `${name} is in danger!\nLocation: ${googleMapsLink}`;

  try {
    await twilio.messages.create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to: process.env.MY_NUMBER,
    });

    res.json({ message: "SOS alert sent!" });
  } catch (err) {
    console.error("Twilio Error:", err);
    res.status(500).json({ message: "Failed to send SOS", error: err.message });
  }
});

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});
