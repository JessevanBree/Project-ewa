package urban.server.models;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@NamedQuery(name="find_all_organisations", query="select o from Organisation o")
public class Organisation {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "organisation", cascade = CascadeType.REMOVE)
    private List<User> users;

    public Organisation() {
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
                '}';
    }
}
