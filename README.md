# Baddy Connect

---
Baddy Connect is a social platform designed for badminton enthusiasts. Users can create and join badminton sessions, making it easier to connect with other players. In the future, the platform may also support online payments for session fees.
## Features

- **User Authentication**: Users can log in using a username and password.
- **Email Verification**: Users must verify their email before accessing the application.
- **Protected Dashboard**: Authenticated users can access a secure dashboard.
- **JWT-based Authentication**:
  - Access tokens are issued for secure communication.
  - Tokens are validated for every protected request.
- **Responsive UI**: A clean and responsive design built with Tailwind CSS.
- **Error Handling**: Detailed error messages for login and data fetching.
- **Future features** :
  - * **Role-Based Session Management**:
    1. **Session Creators**: Can create and manage badminton social sessions.
    2. **Players**: Can browse and join available social sessions.
  - * **Online Payments**

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

Current page as in 1/3/25
![image](https://github.com/user-attachments/assets/b4d46cb0-7a8d-494e-8a57-fdf29dc6438a)
