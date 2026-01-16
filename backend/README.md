# Backend - Flask REST API

Flask-based REST API server for the Todo application.

## Setup

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Initialize database:
```bash
python database.py
```

4. Run the server:
```bash
python app.py
```

Server will run on http://localhost:5000

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/<id>` - Get specific todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/<id>` - Update todo
- `DELETE /api/todos/<id>` - Delete todo
- `GET /api/todos/stats` - Get statistics
- `GET /api/health` - Health check

## Testing with curl

```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Test task", "deadline": "2026-01-25"}'

# Update a todo
curl -X PUT http://localhost:5000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a todo
curl -X DELETE http://localhost:5000/api/todos/1
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

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── models.py           # SQLAlchemy models
├── database.py         # Database initialization
├── requirements.txt    # Python dependencies
└── todos.db           # SQLite database (created after init)
```
