package com.vitinzx.drawvault.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vitinzx.drawvault.entity.Artwork;

public interface ArtworkRepository extends JpaRepository<Artwork, UUID> {
    List<Artwork> findByVisibleTrueOrderByCreatedAtDesc();

    Optional<Artwork> findByIdAndVisibleTrue(UUID id);
}
