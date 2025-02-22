# React x NestJS Authentication App

This project is a simple authentication system built with **React (TypeScript)** for the frontend and **NestJS** for the backend. It supports user login and authentication using **JWTs** with secure token management.

---

## Features

- **User Authentication**: Users can log in using a username and password.
- **Email Verification**: Users must verify their email before accessing the application.
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
- **MailerModule for NestJS** (for e-mail verification)

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

   # backend
   cd ../server
   npm run start

Current page as in 15/2
![image](https://github.com/user-attachments/assets/1cb85401-993c-4239-ad07-c97af7114fe7)

22-02-25
Verification e-mail example:

![image](https://github.com/user-attachments/assets/d93c2566-6ff6-4e2f-b615-a2d137f034db)
