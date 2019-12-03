package urban.server.repositories;

import urban.server.models.User;

import java.util.List;

public interface UserRepository {
    User save(User user);

    void delete(User user);

    User findById(int id);

    List<User> findAll();
}
