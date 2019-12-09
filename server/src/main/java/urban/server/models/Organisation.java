package urban.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import urban.server.views.OrganisationsView;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@NamedQuery(name = "find_all_organisations", query = "select o from Organisation o")
public class Organisation {
    @Id
    @GeneratedValue
    @JsonView({OrganisationsView.Full.class, OrganisationsView.OnlyIdNameSerializer.class})
    private Long id;

    @JsonView({OrganisationsView.Full.class, OrganisationsView.OnlyIdNameSerializer.class})
    private String name;

    @JsonView({OrganisationsView.Full.class})
    @OneToMany(mappedBy = "organisation", cascade = CascadeType.REMOVE)
    private List<User> users = new ArrayList<>();

    @JsonView({OrganisationsView.Full.class})
    @OneToMany(mappedBy = "datasetOrganisation")
    private List<Dataset> datasets = new ArrayList<>();

    // helper
    private static int organisationCount = 100;

    public Organisation() {
    }

    public Organisation(String name) {
        this.name = name;
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

    public List<User> getUsers() {
        return users;
    }

    public void addUser(User user) {
        user.setOrganisation(this);
        this.users.add(user);
    }

    public void setUser(User user) {
        this.users.add(user);
    }

    public List<Dataset> getDatasets() {
        return datasets;
    }

    public void setDatasets(List<Dataset> datasets) {
        this.datasets = datasets;
    }

    public static int getOrganisationCount() {
        return organisationCount;
    }

    public static void setOrganisationCount(int organisationCount) {
        Organisation.organisationCount = organisationCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Organisation that = (Organisation) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Organisation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", users=" + users +
                '}';
    }

    public static Organisation getRandomRegistration() {
        return new Organisation("Organisation " + organisationCount++);
    }
}
