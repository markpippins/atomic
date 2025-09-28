package com.angrysurfer.user.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.angrysurfer.user.ResourceNotFoundException;
import com.angrysurfer.user.dto.ForumDTO;
import com.angrysurfer.user.model.Forum;
import com.angrysurfer.user.repository.ForumRepository;

@Service
public class ForumService {

    private static final Logger log = LoggerFactory.getLogger(ForumService.class);
    private final ForumRepository forumRepository;

    public ForumService(ForumRepository forumRepository) {
        this.forumRepository = forumRepository;
        log.info("ForumService initialized");
    }

    public String delete(Long forumId) {
        log.info("Delete forum id {}", forumId);
        forumRepository.deleteById(forumId);
        return "redirect:/entries/all";
    }

    public ForumDTO findById(Long forumId) throws ResourceNotFoundException {
        log.info("Find forum by id {}", forumId);
        Optional<Forum> forum = forumRepository.findById(forumId);
        if (forum.isPresent()) {
            return forum.get().toDTO();
        }

        throw new ResourceNotFoundException("forum ".concat(forumId.toString()).concat(" not found."));

    }

    public Iterable<ForumDTO> findAll() {
        log.info("Find all forums");
        return forumRepository.findAll().stream().map(forum -> forum.toDTO()).collect(Collectors.toSet());
    }

    public ForumDTO save(String name) {
        log.info("Save forum {}", name);
        return forumRepository.save(new Forum(name)).toDTO();
    }

    public ForumDTO save(Forum forum) {
        log.info("Save forum {}", forum.getName());
        return forumRepository.save(forum).toDTO();
    }

    public ForumDTO findByName(String name) throws ResourceNotFoundException {
        log.info("Find forum by name {}", name);
        Optional<Forum> forum = forumRepository.findByName(name);
        if (forum.isPresent()) {
            return forum.get().toDTO();
        }

        throw new ResourceNotFoundException("forum ".concat(name).concat(" not found."));
    }
}
