import React, { ReactElement, useState, Fragment, useEffect, useRef } from "react";
import UserDetailModal from "./UserDetailModal";
import Image from "next/image";
import SendMMmodal from "./SendMMmodal";
interface Props {
  projectCode: any;
  person: any;
  leadercheck: boolean;
}

function UserCard({ person, projectCode, leadercheck }: Props): ReactElement {
  // 유저상세
  const [flag, setflag] = useState<boolean>(false);
  const [pk, setpk] = useState<number>(0);
  const [mmid, setmmid] = useState<string>("");
  function userdetail(pk: number, mmid: string) {
    setflag(true);
    setpk(pk);
    setmmid(mmid);
  }
  // Mattermost
  const [flagMM, setflagMM] = useState<boolean>(false);
  return (
    <tr>
      <td
        className="px-6 py-4 cursor-pointer"
        onClick={() => userdetail(person.userPk, person.mmid)}
      >
        <div className="text-sm font-medium text-gray-900 my-2.5">
          {person.profile.length > 10 ? (
            <img
              className="h-10 w-10 rounded-full mx-auto"
              src={person.profile}
              alt=""
              width="100%"
              height="100%"
            />
          ) : (
            <img
              className="h-10 w-10 rounded-full mx-auto"
              src="/images/noimg.png"
              alt=""
              width="100%"
              height="100%"
            />
          )}
        </div>
      </td>
      <td
        className="px-6 py-4 cursor-pointer"
        onClick={() => userdetail(person.userPk, person.mmid)}
      >
        <div className="text-sm font-medium text-gray-900 cursor-pointer my-2.5">
          {person.userName}
        </div>
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap cursor-pointer"
        onClick={() => userdetail(person.userPk, person.mmid)}
      >
        <div className="text-sm text-gray-900">
          {person.classRegion} {person.classNumber}
        </div>
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap cursor-pointer"
        onClick={() => userdetail(person.userPk, person.mmid)}
      >
        {person.userPhone}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
        onClick={() => userdetail(person.userPk, person.mmid)}
      >
        {person[projectCode] ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            팀있음
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            팀없음
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span
          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-400 text-black cursor-pointer"
          onClick={() => {
            setflagMM(true);
          }}
        >
          MatterMost
        </span>
      </td>
      <UserDetailModal
        projectCode={projectCode}
        userPK={pk}
        mmid={mmid}
        flag={flag}
        setflag={setflag}
        leaderCheck={leadercheck}
      />
      <SendMMmodal flagMM={flagMM} setflagMM={setflagMM} mmid={person.mmid} />
    </tr>
  );
}

export default UserCard;
