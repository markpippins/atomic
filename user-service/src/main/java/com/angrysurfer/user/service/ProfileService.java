package com.angrysurfer.user.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.angrysurfer.user.ResourceNotFoundException;
import com.angrysurfer.user.dto.ProfileDTO;
import com.angrysurfer.user.model.Profile;
import com.angrysurfer.user.model.User;
import com.angrysurfer.user.repository.ProfileRepository;

@Service
public class ProfileService {

    private static final Logger log = LoggerFactory.getLogger(ProfileService.class);
    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
        log.info("ProfileService initialized");
    }

    public ProfileDTO findByUserId(Long userId) throws ResourceNotFoundException {
        log.info("Find profile by user id {}", userId);
        Optional<Profile> profile = profileRepository.findByUserId(userId);
        if (profile.isPresent())
            return profile.get().toDTO();

        throw new ResourceNotFoundException("Profile not found.");
    }

    public String deleteByUserId(Long userId) {
        log.info("Delete profile by user id {}", userId);
        profileRepository.deleteByUserId(userId);
        return "redirect:/user/all";
    }

    public ProfileDTO save(User user, String firstName, String lastName) {
        log.info("Save profile for user {}", user.getAlias());
        Profile p = new Profile();

        p.setUser(user);
        p.setFirstName(firstName);
        p.setLastName(lastName);

        return profileRepository.save(p).toDTO();
    }

}