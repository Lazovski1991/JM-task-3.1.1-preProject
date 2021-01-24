package my.company.bootpreproject.restcontroller;

import my.company.bootpreproject.model.Role;
import my.company.bootpreproject.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = RoleRestController.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class RoleRestController {

    static final String REST_URL = "/rest/role";

    private final RoleService roleService;

    public RoleRestController(RoleService roleService) {
        this.roleService = roleService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<Role> getRoles() {
        return roleService.getRoles();
    }
}
