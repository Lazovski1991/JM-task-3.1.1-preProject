package my.company.bootpreproject.service;

import my.company.bootpreproject.dao.RoleDao;
import my.company.bootpreproject.model.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleDao roleDao;

    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }


    @Override
    public List<Role> getRoles() {
        return roleDao.findAll();
    }
}
