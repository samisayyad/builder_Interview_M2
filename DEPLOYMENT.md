# Intervi - Deployment Guide

## Pre-Deployment Checklist

- [ ] Environment variables configured (.env.local)
- [ ] MongoDB connection verified
- [ ] Redis connection tested (if enabled)
- [ ] Sentry DSN configured (if error tracking enabled)
- [ ] S3 bucket created (if using cloud storage)
- [ ] Database backups configured
- [ ] All tests passing (`pnpm test`)
- [ ] Production build successful (`pnpm build`)

## Build Process

### Production Build

```bash
# Install dependencies
pnpm install

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Build for production
pnpm build
```

Build outputs:

- Frontend: `dist/spa/` (static HTML/JS/CSS)
- Backend: `dist/server/` (Node.js application)

## Deployment Platforms

### Netlify Deployment

Netlify works well for the SPA frontend and can run the Express server as functions.

**Step 1: Create Netlify Account**

1. Sign up at https://netlify.com
2. Connect GitHub repository
3. Configure build settings

**Step 2: Configure Build Settings**

- Build command: `pnpm build`
- Publish directory: `dist/spa`

**Step 3: Environment Variables**

Set in Netlify dashboard under Site Settings → Environment:

```
NODE_ENV=production
MONGODB_URI=<your-mongodb-uri>
JWT_ACCESS_SECRET=<your-secret>
JWT_REFRESH_SECRET=<your-refresh-secret>
CLIENT_URL=<your-domain>
```

**Step 4: Deploy**

Push to main branch, Netlify auto-deploys.

### Vercel Deployment

Vercel provides excellent support for Node.js/Express backends.

**Step 1: Create Vercel Account**

1. Sign up at https://vercel.com
2. Import GitHub repository

**Step 2: Configure Project**

- Framework: Other (Custom)
- Build command: `pnpm build`
- Output directory: `dist`

**Step 3: Environment Variables**

Set in Vercel dashboard under Settings → Environment Variables:

```
MONGODB_URI=<your-mongodb-uri>
JWT_ACCESS_SECRET=<your-secret>
JWT_REFRESH_SECRET=<your-refresh-secret>
CLIENT_URL=<your-domain>
```

**Step 4: Deploy**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Docker Deployment

For containerized deployments (AWS, GCP, Azure, DigitalOcean).

**Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start
CMD ["pnpm", "start"]
```

**Docker Compose:**

```yaml
version: "3.9"

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://mongo:27017/intervi
      REDIS_URL: redis://redis:6379
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mongo_data:
  redis_data:
```

**Build and Run:**

```bash
# Build image
docker build -t intervi:latest .

# Run container
docker run -p 8080:8080 \
  -e MONGODB_URI="mongodb://host.docker.internal:27017/intervi" \
  -e JWT_ACCESS_SECRET="your-secret" \
  intervi:latest

# With Docker Compose
docker-compose up -d
```

### AWS Deployment

**Option 1: EC2 Instance**

```bash
# Connect to EC2 instance
ssh -i key.pem ec2-user@your-instance

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs npm

# Install pnpm
npm install -g pnpm

# Clone repository
git clone <your-repo>
cd intervi

# Install dependencies
pnpm install

# Build
pnpm build

# Install PM2 for process management
pnpm add -g pm2

# Start application
pm2 start "pnpm start" --name "intervi"
pm2 startup
pm2 save

# Configure Nginx as reverse proxy
sudo amazon-linux-extras install nginx1 -y
sudo systemctl start nginx
```

**Option 2: ECS (Elastic Container Service)**

```bash
# Create ECS task definition
aws ecs register-task-definition \
  --family intervi \
  --container-definitions file://task-definition.json \
  --region us-east-1

# Create ECS service
aws ecs create-service \
  --cluster intervi-cluster \
  --service-name intervi-service \
  --task-definition intervi \
  --desired-count 2 \
  --region us-east-1
```

### GCP Deployment

**Cloud Run:**

```bash
# Build container
gcloud builds submit --tag gcr.io/PROJECT_ID/intervi

# Deploy to Cloud Run
gcloud run deploy intervi \
  --image gcr.io/PROJECT_ID/intervi \
  --platform managed \
  --region us-central1 \
  --set-env-vars MONGODB_URI="<your-uri>"
```

### DigitalOcean Deployment

**App Platform:**

1. Connect GitHub repository
2. Create app
3. Set environment variables
4. Deploy

## Database Setup

### MongoDB Atlas (Cloud)

```bash
# 1. Create cluster at https://www.mongodb.com/cloud/atlas
# 2. Create database user
# 3. Get connection string: mongodb+srv://user:password@cluster.mongodb.net/database

# 4. Connect and verify
mongosh "mongodb+srv://user:password@cluster.mongodb.net/intervi"
```

### MongoDB Backup

```bash
# Backup to file
mongodump --uri="mongodb://localhost:27017" --out="./backup"

# Restore from backup
mongorestore --uri="mongodb://localhost:27017" ./backup
```

### Redis Setup

**AWS ElastiCache:**

```bash
# Create cluster in AWS console
# Get endpoint from cluster details
# Update REDIS_URL environment variable
```

**Cloud**

```bash
# Services like Redis Cloud, Upstash
# Create database and copy connection URL
```

## SSL/HTTPS

### Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d yourdomain.com

# Renew automatically (added by certbot)
sudo systemctl enable certbot.timer
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring & Logging

### Application Monitoring

```bash
# Enable Sentry for error tracking
export SENTRY_DSN="https://key@sentry.io/project"

# Enable Google Analytics
export GOOGLE_ANALYTICS_ID="GA-123456789"
```

### Server Monitoring

```bash
# Monitor with PM2
pm2 monit

# View logs
pm2 logs intervi

# Monitor system resources
top
htop
```

### Database Monitoring

```bash
# MongoDB Atlas monitoring
# Dashboard available in MongoDB Atlas console

# Check replica set status
rs.status()
```

## Performance Optimization

### Enable Compression

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss;
gzip_min_length 1024;
```

### CDN Configuration

```bash
# Use CloudFlare, Cloudfront, or similar
# Point domain to CDN
# CDN caches static assets
```

### Database Optimization

```javascript
// Create indexes
db.users.createIndex({ email: 1 });
db.interviews.createIndex({ user: 1, createdAt: -1 });
db.sessions.createIndex({ status: 1, scheduledAt: 1 });
```

## Rollback Strategy

```bash
# Keep previous version deployed
# Create new version: v1.2.3, v1.2.4
# If issues, switch back to previous version

# With Docker:
docker run -p 8080:8080 intervi:v1.2.3

# With PM2:
pm2 restart intervi --update-env
```

## Maintenance

### Regular Backups

```bash
# Daily MongoDB backup to S3
0 2 * * * /scripts/backup-mongodb.sh
```

### Database Maintenance

```bash
# Remove old session records
db.sessions.deleteMany({ createdAt: { $lt: new Date(Date.now() - 30*24*60*60*1000) } })
```

### Dependency Updates

```bash
# Check for vulnerabilities
pnpm audit

# Update dependencies
pnpm update
```

## Troubleshooting Deployment

### Connection Refused

```bash
# Check if app is running
curl http://localhost:8080/health

# Check port binding
netstat -tlnp | grep :8080

# Restart app
pm2 restart intervi
```

### Out of Memory

```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=2048" pnpm start

# Monitor memory usage
ps aux | grep node
```

### Database Connection Timeout

```bash
# Check MongoDB connection
mongosh "mongodb://localhost:27017"

# Verify firewall rules
sudo ufw allow 27017
```

---

**Last Updated:** 2024
