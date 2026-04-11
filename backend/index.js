const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

// 🔥 DB Connection
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_o1CXZTIzQu8h@ep-empty-shadow-a106ager.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ Get all states
app.get("/states", async (req, res) => {
  const result = await pool.query("SELECT * FROM state");
  res.json(result.rows);
});

// ✅ Get districts by state
app.get("/districts", async (req, res) => {
  const { state_id } = req.query;

  const result = await pool.query(
    "SELECT * FROM district WHERE state_id = $1",
    [state_id]
  );

  res.json(result.rows);
});

// ✅ Get subdistricts
app.get("/subdistricts", async (req, res) => {
  const { district_id } = req.query;

  const result = await pool.query(
    "SELECT * FROM sub_district WHERE district_id = $1",
    [district_id]
  );

  res.json(result.rows);
});

// ✅ Get villages
app.get("/villages", async (req, res) => {
  const { subdistrict_id } = req.query;

  const result = await pool.query(
    "SELECT * FROM village WHERE sub_district_id = $1",
    [subdistrict_id]
  );

  res.json(result.rows);
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});