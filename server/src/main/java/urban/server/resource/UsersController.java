package urban.server.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import urban.server.resource.exceptions.ResourceNotFoundException;
import urban.server.models.User;
import urban.server.repositories.UserRepository;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UsersController {
    private UserRepository repository;

    public UsersController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping(path = "/users")
    public List<User> getAllUsers(){
        return repository.findAll();
    }

    @GetMapping(path = "/user", params = "userId")
    public User getUser(@RequestParam("userId") int userId){
        User foundUser = repository.find(userId);
        if (foundUser == null)
            throw new ResourceNotFoundException("User not found with userId: " + userId);
        return foundUser;
    }

    @PostMapping(path = "/users")
    public ResponseEntity saveUser(@RequestBody User user){
        User savedUser = repository.createUser(user);

        // Return a server response
        //TODO:: check if response sends you to the right url with ../:userId
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/:userId")
                .buildAndExpand(savedUser.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}
