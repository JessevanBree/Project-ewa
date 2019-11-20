package urban.server.repositories;

import org.springframework.stereotype.Component;
import urban.server.models.User;

import java.util.*;
import java.util.stream.Stream;

@Component
public class UserRepository implements Repository<User> {
    private static List<User> userList = new ArrayList<>();

    static {
        userList.add(new User(1, "abdul@hva.nl", "Abdul", "Zor", true, null));
        userList.add(new User(1, "maarten@hva.nl", "Maarten", "Zor", true, null));
    }

    @Override
    public List<User> findAll() {
        return userList;
    }

    @Override
    public void saveAll(List<User> users) {
        userList.addAll(users);
    }

    //    @Override
    public User find(String email) {
        return userList.stream()
                .filter(user -> user.getEmail().trim().toLowerCase().equals(email.trim().toLowerCase()))
                .findFirst().get();
    }

    //    @Override
    public void save(User user) {
        userList.add(user);
    }


}
