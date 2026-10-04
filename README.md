# JobTrack

A full-stack web application for managing and tracking job and internship applications in one place.

## Overview

JobTrack helps students and job seekers organize their application process by keeping company details, job roles, application dates, statuses, job links, and notes in a single dashboard.

Instead of maintaining applications across spreadsheets, notes, or multiple browser tabs, JobTrack provides a centralized application tracking system.

## Features

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Add job and internship applications
- View all applications in a dashboard
- Edit existing applications
- Delete applications
- Search applications by company, role, or location
- Filter applications by status
- Filter applications by job type
- Dashboard statistics
- Application status badges
- Job posting links
- Responsive dark-themed UI
- Protected application APIs
- User-specific application data

## Tech Stack

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

### Database

- MySQL

### Development Tools

- VS Code
- Git
- GitHub
- Thunder Client

## Application Architecture

```text
                    JobTrack
                       |
             +---------+---------+
             |                   |
        Frontend             Backend
          React             Node.js
             |              Express.js
             |                   |
             +-------- HTTP -----+
                       |
                    REST API
                       |
                    MySQL
                    Database