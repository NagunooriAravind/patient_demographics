package patients.demo.controller;

import patients.demo.model.AppUser;
import patients.demo.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/*@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "false") // Enable CORS for this controller
public class RegisterController {

    @Autowired
    private AppUserService appUserService;



    @PostMapping("/register")
    public String registerUser(@RequestBody AppUser appUser) {
        appUserService.registerUser(appUser);
        return "User registered successfully";
    }


}*/