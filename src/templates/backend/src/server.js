require("dotenv").config();

const express = require("express");
const cors = require("cors");

// STACKFORGE_IMPORTS

const app = express();

app.use(cors());
app.use(express.json());

// STACKFORGE_MIDDLEWARE

app.get("/", (req, res) => {
   res.json({
      message: "Backend running 🚀",
   });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});