package com.add.ssafy.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailDto {
    private Long userPk;
    private String userName;
    private String email;
    private String introduce;
    private boolean isTeam;
    private String blog;
    private String backjun;
    private String portfolio;
    private String git;
    private String mmid;
}