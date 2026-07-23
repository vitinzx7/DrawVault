package com.vitinzx.drawvault.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import com.vitinzx.drawvault.entity.Artwork;

@DataJpaTest
class ArtworkRepositoryTests {

    @Autowired
    private ArtworkRepository artworkRepository;

    @Test
    void shouldReturnOnlyVisibleArtworks() {
        Artwork publicArtwork = artworkRepository.saveAndFlush(
                new Artwork("Public Test", "Visible artwork"));

        // @PrePersist creates every new artwork as private.
        // After the first save, we publish this one explicitly.
        publicArtwork.setVisible(true);
        artworkRepository.saveAndFlush(publicArtwork);

        artworkRepository.saveAndFlush(
                new Artwork("Private Draft", "Hidden artwork"));

        List<Artwork> result =
                artworkRepository.findByVisibleTrueOrderByCreatedAtDesc();

        assertThat(result)
                .extracting(Artwork::getName)
                .containsExactly("Public Test");
    }

    @Test
    void shouldFindVisibleArtworkById() {
        Artwork publicArtwork = artworkRepository.saveAndFlush(
                new Artwork("Public Detail", "Visible artwork detail"));

        publicArtwork.setVisible(true);
        artworkRepository.saveAndFlush(publicArtwork);

        Optional<Artwork> result =
                artworkRepository.findByIdAndVisibleTrue(publicArtwork.getId());

        assertThat(result.map(Artwork::getName))
                .contains("Public Detail");
    }

    @Test
    void shouldNotFindPrivateArtworkById() {
        Artwork privateArtwork = artworkRepository.saveAndFlush(
                new Artwork("Private Detail", "Hidden artwork detail"));

        Optional<Artwork> result =
                artworkRepository.findByIdAndVisibleTrue(privateArtwork.getId());

        assertThat(result).isEmpty();
    }
}
