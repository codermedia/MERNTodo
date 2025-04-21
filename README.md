# MERN Stack Todo Application

A full-stack Todo application built with the MERN stack (MongoDB, Express.js, React, and Node.js).

## Features

- Create, read, update, and delete todos
- Filter todos by status (pending, in-progress, completed)
- Responsive design for all devices
- Form validation and error handling
- Loading indicators for API requests

## Project Structure

```
MERNTodo/
  ├── frontend/             # React frontend
  │   ├── public/
  │   ├── src/
  │   │   ├── components/   # Reusable components
  │   │   ├── context/      # Context API for state management
  │   │   ├── pages/        # Page components
  │   │   ├── App.css       # Main stylesheet
  │   │   ├── App.js        # Main App component
  │   │   └── index.js      # Entry point
  │   └── package.json      # Frontend dependencies
  │
  └── backend/              # Express.js backend
      ├── controllers/      # Route controllers
      ├── models/           # Mongoose models
      ├── routes/           # API routes
      ├── .env              # Environment variables
      ├── package.json      # Backend dependencies
      └── index.js          # Entry point
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/yourusername/MERNTodo.git
cd MERNTodo
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory with your MongoDB connection string:

```
PORT=3000
MONGO_DB_URL=mongodb://...
```

Note: If you're using MongoDB Atlas, replace the connection string with your Atlas connection string.

4. Start the server:

```bash
npm run dev
```

The server will run on http://localhost:3000.

### Frontend Setup

1. Open a new terminal and navigate to the client directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm run dev
```

The application will open in your browser at http://localhost:3000.

## API Endpoints

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| GET    | /api/todos                | Get all todos           |
| GET    | /api/todos?status=pending | Get todos by status     |
| GET    | /api/todos/:id            | Get a specific todo     |
| POST   | /api/todos                | Create a new todo       |
| PUT    | /api/todos/:id            | Update an existing todo |
| DELETE | /api/todos/:id            | Delete a todo           |

## Todo Model

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Backend Deployment

You can deploy the backend to platforms like Heroku, Railway, or Render.

1. Create a new app on your chosen platform
2. Connect your GitHub repository
3. Set environment variables (MONGODB_URI)
4. Deploy the application

### Frontend Deployment

You can deploy the React frontend to platforms like Netlify, Vercel, or GitHub Pages.

1. Build the production version:

```bash
cd frontend
npm run build
```

2. Deploy the build folder to your chosen platform

Remember to update the API base URL in the frontend to point to your deployed backend.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact me.
