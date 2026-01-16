# API Testing Guide

## Using curl

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get All Todos
```bash
curl http://localhost:5000/api/todos
```

### Get Single Todo
```bash
curl http://localhost:5000/api/todos/1
```

### Create Todo
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Buy groceries",
    "deadline": "2026-01-25"
  }'
```

### Create Todo without Deadline
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Call mom"
  }'
```

### Update Todo (mark as complete)
```bash
curl -X PUT http://localhost:5000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### Update Todo (change text and deadline)
```bash
curl -X PUT http://localhost:5000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Buy groceries and cook dinner",
    "deadline": "2026-01-26"
  }'
```

### Delete Todo
```bash
curl -X DELETE http://localhost:5000/api/todos/1
```

### Get Statistics
```bash
curl http://localhost:5000/api/todos/stats
```

---

## Using HTTPie (if installed)

### Get All Todos
```bash
http GET localhost:5000/api/todos
```

### Create Todo
```bash
http POST localhost:5000/api/todos text="Learn Python" deadline="2026-01-30"
```

### Update Todo
```bash
http PUT localhost:5000/api/todos/1 completed:=true
```

### Delete Todo
```bash
http DELETE localhost:5000/api/todos/1
```

---

## Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Todo App API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Todos",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/todos",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "todos"]
        }
      }
    },
    {
      "name": "Create Todo",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"text\": \"New task\",\n  \"deadline\": \"2026-01-25\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/todos",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "todos"]
        }
      }
    },
    {
      "name": "Update Todo",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"completed\": true\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/todos/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "todos", "1"]
        }
      }
    },
    {
      "name": "Delete Todo",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/todos/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "todos", "1"]
        }
      }
    }
  ]
}
```

---

## Expected Responses

### GET /api/todos
```json
[
  {
    "id": 1,
    "text": "Buy groceries",
    "deadline": "2026-01-25",
    "completed": false,
    "created_at": "2026-01-16T10:30:00",
    "updated_at": "2026-01-16T10:30:00"
  }
]
```

### POST /api/todos (Success - 201)
```json
{
  "id": 2,
  "text": "New task",
  "deadline": "2026-01-25",
  "completed": false,
  "created_at": "2026-01-16T11:00:00",
  "updated_at": "2026-01-16T11:00:00"
}
```

### POST /api/todos (Error - 400)
```json
{
  "error": "Text field is required"
}
```

### GET /api/todos/999 (Not Found - 404)
```json
{
  "error": "Todo not found"
}
```

### DELETE /api/todos/1 (Success - 204)
No content returned
