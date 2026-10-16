package com.vitinzx.drawvault.config;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.vitinzx.drawvault.service.ArtworkService;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ErrorDispatchSecurityTests {

    @LocalServerPort
    private int port;

    @MockitoBean
    private ArtworkService artworkService;

    @Test
    void invalidUuidShouldStayABadRequest() throws Exception {
        assertThat(statusOf("/api/artworks/abc")).isEqualTo(400);
    }

    @Test
    void missingStaticFileShouldStayANotFound() throws Exception {
        assertThat(statusOf("/artworks/does-not-exist.webp")).isEqualTo(404);
    }

    @Test
    void unexpectedFailureShouldStayAnInternalServerError() throws Exception {
        when(artworkService.listPublicArtworks())
                .thenThrow(new IllegalStateException("simulated failure"));

        assertThat(statusOf("/api/artworks")).isEqualTo(500);
    }

    private int statusOf(String path) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:" + port + path))
                .GET()
                .build();

        return HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.discarding())
                .statusCode();
    }
}
