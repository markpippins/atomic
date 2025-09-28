package com.angrysurfer.user.service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.angrysurfer.user.ResourceNotFoundException;
import com.angrysurfer.user.dto.PostDTO;
import com.angrysurfer.user.dto.PostStatDTO;
import com.angrysurfer.user.dto.ReactionDTO;
import com.angrysurfer.user.model.Edit;
import com.angrysurfer.user.model.Post;
import com.angrysurfer.user.model.Reaction;
import com.angrysurfer.user.model.User;
import com.angrysurfer.user.repository.EditRepository;
import com.angrysurfer.user.repository.PostRepository;
import com.angrysurfer.user.repository.ReactionRepository;
import com.angrysurfer.user.repository.UserRepository;

@Service
public class PostService {

    private static final Logger log = LoggerFactory.getLogger(PostService.class);
    private static final String NOT_FOUND = " not found.";

    private static final String POST = "Post ";

    private final PostRepository postRepository;

    private final EditRepository editRepository;

    private final UserRepository userRepository;

    private final ReactionRepository reactionRepository;

    public PostService(PostRepository postRepository, EditRepository editRepository, UserRepository userRepository, ReactionRepository reactionRepository) {
        this.postRepository = postRepository;
        this.editRepository = editRepository;
        this.userRepository = userRepository;
        this.reactionRepository = reactionRepository;
        log.info("PostService initialized");
    }

    public String delete(Long postId) {
        log.info("Delete post id {}", postId);
        postRepository.deleteById(postId);
        return "redirect:/entries/all";
    }

    public PostDTO findById(Long postId) throws ResourceNotFoundException {
        log.info("Find post by id {}", postId);
        Optional<Post> result = postRepository.findById(postId);
        if (result.isPresent())
            return result.get().toDTO();

        throw new ResourceNotFoundException(POST.concat(Long.toString(postId).concat(NOT_FOUND)));
    }

    public Page<Post> findByForumId(Long forumId, Pageable pageable) {
        log.info("Find posts for forum id {}", forumId);
        return postRepository.findByForumId(forumId, pageable);
    }

    public Set<PostDTO> findAll() {
        log.info("Find all posts");
        return postRepository.findAll().stream().map(p -> p.toDTO()).collect(Collectors.toSet());
    }

    public PostDTO save(User postedBy, String text) {
        log.info("Save post by user {}", postedBy.getAlias());
        Post post = new Post();
        post.setPostedBy(postedBy);
        post.setText(text);

        return postRepository.save(post).toDTO();
    }

    public PostDTO save(User postedBy, User postedTo, String text) {
        log.info("Save post by user {} to user {}", postedBy.getAlias(), postedTo.getAlias());
        return postRepository.save(new Post(postedBy, postedTo, text)).toDTO();
    }

    public PostDTO save(User postedBy, Long forumId, String text) {
        log.info("Save post by user {} to forum {}", postedBy.getAlias(), forumId);
        Post post = new Post();
        post.setPostedBy(postedBy);
        post.setForumId(forumId);
        post.setText(text);

        return postRepository.save(post).toDTO();
    }

    public PostDTO save(PostDTO post) {
        log.info("Save post {}", post.getText());
        Optional<User> postedBy;
        postedBy = userRepository.findByAlias(post.getPostedBy());

        // handle forum post
        if (post.getForumId() != null && postedBy.isPresent())
            return save(postedBy.get(), post.getForumId(), post.getText());

        // handle post where post.getPostedTo is null
        if (postedBy.isPresent() && post.getPostedTo() == null)
            return save(postedBy.get(), post.getText());

        // handle post where post.getPostedTo is not null
        Optional<User> postedTo = userRepository.findByAlias(post.getPostedTo());
        if (postedBy.isPresent() && postedTo.isPresent())
            return save(postedBy.get(), postedTo.get(), post.getText());

        throw new IllegalArgumentException();
    }

    public PostDTO addPostToForum(Long forumId, PostDTO post) {
        log.info("Add post {} to forum {}", post.getText(), forumId);
        Optional<User> postedBy;
        postedBy = userRepository.findByAlias(post.getPostedBy());

        // handle forum post
        if (postedBy.isPresent())
            return save(postedBy.get(), forumId, post.getText());

        throw new IllegalArgumentException();
    }

    public PostDTO save(Post post) {
        log.info("Save post {}", post.getId());
        return postRepository.save(post).toDTO();
    }

    public PostDTO update(Post post, String change) {
        log.info("Update post {}", post.getId());
        Edit edit = new Edit(post.getText());
        editRepository.save(edit);

        post.setText(change);
        post.getEdits().add(edit);

        return postRepository.save(post).toDTO();
    }

    public PostStatDTO incrementRating(Long postId) throws ResourceNotFoundException {
        log.info("Increment rating for post id {}", postId);
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            post.setRating(post.getRating() + 1);
            postRepository.save(post);

            return post.toStatDTO();
        }

        throw new ResourceNotFoundException(POST.concat(Long.toString(postId).concat(NOT_FOUND)));
    }

    public PostStatDTO decrementRating(Long postId) throws ResourceNotFoundException {
        log.info("Decrement rating for post id {}", postId);
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            post.setRating(post.getRating() - 1);
            postRepository.save(post);

            return post.toStatDTO();
        }

        throw new ResourceNotFoundException(POST.concat(Long.toString(postId).concat(NOT_FOUND)));
    }

    public ReactionDTO addReaction(Long postId, ReactionDTO reactionDTO) throws ResourceNotFoundException {
        log.info("Add reaction to post id {}", postId);
        Reaction.ReactionType type = Reaction.ReactionType.valueOf(reactionDTO.getType().toUpperCase());
        Optional<User> userOpt = this.userRepository.findByAlias(reactionDTO.getAlias());
        Optional<Post> postOpt = postRepository.findById(postId);

        if (postOpt.isPresent() && userOpt.isPresent()) {
            Post post = postOpt.get();
            User user = userOpt.get();

            Reaction reaction = reactionRepository.save(new Reaction(user, type));

            post.getReactions().add(reaction);
            postRepository.save(post);

            return reaction.toDTO();
        }

        throw new ResourceNotFoundException(POST.concat(Long.toString(postId).concat(NOT_FOUND)));
    }

    public void removeReaction(Long postId, ReactionDTO reactionDTO) {
        log.info("Remove reaction from post id {}", postId);
        Optional<Reaction> reactionOpt = this.reactionRepository.findById(reactionDTO.getId());
        Optional<Post> postOpt = postRepository.findById(postId);

        if (postOpt.isPresent() && reactionOpt.isPresent()) {
            Post post = postOpt.get();
            Reaction reaction = reactionOpt.get();

            post.getReactions().remove(reaction);
            reactionRepository.delete(reaction);
            postRepository.save(post);
        }
    }

}
