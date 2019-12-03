package urban.server.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import urban.server.resource.exceptions.ResourceNotFoundException;
import urban.server.models.User;
import urban.server.repositories.JPAUserRepository;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "*")
public class UsersController {
    @Autowired
    private JPAUserRepository userRepo;

    @GetMapping()
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable int id) {

        User userById = userRepo.findById(id);

        if (userById == null) {
            throw new ResourceNotFoundException("id = " + id);
        }

        return userById;
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User savedUser = userRepo.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();

        return ResponseEntity.created(location).body(savedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id) {

        User user = getUserById(id);

        userRepo.delete(user);

        return ResponseEntity.ok(user);

    }

    @PutMapping()
    public ResponseEntity<Object> updateUser(@RequestBody User user) {


        User userById = userRepo.findById(user.getId());

        if (userById == null) {
            throw new ResourceNotFoundException("id = " + user.getId());
        }

        userRepo.save(user);

        return ResponseEntity.ok().build();
    }
}
