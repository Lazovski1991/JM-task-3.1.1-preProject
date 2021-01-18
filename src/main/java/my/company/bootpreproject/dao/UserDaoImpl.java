package my.company.bootpreproject.dao;

import my.company.bootpreproject.model.User;
import org.springframework.stereotype.Repository;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getUsers() {
        return entityManager.createQuery("FROM User").getResultList();
    }

    @Override
    public void save(User user) {
        if (user.isNew()) {
            entityManager.persist(user);
        } else {
            entityManager.merge(user);
        }
    }

    @Override
    public void delete(Long id) {
        entityManager.createQuery("DELETE FROM User u WHERE u.id=:id")
                .setParameter("id", id)
                .executeUpdate();
    }

    @Override
    public User get(Long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User getByName(String name) {

        Query query = entityManager.createQuery("SELECT u FROM User u WHERE u.name=:name");
        query.setParameter("name", name);
        User user = (User) query.getSingleResult();
        return user;
    }
}
