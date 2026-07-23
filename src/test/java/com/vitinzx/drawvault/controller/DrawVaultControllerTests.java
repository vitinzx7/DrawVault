package com.vitinzx.drawvault.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.vitinzx.drawvault.dto.ArtworkResponse;
import com.vitinzx.drawvault.service.ArtworkService;

@WebMvcTest(DrawVaultController.class)
class DrawVaultControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ArtworkService artworkService;

    @Test
    void shouldReturnPublicArtworkWithOkStatus() throws Exception {
        UUID artworkId = UUID.randomUUID();
        ArtworkResponse artwork = new ArtworkResponse(
                artworkId,
                "Public Detail",
                "Visible artwork detail",
                "https://example.com/artwork.webp",
                Instant.parse("2026-07-23T12:00:00Z"));

        when(artworkService.findPublicArtwork(artworkId))
                .thenReturn(Optional.of(artwork));

        mockMvc.perform(get("/api/artworks/{id}", artworkId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Public Detail"));
    }

    @Test
    void shouldReturnNotFoundWhenPublicArtworkDoesNotExist() throws Exception {
        UUID artworkId = UUID.randomUUID();

        when(artworkService.findPublicArtwork(artworkId))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/artworks/{id}", artworkId))
                .andExpect(status().isNotFound());
    }
}
