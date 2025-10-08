package com.angrysurfer.atomic.fs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class RestFsConfig {

    @Value("${restfs.api.url:http://localhost:8000/fs}")
    private String fsApiUrl;

    @Bean
    public WebClient restFsWebClient() {
        return WebClient.builder()
                .baseUrl(fsApiUrl)
                .build();
    }
}
