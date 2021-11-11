// 유저가 팀한테 받은 제안
import React, { ReactElement, useState } from "react";
import TeamDetailModal from "./TeamDetailModal";
import axios from 'axios'
interface Props {
  teamPK: number;
  projectCode: number;
  suggestPK: number,
  suggestDate:string
}

function TeamOfferedCard({ teamPK, projectCode, suggestPK, suggestDate }: Props): ReactElement {
  const [teamFlag, setTeamFlag] = useState<boolean>(false)
  // 제안을 보낸 시간 구하기
  const now = new Date(suggestDate);
  new Date(now.setHours(now.getHours() + 11));
  // 시간으로 변환
  function timeForToday(value: any) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }
  // 제안 수락
  function accept() {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      axios.post(
        "/api/team/recruit/user",
        {
          teamPk: teamPK,
          projectCode: Number(projectCode),
          suggestPK: suggestPK,
          boolean: true,
        },
        {
          headers: { Authorization: token },
        }
      );
    }
  }
  // 제안 거절
  function reject() {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      axios.post(
        "/api/team/recruit/user",
        {
          teamPk: teamPK,
          projectCode: projectCode,
          suggetPK: suggestPK,
          boolean: false,
        },
        {
          headers: { Authorization: token },
        }
      );
    }
  }
  return (
    <tr className="">
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div
          className="text-sm font-medium text-gray-900 hover:underline cursor-pointer my-2.5"
          onClick={() => setTeamFlag(true)}
        >
          팀이름
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          팀원 구인 중
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{timeForToday(now)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span
          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-400 text-black cursor-pointer"
          onClick={() => accept()}
        >
          수락
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span
          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-black cursor-pointer"
          onClick={() => reject()}
        >
          거절
        </span>
      </td>
      <TeamDetailModal projectCode={projectCode} teamFlag={teamFlag} setTeamFlag={setTeamFlag} teamPK={teamPK} />

    </tr>
  );
}

export default TeamOfferedCard;
