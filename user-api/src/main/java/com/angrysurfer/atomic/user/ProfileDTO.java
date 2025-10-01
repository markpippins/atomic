package com.angrysurfer.atomic.user;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


public class ProfileDTO implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

	private Long id;

    private String firstName;

    private String lastName;

    private String city;

    private String state;

    private String profileImageUrl;

    private Set<String> interests = new HashSet<>();

    private Set<String> skills = new HashSet<>();

    private Set<String> languages = new HashSet<>();

    private Set<String> certifications = new HashSet<>();

    private Set<String> publications = new HashSet<>();

    private Set<String> projects = new HashSet<>();

    private Set<String> experiences = new HashSet<>();

    private Set<String> educations = new HashSet<>();
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getProfileImageUrl() {
		return profileImageUrl;
	}

	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}

	public Set<String> getInterests() {
		return interests;
	}

	public void setInterests(Set<String> interests) {
		this.interests = interests;
	}

	public Set<String> getSkills() {
		return skills;
	}

	public void setSkills(Set<String> skills) {
		this.skills = skills;
	}

	public Set<String> getLanguages() {
		return languages;
	}

	public void setLanguages(Set<String> languages) {
		this.languages = languages;
	}

	public Set<String> getCertifications() {
		return certifications;
	}

	public void setCertifications(Set<String> certifications) {
		this.certifications = certifications;
	}

	public Set<String> getPublications() {
		return publications;
	}

	public void setPublications(Set<String> publications) {
		this.publications = publications;
	}

	public Set<String> getProjects() {
		return projects;
	}

	public void setProjects(Set<String> projects) {
		this.projects = projects;
	}

	public Set<String> getExperiences() {
		return experiences;
	}

	public void setExperiences(Set<String> experiences) {
		this.experiences = experiences;
	}

	public Set<String> getEducations() {
		return educations;
	}

	public void setEducations(Set<String> educations) {
		this.educations = educations;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    

}
