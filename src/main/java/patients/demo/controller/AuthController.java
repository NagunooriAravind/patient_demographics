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

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "false") // Enable CORS for this controller
public class AuthController {

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String registerUser(@RequestBody AppUser appUser) {
        appUserService.registerUser(appUser);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AppUser loginRequest) {
        // Find the user by username
        Optional<AppUser> userOptional = appUserService.findByUsername(loginRequest.getUsername());

        if (userOptional.isPresent()) {
            AppUser user = userOptional.get();

            // Check if the password matches
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // Return a success response with a token (for now, just a success message)
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                return ResponseEntity.ok().body(response);
            } else {
                throw new RuntimeException("Invalid username or password");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }
}