import React, { ReactElement, useState } from "react";
import axios from "axios";
import TeamDetailModal from "./TeamDetailModal";
interface Props {
  teamPK: number;
  projectCode: number;
}

function TeamOfferCard({ teamPK, projectCode }: Props): ReactElement {
  const [teamFlag, setTeamFlag] = useState<boolean>(false)

  const apply = () => {
    alert(`${teamPK}팀에 지원했습니다.`);
  };

  return (
    <tr className="h-10">
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className="text-sm font-medium text-gray-900 hover:underline cursor-pointer my-2.5"
          onClick={() => setTeamFlag(true)}
        >
          팀이름
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          팀원 구인 중
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div
          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-black cursor-pointer"
        // onClick={() => SendMM()}
        >
          제안 철회
        </div>
      </td>
      <TeamDetailModal projectCode={projectCode} teamFlag={teamFlag} setTeamFlag={setTeamFlag} teamPK={teamPK} />
    </tr>
  );
}

export default TeamOfferCard;