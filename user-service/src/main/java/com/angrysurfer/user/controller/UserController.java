package com.angrysurfer.user.controller;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.angrysurfer.user.ResourceNotFoundException;
import com.angrysurfer.user.dto.ProfileDTO;
import com.angrysurfer.user.dto.UserDTO;
import com.angrysurfer.user.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
        log.info("UserController initialized");
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    UserDTO addUser(@RequestParam UserDTO newUser, @RequestParam ProfileDTO newProfile) {
        log.info("Adding user {}", newUser.getAlias());
        return userService.save(newUser);
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Set<UserDTO> getAllUsers() {
        log.info("Get all users");
        return userService.findAll();
    }

    @PostMapping(path = "/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        log.info("Delete user id {}", id);
        userService.delete(id);
    }

    @GetMapping(path = "/id/{id}")
    public @ResponseBody
    UserDTO getUserById(@PathVariable Long id) {
        log.info("Get user by id {}", id);
        try {
            return userService.findById(id);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @GetMapping(path = "/alias/{alias}")
    public @ResponseBody
    UserDTO getUserByAlias(@PathVariable String alias) {
        log.info("Get user by alias {}", alias);
        try {
            return userService.findByAlias(alias);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

}
