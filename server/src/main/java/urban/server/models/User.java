package urban.server.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@NamedQuery(name="find_all_users", query="select u from User u")
public class User {
    @Id
    @GeneratedValue
    private int id;

    private String email;
    private String firstname;
    private String lastname;
    private LocalDate creationDate;
    private boolean isAdmin;
    private Organisation organisation;

    // we need to have a default no argument constructor so that we can create user without giving all attributes
    protected User() {

    }

    public User(int id, String email, String firstname, String lastname, boolean isAdmin, Organisation organisation) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.creationDate = LocalDate.now();
        this.isAdmin = isAdmin;
        this.organisation = organisation;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) throws Exception {
        if (creationDate.isAfter(LocalDate.now())) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
