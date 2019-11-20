package urban.server.repositories;

import java.util.List;

public interface Repository<T> {
    List<T> findAll();
    // waarschijnlijk gaat dit weg
    void saveAll(List<T> items);
//    T find(T x, );
//    T post();
}
