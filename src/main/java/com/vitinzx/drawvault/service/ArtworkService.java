package com.vitinzx.drawvault.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vitinzx.drawvault.dto.ArtworkResponse;
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
            .map(artwork -> new ArtworkResponse(
                        artwork.getId(),
                        artwork.getName(),
                        artwork.getDescription(),
                        artwork.getImageUrl(),
                        artwork.getCreatedAt()
            ))
            .toList();
    }
}
