# Project Structure

```
todo-app-fullstack/
│
├── README.md                    # Main project documentation
├── LICENSE                      # MIT License
├── CONTRIBUTING.md             # Contributing guidelines
├── DEPLOYMENT.md               # Deployment guide
├── API_TESTING.md              # API testing examples
├── .gitignore                  # Git ignore rules
├── setup.sh                    # Unix/Mac setup script
├── setup.bat                   # Windows setup script
│
├── backend/                    # Flask Backend
│   ├── app.py                 # Main Flask application with API routes
│   ├── models.py              # SQLAlchemy database models
│   ├── database.py            # Database initialization script
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example           # Environment variables template
│   ├── README.md              # Backend documentation
│   └── todos.db              # SQLite database (created after init)
│
└── frontend/                   # React Frontend
    ├── public/
    │   └── index.html         # HTML template
    │
    ├── src/
    │   ├── components/
    │   │   ├── TodoForm.jsx   # Component for adding new todos
    │   │   ├── TodoItem.jsx   # Component for individual todo
    │   │   ├── TodoList.jsx   # Component for todo list display
    │   │   └── Stats.jsx      # Component for statistics
    │   │
    │   ├── services/
    │   │   └── api.js         # API service layer for backend calls
    │   │
    │   ├── App.jsx            # Main application component
    │   ├── index.js           # Application entry point
    │   └── index.css          # Global styles with Tailwind
    │
    ├── package.json           # Node.js dependencies and scripts
    ├── tailwind.config.js     # Tailwind CSS configuration
    ├── postcss.config.js      # PostCSS configuration
    ├── .env.example           # Environment variables template
    └── README.md              # Frontend documentation
```

## Key Files Description

### Backend Files

| File | Purpose |
|------|---------|
| `app.py` | Main Flask application with all API endpoints (CRUD operations) |
| `models.py` | Todo model definition using SQLAlchemy ORM |
| `database.py` | Script to initialize database and optionally add sample data |
| `requirements.txt` | Python package dependencies (Flask, SQLAlchemy, CORS) |

### Frontend Files

| File | Purpose |
|------|---------|
| `App.jsx` | Main component that orchestrates the entire application |
| `TodoForm.jsx` | Form component for creating new todos |
| `TodoItem.jsx` | Individual todo item with edit, delete, and toggle functionality |
| `TodoList.jsx` | Displays list of todos, separates active and completed |
| `Stats.jsx` | Shows statistics (total, completed, overdue) |
| `api.js` | Centralized API calls to backend (getAllTodos, createTodo, etc.) |

## Component Hierarchy

```
App
├── TodoForm
├── TodoList
│   └── TodoItem (multiple)
│       ├── Check button
│       ├── Edit mode
│       └── Delete button
└── Stats
```

## Data Flow

```
User Action
    ↓
Component (TodoForm/TodoItem)
    ↓
API Service (api.js)
    ↓
HTTP Request to Backend
    ↓
Flask Route Handler (app.py)
    ↓
Database Operation (models.py)
    ↓
SQLite Database (todos.db)
    ↓
JSON Response
    ↓
Update React State
    ↓
Re-render UI
```

## Database Schema

```sql
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text VARCHAR(500) NOT NULL,
    deadline DATE,
    completed BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

```
GET    /api/health              → Health check
GET    /api/todos               → Get all todos
GET    /api/todos/<id>          → Get specific todo
POST   /api/todos               → Create new todo
PUT    /api/todos/<id>          → Update todo
DELETE /api/todos/<id>          → Delete todo
GET    /api/todos/stats         → Get statistics
```

## Technology Stack Summary

### Frontend Stack
- **React 18** - UI library
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend Stack
- **Flask 3** - Web framework
- **SQLAlchemy** - ORM for database operations
- **Flask-CORS** - Cross-origin resource sharing
- **SQLite** - Lightweight database

### Development Tools
- **npm** - Package manager for frontend
- **pip** - Package manager for backend
- **venv** - Python virtual environment
- **git** - Version control
