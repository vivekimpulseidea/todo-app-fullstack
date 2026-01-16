"""
Database initialization script
Run this file to create the SQLite database and tables
"""

from app import app, db
from models import Todo
from datetime import datetime, timedelta

def init_db():
    """Initialize database with tables"""
    with app.app_context():
        # Drop all tables (careful in production!)
        db.drop_all()
        
        # Create all tables
        db.create_all()
        
        print("✅ Database tables created successfully!")
        
        # Optionally add sample data
        add_sample_data = input("Add sample todos? (y/n): ").lower()
        if add_sample_data == 'y':
            add_sample_todos()

def add_sample_todos():
    """Add sample todos for testing"""
    with app.app_context():
        sample_todos = [
            Todo(
                text="Learn Flask and REST APIs",
                deadline=(datetime.now() + timedelta(days=3)).date(),
                completed=False
            ),
            Todo(
                text="Build a React frontend",
                deadline=(datetime.now() + timedelta(days=5)).date(),
                completed=False
            ),
            Todo(
                text="Study SQLAlchemy ORM",
                deadline=(datetime.now() - timedelta(days=1)).date(),
                completed=False
            ),
            Todo(
                text="Set up virtual environment",
                deadline=None,
                completed=True
            ),
            Todo(
                text="Deploy to production",
                deadline=(datetime.now() + timedelta(days=10)).date(),
                completed=False
            )
        ]
        
        for todo in sample_todos:
            db.session.add(todo)
        
        db.session.commit()
        print(f"✅ Added {len(sample_todos)} sample todos!")

if __name__ == '__main__':
    print("Initializing database...")
    init_db()
    print("Done!")
