# Frontend - React Todo Application

React-based frontend for the Todo application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional):
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm start
```

The app will run on http://localhost:3000

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
frontend/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/
│   │   ├── TodoForm.jsx     # Form for adding todos
│   │   ├── TodoItem.jsx     # Individual todo item
│   │   ├── TodoList.jsx     # List of todos
│   │   └── Stats.jsx        # Statistics display
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── App.jsx              # Main app component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tailwind.config.js       # Tailwind CSS config
└── postcss.config.js        # PostCSS config
```

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Features

- Create, read, update, and delete todos
- Set deadlines for tasks
- Mark todos as complete/incomplete
- Visual indicators for overdue tasks
- Statistics dashboard
- Responsive design with Tailwind CSS

## Dependencies

- React 18.x
- Axios (HTTP client)
- Tailwind CSS (Styling)
- Lucide React (Icons)

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.
