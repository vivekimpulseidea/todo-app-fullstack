# Contributing to Todo App

Thank you for considering contributing to this project! This document provides guidelines for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add feature: description"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python database.py
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Code Style

### Python
- Follow PEP 8 guidelines
- Use meaningful variable names
- Add docstrings to functions
- Keep functions small and focused

### JavaScript/React
- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Add PropTypes or TypeScript types when possible

## Testing

Before submitting a PR:
- Test all CRUD operations
- Verify error handling
- Test edge cases
- Ensure no console errors
- Check responsive design

## Pull Request Process

1. Update README.md if needed
2. Add/update comments in your code
3. Ensure all tests pass
4. Update documentation for new features
5. Request review from maintainers

## Feature Requests

Open an issue with:
- Clear description of the feature
- Use cases
- Potential implementation approach

## Bug Reports

Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Python version)

## Questions?

Open an issue with the `question` label.

Thank you for contributing! 🎉
