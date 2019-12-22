package urban.server.repositories;

import urban.server.models.Organisation;
import urban.server.models.User;

import java.util.List;

public interface OrganisationRepository {
    Organisation save(Organisation user);

    void delete(Organisation user);

    Organisation findById(Long id);

    List<Organisation> findAll();

    Organisation findByName(String name);

    List<Organisation> findByUser(Long userId);
}
