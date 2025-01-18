Skivori Game Portal

Welcome to the Skivori Game Portal, a web application that features a slot machine game and a collection of exciting games to explore. This project includes a React-based frontend and an Express.js backend, structured to provide a seamless user experience.

Project Structure

skivori-game-portal/
├── frontend/      # Frontend application (React)
├── backend/     # Backend application (Express.js)
├── .gitignore   # Files and folders to ignore in Git
├── README.md    # Project documentation

Features

Slot Machine Game
Spin a slot machine with dynamic results.
Track your balance and earn rewards.
Convert in-game currency to real-world currencies using live exchange rates.
Responsive design for optimal viewing on all devices.
Game Collection
Explore a collection of games fetched from the backend.
Search games by title or provider with real-time updates.
Responsive card grid layout for game display.

Technologies Used
Frontend
React: Frontend library for building user interfaces.
Material-UI (MUI): UI components for responsive design.
React Router: Navigation and routing for the application.
Axios: HTTP client for API requests.
use-debounce: Debounced search for better performance.

Backend

Express.js: Web framework for building APIs.
Morgan: HTTP request logger.
CORS: Middleware to enable cross-origin requests.
Setup and Installation
Prerequisites
Node.js
Git
Clone the Repository
git clone https://github.com/Neroshell/Skyvori.git
cd skivori-game-portal
Install Dependencies

Backend

cd backend
npm install

Frontend

cd frontend
npm install

Running the Project

Start the Backend Server

cd backend
node server.js


Start the Frontend Application

cd frontend
npm run dev



This project leveraged an AI assistant for guidance and optimization the following areas:


Search Functionality: AI guided the implementation of a debounced search feature, enhancing performance and user experience.

Error Handling: AI assisted in troubleshooting and fixing build-time and runtime errors.
