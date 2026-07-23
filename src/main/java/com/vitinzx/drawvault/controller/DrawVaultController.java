package com.vitinzx.drawvault.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vitinzx.drawvault.dto.ArtworkResponse;
import com.vitinzx.drawvault.service.ArtworkService;

@RestController
@RequestMapping("/api/artworks")
public class DrawVaultController {

    private final ArtworkService artworkService;

    public DrawVaultController(ArtworkService artworkService) {
        this.artworkService = artworkService;
    }

    @GetMapping
    public List<ArtworkResponse> listPublicArtworks() {
        return artworkService.listPublicArtworks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtworkResponse> findPublicArtwork(
            @PathVariable UUID id) {
        return artworkService.findPublicArtwork(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}