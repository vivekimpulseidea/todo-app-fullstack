from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
from models import Todo, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Enable CORS for frontend (port 3000)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Create tables
with app.app_context():
    db.create_all()

# ============= API ROUTES =============

@app.route('/api/todos', methods=['GET'])
def get_todos():
    """Get all todos"""
    try:
        todos = Todo.query.order_by(Todo.created_at.desc()).all()
        return jsonify([todo.to_dict() for todo in todos]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/todos/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    """Get a specific todo by ID"""
    try:
        todo = Todo.query.get(todo_id)
        if not todo:
            return jsonify({'error': 'Todo not found'}), 404
        return jsonify(todo.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/todos', methods=['POST'])
def create_todo():
    """Create a new todo"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'text' not in data:
            return jsonify({'error': 'Text field is required'}), 400
        
        if not data['text'].strip():
            return jsonify({'error': 'Text cannot be empty'}), 400
        
        # Create new todo
        new_todo = Todo(
            text=data['text'].strip(),
            deadline=data.get('deadline'),
            completed=data.get('completed', False)
        )
        
        db.session.add(new_todo)
        db.session.commit()
        
        return jsonify(new_todo.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """Update an existing todo"""
    try:
        todo = Todo.query.get(todo_id)
        if not todo:
            return jsonify({'error': 'Todo not found'}), 404
        
        data = request.get_json()
        
        # Update fields if provided
        if 'text' in data:
            if not data['text'].strip():
                return jsonify({'error': 'Text cannot be empty'}), 400
            todo.text = data['text'].strip()
        
        if 'deadline' in data:
            todo.deadline = data['deadline']
        
        if 'completed' in data:
            todo.completed = data['completed']
        
        todo.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify(todo.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """Delete a todo"""
    try:
        todo = Todo.query.get(todo_id)
        if not todo:
            return jsonify({'error': 'Todo not found'}), 404
        
        db.session.delete(todo)
        db.session.commit()
        
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/todos/stats', methods=['GET'])
def get_stats():
    """Get todo statistics"""
    try:
        total = Todo.query.count()
        completed = Todo.query.filter_by(completed=True).count()
        
        # Count overdue todos (deadline passed and not completed)
        today = datetime.utcnow().date()
        overdue = Todo.query.filter(
            Todo.completed == False,
            Todo.deadline != None,
            Todo.deadline < str(today)
        ).count()
        
        return jsonify({
            'total': total,
            'completed': completed,
            'pending': total - completed,
            'overdue': overdue
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Server is running'}), 200


# Error handlers
@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(e):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
