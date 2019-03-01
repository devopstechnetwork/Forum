package forum.security.repository;

import forum.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;


import java.util.List;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    List<User> findAll();

    boolean existsUserByUsername(String username);


}
