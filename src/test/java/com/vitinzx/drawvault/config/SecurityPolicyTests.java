package com.vitinzx.drawvault.config;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.vitinzx.drawvault.controller.DrawVaultController;
import com.vitinzx.drawvault.service.ArtworkService;

@WebMvcTest(DrawVaultController.class)
@Import(SecurityConfig.class)
class SecurityPolicyTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserDetailsService userDetailsService;

    @MockitoBean
    private ArtworkService artworkService;

    @Test
    void shouldAllowThePublicArtworkCollection() throws Exception {
        when(artworkService.listPublicArtworks()).thenReturn(List.of());

        mockMvc.perform(get("/api/artworks"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldLetThePublicFaviconReachStaticResourceHandling() throws Exception {
        mockMvc.perform(get("/favicon.svg"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldNotCreateASpringBootDefaultUser() {
        assertThatThrownBy(() -> userDetailsService.loadUserByUsername("user"))
                .isInstanceOf(UsernameNotFoundException.class);
    }

    @Test
    void shouldNotExposeAFutureNestedArtworkRoute() throws Exception {
        UUID artworkId = UUID.randomUUID();

        mockMvc.perform(get("/api/artworks/{id}/original", artworkId))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldRejectWritesWithoutCsrf() throws Exception {
        mockMvc.perform(post("/api/artworks"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldDenyWritesEvenWithValidCsrf() throws Exception {
        mockMvc.perform(post("/api/artworks").with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldNotExposeSpringSecurityDefaultLogin() throws Exception {
        mockMvc.perform(get("/login"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldNotAcceptHttpBasicAuthentication() throws Exception {
        mockMvc.perform(get("/api/admin/artworks").with(httpBasic("owner", "wrong-password")))
                .andExpect(status().isForbidden())
                .andExpect(header().doesNotExist("WWW-Authenticate"));
    }

    @Test
    void shouldKeepTheDefaultLogoutEndpointDisabled() throws Exception {
        mockMvc.perform(post("/logout").with(csrf()))
                .andExpect(status().isForbidden());
    }
}
