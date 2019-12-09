package urban.server.repositories;

import urban.server.models.Dataset;

import java.util.List;

public interface DatasetRepository {
    Dataset save(Dataset dataset);

    void delete(Dataset user);

    Dataset findById(Long id);

    List<Dataset> findAll();
}
