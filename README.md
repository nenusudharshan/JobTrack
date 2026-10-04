# JobTrack

A full-stack web application for managing and tracking job and internship applications in one place.

## 🚀 Live Demo

**Live Application:**  
https://jobtrack-frontend-ytki.onrender.com

**Backend API:**  
https://jobtrack-backend-s8u8.onrender.com

---

## 📌 Overview

JobTrack is a full-stack job and internship application tracking system designed to help students and job seekers organize their job search.

Instead of maintaining applications across spreadsheets, notes, or multiple browser tabs, JobTrack provides a centralized dashboard where users can manage application details, track progress, and monitor their overall job search.

---

## ✨ Features

### Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected application APIs
- User-specific application data

### Application Management
- Add job/internship applications
- View all applications
- Edit application details
- Delete applications
- Track application date
- Store job posting URLs
- Add personal notes

### Search & Filtering
- Search by company
- Search by role
- Search by location
- Filter by application status
- Filter by job type

### Dashboard
- Total applications
- Interview count
- Selected applications
- Application status indicators
- Organized application cards

### UI
- Responsive design
- Dark-themed modern interface
- Form validation
- Success and error messages
- Responsive layout for different screen sizes

---

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Node.js
- Express.js
- REST APIs
- JWT
- bcryptjs
- CORS

### Database
- MySQL

### Deployment
- Render — Frontend
- Render — Backend
- Aiven — MySQL Database

### Development Tools
- VS Code
- Git
- GitHub
- MySQL Workbench
- Thunder Client

---

## 🏗️ Architecture

```text
                    JobTrack
                       |
              +--------+--------+
              |                 |
          Frontend           Backend
           React          Node.js + Express
              |                 |
              |     REST API    |
              +--------HTTP-----+
                       |
                    MySQL
                       |
                    Aiven
