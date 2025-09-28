package com.angrysurfer.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.angrysurfer.user.dto.CommentDTO;
import com.angrysurfer.user.dto.ReactionDTO;
import com.angrysurfer.user.service.CommentService;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/replies")
public class CommentController {

    private static final Logger log = LoggerFactory.getLogger(CommentController.class);
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
        log.info("CommentController initialized");
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    CommentDTO addComment(@RequestBody CommentDTO data) {
        log.info("Add comment");
        try {
            return commentService.addComment(data);
            // } catch (ResourceNotFoundException e) {
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping(path = "/{commentId}/add/reaction")
    public ReactionDTO addReaction(@PathVariable Long commentId, @RequestBody ReactionDTO reaction) {
        log.info("Add reaction to comment id {}", commentId);
        try {
            return commentService.addReaction(commentId, reaction);
            // } catch (ResourceNotFoundException e) {
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping(path = "/{commentId}/remove/reaction")
    public void removeReaction(@PathVariable Long commentId, @RequestBody ReactionDTO reaction) {
        log.info("Remove reaction from comment id {}", commentId);
        try {
            commentService.removeReaction(commentId, reaction);
            // } catch (ResourceNotFoundException e) {
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }
}