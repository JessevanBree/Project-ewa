package urban.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import urban.server.models.Organisation;
import urban.server.models.User;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

@Component
public class JPAOrganisationRepository implements OrganisationRepository {
    @Autowired
    private EntityManager em;

    @Override
    public Organisation save(Organisation organisation) {
        return em.merge(organisation);
    }

    @Override
    public void delete(Organisation organisation) {

        Organisation toRemove = em.merge(organisation);

        em.remove(toRemove);
    }

    @Override
    public Organisation findById(int id) {

        return em.find(Organisation.class,id);
    }

    @Override
    public List<Organisation> findAll() {
        TypedQuery<Organisation> namedQuery = em.createNamedQuery("find_all_organisations", Organisation.class);

        return namedQuery.getResultList();
    }


}
