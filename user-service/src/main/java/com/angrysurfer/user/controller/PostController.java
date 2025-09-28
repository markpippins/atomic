package com.angrysurfer.user.controller;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.angrysurfer.user.ResourceNotFoundException;
import com.angrysurfer.user.dto.CommentDTO;
import com.angrysurfer.user.dto.PostDTO;
import com.angrysurfer.user.dto.PostStatDTO;
import com.angrysurfer.user.dto.ReactionDTO;
import com.angrysurfer.user.service.PostService;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/posts")
public class PostController {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
        log.info("PostController initialized");
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    PostDTO addPost(@RequestBody PostDTO post) {
        log.info("Add post {}", post.getText());
        try {
            return postService.save(post);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping(path = "/forums/{forumId}/add")
    public @ResponseBody
    PostDTO addPostToForum(@PathVariable Long forumId, @RequestBody PostDTO post) {
        log.info("Add post {} to forum {}", post.getText(), forumId);
        try {
            return postService.addPostToForum(forumId, post);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Set<PostDTO> getAllPosts() {
        log.info("Get all posts");
        return postService.findAll();
    }

    @GetMapping(path = "/{postId}/replies")
    public @ResponseBody
    Set<CommentDTO> getRepliesForPost(@PathVariable Long postId) {
        log.info("Get replies for post id {}", postId);
        try {
            PostDTO post = postService.findById(postId);
            return post.getReplies();
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping(path = "/{postId}/add/reaction")
    public @ResponseBody
    ReactionDTO addReaction(@PathVariable Long postId, @RequestBody ReactionDTO reaction) {
        log.info("Add reaction to post id {}", postId);
        try {
            return postService.addReaction(postId, reaction);
            // } catch (ResourceNotFoundException e) {
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping(path = "/{postId}/remove/reaction")
    public void removeReaction(@PathVariable Long postId, @RequestBody ReactionDTO reaction) {
        log.info("Remove reaction from post id {}", postId);
        try {
            postService.removeReaction(postId, reaction);
            // } catch (ResourceNotFoundException e) {
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping(path = "/{postId}/rating/increment")
    public @ResponseBody
    PostStatDTO incrementRating(@PathVariable Long postId) {
        log.info("Increment rating for post id {}", postId);
        try {
            return postService.incrementRating(postId);
            // } catch (ResourceNotFoundException e) {
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping(path = "/{postId}/rating/decrement")
    public @ResponseBody
    PostStatDTO decrementRating(@PathVariable Long postId) {
        log.info("Decrement rating for post id {}", postId);
        try {
            return postService.decrementRating(postId);
            // } catch (ResourceNotFoundException e) {
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    // @GetMapping(path = "/{id}/posts")
    // public @ResponseBody Set<Post> getUserPosts(@PathVariable Long id) {
    // Optional<User> user;
    // try {
    // user = userRepository.findById(id);
    // if (user.isPresent()) {
    // return user.get().getPosts();
    // }
    // } catch (IllegalArgumentException e) {
    // throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    // }

    // return Collections.emptySet();
    // }

}