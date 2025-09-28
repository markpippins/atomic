package com.angrysurfer.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.angrysurfer.user.ResourceNotFoundException;
import com.angrysurfer.user.dto.ProfileDTO;
import com.angrysurfer.user.service.ProfileService;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/profiles")
public class ProfileController {

    private static final Logger log = LoggerFactory.getLogger(ProfileController.class);
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
		log.info("ProfileController initialized");
    }

    @GetMapping(path = "/userId/{userId}")
    public @ResponseBody
    ProfileDTO getProfileByUserId(@PathVariable Long userId) {
        log.info("Get profile by user id {}", userId);
        try {
            return profileService.findByUserId(userId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

}