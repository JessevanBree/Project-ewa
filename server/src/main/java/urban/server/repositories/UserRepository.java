package urban.server.repositories;

import org.springframework.stereotype.Component;
import urban.server.models.User;

import java.util.Arrays;
import java.util.List;

@Component
public class UserRepository implements Repository<User> {
    @Override
    public List<User> findAll() {
        return Arrays.asList(
                new User(1, "abdul@hva.nl", "Abdul", "Zor", true, null)
        );
    }

    @Override
    public void postAll(List<User> items) {

    }

//    @Override
    public User find(String email) {
        return (User) this.findAll().stream()
                .filter(user -> user.getEmail().equals(email));
    }

//    @Override
    public User post() {
        return null;
    }


}
