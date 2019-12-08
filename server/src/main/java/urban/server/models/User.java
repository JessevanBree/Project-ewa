package urban.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Random;

@Entity
@NamedQuery(name = "find_all_users", query = "select u from User u")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    private String email;
    private String firstname;
    private String lastname;
    private LocalDateTime creationDate;
    private boolean isAdmin;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Organisation organisation;

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

    public User(String email, String firstname, String lastname, boolean isAdmin) {
        this.email = email;
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
        return new User(getSaltString()+"@hva.nl", "Abdul", "Zor", getRandomIsAdmin());
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
