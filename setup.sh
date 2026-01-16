#!/bin/bash

echo "🚀 Setting up Todo App Full Stack Project..."
echo ""

# Backend setup
echo "📦 Setting up Backend..."
cd backend

echo "  Creating virtual environment..."
python3 -m venv venv

echo "  Activating virtual environment..."
source venv/bin/activate

echo "  Installing Python dependencies..."
pip install -r requirements.txt

echo "  Initializing database..."
python database.py

echo "✅ Backend setup complete!"
echo ""

# Frontend setup
cd ../frontend

echo "📦 Setting up Frontend..."
echo "  Installing npm dependencies..."
npm install

echo "✅ Frontend setup complete!"
echo ""

# Create .env files
cd ..
echo "📝 Creating environment files..."
cp backend/.env.example backend/.env 2>/dev/null || echo "Backend .env already exists"
cp frontend/.env.example frontend/.env 2>/dev/null || echo "Frontend .env already exists"

echo ""
echo "✨ Setup Complete! ✨"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python app.py"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
