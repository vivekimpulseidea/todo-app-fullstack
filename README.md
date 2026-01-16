# Todo App - Full Stack Project

A full-stack todo application with deadlines built using **React** (frontend), **Flask** (backend), and **SQLite** (database). Perfect for learning CRUD operations and REST API development.

![Tech Stack](https://img.shields.io/badge/React-18.x-blue)
![Tech Stack](https://img.shields.io/badge/Flask-3.x-green)
![Tech Stack](https://img.shields.io/badge/SQLite-3.x-lightgrey)

## Features

- ✅ Create, Read, Update, Delete todos
- 📅 Set deadlines for tasks
- ⚠️ Visual indicators for overdue and due-today tasks
- ✔️ Mark tasks as complete/incomplete
- 📊 Statistics dashboard (total, completed, overdue)
- 🎨 Clean, responsive UI with Tailwind CSS

## Architecture

```
┌─────────────┐      HTTP/JSON      ┌─────────────┐      SQL      ┌──────────┐
│   React     │ ◄─────────────────► │    Flask    │ ◄───────────► │  SQLite  │
│  Frontend   │   REST API Calls    │   Backend   │   Queries     │ Database │
│  (Port 3000)│                     │  (Port 5000)│               │ todos.db │
└─────────────┘                     └─────────────┘               └──────────┘
```

## Project Structure

```
todo-app-fullstack/
├── backend/                 # Flask API server
│   ├── app.py              # Main application file
│   ├── models.py           # Database models
│   ├── database.py         # Database initialization
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
│
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── App.jsx         # Main app component
│   │   └── index.js        # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo-app-fullstack
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python database.py

# Run the server
python app.py
```

Backend will run on **http://localhost:5000**

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will run on **http://localhost:3000**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/<id>` | Get a specific todo |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/<id>` | Update a todo |
| DELETE | `/api/todos/<id>` | Delete a todo |

### Example Request

**Create a Todo:**
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy groceries", "deadline": "2026-01-20"}'
```

**Response:**
```json
{
  "id": 1,
  "text": "Buy groceries",
  "deadline": "2026-01-20",
  "completed": false,
  "created_at": "2026-01-16T10:30:00"
}
```

## Development

### Backend Development

The Flask server runs in debug mode by default, with auto-reload enabled:

```bash
cd backend
python app.py
```

### Frontend Development

React development server with hot reload:

```bash
cd frontend
npm start
```

### Database Management

Reset the database:
```bash
cd backend
rm todos.db
python database.py
```

## Testing

### Test Backend API

Using curl:
```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Test task", "deadline": "2026-01-25"}'
```

Using Postman or any API client, import the provided endpoints.

## Production Deployment

### Backend (Heroku/Railway/Render)

1. Update `app.py` to use production settings
2. Use PostgreSQL instead of SQLite for production
3. Set environment variables
4. Deploy using platform-specific instructions

### Frontend (Vercel/Netlify)

1. Update API URL in `frontend/src/services/api.js`
2. Build production bundle: `npm run build`
3. Deploy the `build` folder

## Technologies Used

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **SQLite** - Database
- **Python-dotenv** - Environment variables

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learning Resources

This project demonstrates:
- RESTful API design
- CRUD operations
- State management in React
- Database design and SQL
- Frontend-backend communication
- Error handling
- CORS configuration

## License

MIT License - feel free to use this project for learning!

## Support

If you encounter any issues:
1. Check that both servers are running
2. Verify ports 3000 and 5000 are not in use
3. Ensure virtual environment is activated for backend
4. Check browser console for frontend errors
5. Check terminal for backend errors

## Roadmap

- [ ] Add user authentication
- [ ] Add task categories/tags
- [ ] Implement task filtering and sorting
- [ ] Add due date notifications
- [ ] Implement task priority levels
- [ ] Add dark mode
- [ ] Add unit and integration tests
- [ ] Add Docker support

---

**Happy Coding! 🚀**
