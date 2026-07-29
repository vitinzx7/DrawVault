package com.vitinzx.drawvault.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(SpaForwardController.class)
class SpaForwardControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @ParameterizedTest
    @ValueSource(strings = {"/gallery", "/about"})
    void shouldForwardSpaRouteToIndex(String route) throws Exception {
        mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(forwardedUrl("/index.html"));
    }
}
