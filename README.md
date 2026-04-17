# 🌍 Village API System

## 📌 Overview

Village API System is a full-stack web application that allows users to explore hierarchical location data including states, districts, subdistricts, and villages.

The system provides a clean and interactive frontend connected to secure backend APIs.

---

## 🚀 Features

* Load states dynamically
* View districts, subdistricts, and villages
* Search villages using keyword
* Click and select village (interactive UI)
* API key-based security for all endpoints
* Clean and responsive user interface

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express
* **Database:** PostgreSQL
* **Authentication:** API Key

---

## 🔑 API Security

All API endpoints are protected using an API key.

Example:

```
x-api-key: test123
```

This ensures that only authorized requests can access the data.

---

## 📂 Project Structure

```
Village-api/
│
├── backend/          # Express server & APIs
├── frontend/         # HTML, CSS, JS UI
├── prisma/           # Database schema
├── data-import/      # Dataset files
├── package.json
└── README.md
```

---

## ▶️ How to Run the Project

### 🔹 Step 1: Run Backend

Open terminal:

```
cd backend
node index.js
```

You should see:

```
Server running on http://localhost:3000
```

---

### 🔹 Step 2: Run Frontend

* Open `frontend/index.html`
* Right click → **Open with Live Server**

---

## 🧪 Usage Flow

1. Click **Load States**
2. Select a state
3. Select district → subdistrict → village
4. Use search to find villages
5. Click on a village to select it

---

## 🎥 Demo Video

(Add your Google Drive video link here)

---

## 📌 Future Improvements

* Add user authentication system
* Integrate maps (Google Maps API)
* Improve UI/UX with frameworks like React
* Add real-time updates

---

## 👨‍💻 Author

**Divyansh Nayyar**
B.Tech AIML Student

---

## ⭐ Conclusion

This project demonstrates a complete full-stack implementation including frontend UI, backend APIs, database integration, and secure communication.

---
