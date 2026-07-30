# DrawVault

A public digital art portfolio built to showcase my drawings through a responsive gallery.

**Live Demo:** [Open DrawVault](https://ca-drawvault-prod-ncus.yellowpond-a94a1ce0.northcentralus.azurecontainerapps.io)

## Overview

DrawVault is a read-only MVP where visitors can explore published artwork without creating an account.

The project combines a React frontend with a Java and Spring Boot backend, PostgreSQL persistence, Flyway migrations, Docker, and Azure deployment.

## Features

- Public Home, Gallery, and About pages
- Gallery populated by the real backend API
- Six published artworks stored as static WebP assets
- Artwork preview modal
- Modal closes with:
  - close button;
  - `Escape`;
  - backdrop click
- Responsive interface for mobile and desktop
- Public API that returns only published artworks
- Google Analytics 4 integration with consent preferences
- Azure deployment with HTTPS

## Architecture

```text
Browser
   │
   ▼
Azure Container Apps
   │
   ├── React build served as static files
   │
   └── Spring Boot API
           │
           ▼
      PostgreSQL
```

```text
React
   │ GET /api/artworks
   ▼
Spring Controller
   ▼
Service
   ▼
Repository
   ▼
PostgreSQL
   ▼
ArtworkResponse JSON
   ▼
React Gallery
```

## Tech Stack

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" height="28" alt="Java" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" height="28" alt="Spring Boot" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" height="28" alt="PostgreSQL" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" height="28" alt="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="28" alt="TypeScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" height="28" alt="Docker" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" height="28" alt="Azure" />
</p>

### Backend

`Java 21` · `Spring Boot 4.1` · `Spring MVC` · `Spring Data JPA` · `Hibernate` · `Maven`

### Database

`PostgreSQL 17` · `Flyway` · `HikariCP` · `H2 for tests`

### Frontend

`React 19` · `TypeScript` · `Vite` · `React Router` · `Oxlint`

### Testing

`JUnit 5` · `Mockito` · `MockMvc` · `AssertJ` · `@DataJpaTest` · `@WebMvcTest`

### Infrastructure and Cloud

`Docker` · `Docker Compose` · `Multi-stage Dockerfile` · `Azure Container Apps` · `Azure Container Registry` · `Azure Database for PostgreSQL` · `Azure Log Analytics`

### Analytics

`Google Analytics 4` · `Consent Mode` · `Artwork interaction events` · `Contact click events`

## Project Structure

```text
DrawVault/
├── src/
│   ├── main/
│   │   ├── java/com/vitinzx/drawvault/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   └── resources/
│   │       └── db/migration/
│   └── test/
├── drawvault-web/
│   ├── public/artworks/
│   └── src/
├── Dockerfile
├── compose.yaml
└── pom.xml
```

## Public API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/artworks` | Returns all published artworks, newest first |
| `GET` | `/api/artworks/{id}` | Returns one published artwork |

Private artworks and nonexistent IDs both return `404 Not Found`.

Example response:

```json
{
  "id": "f4a4d7d4-bfe7-4af5-9e34-c44c4b742001",
  "name": "Meliodas X Zeldris",
  "description": "",
  "imageUrl": "/artworks/meliodas-x-zeldris.webp",
  "createdAt": "2026-07-29T13:51:18.761374Z"
}
```

## Running Locally

### Prerequisites

- Java 21
- Node.js and npm
- Docker and Docker Compose

### 1. Configure local environment variables

```bash
cp .env.example .env
```

Fill in your local database values in `.env`.

> Never commit `.env` files or real credentials.

### 2. Start PostgreSQL

```bash
docker compose up -d
```

The local database is available only through:

```text
127.0.0.1:5433
```

### 3. Start the backend

```bash
./mvnw spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### 4. Start the frontend

```bash
cd drawvault-web
npm ci
npm run dev
```

Frontend:

```text
http://localhost:5173
```

During local development, Vite proxies `/api` requests to the Spring Boot backend.

## Testing and Validation

### Backend tests

```bash
./mvnw test
```

### Frontend lint and production build

```bash
cd drawvault-web
npm run lint
npm run build
```

> The backend test profile uses H2 and disables Flyway. Therefore, passing tests do not replace PostgreSQL and Flyway validation.

## Docker

The production Dockerfile uses multiple stages:

```text
React build
   ↓
React static files copied into Spring resources
   ↓
Spring Boot JAR built
   ↓
Small JRE runtime image
```

The final container:

- runs as a non-root user;
- exposes port `8080`;
- serves both the frontend and backend from the same application.

## Security Notes

### Currently implemented

- Database credentials configured through environment variables
- `.env` ignored by Git
- PostgreSQL bound locally in Docker Compose
- Public queries filter artworks by `visible = true`
- New artworks are private by default
- DTOs prevent direct entity exposure
- Hidden and nonexistent artworks both return `404`
- Production container runs as a non-root user
- HTTPS provided by Azure Container Apps
- No public write or administrative endpoints in the MVP

### Planned for future administrative features

- Spring Security
- Owner-only authentication and authorization
- Session-based login
- BCrypt password hashing
- CSRF protection
- Input validation with Bean Validation
- Secure upload flow
- Object storage for uploaded artwork
- Authorization tests for administrative endpoints

## Analytics and Privacy

DrawVault uses Google Analytics 4 to understand general usage, such as page views, artwork openings, and contact-link clicks.

Visitors can choose their cookie preference. When analytics consent is denied, the application sends denied Consent Mode settings and uses limited cookieless measurement.

The MVP has no public registration, login, checkout, or form that requests personal user data.

## Current Limitations

- Read-only MVP
- No authentication or owner dashboard yet
- No upload flow yet
- No artwork editing, publishing, hiding, or deletion interface
- No automated frontend tests yet
- PostgreSQL/Flyway integration tests are still planned
- Modal focus trapping and focus restoration are future accessibility improvements

## Roadmap

- [ ] Add Spring Security access policy
- [ ] Implement owner authentication
- [ ] Add an administrative dashboard
- [ ] Add secure artwork upload
- [ ] Store uploads in object storage
- [ ] Add artwork management features
- [ ] Add PostgreSQL integration tests
- [ ] Add frontend automated tests
- [ ] Add a custom domain

## License

This is a personal portfolio project. License terms may be defined in the future.
