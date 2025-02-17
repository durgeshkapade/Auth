# Authentication System – Node.js Backend

## 🚀 Overview
This is a Node.js-based authentication system with features like user registration, login, JWT-based authentication, and secure password handling.

## 📂 Features
- 🔑 User signup & login  
- 🔐 Password hashing (bcrypt)  
- 🔄 JWT token-based authentication  
- ✅ Middleware for protected routes  

## 🛠️ Technologies Used
- Node.js  
- Express.js  
- MongoDB (Mongoose) / SQL (if applicable)  
- bcrypt.js (for password hashing)  
- jsonwebtoken (JWT) (for authentication)  

## ⚡ Installation & Setup
```bash
# Clone the repository
git clone <repo-url>

# Navigate into the project
cd <project-name>

# Install dependencies
npm install

# Create a .env file and add your environment variables (e.g., JWT_SECRET, DB_URI)

# Start the server
npm start




PORT=5000
JWT_SECRET=your-secret-key
DB_URI=your-database-uri
