package com.vitinzx.drawvault.config;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.vitinzx.drawvault.service.ArtworkService;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = "server.forward-headers-strategy=framework")
class HstsHeaderTests {

    @LocalServerPort
    private int port;

    @MockitoBean
    private ArtworkService artworkService;

    @Test
    void doesNotEmitHstsOverPlainHttp() throws Exception {
        when(artworkService.listPublicArtworks()).thenReturn(List.of());

        HttpResponse<Void> response = get("/api/artworks", null);

        assertThat(response.headers().firstValue("Strict-Transport-Security"))
                .isEmpty();
    }

    @Test
    void emitsHstsWhenForwardedProtoIsHttps() throws Exception {
        when(artworkService.listPublicArtworks()).thenReturn(List.of());

        HttpResponse<Void> response = get("/api/artworks", "https");

        assertThat(response.headers().firstValue("Strict-Transport-Security"))
                .isPresent();
    }

    private HttpResponse<Void> get(String path, String forwardedProto) throws Exception {
        HttpRequest.Builder request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:" + port + path))
                .GET();

        if (forwardedProto != null) {
            request.header("X-Forwarded-Proto", forwardedProto);
        }

        return HttpClient.newHttpClient()
                .send(request.build(), HttpResponse.BodyHandlers.discarding());
    }
}
