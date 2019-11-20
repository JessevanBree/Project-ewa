package urban.server.repositories;

import urban.server.models.User;

import java.util.Arrays;
import java.util.List;

public class UserRepository implements Repository {
    @Override
    public List<User> findAll() {
        return Arrays.asList(
                new User()
        );
    }
}
