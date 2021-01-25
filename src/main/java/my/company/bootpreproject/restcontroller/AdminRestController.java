package my.company.bootpreproject.restcontroller;

import my.company.bootpreproject.model.User;
import my.company.bootpreproject.service.RoleService;
import my.company.bootpreproject.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = AdminRestController.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class AdminRestController {

    private final UserService userService;

    static final String REST_URL = "/rest/admin";

    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public void saveUsers(@RequestBody User user) {
        userService.save(user);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody User user) {
        userService.update(user, id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.get(id);
    }
}
