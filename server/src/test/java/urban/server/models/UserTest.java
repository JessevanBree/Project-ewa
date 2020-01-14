package urban.server.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.hamcrest.Matchers.instanceOf;
import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * @author Abdul Vahip Zor
 */

public class UserTest {
    private User user1;
    private User user2;
    private User user3;

    @BeforeEach
    public void setUp() {
        user1 = new User("user1@test.nl", "user1", "Test1", "1Ing", true);
        user2 = new User("user2@test.nl", "user2", "Test2", null, true);
        user3 = new User("user3@test.nl", "user3", "", "3Ing", false);
    }

    @Test
    public void testObjectValues_100() {
        assertEquals(user1.getEmail(), "user1@test.nl");
        assertEquals(user1.getPassWord(), "user1");
        assertEquals(user1.getFirstName(), "Test1");
        assertEquals(user1.getSurName(), "1Ing");
        assertTrue(user1.isAdmin());

        assertNull(user2.getSurName());

        assertFalse(user3.isAdmin());
    }

    @Test
    public void testGenerateUsers_101() {
        User generateRandomUser = User.generateRandomUser();
        Assert.assertNotNull(generateRandomUser);
        Assert.assertThat(generateRandomUser, instanceOf(User.class));
        Assert.assertNotNull(generateRandomUser.getEmail());
    }

}
