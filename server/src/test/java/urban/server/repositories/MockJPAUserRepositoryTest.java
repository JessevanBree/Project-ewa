package urban.server.repositories;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.User;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * @author Abdul Vahip Zor
 */
@SpringBootTest()
@Transactional
public class MockJPAUserRepositoryTest {
    private User userMock;

    @MockBean
    JPAUserRepository mockUserRepository;

    @BeforeEach
    void setUp() {
        userMock = new User("AnEmail@test.nl", "Passwords", "first", "sur", false);
        userMock.setId(1L);
    }

    @AfterEach
    void tearDown() {
        userMock = null;
    }


    @Test
    public void mockFindAll_103() {
        when(mockUserRepository.findById(1L)).thenReturn(userMock);
        assertEquals(userMock, mockUserRepository.findById(1L));
    }

}
