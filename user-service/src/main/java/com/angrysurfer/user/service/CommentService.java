package com.angrysurfer.user.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.angrysurfer.user.ResourceNotFoundException;
import com.angrysurfer.user.dto.CommentDTO;
import com.angrysurfer.user.dto.ReactionDTO;
import com.angrysurfer.user.model.Comment;
import com.angrysurfer.user.model.Post;
import com.angrysurfer.user.model.Reaction;
import com.angrysurfer.user.model.User;
import com.angrysurfer.user.repository.CommentRepository;
import com.angrysurfer.user.repository.PostRepository;
import com.angrysurfer.user.repository.ReactionRepository;
import com.angrysurfer.user.repository.UserRepository;

@Service
public class CommentService {
    private static final Logger log = LoggerFactory.getLogger(CommentService.class);
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ReactionRepository reactionRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository,
                          UserRepository userRepository, ReactionRepository reactionRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.reactionRepository = reactionRepository;
		log.info("CommentService initialized");
    }

    public String delete(Long commentId) {
        log.info("Deleting comment id {}", commentId);
        commentRepository.deleteById(commentId);
        return "redirect:/Comment/all";
    }

    public CommentDTO findById(Long commentId) throws ResourceNotFoundException {
        log.info("Find comment by id {}", commentId);
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isPresent()) {
            return comment.get().toDTO();
        }

        throw new ResourceNotFoundException(" comment ".concat(commentId.toString()).concat(" not found."));
    }

    public Iterable<CommentDTO> findAll() {
        log.info("Find all comments");
        return commentRepository.findAll().stream().map(c -> c.toDTO()).collect(Collectors.toSet());
    }

    public CommentDTO save(Comment n) {
        log.info("Saving comment {}", n.getId());
        return commentRepository.save(n).toDTO();
    }

    public CommentDTO save(User postedBy, String text) {
        log.info("Saving comment by user {}", postedBy.getAlias());
        return commentRepository.save(new Comment(postedBy, text)).toDTO();
    }

    public Iterable<Comment> findCommentsForPost(Long postId) {
        log.info("Find comments for post id {}", postId);
        return commentRepository.findByPostId(postId);
    }

    public CommentDTO addComment(CommentDTO data) {
        log.info("Adding comment by user {}", data.getPostedBy());
        Optional<User> user;

        try {
            user = userRepository.findByAlias(data.getPostedBy());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }

        if (user.isPresent() && data.getPostId() != null && data.getParentId() == null) {
            return addCommentToPost(user.get(), data);
        } else if (user.isPresent() && data.getPostId() == null && data.getParentId() != null) {
            return addReplyToComment(user.get(), data);
        }

        throw new IllegalArgumentException();
    }

    private CommentDTO addCommentToPost(User user, CommentDTO data) throws IllegalArgumentException {
        log.info("Adding comment to post id {}", data.getPostId());
        Optional<Post> postOpt = postRepository.findById(data.getPostId());

        if (postOpt.isPresent()) {
            Post post = postOpt.get();

            Comment result = commentRepository.save(new Comment(user, data.getText(), post));

            post.getReplies().add(result);
            postRepository.save(post);

            return result.toDTO();
        }

        throw new IllegalArgumentException();
    }

    private CommentDTO addReplyToComment(User user, CommentDTO data) throws IllegalArgumentException {
        log.info("Adding reply to comment id {}", data.getParentId());
        Optional<Comment> commentOpt = commentRepository.findById(data.getParentId());

        if (commentOpt.isPresent()) {
            Comment parent = commentOpt.get();

            Comment result = commentRepository.save(new Comment(user, data.getText(), parent));

            parent.getReplies().add(result);
            save(parent);

            return result.toDTO();
        }

        throw new IllegalArgumentException();
    }



    public ReactionDTO addReaction(Long commentId, ReactionDTO reactionDTO) {
        log.info("Adding reaction to comment id {}", commentId);
        Reaction.ReactionType type = Reaction.ReactionType.valueOf(reactionDTO.getType().toUpperCase());

        Optional<User> userOpt = this.userRepository.findByAlias(reactionDTO.getAlias());
        Optional<Comment> commentOpt = commentRepository.findById(commentId);

        Comment comment = commentOpt.get();
        User user = userOpt.get();

        Reaction reaction = reactionRepository.save(new Reaction(user, type));

        comment.getReactions().add(reaction);
        commentRepository.save(comment);

        return reaction.toDTO();
    }

    public void removeReaction(Long commentId, ReactionDTO reactionDTO) {
        log.info("Removing reaction from comment id {}", commentId);
        Optional<Reaction> reactionOpt = this.reactionRepository.findById(reactionDTO.getId());
        Optional<Comment> commentOpt = commentRepository.findById(commentId);

        if (commentOpt.isPresent() && reactionOpt.isPresent()) {
            Comment comment = commentOpt.get();
            Reaction reaction = reactionOpt.get();

            comment.getReactions().remove(reaction);
            reactionRepository.delete(reaction);
            commentRepository.save(comment);
        }
    }
}
