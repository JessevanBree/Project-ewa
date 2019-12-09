package urban.server.repositories;

import urban.server.models.Organisation;

import java.util.List;

public interface OrganisationRepository {
    Organisation save(Organisation user);

    void delete(Organisation user);

    Organisation findById(Long id);

    List<Organisation> findAll();
}
