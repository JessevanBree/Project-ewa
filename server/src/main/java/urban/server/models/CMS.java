package urban.server.models;

import com.fasterxml.jackson.annotation.JsonView;
import urban.server.views.CMSView;

import javax.persistence.*;

/**
 * @Author Jesse van Bree
 */
@Entity
@NamedQueries({
        @NamedQuery(name = "get_all_cms", query = "select cms from CMS cms"),
        @NamedQuery(name = "get_all_cms_by_page", query = "select cms from CMS cms where cms.page = ?1")
})
public class CMS {
    @Id
    @JsonView({CMSView.Full.class})
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonView({CMSView.Full.class})
    private String location;

    @JsonView({CMSView.Full.class})
    @Column(length = 2048)
    private String content;

    @JsonView({CMSView.Full.class})
    private String page;

    public CMS() {
    }

    public CMS(String location, String page, String content) {
        this.location = location;
        this.page = page;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }
}
