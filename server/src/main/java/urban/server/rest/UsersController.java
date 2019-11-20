package urban.server.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import urban.server.models.User;
import urban.server.repositories.UserRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UsersController {

    private UserRepository repository;

    public UsersController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping(path = "/user")
    public List<User> getAllUsers(){
        return repository.findAll();
    }

    @GetMapping(path = "/user/:id")
    public User getUserByEmail(String email){
        return repository.find(email);
    }
}
