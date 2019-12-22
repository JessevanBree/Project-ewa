package urban.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.CMS;
import urban.server.models.Dataset;
import urban.server.models.User;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * @Author Jesse van Bree
 */

@Repository
@Transactional
public class JPACMSRepository implements EntityRepository<CMS> {
    @Autowired
    private EntityManager em;

    @Override
    public CMS save(CMS entity) {
        if (entity.getId() == null) {
            em.persist(entity);
        } else {
            em.merge(entity);
        }
        return entity;
    }

    @Override
    public void delete(CMS entity) {
        CMS toRemove = em.merge(entity);

        em.remove(toRemove);
    }

    @Override
    public CMS findById(Long id) {
        return em.find(CMS.class, id);
    }

    @Override
    public List<CMS> findAll() {
        TypedQuery<CMS> namedQuery = em.createNamedQuery("get_all_cms", CMS.class);

        return namedQuery.getResultList();
    }
}
