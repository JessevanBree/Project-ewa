package urban.server.repositories;

import org.hamcrest.MatcherAssert;
import org.hibernate.LazyInitializationException;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.User;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Abdul Vahip Zor
 */
@SpringBootTest()
@Transactional
public class JPAUserRepositoryTest {

    private User user1;
    private User user2;
    private User user3;

    @Autowired
    JPAUserRepository userRepository;



    @BeforeEach
    void setUp() {
        user1 = new User("user1@test.nl", "user1", "Test1", "1Ing", true);
        user2 = new User("user2@test.nl", "user2", "Test2", "2Ing", true);
        user3 = new User("user3@test.nl", "user3", "Test3", "3Ing", false);
    }

    @AfterEach
    void tearDown() {
        user1 = null;
        user2 = null;
        user3 = null;
    }

    @Test
    public void testRepoCreateAndRead_100() {
        User savedUser = userRepository.save(user1);
        assertTrue(savedUser.getId() > 0);

        User foundUser = userRepository.findById(savedUser.getId());
        assertEquals(foundUser.getId(), savedUser.getId());
        assertEquals(foundUser.getEmail(), savedUser.getEmail());
        assertEquals(foundUser.getPassWord(), savedUser.getPassWord());
    }

    @Test
    public void testRepoDeleteAndUpdate_101() {
        user1 = userRepository.save(user1);
        user2 = userRepository.save(user2);
        MatcherAssert.assertThat(userRepository.findAll(), hasSize(2));
        assertNotNull(userRepository.findById(user1.getId()));

        user1.setEmail("newUser1@test.nl");
        user1.setAdmin(false);

        userRepository.save(user1);
        assertEquals("newUser1@test.nl", userRepository.findById(user1.getId()).getEmail());
        assertFalse(userRepository.findById(user1.getId()).isAdmin());

        userRepository.delete(user1);

        assertNull(userRepository.findById(user1.getId()));
    }

    @Test
    public void testFindAll_102() {
        userRepository.save(user1);
        userRepository.save(user2);
        Assert.assertArrayEquals(new User[]{user1, user2}, userRepository.findAll().toArray());
    }

    @Test
    public void retrieveNonExistingUserThrowsException_103() throws Exception,
            RuntimeException, LazyInitializationException, EmptyResultDataAccessException {
        assertThrows(EmptyResultDataAccessException.class, () -> {
            User user = userRepository.findByEmail("Wrong@email.com");
        });
    }
}
