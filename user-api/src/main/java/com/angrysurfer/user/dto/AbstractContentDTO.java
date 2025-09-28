package com.angrysurfer.user.dto;

import java.util.HashSet;
import java.util.Set;

abstract class AbstractContentDTO {

    private Long id;

    private String postedBy;

    private String postedTo;

    private String postedDate;

    private String text;

    private Long rating;

    private String url;

    private Set<CommentDTO> replies = new HashSet<>();

    private Set<ReactionDTO> reactions = new HashSet<>();

    AbstractContentDTO() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }

    public String getPostedTo() {
        return postedTo;
    }

    public void setPostedTo(String postedTo) {
        this.postedTo = postedTo;
    }

    public String getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(String postedDate) {
        this.postedDate = postedDate;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<CommentDTO> getReplies() {
        return replies;
    }

    public void setReplies(Set<CommentDTO> replies) {
        this.replies = replies;
    }

    public Set<ReactionDTO> getReactions() {
        return reactions;
    }

    public void setReactions(Set<ReactionDTO> reactions) {
        this.reactions = reactions;
    }

}
