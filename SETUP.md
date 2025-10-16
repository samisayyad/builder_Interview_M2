# Intervi - Setup Guide

## Project Overview

Intervi is a production-ready AI-powered interview practice platform built with a modern tech stack.

**Tech Stack:**
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Socket.io, Redis
- **AI/ML:** TensorFlow.js, MediaPipe, Face-api.js, Web Speech API

## Prerequisites

- Node.js 18+ and pnpm 10.14+
- MongoDB (local or cloud instance)
- Redis (optional, for caching and real-time features)

## Installation

### 1. Clone and Install Dependencies

```bash
# Install dependencies
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your configuration
nano .env.local
```

### Required Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_ACCESS_SECRET` - JWT secret (min 32 characters)
- `JWT_REFRESH_SECRET` - JWT refresh secret (min 32 characters)

### Optional Environment Variables

- `REDIS_URL` - Redis connection (for caching and real-time)
- `AWS_S3_BUCKET` - S3 bucket for file uploads
- `SENTRY_DSN` - Sentry error tracking
- `SMTP_*` - Email service configuration

## Development

### Start Dev Server

```bash
pnpm dev
```

This starts:
- Vite frontend on http://localhost:8080
- Express backend on http://localhost:8080/api

### Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch
```

### Type Checking

```bash
pnpm typecheck
```

## Build & Production

### Build for Production

```bash
pnpm build
```

This generates:
- Frontend SPA: `dist/spa/`
- Backend server: `dist/server/`

### Start Production Server

```bash
pnpm start
```

## Project Structure

### Frontend (`client/`)

```
client/
├── pages/          # Route components
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks (useAuth, useRealtime, etc.)
├── services/       # API clients and external services
├── utils/          # Utility functions
├── constants/      # App constants
└── types/          # TypeScript types
```

### Backend (`server/`)

```
server/
├── routes/         # API route definitions
├── controllers/    # Request handlers
├── services/       # Business logic
├── models/         # MongoDB schemas
├── middleware/     # Express middleware
├── config/         # Configuration (env, db, redis)
├── utils/          # Utility functions
└── realtime/       # WebSocket/Socket.io
```

### Shared (`shared/`)

```
shared/
└── api.ts         # Shared type definitions
```

## Database

### MongoDB Setup

#### Local Development
```bash
# Install MongoDB Community Edition
# macOS:
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# MongoDB runs on mongodb://localhost:27017
```

#### Cloud (MongoDB Atlas)
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Set connection string in `MONGODB_URI`

### Database Models

- **User** - User profiles with statistics and achievements
- **InterviewDomain** - 15+ interview domains
- **McqQuestion** - 1000+ MCQ questions
- **BehaviorQuestion** - Behavioral questions with STAR framework
- **CaseStudy** - Case study scenarios
- **InterviewSession** - Interview session records
- **SessionMetrics** - Performance analytics
- **Achievement** - Gamification achievements
- **StudyPlan** - AI-generated study plans

## API Documentation

### Authentication Endpoints

```
POST /api/auth/register      - Register new user
POST /api/auth/login         - Login with email/password
POST /api/auth/refresh       - Refresh JWT tokens
POST /api/auth/logout        - Logout
```

### Interview Endpoints

```
POST /api/interviews/sessions              - Create interview session
GET /api/interviews/sessions               - List user sessions
GET /api/interviews/sessions/:sessionId    - Get session details
PATCH /api/interviews/sessions/:id/metrics - Update session metrics
```

### Analytics Endpoints

```
GET /api/analytics/dashboard    - User dashboard analytics
GET /api/analytics/sessions/:id - Session analytics
```

### System Endpoints

```
GET /api/health   - Health check
GET /api/ping     - Ping endpoint
```

## Features

### Core Features

- ✅ Complete authentication system
- ✅ AI-powered interview sessions
- ✅ Real-time body language analysis
- ✅ Speech analysis with insights
- ✅ 1000+ MCQ practice questions
- ✅ Behavioral interview framework
- ✅ Case study scenarios
- ✅ Performance analytics dashboard
- ✅ Gamification (streaks, achievements)

### Real-Time Features

- Socket.io integration for live feedback
- Real-time pose detection
- Live emotion recognition
- Stream-based metrics

### AI Capabilities

- Pose detection (MediaPipe)
- Facial landmarks (Face-api.js)
- Speech analysis (Web Speech API)
- Emotion recognition (7 emotions)
- Performance predictions

## Deployment

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy with `pnpm build`

### Vercel Deployment

1. Import project from GitHub
2. Configure environment variables
3. Auto-deploy on push

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 8080
CMD ["pnpm", "start"]
```

## Performance Optimization

- Code splitting and lazy loading enabled
- Image optimization with responsive sizes
- Bundle analysis with Vite
- Database query optimization with MongoDB indexes
- Redis caching for frequently accessed data
- Compression middleware enabled

## Security

- JWT-based authentication with access/refresh tokens
- bcrypt password hashing (12 rounds)
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Helmet.js security headers
- Input validation with Zod
- HTTPS enforcement in production

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is running
2. Check MONGODB_URI in .env.local
3. Verify network connectivity
```

### Redis Connection Error (Optional)

```
Error: Redis connection failed

Solution:
1. Install Redis or use cloud instance
2. Set REDIS_URL in .env.local
3. Or remove Redis for development (optional)
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::8080

Solution:
pnpm dev --port 3000
```

### Package Installation Failed

```bash
# Clear cache and reinstall
pnpm store prune
rm pnpm-lock.yaml
pnpm install
```

## Development Workflow

### Creating New Features

1. Create API endpoint in `server/routes/`
2. Implement service logic in `server/services/`
3. Create React component in `client/components/`
4. Add hook in `client/hooks/` if needed
5. Add API types in `shared/api.ts`
6. Write tests and documentation

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Commit changes
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature

# Create Pull Request
```

## Testing

### Unit Tests

```bash
pnpm test
```

### Test Coverage

```bash
pnpm test -- --coverage
```

## Performance Monitoring

- Enable Sentry for error tracking: set `SENTRY_DSN`
- Use Google Analytics: set `GOOGLE_ANALYTICS_ID`
- Monitor API performance with Morgan logs
- Use MongoDB Atlas monitoring for database

## Support & Documentation

- GitHub Issues: Bug reports and feature requests
- API Documentation: `/api/docs` (when available)
- Architecture Guide: See `ARCHITECTURE.md`

## License

This project is proprietary and confidential.

---

**Last Updated:** 2024
