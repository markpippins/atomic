package com.angrysurfer.user.dto;


public class PostDTO extends AbstractContentDTO {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long forumId;
	
	public PostDTO() {
		super();
	}

	public Long getForumId() {
		return forumId;
	}

	public void setForumId(Long forumId) {
		this.forumId = forumId;
	}
}
