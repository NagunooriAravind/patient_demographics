package patients.demo.service;

import patients.demo.model.AppUser;
import patients.demo.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user
    public AppUser registerUser(AppUser appUser) {
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        return appUserRepository.save(appUser);
    }

    // Find a user by username
    public Optional<AppUser> findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }
}