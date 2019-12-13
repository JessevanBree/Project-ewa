package urban.server.resource;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import urban.server.models.User;
import urban.server.models.utils.JWToken;
import urban.server.repositories.JPAUserRepository;
import urban.server.resource.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {

    @Autowired
    JPAUserRepository userRepository;

    @Autowired
    JWToken jwTokenGenerator;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody ObjectNode loginRequest){
        JsonNode email = loginRequest.findValue("email");
        JsonNode passWord = loginRequest.findValue("passWord");

        User user = userRepository.findByEmail(email.asText());

        if(user == null){
            throw new ResourceNotFoundException("User not found");
        }

        return ResponseEntity.accepted()
                .body(user);
    }
}
