# API Documentation

## Auth APIs
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Returns: JWT Token & User Profile
- `GET /api/auth/me`
  - Headers: `Authorization: Bearer <token>`
  - Returns: Current User Profile

## Employee APIs (Role: EMPLOYEE, ADMIN)
- `POST /api/leaves/apply`
  - Body: `{ leaveType, startDate, endDate, reason }`
- `GET /api/leaves/history`
- `GET /api/leaves/balance`
- `PUT /api/leaves/cancel/{id}`

## Admin APIs (Role: ADMIN)
- `GET /api/admin/leaves`
- `GET /api/admin/pending`
- `PUT /api/admin/approve/{id}`
  - Body: `{ remark }`
- `PUT /api/admin/reject/{id}`
  - Body: `{ remark }`
