# Database Schema

## ER Diagram
```mermaid
erDiagram
    USERS ||--o{ LEAVE_REQUESTS : makes
    USERS ||--o{ LEAVE_BALANCE : has
    USERS {
        bigint id PK
        varchar first_name
        varchar last_name
        varchar email
        varchar password
        varchar role
    }
    LEAVE_REQUESTS {
        bigint id PK
        bigint user_id FK
        varchar leave_type
        date start_date
        date end_date
        varchar status
        text reason
        text admin_remark
    }
    LEAVE_BALANCE {
        bigint id PK
        bigint user_id FK
        varchar leave_type
        int allocated_days
        int used_days
    }
```

## Description
- **USERS:** Stores employee and admin credentials.
- **LEAVE_REQUESTS:** Tracks the lifecycle of applied leaves.
- **LEAVE_BALANCE:** Normalised tally of remaining and used leaves.
