package urban.server.repositories;

import java.util.List;

public interface Repository<T> {
    List<T> findAll();
    void postAll(List<T> items);
//    T find(T x, );
//    T post();
}
