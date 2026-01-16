# Deployment Guide

This guide covers deploying the Todo App to production environments.

## Backend Deployment

### Option 1: Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and initialize:
```bash
railway login
railway init
```

3. Add PostgreSQL database:
```bash
railway add postgresql
```

4. Update `backend/app.py` to use PostgreSQL:
```python
import os
DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///todos.db')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
```

5. Deploy:
```bash
railway up
```

### Option 2: Heroku

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create app:
```bash
cd backend
heroku create your-app-name
```

3. Add PostgreSQL:
```bash
heroku addons:create heroku-postgresql:mini
```

4. Create `Procfile`:
```
web: gunicorn app:app
```

5. Add to `requirements.txt`:
```
gunicorn==21.2.0
psycopg2-binary==2.9.9
```

6. Deploy:
```bash
git push heroku main
```

### Option 3: Render

1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: todo-api
    env: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "gunicorn app:app"
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: todo-db
          property: connectionString

databases:
  - name: todo-db
    databaseName: todos
    user: todos_user
```

2. Push to GitHub and connect to Render

## Frontend Deployment

### Option 1: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
cd frontend
npm run build
netlify deploy --prod --dir=build
```

3. Set environment variables in Netlify dashboard

### Option 3: GitHub Pages (Static only)

1. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/todo-app",
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deploy scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

4. Deploy:
```bash
npm run deploy
```

## Environment Variables

### Backend (.env)
```
FLASK_ENV=production
DATABASE_URL=postgresql://user:password@host/database
SECRET_KEY=your-secure-random-key
CORS_ORIGINS=https://your-frontend-domain.com
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Production Checklist

### Backend
- [ ] Change `debug=False` in Flask
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set secure `SECRET_KEY`
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Add rate limiting
- [ ] Enable database backups

### Frontend
- [ ] Update API URL to production backend
- [ ] Build optimized production bundle
- [ ] Enable HTTPS
- [ ] Configure caching headers
- [ ] Add error tracking (e.g., Sentry)
- [ ] Optimize images and assets

## Database Migration (SQLite to PostgreSQL)

1. Install PostgreSQL adapter:
```bash
pip install psycopg2-binary
```

2. Update connection string in `app.py`:
```python
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
```

3. Initialize new database:
```python
from app import app, db
with app.app_context():
    db.create_all()
```

## Monitoring

### Backend Health Check
```bash
curl https://your-backend-url.com/api/health
```

### Frontend Health Check
```bash
curl https://your-frontend-url.com
```

## Troubleshooting

### CORS Issues
- Verify CORS origins in backend configuration
- Check that frontend API URL is correct

### Database Connection Issues
- Verify DATABASE_URL format
- Check database credentials
- Ensure database is accessible from deployment platform

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Review build logs for specific errors

## Security Best Practices

1. **Never commit secrets**: Use environment variables
2. **Enable HTTPS**: Use SSL certificates
3. **Validate input**: Sanitize all user input
4. **Rate limiting**: Prevent API abuse
5. **Update dependencies**: Keep packages up to date
6. **Authentication**: Add user authentication for production
7. **Database backups**: Regular automated backups

## Cost Estimates

### Free Tier Options
- **Railway**: Free tier available
- **Render**: Free tier for web services
- **Vercel**: Free for personal projects
- **Netlify**: Free for personal projects

### Paid Options
- **Heroku**: ~$7/month for basic dyno
- **AWS**: Variable, pay per use
- **DigitalOcean**: $5/month for basic droplet

## Next Steps

1. Deploy backend to chosen platform
2. Deploy frontend to chosen platform
3. Update frontend API URL
4. Test all functionality
5. Set up monitoring and alerts
6. Configure CI/CD pipeline (optional)
