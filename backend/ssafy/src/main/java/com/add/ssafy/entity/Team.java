package com.add.ssafy.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@Builder @NoArgsConstructor
@AllArgsConstructor
// id, 팀명, ppt주소, 팀 구분, 상 여부, 팀 소개
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String ppt;

    private Integer type;

    private Boolean prize;

    private String introduce;

    private String webexLink;

    private String mmChannel;
}
