package com.vitinzx.drawvault.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vitinzx.drawvault.dto.ArtworkResponse;
import com.vitinzx.drawvault.entity.Artwork;
import com.vitinzx.drawvault.repository.ArtworkRepository;

@ExtendWith(MockitoExtension.class)
class ArtworkServiceTests {

    @Mock
    private ArtworkRepository artworkRepository;

    @InjectMocks
    private ArtworkService artworkService;

    @Test
    void shouldReturnPublicArtworkWhenRepositoryFindsIt() {
        UUID artworkId = UUID.randomUUID();
        Artwork artwork = new Artwork("Public Detail", "Visible artwork detail");

        when(artworkRepository.findByIdAndVisibleTrue(artworkId))
                .thenReturn(Optional.of(artwork));

        Optional<ArtworkResponse> result =
                artworkService.findPublicArtwork(artworkId);

        assertThat(result.map(ArtworkResponse::name))
                .contains("Public Detail");
    }
}
