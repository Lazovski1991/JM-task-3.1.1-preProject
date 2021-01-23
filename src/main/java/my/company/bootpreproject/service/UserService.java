package my.company.bootpreproject.service;


import my.company.bootpreproject.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getUsers();

    void save(User user);

    void delete(Long id);

    User get(Long id);

    void update(User user, Long id);
}
