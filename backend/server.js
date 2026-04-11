require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Static folder for file uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes (to be loaded later)
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/books", require("./src/routes/bookRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

// --- DUMMY SEEDER (Comment this out after first run) ---
const seedDummyUsers = async () => {
  const User = require('./src/models/User');
  try {
    const adminExists = await User.findOne({ email: 'admin@test.com' });
    if (!adminExists) {
      await User.create({ name: 'Admin User', email: 'admin@test.com', password: 'password123', role: 'admin' });
      console.log('Dummy Admin Created -> Email: admin@test.com | Password: password123');
    }
    const userExists = await User.findOne({ email: 'user@test.com' });
    if (!userExists) {
      await User.create({ name: 'Normal User', email: 'user@test.com', password: 'password123', role: 'user' });
      console.log('Dummy User Created -> Email: user@test.com | Password: password123');
    }
  } catch(e) { console.error("Seeder error:", e); }
};
seedDummyUsers();
// --------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
