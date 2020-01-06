package urban.server.repositories;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.CMS;

import javax.persistence.EntityManager;

@SpringBootTest()
@Transactional
public class JPACMSRepositoryTest {
    private CMS cms1;
    private CMS cms2;
    private CMS cms3;

    @Autowired
    EntityManager entityManager;

    @Autowired
    JPACMSRepository jpacmsRepository;

    @BeforeEach
    void setUp() {
        cms1 = new CMS("test", "test", "test1", "test 1");
        cms2 = new CMS("test2", "test2", "test2", "test 2");
        cms3 = new CMS("test3", "test2", "test2", "test 3");

        entityManager.persist(cms3);
        entityManager.flush();
    }

    @AfterEach
    void tearDown() {
        entityManager.remove(cms3);
        entityManager.flush();

        cms1 = null;
        cms2 = null;
        cms3 = null;
    }

    @Test
    void testSetCMSValue_001() {
        jpacmsRepository.save(cms1);
        assertEquals(entityManager.find(CMS.class, cms1.getId()), cms1);
        assertNotEquals(entityManager.find(CMS.class, cms3.getId()), cms1);
    }

    @Test
    void testGetCMSValue_002() {
        assertEquals(entityManager.find(CMS.class, cms3.getId()), jpacmsRepository.findById(cms3.getId()));
    }

    @Test
    void testGetByIdCMSValue_002() {
        assertEquals(entityManager.find(CMS.class, cms3.getId()), jpacmsRepository.findById(cms3.getId()));
    }
}
