# React x NestJS Authentication App

This project is a simple authentication system built with **React (TypeScript)** for the frontend and **NestJS** for the backend. It supports user login and authentication using **JWTs** with secure token management.

---

## Features

- **User Authentication**: Users can log in using a username and password.
- **Protected Dashboard**: Authenticated users can access a secure dashboard.
- **JWT-based Authentication**:
  - Access tokens are issued for secure communication.
  - Tokens are validated for every protected request.
- **Responsive UI**: A clean and responsive design built with Tailwind CSS.
- **Error Handling**: Detailed error messages for login and data fetching.

---

## Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS**
- **React Router DOM**
- **React Icons**

### Backend
- **NestJS**
- **JWT (JSON Web Tokens)**
- **Bcrypt** for password hashing
- **PostgreSQL** (or any SQL database)

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL (or any database of your choice)
- NestJS CLI (optional, for backend development)

### Installation

1. Clone and build the project:
   ```bash
   git clone https://github.com/Vincentnilam/nestjs-auth.git
   cd nestjs-auth
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   npm install
2. Follow sample dotenv (.env.sample) and create a dotenv in the root directory
3. Run the project
   ```bash
   # frontend
   cd client
   npm run dev

Successful Login (hmm signup is still via POST manually)
![image](https://github.com/user-attachments/assets/c31b7fd1-82b0-49b0-804b-21899450e9d9)

![image](https://github.com/user-attachments/assets/3f209206-9433-45c1-be1b-90ffc0a11e91)

Unsuccessful Login
![image](https://github.com/user-attachments/assets/4b7102d2-d71c-442c-b8e7-36c4d6b2c513)


   
   # backend
   cd ../server
   npm run start
