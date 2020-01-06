package urban.server.models.helpers;

import org.hamcrest.collection.HasItemInArray;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

/**
 * @Doel
 * @Author Jesse van Bree
 */
class CMSDefaultsTest {
    private CMSDefaults cmsDefaults;
    @BeforeEach
    void setUp() {
        cmsDefaults = new CMSDefaults();
    }

    @AfterEach
    void tearDown() {
        cmsDefaults = null;
    }

    @Test
    void testDefaults_500() {
        assertThat(cmsDefaults.getDefaults().size(), greaterThan(0));
    }
}
