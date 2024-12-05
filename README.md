# iNotebook


**iNotebook** is a cloud-based note management application built using the MERN stack. This app enables users to securely manage their personal notes with features like authentication, data encryption, and a user-friendly interface.

## Features

- **Secure Note Storage**: Save your notes on the cloud with robust encryption.
- **User Authentication**: Registration and login using JWT for session management.
- **CRUD Operations**: Add, update, delete, and view your notes.
- **Responsive Design**: Optimized for desktop and mobile platforms.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **State Management**: Context API
- **Styling**: CSS Frameworks or custom styles

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kdjayyyy/iNotebook.git
   cd iNotebook
   ```

2. Install dependencies:

   Frontend:

   ```bash
   npm install
   ```

   Backend:

   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:

   - In the background, create a .env file and add:

   ```bash
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   ```
   - In the frontend, configure the backend endpoint in ```src/config.js``` (if applicable).

### Running the Application

   - **Frontend**: Start the React development server:

   ```bash
   npm start
   ```

   - **Backend**: Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

   **OR**

   - Just start both instances at once using:

   ```bash
   npm run both
   ```

   - Access the app in your browser at ```http://localhost:3000```.

### Folder Structure 

   ```bash
      iNotebook/
   ├── backend/       # Server-side code
   ├── public/        # Static files
   ├── src/           # React components
   ├── .env           # Environment variables
   └── README.md      # Project documentation
   ```

