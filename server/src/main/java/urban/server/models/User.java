package urban.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import urban.server.views.DatasetsView;
import urban.server.views.OrganisationsView;
import urban.server.views.UsersView;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@Entity
@NamedQueries({
        @NamedQuery(name = "find_all_users", query = "select u from User u"),
        @NamedQuery(name = "find_user_by_email", query = "select u from User u" +
                " where u.email = ?1")
})
public class User {
    @Id
    @GeneratedValue
    @JsonView({UsersView.Full.class, UsersView.OnlyIdEmailIsadminSerializer.class})
    private Long id;

    @JsonView({UsersView.Full.class, UsersView.OnlyIdEmailIsadminSerializer.class})
    private String email;

    private String password;

    @JsonView({UsersView.Full.class})
    private String firstname;

    @JsonView({UsersView.Full.class})
    private String lastname;

    @JsonView({UsersView.Full.class})
    private LocalDateTime creationDate;

    @JsonView({UsersView.Full.class, UsersView.OnlyIdEmailIsadminSerializer.class})
    private boolean isAdmin;

    @JsonView({UsersView.Full.class})
    @JsonSerialize(using = OrganisationsView.OnlyIdNameSerializer.class)
    @ManyToOne(fetch = FetchType.LAZY)
    private Organisation organisation;

    @JsonView({UsersView.Full.class})
    @JsonSerialize(using = OrganisationsView.OnlyIdNameSerializer.class)
    @ManyToMany()
    private List<Organisation> organisations = new ArrayList<>();

    @JsonView(UsersView.Full.class)
    @JsonSerialize(using = DatasetsView.OnlyIdDataSerializer.class)
    @OneToMany(mappedBy = "user")
    private List<Dataset> datasets = new ArrayList<>();

    @OneToOne(mappedBy = "organisationAdmin")
    private Organisation adminOfOrganisation;


    // we need to have a default no argument constructor so that we can create user without giving all attributes
    public User() {

    }

    private User(String email, String firstname, String lastname, boolean isAdmin, Organisation organisation) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.creationDate = LocalDateTime.now();
        this.isAdmin = isAdmin;
        this.organisation = organisation;
    }

    public User(String email, String password, String firstname, String lastname, boolean isAdmin) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.creationDate = LocalDateTime.now();
        this.isAdmin = isAdmin;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", creationDate=" + creationDate +
                ", isAdmin=" + isAdmin +
                ", organisation=" + organisation +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) throws Exception {
        if (creationDate.isAfter(LocalDateTime.now())) {
            throw new Exception("Creation date can not be after the current time");
        }
        this.creationDate = creationDate;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public List<Dataset> getDatasets() {
        return datasets;
    }

    public void setDatasets(List<Dataset> datasets) {
        this.datasets = datasets;
    }

    public String getPassWord() {
        return this.password;
    }

    public void setPassWord(String password) {
        this.password = password;
    }

    public void addDataset(Dataset dataset) {
        if (getOrganisation() != null) {
            dataset.setDatasetOrganisation(getOrganisation());
        }
        dataset.setUser(this);
        this.datasets.add(dataset);
    }

    public Organisation getAdminOfOrganisation() {
        return adminOfOrganisation;
    }

    public void setAdminOfOrganisation(Organisation adminOfOrganisation) {
        this.adminOfOrganisation = adminOfOrganisation;
    }

    public List<Organisation> getOrganisations() {
        return organisations;
    }

    public void addOrganisation(Organisation organisation) {
        this.organisations.add(organisation);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public static User generateRandomUser() {
        return new User(getSaltString() + "@hva.nl", "testing", null, null, getRandomIsAdmin());
    }

    private static boolean getRandomIsAdmin() {
        return Math.random() < 0.5;
    }

    private static String getSaltString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 10) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;

    }
}
