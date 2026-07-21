package com.vitinzx.drawvault.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vitinzx.drawvault.entity.Artwork;

public interface ArtworkRepository extends JpaRepository<Artwork, UUID> {
}
