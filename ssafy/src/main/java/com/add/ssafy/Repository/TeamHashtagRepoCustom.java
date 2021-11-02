package com.add.ssafy.Repository;

import com.add.ssafy.dto.HashTagsDto;
import com.add.ssafy.entity.TeamHashtag;

import java.util.List;

public interface TeamHashtagRepoCustom {
    List<HashTagsDto> gethashtags(Long teamPK);

    List<TeamHashtag> getTeamHashtagByTeam(Long teamPK);
}
