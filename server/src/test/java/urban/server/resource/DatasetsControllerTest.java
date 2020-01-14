package urban.server.resource;

import com.sun.mail.iap.Response;
import org.junit.Assert;
import org.junit.Assert.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.ResponseErrorHandler;
import scala.util.parsing.json.JSON;
import urban.server.models.ChartDataSets;
import urban.server.models.Dataset;
import urban.server.models.helpers.PublicityEnum;
import urban.server.models.helpers.RegionLevelEnum;
import urban.server.resource.exceptions.ResourceNotFoundException;

import javax.print.attribute.standard.Media;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.isEnum;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Author: Mohamed Ben Ali
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DatasetsControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private Dataset dataset1;
    private Dataset dataset2;
    private Dataset dataset3;

    @BeforeEach
    public void setUp() {
        dataset1 = new Dataset("dataset1", RegionLevelEnum.URBAN_LEVEL, PublicityEnum.PRIVATE, null,
                2013, "fileName1", "csv", List.of("label1", "label2"),
                new ChartDataSets("bar", "label", List.of(2, 7), dataset1), "first description");
        ;
        dataset2 = new Dataset("dataset2", RegionLevelEnum.EU_LEVEL, PublicityEnum.PUBLIC, null,
                2011, "fileName2", "csv", List.of("label3", "label4"),
                new ChartDataSets("bar", "label", List.of(18, 200), dataset2), "second description");
        dataset3 = new Dataset("dataset3", RegionLevelEnum.NAT_LEVEL, PublicityEnum.PUBLIC, null,
                2001, "fileName3", "pdf", null,
                null, "third description");

        //Initial post requests in order to setup the backend with objects
        dataset2 = this.restTemplate.postForEntity("/datasets/upload", dataset2, Dataset.class).getBody();
        dataset3 = this.restTemplate.postForEntity("/datasets/upload", dataset3, Dataset.class).getBody();
    }

    @AfterEach
    public void tearDown() {
        dataset1 = this.restTemplate.postForEntity("/datasets/upload", dataset1, Dataset.class).getBody();
        dataset2 = this.restTemplate.postForEntity("/datasets/upload", dataset2, Dataset.class).getBody();
        dataset3 = this.restTemplate.postForEntity("/datasets/upload", dataset3, Dataset.class).getBody();
        // Clears the rest template's storage
        this.restTemplate.delete("/datasets/" + dataset1.getId());
        this.restTemplate.delete("/datasets/" + dataset2.getId());
        this.restTemplate.delete("/datasets/" + dataset3.getId());

    }

    @Test
    public void postDataset_400() {
        ResponseEntity<Dataset> responseEntity =
                this.restTemplate.postForEntity("/datasets/upload", dataset1, Dataset.class);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        //Checks whether the response returns a valid dataset
        assertThat(responseEntity.getBody(), instanceOf(Dataset.class));
        assertThat(responseEntity.getBody(), not(nullValue()));
        assertThat(responseEntity.getBody().getId(), greaterThan(0L));
    }

    @Test
    public void getDatasetById_401() {
        //POST request
        ResponseEntity<Dataset> postResponseEntity
                = this.restTemplate.postForEntity("/datasets/upload", dataset1, Dataset.class);
        dataset1 = postResponseEntity.getBody();
        assertThat(postResponseEntity.getBody().getId(), greaterThan(0L));
        // GET request
        ResponseEntity<Dataset> getResponseEntity =
                this.restTemplate.getForEntity("/datasets/" + dataset1.getId(), Dataset.class);
        // Check whether responseEntity has a body
        assertTrue(getResponseEntity.hasBody());
        assertNotNull(getResponseEntity.getBody().getId());
        // Check whether not the wrong dataset has been returned
        assertNotSame(getResponseEntity.getBody(), dataset2);
        assertNotSame(getResponseEntity.getBody(), dataset3);
        // Check whether right dataset has been returned
        assertThat(getResponseEntity.getBody().getId(), equalTo(dataset1.getId()));
        assertEquals(getResponseEntity.getBody(), dataset1);

    }

    @Test
    public void getAllDatasets_402() {
        List<Dataset> datasets = this.restTemplate.getForObject("/datasets", List.class);
        assertThat(datasets, notNullValue());
        assertThat(datasets, instanceOf(List.class));
    }

    @Test
    public void deleteDataset_403() {
        Dataset dataset =
                this.restTemplate.getForEntity("/datasets/" + dataset2.getId(), Dataset.class).getBody();
        assertNotNull(dataset);

        this.restTemplate.delete("/datasets/" + dataset.getId());

        List<Dataset> datasets =
                this.restTemplate.getForObject("/datasets", List.class);
        // Check whether dataset list has been updated
        assertThat(datasets, hasSize(1));
        // Check whether the dataset has been deleted
        assertFalse(datasets.contains(dataset2));
    }

    @Test
    public void updateDataset_404() {
        Dataset originalDataset = new Dataset("dataset2", RegionLevelEnum.EU_LEVEL, PublicityEnum.PUBLIC, null,
                2011, "fileName2", "csv", List.of("label3", "label4"),
                new ChartDataSets("bar", "label", List.of(18, 200), dataset2), "second description");
        dataset2.setYear(2020);
        dataset2.setName("name2");
        dataset2.setRegion(RegionLevelEnum.NAT_LEVEL);
        HttpEntity<Dataset> datasetHttpEntity = new HttpEntity<>(dataset2);
        ResponseEntity<Dataset> responseEntity =
                this.restTemplate.exchange("/datasets/", HttpMethod.PUT,
                        datasetHttpEntity, Dataset.class);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);

        dataset2 = this.restTemplate.getForObject("/datasets/" + dataset2.getId(), Dataset.class);
        assertThat(dataset2.getName(), startsWith("name2"));
        assertThat(dataset2.getYear(), equalTo(2020));
        assertEquals(dataset2.getRegion(), RegionLevelEnum.NAT_LEVEL);

        System.out.println(originalDataset);
        assertNotEquals(originalDataset.getName(), dataset2.getName());
        assertNotEquals(originalDataset.getYear(), dataset2.getYear());
        assertNotEquals(originalDataset.getRegion(), dataset2.getRegion());
    }

    // Rest template does not throw errors so assertErrors not possible
    @Test
    public void datasetNotFoundThrowsHttpStatus404_405() {
        ResponseEntity<Dataset> responseEntity =
                this.restTemplate.getForEntity("/datasets/" + 0, Dataset.class);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());

    }
}
