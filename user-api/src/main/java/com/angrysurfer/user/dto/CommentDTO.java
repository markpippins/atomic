package com.angrysurfer.user.dto;

public class CommentDTO extends AbstractContentDTO {

    private Long postId;

    private Long parentId;

    public CommentDTO() {

    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

}
