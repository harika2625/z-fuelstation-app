# Z-Energy Application

This project is a multi-part application designed to provide users with a seamless experience for locating Z stations, comparing fuel prices, managing user accounts, and handling payment details. The application is divided into three main components:

1. **Backend**: A Node.js and Express-based API for user authentication, station management, and payment details.
2. **Google Maps API Integration**: A React-based application for map-based station search and location services.
3. **Z-Energy App**: A React-based frontend application for user interaction, including registration, login, and fuel price comparison.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Features

### Backend

- User registration and login with password hashing.
- Payment details management.
- Station search with support for filtering by name or address.

### Google Maps API Integration

- Map-based search for Z stations using Google Maps API.
- Autocomplete functionality for location search.
- Display of station details on the map.

### Z-Energy App

- User-friendly interface for registration and login.
- Fuel price comparison across stations.
- Responsive design for mobile and desktop.

---

## Technologies Used

- **Backend**: Node.js, Express, Mongoose, bcrypt, cors
- **Frontend**: React, React Router, Material-UI
- **Database**: MongoDB
- **Testing**: Vitest, @testing-library/react
- **Build Tools**: Vite

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running locally.
