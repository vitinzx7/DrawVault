package com.vitinzx.drawvault;

import java.time.Instant;
import java.util.UUID;

public record ArtworkResponse(
    UUID id,
    String name,
    String description,
    String imageUrl,
    Instant createdAt
) {
}
