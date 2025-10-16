# Intervi API Documentation

## Overview

Base URL: `/api`

All endpoints require:

- Content-Type: `application/json`
- Authentication: JWT token in Authorization header (except `/auth/*`)

## Authentication

### Register

Create a new user account.

```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "provider": "email"
}

Response (201):
{
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 3600
  },
  "userId": "507f1f77bcf86cd799439011"
}
```

### Login

Authenticate with email and password.

```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 3600
  },
  "userId": "507f1f77bcf86cd799439011"
}
```

### Refresh Token

Refresh expired access token.

```
POST /auth/refresh
Authorization: Bearer <refreshToken>

Response (200):
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 3600
}
```

### Logout

Logout and invalidate tokens.

```
POST /auth/logout
Authorization: Bearer <accessToken>

Response (204): No Content
```

## Interview Sessions

### Create Session

Start a new interview practice session.

```
POST /interviews/sessions
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011",
  "domainId": "507f1f77bcf86cd799439012",
  "sessionType": "mock",
  "scheduledAt": "2024-12-25T10:30:00Z"
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439013",
  "user": "507f1f77bcf86cd799439011",
  "domain": "507f1f77bcf86cd799439012",
  "sessionType": "mock",
  "status": "scheduled",
  "scheduledAt": "2024-12-25T10:30:00Z"
}
```

### List Sessions

Get all interview sessions for authenticated user.

```
GET /interviews/sessions?userId=507f1f77bcf86cd799439011
Authorization: Bearer <accessToken>

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "domain": "507f1f77bcf86cd799439012",
    "sessionType": "mock",
    "status": "completed",
    "scheduledAt": "2024-12-25T10:30:00Z",
    "completedAt": "2024-12-25T11:30:00Z",
    "overallScore": 82
  }
]
```

### Get Session

Retrieve specific interview session details.

```
GET /interviews/sessions/507f1f77bcf86cd799439013
Authorization: Bearer <accessToken>

Response (200):
{
  "_id": "507f1f77bcf86cd799439013",
  "user": "507f1f77bcf86cd799439011",
  "domain": "507f1f77bcf86cd799439012",
  "sessionType": "video",
  "status": "completed",
  "scheduledAt": "2024-12-25T10:30:00Z",
  "completedAt": "2024-12-25T11:30:00Z",
  "recording": {
    "videoUrl": "https://storage.example.com/video.mp4",
    "audioUrl": "https://storage.example.com/audio.m4a",
    "transcriptUrl": "https://storage.example.com/transcript.txt"
  },
  "overallScore": 85,
  "feedback": [
    {
      "category": "eye-contact",
      "score": 80,
      "comments": "Good eye contact maintained throughout"
    }
  ],
  "recommendations": [
    "Work on pacing - speaking too fast",
    "Include more examples in answers"
  ]
}
```

### Update Session Metrics

Submit performance metrics after session completion.

```
PATCH /interviews/sessions/507f1f77bcf86cd799439013/metrics
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "metrics": {
    "postureScore": 85,
    "eyeContactScore": 80,
    "gestureScore": 75,
    "speechPaceWpm": 125,
    "speechClarityScore": 88,
    "fillerWordFrequency": 0.08,
    "emotionTimeline": [
      {
        "label": "neutral",
        "probability": 0.7,
        "timestamp": 0
      }
    ],
    "overallPerformanceScore": 82
  }
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439013",
  "status": "completed",
  "overallScore": 82,
  "recommendations": ["Work on pacing", "Include more examples"]
}
```

## Analytics

### Dashboard Analytics

Get user dashboard metrics and statistics.

```
GET /analytics/dashboard?userId=507f1f77bcf86cd799439011
Authorization: Bearer <accessToken>

Response (200):
{
  "totalSessions": 25,
  "averageScore": 78,
  "currentStreak": 5,
  "bestStreak": 12,
  "experiencePoints": 2450,
  "recentSessions": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "domain": "software-dev",
      "score": 85,
      "completedAt": "2024-12-25T11:30:00Z"
    }
  ],
  "domainProgress": [
    {
      "domain": "software-dev",
      "proficiency": 82,
      "sessionsCompleted": 8
    }
  ],
  "achievements": [
    {
      "code": "FIRST_SESSION",
      "title": "First Steps",
      "unlockedAt": "2024-12-01T10:00:00Z"
    }
  ]
}
```

### Session Analytics

Get detailed analytics for a specific session.

```
GET /analytics/sessions/507f1f77bcf86cd799439013
Authorization: Bearer <accessToken>

Response (200):
{
  "sessionId": "507f1f77bcf86cd799439013",
  "postureScore": 85,
  "eyeContactScore": 80,
  "gestureScore": 75,
  "speechPaceWpm": 125,
  "speechClarityScore": 88,
  "fillerWordFrequency": 0.08,
  "emotionTimeline": [
    {
      "label": "neutral",
      "probability": 0.7,
      "timestamp": 0
    }
  ],
  "overallPerformanceScore": 82,
  "recommendations": [
    "Work on maintaining consistent eye contact",
    "Reduce filler words usage",
    "Improve pacing - speaking slightly too fast"
  ]
}
```

## Real-Time

### Handshake

Initialize real-time connection for interview session.

```
POST /realtime/handshake
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011"
}

Response (201):
{
  "socketId": "aBcDeF1234567890",
  "serverTime": "2024-12-25T10:30:00Z"
}
```

## System

### Health Check

Check API health status.

```
GET /health

Response (200):
{
  "status": "ok",
  "timestamp": "2024-12-25T10:30:00Z",
  "environment": "production"
}
```

### Ping

Simple ping endpoint.

```
GET /ping

Response (200):
{
  "message": "pong"
}
```

## Error Responses

All errors follow this format:

```json
{
  "message": "Error description",
  "details": {
    "field": ["Specific error for field"]
  }
}
```

### Common Status Codes

- `200 OK` - Successful request
- `201 Created` - Resource created
- `204 No Content` - Successful with no content
- `400 Bad Request` - Invalid request payload
- `401 Unauthorized` - Missing/invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Limit:** 100 requests per 15 minutes
- **Headers:**
  - `RateLimit-Limit`: Maximum requests
  - `RateLimit-Remaining`: Requests remaining
  - `RateLimit-Reset`: Time when limit resets

## WebSocket Events (Socket.io)

Connect to `/interview` namespace for real-time updates:

```javascript
const socket = io("/interview", {
  auth: { userId: "user-id" },
});

// Listen for real-time metrics
socket.on("metrics:update", (data) => {
  console.log("Updated metrics:", data);
});

// Send analysis data
socket.emit("metrics:send", {
  postureScore: 85,
  eyeContactScore: 80,
});
```

## Pagination

List endpoints support pagination:

```
GET /interviews/sessions?page=1&pageSize=10

Response:
{
  "items": [...],
  "total": 25,
  "page": 1,
  "pageSize": 10,
  "totalPages": 3
}
```

---

**API Version:** 1.0.0  
**Last Updated:** 2024
