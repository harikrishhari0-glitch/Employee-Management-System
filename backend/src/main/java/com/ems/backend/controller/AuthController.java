package com.ems.backend.controller;

import com.ems.backend.dto.ApiResponse;
import com.ems.backend.dto.LoginRequest;
import com.ems.backend.dto.LoginResponse;
import com.ems.backend.entity.User;
import com.ems.backend.security.CustomUserDetails;
import com.ems.backend.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();
        
        String token = jwtService.generateToken(userDetails);
        
        LoginResponse.UserDetails details = new LoginResponse.UserDetails(
                user.getId(),
                user.getFirstName() + " " + user.getLastName(),
                user.getEmail(),
                user.getRole().name()
        );
        LoginResponse res = new LoginResponse(token, details);
        
        return ResponseEntity.ok(ApiResponse.<LoginResponse>builder()
                .success(true).message("Login successful").data(res).status(200).build());
    }
    
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<LoginResponse>> getCurrentUser(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();
        
        LoginResponse.UserDetails details = new LoginResponse.UserDetails(
                user.getId(),
                user.getFirstName() + " " + user.getLastName(),
                user.getEmail(),
                user.getRole().name()
        );
        LoginResponse res = new LoginResponse(null, details);
        
        return ResponseEntity.ok(ApiResponse.<LoginResponse>builder()
                .success(true).message("User fetched").data(res).status(200).build());
    }
}
