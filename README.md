# ResumeWeb - React Project with Firebase Integration

## Overview
**ResumeWeb** is a React-based web application designed to showcase my professional portfolio, with an integrated blog feature powered by Firebase Firestore. This project uses Vite for fast development and optimized builds.

## Features
- Modern, responsive design.
- Blog feature with Firestore for dynamic content management.
- Firebase Hosting for fast and secure deployment.

## Tech Stack
- **Frontend**: React (with Vite)
- **Backend**: Firebase Firestore
- **Hosting**: Firebase Hosting
- **Deployment**: Firebase CLI (firebase deploy)

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- Firebase CLI
- Git installed locally

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ResumeWeb.git
2. Navigate to the project directory:
    cd ResumeWeb
3. Install dependencies:
    npm install

#### Running the Project Locally:

1. Start the development server:
    npm run dev
2. Open the app in your browser:
    http://localhost:5173

##### Building for Production
1. Build the project:
    npm run build
2. Preview the production build:
    npm run preview

##### Firebase Setup
1. Initialize Firebase
1.1. Log in to Firebase:
    firebase login

1.2. Initialize Firebase in your project:
    firebase init
    Choose the following options:
    - Hosting: Configure and deploy Firebase Hosting sites.
    - Firestore: Set up Firestore for the blog feature.

1.3. Deploy the app:
    firebase deploy
