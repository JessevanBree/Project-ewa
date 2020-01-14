package urban.server.repositories;

import org.hamcrest.MatcherAssert;
import org.hibernate.LazyInitializationException;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.User;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * @author Abdul Vahip Zor
 */
@SpringBootTest()
@Transactional
public class MockJPAUserRepositoryTest {

    private User user1;
    private User user2;
    private User user3;

    private User userMock;

    @MockBean
    JPAUserRepository mockUserRepository;

    @BeforeEach
    void setUp() {
        user1 = new User("user1@test.nl", "user1", "Test1", "1Ing", true);
        user2 = new User("user2@test.nl", "user2", "Test2", "2Ing", true);
        user3 = new User("user3@test.nl", "user3", "Test3", "3Ing", false);

        userMock = new User("AnEmail@test.nl", "Passwords", "first", "sur", false);
        userMock.setId(1L);
    }

    @AfterEach
    void tearDown() {
        user1 = null;
        user2 = null;
        user3 = null;

        userMock = null;
    }


    @Test
    public void mockFindAll_103() {
        when(mockUserRepository.findById(1L)).thenReturn(userMock);
        assertEquals(userMock, mockUserRepository.findById(1L));
    }

}
