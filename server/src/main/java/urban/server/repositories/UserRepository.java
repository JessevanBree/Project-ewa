package urban.server.repositories;

import org.springframework.stereotype.Component;
import urban.server.models.User;

import java.util.*;

@Component
public class UserRepository implements Repository<User> {
    private static List<User> userList = new ArrayList<>();

    private static int usersCount = 2;

    static {
        userList.add(new User(1, "abdul@hva.nl", "Abdul", "Zor", true, null));
        userList.add(new User(2, "maarten@hva.nl", "Maarten", "Zor", true, null));
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
    public User find(int userId) {
        return userList.stream()
                .filter(user -> user.getId() == userId)
                .findFirst().orElse(null);
    }

    //    @Override
    public User createUser(User user) {
        user.setId(++usersCount);
        userList.add(user);
        return user;
    }


}
