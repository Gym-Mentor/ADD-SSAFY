package com.add.ssafy.service;

import com.add.ssafy.Repository.HashtagRepo;
import com.add.ssafy.Repository.MemberHashtagRepo;
import com.add.ssafy.Repository.MemberRepo;
import com.add.ssafy.Repository.ProposeRepo;
import com.add.ssafy.config.FileUtils;
import com.add.ssafy.config.SecurityUtil;
import com.add.ssafy.dto.HashTagsDto;
import com.add.ssafy.dto.MemberAddTagsDto;
import com.add.ssafy.dto.TokenDto;
import com.add.ssafy.dto.UserDetailDto;
import com.add.ssafy.dto.request.UpdateMemberRequest;
import com.add.ssafy.dto.request.UserRequest;
import com.add.ssafy.dto.response.BaseResponse;
import com.add.ssafy.entity.HashTag;
import com.add.ssafy.entity.Member;
import com.add.ssafy.entity.MemberHashtag;
import com.add.ssafy.entity.Propose;
import com.add.ssafy.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberSvcImpl implements MemberSvcInter {
    @Autowired
    MemberRepo memberRepo;
    @Autowired
    HashtagRepo hashtagRepo;
    @Autowired
    MemberHashtagRepo memberHashtagRepo;
    @Autowired
    ProposeRepo proposeRepo;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Member loginOrSignup(UserRequest userRequest) {
        boolean check = false;
        //mmid가 먼저 존재하는지 조회
        Member signupMember = userRequest.toUser(passwordEncoder);
        Optional<Member> tempMember = Optional.ofNullable(memberRepo.findByMmid(signupMember.getMmid()));

        if (!tempMember.isPresent()) {
            //그게 없다면 회원가입
            Member savedMember = memberRepo.save(signupMember);
            return savedMember;
        } else {
            return tempMember.get();
        }
    }

    @Override
    public BaseResponse login(UserRequest userRequest) {

        System.out.println(userRequest.toString());

        // 유저 정보 검증

        // -------- 토큰 생성
        // 유저 id, password를 통해 UsernamePasswordAuthenticationToken객체 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userRequest.getMmid(), "test");
        // authenticationToken를 이용해서 authenticate메소드가 실행이 될때
        // 아까만든 CustomUserDetailsService의 loadUserByUsername 메소드가 실행됨
        // 그 결과값을 가지고 Authentication객체가 생성됨
        System.out.println("----"+authenticationToken);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//        SecurityContextHolder.getContext().setAuthentication(authentication);//Authentication객체를 SecurityContext에 저장

        // memberName 가져와서 토큰만들때 집어넣음
        String memberEmail = userRequest.getMmid();
        // Authentication를 이용해 jwt토큰 생성
        TokenDto jwt = tokenProvider.createToken(authentication);
        System.out.println(jwt);
        // -------- 토큰 생성완료

        // RefreshToken 저장
//        RefreshToken refreshToken = RefreshToken.builder().key(authentication.getName()).value(jwt.getRefreshToken())
//                .build();
//        System.out.println(refreshToken);
//        refreshTokenRepository.save(refreshToken);
        
        //로그인 개선안
        Member member =memberRepo.findByMmid(userRequest.getMmid());
        member.setUserNick(userRequest.getNickname());
        member.setUserName(userRequest.getUsername());
        member.setEmail(userRequest.getEmail());
        member.setProfile(userRequest.getImage());
        member.setMmToken(userRequest.getMmToken());
        //프사 변경
//        FileUtils.deleteProfile(member.getProfile());//기존프사 삭제
//        try {
//            member.setProfile(FileUtils.uploadProfile(userRequest.getImage()));//DB에 이미지 변경
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        memberRepo.save(member);



        return BaseResponse.builder().status("200").msg("login").data(jwt).build();


    }
    @Override
    public BaseResponse getUserDetail(Long userPK){

        UserDetailDto tempMember = memberRepo.findUserDetailDTOById(userPK);

        MemberAddTagsDto res = new MemberAddTagsDto();
        Map<String,Object> memberHashtags = new HashMap<>();
        List<HashTagsDto> tempTags = memberHashtagRepo.gethashtags(userPK);
        for(int g = 0 ; g < tempTags.size();g++){
            HashTagsDto temp = tempTags.get(g);
            memberHashtags.put(temp.getHashTagProp().toString(), temp.getHashtags());
        }
        res.setMemberHashTags(memberHashtags);
        res.setUserDetailDto(tempMember);
        return BaseResponse.builder().status("200").msg("성공").data(res).build();
    }

    @Override
    public BaseResponse updateMember(UpdateMemberRequest updateMemberRequest){
        Member member = memberRepo.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new IllegalStateException("로그인 유저정보가 없습니다"));

        member.setBlog(updateMemberRequest.getBlog());
        member.setGithub(updateMemberRequest.getGithub());
        member.setIntroduce(updateMemberRequest.getIntroduce());
        member.setUserPhone(updateMemberRequest.getPhone());

        List<Long>can = updateMemberRequest.getCan();
        memberRepo.save(member);
        memberRepo.flush();
        Long memberPK = member.getId();
        List<MemberHashtag> beforeUpdate= memberHashtagRepo.getHashtagEntity(memberPK);
        for(int i = 0 ; i < beforeUpdate.size();i++){
            memberHashtagRepo.delete(beforeUpdate.get(i));
        }
        memberHashtagRepo.flush();
        for(int i =0;i<can.size();i++){
            Optional<HashTag> hashTag= hashtagRepo.findById(can.get(i));
            if(hashTag.isPresent()) {
                memberHashtagRepo.save(MemberHashtag.builder().member(member).hashTag(hashTag.get()).build());
            }
        }


        return BaseResponse.builder().status("200").msg("성공").data(true).build();
    }

    @Override
    public BaseResponse myPage(){
        Member member = memberRepo.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new IllegalStateException("로그인 유저정보가 없습니다"));
        Long userPK = member.getId();
        UserDetailDto tempMember = memberRepo.findUserDetailDTOById(userPK);
        MemberAddTagsDto res = new MemberAddTagsDto();
        Map<String,Object> memberHashtags = new HashMap<>();
        List<HashTagsDto> tempTags = memberHashtagRepo.gethashtags(userPK);
        for(int g = 0 ; g < tempTags.size();g++){
            HashTagsDto temp = tempTags.get(g);
            memberHashtags.put(temp.getHashTagProp().toString(), temp.getHashtags());
        }
        res.setMemberHashTags(memberHashtags);
        res.setUserDetailDto(tempMember);
        return BaseResponse.builder().status("200").msg("성공").data(res).build();
    }

    //유저가 팀에 보냇던 제안들
    @Override
    public BaseResponse userToTeamSuggested(int projectCode,boolean direction){
        Member member = memberRepo.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new IllegalStateException("로그인 유저정보가 없습니다"));

        return BaseResponse.builder().status("200").msg("성공").data(proposeRepo.userToTeamSuggested(member.getId(),projectCode,direction)).build();
    }

    @Override
    public BaseResponse suggestedCheck( Long teamPK, boolean direction){
        Member member = memberRepo.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new IllegalStateException("로그인 유저정보가 없습니다"));
        Long userPK = member.getId();
        Optional<Propose> proposeCheck = proposeRepo.findPropose(teamPK,userPK,direction);
        if (proposeCheck.isPresent()){
            return BaseResponse.builder().msg("지원함").status("200").data(proposeCheck.get().getId()).build();
        }else{
            return BaseResponse.builder().msg("지원하지 않음").status("200").data(0).build();
        }
    }
}
