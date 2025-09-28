package com.angrysurfer.user.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;



public class ForumDTO implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -5881692384954888978L;

    private Long id;

    private String name;

    private Set<UserDTO> members = new HashSet<>();

    public ForumDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<UserDTO> getMembers() {
        return members;
    }

    public void setMembers(Set<UserDTO> members) {
        this.members = members;
    }

}
