package com.vitinzx.drawvault;

import static org.assertj.core.api.Assertions.assertThat;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import com.vitinzx.drawvault.entity.Artwork;
import com.vitinzx.drawvault.repository.ArtworkRepository;

@Testcontainers
@SpringBootTest(properties = {
        "spring.flyway.enabled=true",
        "spring.jpa.hibernate.ddl-auto=validate"
})
class PostgresFlywayIntegrationTests {

    @Container
    @ServiceConnection
    static final PostgreSQLContainer postgres =
            new PostgreSQLContainer("postgres:17-alpine");

    @Autowired
    private Flyway flyway;

    @Autowired
    private ArtworkRepository artworkRepository;

    @Test
    void shouldApplyMigrationsAndSeedTheSixPublicArtworks() {
        assertThat(flyway.info().applied())
                .extracting(migration -> migration.getScript())
                .contains(
                        "V1__create_artworks.sql",
                        "V2__seed_public_artworks.sql");

        assertThat(artworkRepository.findByVisibleTrueOrderByCreatedAtDesc())
                .extracting(Artwork::getName)
                .containsExactly(
                        "Meliodas X Zeldris",
                        "Anime garota",
                        "Ravena",
                        "Ghost",
                        "Midoriya",
                        "Obito");
    }
}
