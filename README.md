# Employee Management System - Leave Module

## Overview
A comprehensive Leave Management module built as a full-stack web application. It features automated leave balance deduction, overlap detection, role-based access control, and complete JWT-based security.

## Features
- **Employee:** Apply for leave, check leave balances, view leave history, and cancel pending requests.
- **Admin:** View all requests across the organization, approve/reject leaves with mandatory remarks, and monitor real-time dashboards.
- **System:** JWT Authentication, BCrypt Password Security, Global Error Handling, Tailwind CSS responsive layouts.

## Technology Stack
- **Frontend:** React 18, Vite, React Router, Tailwind CSS, Axios, React Hook Form
- **Backend:** Spring Boot 3, Java 21, Spring Security, Spring Data JPA, Hibernate, JWT, Maven
- **Database:** MySQL

## Getting Started

### Database Setup
1. Create a MySQL database named `employee_management_db`.
2. Update the credentials in `backend/src/main/resources/application.properties`.
3. Start the Spring Boot backend to auto-generate the schema.
4. Run `database/data.sql` to populate mock users.

### Backend
```sh
cd backend
./mvnw clean install
./mvnw spring-boot:run
```
Runs on `http://localhost:8080`

### Frontend
```sh
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

## Documentation
- [API Documentation](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
