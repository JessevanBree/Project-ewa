package urban.server.models;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sun.istack.Nullable;
import urban.server.models.helpers.PublicityEnum;
import urban.server.models.helpers.RegionLevelEnum;
import urban.server.views.DatasetsView;
import urban.server.views.UsersView;

import javax.persistence.*;
import java.util.*;

@Entity
@NamedQueries({
        @NamedQuery(name = "find_all_datasets", query = "select d from Dataset d")
})
public class Dataset {
    @Id
    @GeneratedValue
    @JsonView({DatasetsView.Full.class, DatasetsView.IdNameSimpleUsersOrganisationsSerializer.class,
            DatasetsView.IdNameSimpleUsersSerializer.class, DatasetsView.FullWithoutUser.class,
            DatasetsView.FullWithoutOrganisation.class, DatasetsView.OnlyIdDataSerializer.class})
    private Long id;

    @JsonView({DatasetsView.Full.class, DatasetsView.IdNameSimpleUsersOrganisationsSerializer.class,
            DatasetsView.IdNameSimpleUsersSerializer.class, DatasetsView.FullWithoutUser.class,
            DatasetsView.FullWithoutOrganisation.class})
    private String name;

    @JsonView({DatasetsView.Full.class, DatasetsView.FullWithoutUser.class, DatasetsView.FullWithoutOrganisation.class})
    @Enumerated(value = EnumType.STRING)
    private RegionLevelEnum region;

    @JsonView({DatasetsView.Full.class, DatasetsView.FullWithoutUser.class, DatasetsView.FullWithoutOrganisation.class})
    @Enumerated(value = EnumType.STRING)
    private PublicityEnum publicity;

    @JsonView({DatasetsView.Full.class, DatasetsView.FullWithoutUser.class, DatasetsView.FullWithoutOrganisation.class})
    @Nullable
    private String description;

    @JsonView({DatasetsView.Full.class, DatasetsView.FullWithoutUser.class, DatasetsView.FullWithoutOrganisation.class})
    private int year;

    @JsonView({DatasetsView.Full.class, DatasetsView.FullWithoutUser.class, DatasetsView.FullWithoutOrganisation.class})
    private String fileName;

    @JsonView({DatasetsView.Full.class, DatasetsView.FullWithoutUser.class, DatasetsView.FullWithoutOrganisation.class})
    @OneToOne(cascade = CascadeType.ALL)
    private ChartDataSets chart;// TODO:: Set the right dataset for this -> update constructor

    //TODO:: data attr add @JsonView({DatasetsView.OnlyIdDataLabelsSerializer.class})

    @JsonView({DatasetsView.Full.class, DatasetsView.IdNameSimpleUsersOrganisationsSerializer.class,
            DatasetsView.IdNameSimpleUsersSerializer.class, DatasetsView.FullWithoutOrganisation.class})
    @JsonSerialize(using = UsersView.OnlyIdEmailIsadminSerializer.class)
    @ManyToOne
    private User user;

    /*@JsonView({DatasetsView.Full.class, DatasetsView.IdNameSimpleUsersOrganisationsSerializer.class, DatasetsView.FullWithoutUser.class})
    @JsonSerialize(using = OrganisationsView.OnlyIdNameSerializer.class)
    @ManyToOne
    private Organisation datasetOrganisation;*/

    @JsonView({DatasetsView.Full.class})
    @ElementCollection(targetClass = String.class)
    private List<String> chartLabels;
    // Specifies that a persistent property or field should be persisted as a large object to a database-supported large object type

    // helper
    private static Long datasetCount = 50000L;

    public Dataset() {
    }

    public Dataset(String name, RegionLevelEnum region, PublicityEnum publicity,
                   User user, int year, String fileName, List<String> chartLabels, ChartDataSets chart,
                   String description) {
        this.name = name;
        this.region = region;
        this.publicity = publicity;
        this.user = user;
        this.year = year;
        this.fileName = fileName;
        this.chartLabels = chartLabels;
        this.chart = chart;
        this.description = description;
    }

    public Dataset(String name, RegionLevelEnum region, PublicityEnum publicity,
                   User user, int year, String description, Organisation organisation) {
        this.name = name;
        this.region = region;
        this.publicity = publicity;
        this.user = user;
        this.year = year;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RegionLevelEnum getRegion() {
        return region;
    }

    public void setRegion(RegionLevelEnum region) {
        this.region = region;
    }

    public PublicityEnum getPublicity() {
        return publicity;
    }

    public void setPublicity(PublicityEnum publicity) {
        this.publicity = publicity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ChartDataSets getChart() {
        return chart;
    }

    public void setChart(ChartDataSets chart) {
        this.chart = chart;
    }

    public List<String> getChartLabels() {
        return chartLabels;
    }

    public void setChartLabels(List<String> chartLabels) {
        this.chartLabels = chartLabels;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Dataset dataset = (Dataset) o;
        return id.equals(dataset.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Dataset{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", region=" + region +
                ", publicity=" + publicity +
                ", description='" + description + '\'' +
                ", year=" + year +
                ", user=" + user +
                ", chart='" + chart + '\'' +
                ", chartLabels=" + chartLabels +
                '}';
    }

    public static Dataset generateRandomDataset() {
        return new Dataset("Dataset " + datasetCount++, generateRandomRegionLevel(), generateRandomPublicity(),
                null, 2019, "", null);
    }

    public static RegionLevelEnum generateRandomRegionLevel() {
        double statusCode = Math.random();
        if (statusCode > 0.6) {
            return RegionLevelEnum.EU_LEVEL;
        } else if (statusCode <= 0.6 && statusCode >= 0.2) {
            return RegionLevelEnum.NAT_LEVEL;
        }
        return RegionLevelEnum.URBAN_LEVEL;
    }

    public static PublicityEnum generateRandomPublicity() {
        double statusCode = Math.random();
        if (statusCode > 0.6) {
            return PublicityEnum.GROUP;
        } else if (statusCode <= 0.6 && statusCode >= 0.2) {
            return PublicityEnum.PRIVATE;
        }
        return PublicityEnum.PUBLIC;
    }
}
