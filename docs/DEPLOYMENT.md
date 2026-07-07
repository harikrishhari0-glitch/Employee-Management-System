# Deployment Guide

## Backend Deployment (Spring Boot)
1. Configure production `application.properties` with environment variables (e.g. `${DB_URL}`).
2. Build JAR: `./mvnw clean package -DskipTests`
3. Run the JAR: `java -jar target/backend-0.0.1-SNAPSHOT.jar`

## Frontend Deployment (React)
1. Configure `.env` with production `VITE_API_BASE_URL`.
2. Build bundle: `npm run build`
3. Serve the `dist/` directory using NGINX, Apache, or deploy to Vercel/Netlify.
