# Quick Start Reference Card

## 🚀 First Time Setup

### Automatic Setup (Recommended)
**Mac/Linux:**
```bash
./setup.sh
```

**Windows:**
```bash
setup.bat
```

### Manual Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate          # Mac/Linux
# OR
venv\Scripts\activate             # Windows

pip install -r requirements.txt
python database.py
python app.py
```
✅ Backend running on http://localhost:5000

#### Frontend
```bash
cd frontend
npm install
npm start
```
✅ Frontend running on http://localhost:3000

---

## 🎯 Daily Development

### Start Backend
```bash
cd backend
source venv/bin/activate    # Mac/Linux
# OR
venv\Scripts\activate       # Windows
python app.py
```

### Start Frontend
```bash
cd frontend
npm start
```

---

## 🧪 Testing APIs

### Quick Health Check
```bash
curl http://localhost:5000/api/health
```

### Create a Todo
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Test task", "deadline": "2026-01-25"}'
```

### Get All Todos
```bash
curl http://localhost:5000/api/todos
```

See `API_TESTING.md` for complete examples.

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `backend/app.py` | All API endpoints |
| `frontend/src/App.jsx` | Main React component |
| `frontend/src/services/api.js` | API calls |
| `backend/models.py` | Database schema |

---

## 🔧 Common Commands

### Reset Database
```bash
cd backend
rm todos.db
python database.py
```

### Install New Python Package
```bash
cd backend
source venv/bin/activate
pip install package-name
pip freeze > requirements.txt
```

### Install New npm Package
```bash
cd frontend
npm install package-name
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

---

## 🐛 Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```python
# In app.py, change:
app.run(debug=True, port=5001)
```

**Module not found:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
```

**Database locked:**
```bash
# Close any DB browser tools
# Or delete and recreate: rm todos.db && python database.py
```

### Frontend Issues

**Port 3000 already in use:**
```bash
# Kill the process or use different port
PORT=3001 npm start
```

**CORS errors:**
```python
# In backend/app.py, verify:
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
```

**API connection failed:**
- Ensure backend is running
- Check frontend/.env has correct API URL
- Verify no firewall blocking ports

---

## 📚 Project Structure

```
todo-app-fullstack/
├── backend/          # Flask API (Python)
│   ├── app.py       # Main Flask app
│   ├── models.py    # Database models
│   └── database.py  # DB initialization
│
└── frontend/         # React UI (JavaScript)
    └── src/
        ├── App.jsx           # Main component
        ├── components/       # UI components
        └── services/api.js   # Backend calls
```

---

## 🎨 Features Implemented

✅ Create todos with text and deadline
✅ Read/display all todos
✅ Update todo text, deadline, completion status
✅ Delete todos
✅ Visual indicators for overdue tasks
✅ Statistics dashboard
✅ Responsive design
✅ Error handling
✅ Loading states

---

## 🚀 Next Steps

1. **Add Authentication**: User login/signup
2. **Add Categories**: Organize todos by category
3. **Add Filtering**: Filter by status, deadline
4. **Add Search**: Search todos by text
5. **Add Priority**: High/medium/low priority
6. **Deploy**: Use DEPLOYMENT.md guide

---

## 📖 Documentation

- `README.md` - Main project documentation
- `API_TESTING.md` - API testing examples
- `DEPLOYMENT.md` - Production deployment guide
- `CONTRIBUTING.md` - How to contribute
- `PROJECT_STRUCTURE.md` - Detailed structure

---

## 🆘 Getting Help

1. Check error messages in terminal
2. Review browser console for frontend errors
3. Check Flask terminal output for backend errors
4. Verify both servers are running
5. Test API directly with curl
6. Review documentation files

---

## ⚡ Pro Tips

- Keep both terminals visible side-by-side
- Use browser DevTools Network tab to debug API calls
- Backend changes require server restart
- Frontend hot-reloads automatically
- Use `console.log()` in React for debugging
- Use `print()` in Flask for debugging
- Git commit frequently!

---

**Happy Coding! 🎉**
