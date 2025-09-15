# 📝 Todo MERN App

A full-stack **Todo Application** built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  
It includes **user authentication** (JWT + bcrypt) and **task management** with status & priority.  

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register with secure password hashing (bcrypt)
  - Login with JWT authentication
  - Protected routes with middleware

- ✅ **Task Management**
  - Create, Read, Update, Delete (CRUD) todos
  - Assign **status** (e.g. pending, completed)
  - Assign **priority** (e.g. low, medium, high)
  - Each task is linked to its user

- 🎨 **Frontend**
  - Modern UI built with **React + TailwindCSS**
  - Login / Signup flow
  - Stores JWT securely in localStorage
  - Redirects after login/logout

- ⚙️ **Backend**
  - RESTful API with Express
  - MongoDB for persistence
  - Secure authentication middleware
  - CORS enabled for frontend requests

---

## 🛠️ Tech Stack

| Layer      | Technology                      |
|------------|---------------------------------|
| Frontend   | React, React Router, TailwindCSS |
| Backend    | Node.js, Express.js             |
| Database   | MongoDB (Atlas or Local)        |
| Auth       | JWT, bcrypt                     |
| Other      | dotenv, CORS                    |

---
