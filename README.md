# Real-Time Chat Application

A full-stack real-time chat application built with Node.js, Socket.io, React, and Vite.

## Features

- **User Authentication**: Register and login with email/password
- **Real-time Messaging**: Send and receive messages instantly using Socket.io
- **Online Users**: See who's currently online
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface

## Tech Stack

### Backend
- Node.js
- Express.js
- Socket.io
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React
- Vite
- Socket.io Client
- Axios for API calls
- Modern CSS with responsive design

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   PORT=3001
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   FRONTEND_URL=http://localhost:5173
   ```

5. Start the server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## Deployment

### Backend Deployment (Render)

1. Create a new account on [Render](https://render.com)

2. Connect your GitHub repository

3. Create a new Web Service with these settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     - `PORT`: (leave empty, Render will set this)
     - `JWT_SECRET`: (generate a secure random string)
     - `FRONTEND_URL`: (your Netlify URL, e.g., `https://your-app.netlify.app`)

4. Deploy the service

### Frontend Deployment (Netlify)

1. Create a new account on [Netlify](https://netlify.com)

2. Connect your GitHub repository

3. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. Set environment variables:
   - `VITE_API_URL`: (your Render backend URL, e.g., `https://your-app.onrender.com`)

5. Deploy the site

### Important Notes for Production

1. **Update CORS settings**: Make sure your backend allows requests from your frontend domain
2. **Environment Variables**: Update all environment variables with production values
3. **JWT Secret**: Use a strong, randomly generated secret for JWT tokens
4. **HTTPS**: Both services should use HTTPS in production

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user

### Chat
- `GET /api/messages` - Get chat messages (requires authentication)

### Health Check
- `GET /health` - Server health check

## Socket.io Events

### Client to Server
- `authenticate` - Authenticate user with JWT token
- `send_message` - Send a new message

### Server to Client
- `new_message` - Receive a new message
- `users_online` - Get list of online users
- `auth_error` - Authentication error

## Project Structure

```
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   ├── .env              # Environment variables
│   └── .env.example      # Environment template
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API and Socket services
│   │   ├── App.jsx       # Main App component
│   │   └── main.jsx      # Entry point
│   ├── package.json      # Frontend dependencies
│   ├── netlify.toml      # Netlify configuration
│   └── .env             # Environment variables
└── README.md            # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
