package com.angrysurfer.atomic.user;

import java.io.Serializable;

public class PostStatDTO implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRating() {
		return rating;
	}

	public void setRating(Long rating) {
		this.rating = rating;
	}

	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	private Long id;

    private Long rating;

    private Long postId;

}
