const cors = require("cors");
const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const API_KEY = "test123";
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key || key !== API_KEY) {
    return res.status(401).json({
      success: false,
      error: "Invalid API Key"
    });
  }

  next();
});

// DB connection
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_o1CXZTIzQu8h@ep-empty-shadow-a106ager.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

// 🔹 STATES
app.get("/v1/states", async (req, res) => {
  const result = await pool.query("SELECT * FROM state");

  res.json({
    success: true,
    count: result.rows.length,
    data: result.rows
  });
});

// 🔹 DISTRICTS
app.get("/v1/districts", async (req, res) => {
  const { state_id } = req.query;

  const result = await pool.query(
    "SELECT * FROM district WHERE state_id = $1",
    [state_id]
  );

  res.json({
    success: true,
    count: result.rows.length,
    data: result.rows
  });
});

// 🔹 SUBDISTRICTS
app.get("/v1/subdistricts", async (req, res) => {
  const { district_id } = req.query;

  const result = await pool.query(
    "SELECT * FROM sub_district WHERE district_id = $1",
    [district_id]
  );

  res.json({
    success: true,
    count: result.rows.length,
    data: result.rows
  });
});

// 🔹 VILLAGES
app.get("/v1/villages", async (req, res) => {
  const { subdistrict_id } = req.query;

  const result = await pool.query(
    "SELECT * FROM village WHERE sub_district_id = $1",
    [subdistrict_id]
  );

  res.json({
    success: true,
    count: result.rows.length,
    data: result.rows
  });
});
// 🔍 SEARCH VILLAGES
app.get("/v1/search", async (req, res) => {
  const { q } = req.query;

  // validation
  if (!q || q.length < 2) {
    return res.status(400).json({
      success: false,
      error: "Query too short"
    });
  }

  const result = await pool.query(
    "SELECT * FROM village WHERE name ILIKE $1 LIMIT 20",
    [`%${q}%`]
  );

  res.json({
    success: true,
    count: result.rows.length,
    data: result.rows
  });
});
// 🔍 SEARCH VILLAGES
app.get("/v1/search", async (req, res) => {
  const { q } = req.query;

  // validation
  if (!q || q.length < 2) {
    return res.status(400).json({
      success: false,
      error: "Query too short"
    });
  }

  const result = await pool.query(
    "SELECT * FROM village WHERE name ILIKE $1 LIMIT 20",
    [`%${q}%`]
  );

  res.json({
    success: true,
    count: result.rows.length,
    data: result.rows
  });
});
// 🔥 AUTOCOMPLETE API
app.get("/v1/autocomplete", async (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 2) {
    return res.status(400).json({
      success: false,
      error: "Query too short"
    });
  }

  const result = await pool.query(
    `SELECT v.id,
            v.name AS village,
            sd.name AS subdistrict,
            d.name AS district,
            s.name AS state
     FROM village v
     JOIN sub_district sd ON v.sub_district_id = sd.id
     JOIN district d ON sd.district_id = d.id
     JOIN state s ON d.state_id = s.id
     WHERE v.name ILIKE $1
     LIMIT 10`,
    [`%${q}%`]
  );

  const formatted = result.rows.map(r => ({
    value: r.id,
    label: r.village,
    fullAddress: `${r.village}, ${r.subdistrict}, ${r.district}, ${r.state}, India`
  }));

  res.json({
    success: true,
    count: formatted.length,
    data: formatted
  });
});

// START SERVER
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});