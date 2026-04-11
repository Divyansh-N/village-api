# Village API Project

## 📌 Overview
This project provides a hierarchical API for accessing Indian location data:
Country → State → District → Sub-District → Village

## 🚀 Tech Stack
- Backend: Node.js + Express.js
- Database: PostgreSQL (NeonDB)
- Data Processing: Python (Pandas)

## 📊 Features
- Fetch all states
- Fetch districts by state
- Fetch sub-districts by district
- Fetch villages by sub-district
- Processed 30,000+ village records

## 🔗 API Endpoints

- GET /states
- GET /districts?state_id=ID
- GET /subdistricts?district_id=ID
- GET /villages?subdistrict_id=ID

## ⚙️ Setup

### Backend
cd backend  
npm install  
node index.js  

### Data Import
cd data-import  
python import.py  

## 📌 Author
Divyansh Nayyar