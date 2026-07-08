

```md
# DrawVault

DrawVault is a personal digital art archive built to store, organize, and present drawings in a calm public gallery interface.

The project is currently in active development. The frontend already has the first public pages, while the backend is being prepared to handle artwork data, validation, and future secure uploads.

## Current Status

- Public frontend interface in progress
- Home, Gallery, and About pages created
- Mock artwork data used for the gallery
- Backend structure started with Spring Boot
- Artwork entity, DTO, repository, and service layers started
- Real image upload is not implemented yet

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Maven
- PostgreSQL planned for persistence
- H2 used for tests

### Frontend

- React
- TypeScript
- Vite
- React Router

## Project Structure

```text
DrawVault/
├── src/main/java/com/vitinzx/drawvault/
│   ├── controller/
│   ├── dto/
│   ├── entity/
│   ├── repository/
│   └── service/
└── drawvault-web/
    └── src/
        ├── components/
        ├── pages/
        ├── data/
        ├── types/
        └── assets/
```

## Running the Backend

From the project root:

```bash
./mvnw spring-boot:run
```

Run tests:

```bash
./mvnw test
```

## Running the Frontend

From the frontend folder:

```bash
cd drawvault-web
npm install
npm run dev
```

The frontend will run locally through Vite.

## Security Notes

DrawVault is being developed with security in mind. Future backend work will include:

- input validation
- private upload flow
- authorization for sensitive actions
- safer image handling
- protection against exposing unpublished artwork

## Roadmap

- Create artwork creation endpoint
- Add backend validation
- Connect frontend to backend
- Add secure image upload
- Add private admin area
- Add authentication and authorization
- Replace mock gallery data with real database records

## License

This project is currently personal and experimental. License to be defined.
```
