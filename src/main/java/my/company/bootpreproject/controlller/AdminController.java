package my.company.bootpreproject.controlller;

import my.company.bootpreproject.model.User;
import my.company.bootpreproject.service.RoleService;
import my.company.bootpreproject.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String getUsers(Model model) {
        model.addAttribute("users", userService.getUsers());
        model.addAttribute("roles", roleService.getRoles());
        return "users";
    }

    @GetMapping(value = "/add")
    public String getPageSave(Model model) {
        model.addAttribute("roles", roleService.getRoles());
        return "form";
    }

    @PostMapping
    public String saveUsers(@ModelAttribute User user) {
        if (!user.getPassword().isBlank()) {
            userService.save(user);
        }
        return "redirect:/admin";
    }

/*    @GetMapping(value = "/delete")
    public String delete(@RequestParam Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }*/
}
