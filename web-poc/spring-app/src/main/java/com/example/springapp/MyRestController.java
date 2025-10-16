package com.example.springapp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyRestController {

    @Value("${my.secret.property}")
    private String secretProperty;

    @GetMapping("/api/hello")
    @CrossOrigin(origins = "http://localhost:3400")
    public String hello() {
        return "Hello from Spring Boot! Your secret is: " + secretProperty;
    }
}
