# Hostinger Deployment Setup Guide

This guide will help you set up automatic deployment to Hostinger using GitHub Actions.

## 🔧 Prerequisites

1. A Hostinger hosting account
2. GitHub repository with your code
3. FTP credentials from Hostinger

## 📝 Step-by-Step Setup

### 1. Get Your Hostinger FTP Credentials

1. Log in to your Hostinger account
2. Go to **Hosting** → Select your website
3. Navigate to **Files** → **FTP Accounts**
4. Note down or create FTP credentials:
   - **FTP Server/Host**: Usually `ftp.yourdomain.com` or an IP address
   - **FTP Username**: Your FTP username
   - **FTP Password**: Your FTP password

### 2. Add Secrets to GitHub Repository

1. Go to your GitHub repository: `https://github.com/atharva038/Zenith-25`
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following secrets:

#### FTP Credentials:
- **Name**: `FTP_SERVER`  
  **Value**: Your Hostinger FTP server (e.g., `ftp.yourdomain.com`)

- **Name**: `FTP_USERNAME`  
  **Value**: Your FTP username

- **Name**: `FTP_PASSWORD`  
  **Value**: Your FTP password

#### Firebase Environment Variables:
- **Name**: `REACT_APP_FIREBASE_API_KEY`  
  **Value**: Your Firebase API key

- **Name**: `REACT_APP_FIREBASE_AUTH_DOMAIN`  
  **Value**: Your Firebase auth domain

- **Name**: `REACT_APP_FIREBASE_PROJECT_ID`  
  **Value**: Your Firebase project ID

- **Name**: `REACT_APP_FIREBASE_STORAGE_BUCKET`  
  **Value**: Your Firebase storage bucket

- **Name**: `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`  
  **Value**: Your Firebase messaging sender ID

- **Name**: `REACT_APP_FIREBASE_APP_ID`  
  **Value**: Your Firebase app ID

- **Name**: `REACT_APP_FIREBASE_MEASUREMENT_ID`  
  **Value**: Your Firebase measurement ID

### 3. Configure Deployment Path (Optional)

By default, the workflow deploys to `/public_html/`. If your Hostinger setup uses a different directory:

1. Edit `.github/workflows/deploy.yml`
2. Change the `server-dir` value to your directory (e.g., `/domains/yourdomain.com/public_html/`)

### 4. Test the Deployment

1. **Automatic Deployment**: Push any changes to the `main` branch
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```

2. **Manual Deployment**: 
   - Go to **Actions** tab in your GitHub repository
   - Select **Deploy to Hostinger** workflow
   - Click **Run workflow** → **Run workflow**

### 5. Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. You can see each step of the deployment process
4. If successful, your site will be live on Hostinger!

## 🔍 Troubleshooting

### Build Fails
- Check the **Actions** logs for specific errors
- Ensure all environment variables are correctly set in GitHub Secrets

### FTP Connection Fails
- Verify FTP credentials are correct
- Check if your Hostinger IP is whitelisted (some hosts require this)
- Try using IP address instead of domain for FTP_SERVER

### Site Not Updating
- Clear browser cache
- Check if files were uploaded to correct directory in Hostinger File Manager
- Verify `server-dir` path in `deploy.yml` matches your hosting structure

### Environment Variables Not Working
- Make sure secret names match exactly (case-sensitive)
- Verify all Firebase secrets are added to GitHub repository secrets

## 📂 Deployment Directory Structure

After deployment, your Hostinger directory should look like:
```
public_html/
├── index.html
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── favicon.ico
├── logo192.png
├── logo512.png
└── manifest.json
```

## 🎯 Workflow Features

- ✅ Automatic deployment on push to `main` branch
- ✅ Manual deployment trigger available
- ✅ React app build with environment variables
- ✅ FTP deployment to Hostinger
- ✅ Incremental updates (only changed files)

## 🚀 Next Steps

1. Add your domain to Hostinger if not done already
2. Configure SSL certificate in Hostinger (free with Let's Encrypt)
3. Test your deployed website
4. Set up custom domain if needed

## 📞 Support

If you encounter issues:
- Check Hostinger documentation
- Review GitHub Actions logs
- Verify all credentials and secrets
