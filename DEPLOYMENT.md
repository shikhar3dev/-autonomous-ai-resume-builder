# 🚀 Deployment Guide

## GitHub Setup

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name: `autonomous-ai-resume-builder`
4. Description: `World-class autonomous AI resume builder with stunning UI/UX`
5. Make it Public
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### 2. Push to GitHub
```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/autonomous-ai-resume-builder.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🚀 Live Deployment

### Frontend (Vercel)
1. Go to [Vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Add Environment Variables:
   - `REACT_APP_API_URL`: Your backend URL
7. Deploy!

### Backend (Render)
1. Go to [Render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New Web Service"
4. Connect your GitHub repository
5. Configure:
   - Name: `ai-resume-backend`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
7. Deploy!

### Alternative: Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Deploy from GitHub repo
5. Configure environment variables
6. Deploy!

## 🔧 Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
```

## 📱 Domain Setup

### Custom Domain (Optional)
1. **Vercel**: Add custom domain in project settings
2. **Render**: Add custom domain in service settings
3. Update CORS settings in backend

## 🔒 Security Checklist

- [ ] Environment variables set
- [ ] CORS configured for production
- [ ] HTTPS enabled
- [ ] Rate limiting active
- [ ] Input validation working

## 📊 Monitoring

### Vercel Analytics
- Enable in project settings
- Track performance and errors

### Render Monitoring
- View logs in dashboard
- Set up alerts for downtime

## 🚀 Quick Deploy Commands

```bash
# Frontend (Vercel)
vercel --prod

# Backend (Render)
# Use Render dashboard or CLI
```

## 📈 Performance Optimization

### Frontend
- Enable Vercel Edge Functions
- Optimize images
- Enable compression

### Backend
- Enable caching
- Optimize database queries
- Use CDN for static assets

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues
1. **CORS Errors**: Update backend CORS settings
2. **Build Failures**: Check Node.js version compatibility
3. **Environment Variables**: Verify all required vars are set
4. **Port Issues**: Ensure PORT is correctly configured

### Support
- Check deployment logs
- Verify environment variables
- Test locally first
- Check network connectivity

---

**Your autonomous AI resume builder is now ready for the world! 🌍**
