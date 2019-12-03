package urban.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import urban.server.models.User;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.*;

@Component
public class JPAUserRepository implements UserRepository {
    private static List<User> userList = new ArrayList<>();

    private static int usersCount = 2;

    static {
        userList.add(new User(1, "abdul@hva.nl", "Abdul", "Zor", true, null));
        userList.add(new User(2, "maarten@hva.nl", "Maarten", "Zor", true, null));
    }


    @Autowired
    private EntityManager em;

    @Override
    public User save(User user) {
        return em.merge(user);
    }

    @Override
    public void delete(User user) {

        User toRemove = em.merge(user);

        em.remove(toRemove);
    }

    @Override
    public User findById(int id) {

        return em.find(User.class,id);
    }

    @Override
    public List<User> findAll() {
        TypedQuery<User> namedQuery = em.createNamedQuery("find_all_users", User.class);

        return namedQuery.getResultList();
    }


}
