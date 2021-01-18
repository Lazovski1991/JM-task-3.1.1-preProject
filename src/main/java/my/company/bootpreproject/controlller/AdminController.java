package my.company.bootpreproject.controlller;

import my.company.bootpreproject.model.Role;
import my.company.bootpreproject.model.User;
import my.company.bootpreproject.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collections;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String getUsers(Model model) {
        model.addAttribute("users", userService.getUsers());
        return "users";
    }

    @GetMapping(value = "/add")
    public String getPageSave(Model model, User user) {
        model.addAttribute(user);
        return "userForm";
    }

    @PostMapping
    public String saveUsers(@RequestParam(required = false) Long id, @RequestParam String name,
                            @RequestParam String lastName, @RequestParam String email,
                            @RequestParam String password, @RequestParam(defaultValue = "ROLE_USER") String roles) {

        User user = new User(id, name, lastName, email, password, Collections.singleton(new Role(1L, roles)));
        userService.save(user);
        return "redirect:/admin";
    }

    @GetMapping(value = "/update")
    public String getPageUpdate(Model model, @RequestParam Long id) {
        model.addAttribute(userService.get(id));
        return "userForm";
    }

    @GetMapping(value = "/delete")
    public String delete(@RequestParam Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
