package com.vitinzx.drawvault;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtworkRepository extends JpaRepository<Artwork, UUID> {
}
