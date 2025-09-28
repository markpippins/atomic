package com.angrysurfer.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.angrysurfer.user.ResourceNotFoundException;
import com.angrysurfer.user.dto.ForumDTO;
import com.angrysurfer.user.service.ForumService;

// @CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/forums")
public class ForumController {

    private static final Logger log = LoggerFactory.getLogger(ForumController.class);
    private final ForumService forumService;

    public ForumController(ForumService forumService) {
        this.forumService = forumService;
        log.info("ForumController initialized");
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    ForumDTO addForum(@RequestParam String name) {
        log.info("Add forum {}", name);
        return forumService.save(name);
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<ForumDTO> getAllForums() {
        log.info("Get all forums");
        return forumService.findAll();
    }

    @GetMapping(path = "/id/{forumId}")
    public @ResponseBody
    ForumDTO getForum(@PathVariable Long forumId) {
        log.info("Get forum by id {}", forumId);
        try {
            return forumService.findById(forumId);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @GetMapping(path = "/{name}")
    public @ResponseBody
    ForumDTO getForumByName(@PathVariable String name) {
        log.info("Get forum by name {}", name);
        try {
            return forumService.findByName(name);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping(path = "/delete/{id}")
    public void deleteForum(@PathVariable Long id) {
        log.info("Delete forum id {}", id);
        forumService.delete(id);
    }

}