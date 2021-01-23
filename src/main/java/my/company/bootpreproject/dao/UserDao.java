package my.company.bootpreproject.dao;


import my.company.bootpreproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserDao extends JpaRepository<User, Long> {

    @Modifying
    @Query("SELECT u FROM User u WHERE u.name=:name")
    User loadUserByUsername(String name);

}
