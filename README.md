# 🌍 Village API

A scalable backend API for accessing hierarchical location data across India (State → District → Sub-District → Village).

## 🚀 Live API

🔗 https://village-api-peach.vercel.app

---

## 📌 Features

* 🔍 Search villages by name
* 📍 Hierarchical location structure
* ⚡ Fast API responses
* 🔐 API Key Authentication
* 🌐 Deployed on Vercel

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (NeonDB)
* **ORM:** Prisma
* **Deployment:** Vercel

---

## 📊 Data

* 45,000+ villages imported
* Structured as:

  * Country → State → District → Sub-District → Village

---

## 🔑 API Usage

### Example Endpoint:

GET /v1/states

### Headers:

X-API-Key: test123

---

## 📦 Installation (Local Setup)

```bash
git clone https://github.com/Divyansh-N/village-api.git
cd village-api
npm install
npm start
```

---

## 📈 Future Improvements

* Frontend Dashboard (React)
* Rate Limiting (Redis)
* User Authentication (JWT)
* Admin Panel

---

## 👨‍💻 Author

Divyansh Nayyar
