package urban.server.repositories;

import urban.server.models.User;

import java.util.List;

public interface Repository {
    List<User> findAll();
}
