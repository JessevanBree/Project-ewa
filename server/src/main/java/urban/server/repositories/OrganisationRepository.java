package urban.server.repositories;

import urban.server.models.Organisation;

import java.util.List;

public interface OrganisationRepository extends EntityRepository<Organisation> {
    Organisation findByName(String name);
}
