# Car wash booking

Full-stack car wash and detailing reservation application for browsing services, selecting an available date and time, and managing reservations from an admin view.

## Video Demo

`TODO`

## Tech Stack

- Backend: Java, Spring Boot, Spring Data JPA, H2 database
- Frontend: React, TypeScript, Vite, Axios, React Router

## Features

- Service catalog loaded from the backend
- Booking flow with service selection, calendar date picker, available time slots, customer details, and reservation summary
- Duplicate booking prevention for the same date and time
- Reservation statuses: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`
- Admin reservation list and reservation detail page
- Status updates and reservation deletion for admin
- Home page before/after work showcase with image preview
- Light and dark mode support

## Running Locally

Start the backend:

```bash
cd backend
./gradlew bootRun
```

Backend runs at:

```text
http://localhost:8080
```

H2 console runs at:

```text
http://localhost:8080/h2-console
```

Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## API Overview

- `GET /api/health`
- `GET /api/services`
- `GET /api/services/{id}`
- `POST /api/reservations`
- `GET /api/reservations`
- `GET /api/reservations/{id}`
- `PATCH /api/reservations/{id}/status`
- `DELETE /api/reservations/{id}`

## Notes

Default services are created on backend startup when the database is empty. The frontend expects the backend API to be available at `http://localhost:8080/api`.
