package forum.model;

import forum.security.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Topic {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    @NonNull
    @JoinColumn(name="author_id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private User topicAuthor;

    @NonNull
    @JoinColumn(name = "category_id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Category category;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();

    @JoinColumn(name = "created_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
    private Date createdDate;

    private boolean enabledForUsers = true;
    private boolean pinned = false;



}