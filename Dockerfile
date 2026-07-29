FROM node:24-alpine AS frontend-build

WORKDIR /workspace/frontend

COPY drawvault-web/package.json drawvault-web/package-lock.json ./
RUN npm ci

COPY drawvault-web/ ./
RUN npm run build


FROM eclipse-temurin:21-jdk-alpine AS backend-build

WORKDIR /workspace

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
COPY src/ src/
COPY --from=frontend-build /workspace/frontend/dist/ src/main/resources/static/

RUN ./mvnw -DskipTests package


FROM eclipse-temurin:21-jre-alpine AS runtime

WORKDIR /app

RUN addgroup -S drawvault \
    && adduser -S drawvault -G drawvault

COPY --from=backend-build --chown=drawvault:drawvault \
    /workspace/target/DrawVault-0.0.1-SNAPSHOT.jar app.jar

USER drawvault

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
