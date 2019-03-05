package forum.repository;

import forum.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TopicRepository extends JpaRepository<Topic, Long> {
    Topic findByTitle(String title);
}