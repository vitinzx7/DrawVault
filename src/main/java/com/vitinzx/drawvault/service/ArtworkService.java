package com.vitinzx.drawvault.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.vitinzx.drawvault.dto.ArtworkResponse;
import com.vitinzx.drawvault.entity.Artwork;
import com.vitinzx.drawvault.repository.ArtworkRepository;

@Service
public class ArtworkService {
    private final ArtworkRepository artworkRepository;

    public ArtworkService(ArtworkRepository artworkRepository) {
        this.artworkRepository = artworkRepository;
    }

    public List<ArtworkResponse> listPublicArtworks() {
        return artworkRepository.findByVisibleTrueOrderByCreatedAtDesc()
            .stream()
            .map(this::toResponse)
            .toList();
    }

    public Optional<ArtworkResponse> findPublicArtwork(UUID id) {
        return artworkRepository.findByIdAndVisibleTrue(id)
            .map(this::toResponse);
    }

    private ArtworkResponse toResponse(Artwork artwork) {
        return new ArtworkResponse(
                artwork.getId(),
                artwork.getName(),
                artwork.getDescription(),
                artwork.getImageUrl(),
                artwork.getCreatedAt());
    }
}
