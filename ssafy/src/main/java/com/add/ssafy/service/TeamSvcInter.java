package com.add.ssafy.service;

import com.add.ssafy.dto.response.BaseResponse;

public interface TeamSvcInter {
    BaseResponse getTeamUserList(Long teamPK);
}
