package my.company.bootpreproject.dao;

import my.company.bootpreproject.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, Long> {

}
