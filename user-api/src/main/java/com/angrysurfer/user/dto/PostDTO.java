package com.angrysurfer.user.dto;

public class PostDTO extends AbstractContentDTO {

    private Long forumId;

    public PostDTO() {

    }

    public Long getForumId() {
        return forumId;
    }

    public void setForumId(Long forumId) {
        this.forumId = forumId;
    }

}
