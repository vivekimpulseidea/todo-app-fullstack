@echo off
echo 🚀 Setting up Todo App Full Stack Project...
echo.

REM Backend setup
echo 📦 Setting up Backend...
cd backend

echo   Creating virtual environment...
python -m venv venv

echo   Activating virtual environment...
call venv\Scripts\activate.bat

echo   Installing Python dependencies...
pip install -r requirements.txt

echo   Initializing database...
python database.py

echo ✅ Backend setup complete!
echo.

REM Frontend setup
cd ..\frontend

echo 📦 Setting up Frontend...
echo   Installing npm dependencies...
call npm install

echo ✅ Frontend setup complete!
echo.

REM Create .env files
cd ..
echo 📝 Creating environment files...
copy backend\.env.example backend\.env 2>nul || echo Backend .env already exists
copy frontend\.env.example frontend\.env 2>nul || echo Frontend .env already exists

echo.
echo ✨ Setup Complete! ✨
echo.
echo To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   venv\Scripts\activate
echo   python app.py
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm start
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause
