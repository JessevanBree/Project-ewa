package urban.server.resource;

import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import urban.server.models.User;

import java.util.List;
import java.util.Objects;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * @author Abdul Vahip Zor
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UsersControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private User user1;
    private User user2;
    private User user3;

    @BeforeEach
    public void setUp() {
        user1 = new User("user1@test.nl", "user1", "Test1", "1Ing", true);
        user2 = new User("user2@test.nl", "user2", "Test2", "2Ing", true);
        user3 = new User("user3@test.nl", "user3", "Test3", "3Ing", false);
    }

    @AfterEach
    public void tearDown() {
        restTemplate.delete("/users/" + user1.getId());
        restTemplate.delete("/users/" + user2.getId());
        restTemplate.delete("/users/" + user3.getId());
    }

    @Test
    public void userCanBePosted() {
        ResponseEntity<User> response =
                this.restTemplate.postForEntity("/users", user1, User.class);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(201, response.getStatusCodeValue());
        user1 = response.getBody();
    }

    @Test
    public void postedUserCanBeRetrieved() {
        ResponseEntity<User> response =
                this.restTemplate.postForEntity("/users", user1, User.class);
        Assert.assertEquals("user1@test.nl", Objects.requireNonNull(response.getBody()).getEmail());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        User savedUser = response.getBody();
        user1 = savedUser;

        ResponseEntity<User> response2 =
                this.restTemplate.getForEntity("/users/" + savedUser.getId(), User.class);
        assertThat(response2.getBody(), notNullValue());
        assertThat(savedUser.hashCode(), equalTo(response2.getBody().hashCode()));
    }

    @Test
    public void existingUserCanBeUpdated() {
        ResponseEntity<User> responsePost =
                this.restTemplate.postForEntity("/users", user1, User.class);
        User savedUser = responsePost.getBody();
        Assert.assertEquals(user1.getEmail(), savedUser.getEmail());
        user1 = savedUser;
        Assert.assertSame(savedUser, user1);

        user1.setEmail("updatedUser1@test.nl");
        ResponseEntity<User> responsePut =
                this.restTemplate.postForEntity("/users", user1, User.class);

        assertThat(responsePut.getBody().getEmail(), containsString("updatedUser1@test.nl"));
    }

    @Test
    public void deletedUserCanNoBeRetrieved() {
        ResponseEntity<User> response =
                this.restTemplate.postForEntity("/users", user1, User.class);
        Assert.assertEquals("user1@test.nl", Objects.requireNonNull(response.getBody()).getEmail());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        User savedUser = response.getBody();
        user1 = savedUser;

        this.restTemplate.delete("/users/" + savedUser.getId());

        ResponseEntity<User> response2 =
                this.restTemplate.getForEntity("/users/" + savedUser.getId(), User.class);
        Assert.assertNull(response2.getBody().getId());
    }

    @Test
    public void createdUsersCanBeRetrieved() {
        ResponseEntity<User> responsePost =
                this.restTemplate.postForEntity("/users", user1, User.class);
        assertThat(responsePost.getBody(), instanceOf(User.class));
        User savedUser = responsePost.getBody();
        assertThat(savedUser, hasProperty("id"));
        user1 = savedUser;

        ResponseEntity<User> responsePost2 =
                this.restTemplate.postForEntity("/users", user2, User.class);
        User savedUser2 = responsePost2.getBody();
        assertThat(savedUser2, hasProperty("email"));
        user2 = savedUser2;

        List users = this.restTemplate.getForObject("/users", List.class);
        assertEquals(2, users.size());
    }

}
