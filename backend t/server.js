const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");  // ✅ keep only this one
const teacherRoutes = require("./routes/teachers");
const dashboardRoutes = require("./routes/dashboard");

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/dashboard", dashboardRoutes);

// TODO: Later you can add:
// const testRoutes = require("./routes/tests");
// const certRoutes = require("./routes/certifications");
// app.use("/api/tests", testRoutes);
// app.use("/api/certifications", certRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
