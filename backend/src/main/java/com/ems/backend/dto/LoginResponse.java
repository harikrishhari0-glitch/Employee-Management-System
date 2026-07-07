package com.ems.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private UserDetails user;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserDetails {
        private Long id;
        private String name;
        private String email;
        private String role;
    }
}
