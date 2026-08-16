const express = require("express");
const path = require("path");
require("dotenv").config();
const authRoutes = require("./routers/authRoute");
const aiRoutes = require("./routers/aiRoute");
const connetDB = require("./config/db");
const cros = require("cors")

const app = express();


app.use(
  cros({
    origin: "http://localhost:5174",
    credentials: true,
  })
)
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

connetDB(); // CONNECT TO MONGO-DB

app.get("/", (req, res) => {
  res.send("hey");
});

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error(err.stake);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
