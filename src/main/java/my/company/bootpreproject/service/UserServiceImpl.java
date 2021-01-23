package my.company.bootpreproject.service;

import my.company.bootpreproject.dao.UserDao;
import my.company.bootpreproject.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional(readOnly = true)
    @Override
    public List<User> getUsers() {
        return userDao.findAll();
    }

    @Transactional
    @Override
    public void save(User user) {
        userDao.save(user);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        userDao.deleteById(id);
    }

    @Override
    public User get(Long id) {
        return userDao.findById(id).get();
    }


    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        return userDao.loadUserByUsername(name);
    }

    @Transactional
    public void update(User user, Long id) {
        User userBd = userDao.findById(id).get();
        if (id != null && user.getPassword() != null) {
            userBd.setName(user.getName());
            userBd.setLastName(user.getLastName());
            userBd.setEmail(user.getEmail());
            userBd.setPassword(user.getPassword());
            userBd.setRoles(user.getRoles());
            userBd.setAge(user.getAge());
            userDao.save(userBd);
        }
    }
}
