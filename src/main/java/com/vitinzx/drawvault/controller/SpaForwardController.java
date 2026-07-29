package com.vitinzx.drawvault.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping({"/gallery", "/about"})
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
