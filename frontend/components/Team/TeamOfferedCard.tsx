import React, { ReactElement, Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import TeamUserList from "./TeamUserList";
import TeamDetail from "./TeamDetail";
import UserDetail from "../user/UserDetail";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import axios from "axios";

interface Props {
  teamPK: number;
  projectCode: number;
}

function TeamOfferedCard({ teamPK, projectCode }: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [teammodalUserPK, setteammodalUserPK] = useState<number>(0);
  const [teamButton, setTeamButton] = useState<number>(0);
  const token: string | null = localStorage.getItem("token");

  function closeModal() {
    setIsOpen(false);
    setShowUser(false);
  }
  function openModal() {
    setIsOpen(true);
    // 어떤 버튼을 활성화 할 것인지
    if (typeof token === "string") {
      axios
        .get(`/api/team/teamButton/${teamPK}/${projectCode}`, {
          headers: { Authorization: token },
        })
        .then((res: any) => {
          setTeamButton(res.data.data);
          console.log(res);
        })
        .catch(() => alert("회원님의 정보를 가져올 수 없습니다, 다시 로그인해주세요"));
    }
  }
  const apply = () => {
    alert(`${teamPK}팀에 지원했습니다.`);
  };

  const accept = () => {
    // // 유저가 팀의 제안을 수락
    // if (typeof token !== "string") return;
    // axios
    //   .get(`/api/team/recruit/user`, {
    //     headers: { Authorization: token },
    //     data: {
    //       teamPK: teamPK,
    //       projectCode: projectCode,
    //       suggestPK: suggestPK,
    //       suggest: true,
    //     },
    //   })
    //   .then((res: any) => {
    //     setTeamButton(res.data.data);
    //     console.log(res);
    //   })
    //   .catch(() => alert("회원님의 정보를 가져올 수 없습니다, 다시 로그인해주세요"));
  };
  return (
    <tr className="">
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div
          className="text-sm font-medium text-gray-900 hover:underline cursor-pointer my-2.5"
          onClick={() => openModal()}
        >
          팀이름
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          팀원 구인 중
        </span>
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
          // onClick={() => SendMM()}
        >
          거절
        </span>
      </td>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0  " onClose={closeModal}>
          <div className="flex justify-center my-8  text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block align-middle " aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {showUser ? (
                <div className="fixed inline-block min-w-md max-w-5xl p-6 h-9/10  transition-all transform text-left bg-white rounded-2xl  overflow-auto scrollbar-hide">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-left flex flex-row m-2 hover:underline cursor-pointer"
                    onClick={() => setShowUser(false)}
                  >
                    <ArrowLeftIcon className="text-sm" width="20px" />
                    뒤로 가기
                  </Dialog.Title>
                  <div className="mt-2 ">
                    <p className="text-sm text-gray-500  ">
                      <UserDetail userPk={teammodalUserPK} />
                    </p>
                  </div>

                  <div className="mt-4 flex flex-row space-x-2 justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={apply}
                    >
                      MM 보내기
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      창 닫기
                    </button>
                  </div>
                </div>
              ) : (
                <div className="fixed inline-block min-w-lg max-w-5xl p-6 h-9/10  transition-all transform text-left bg-white rounded-2xl overflow-auto scrollbar-hide">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    {teamPK}팀 정보
                  </Dialog.Title>
                  <div className="mt-2 ">
                    <p className="text-sm text-gray-500  ">
                      <TeamDetail teamPK={teamPK} />
                      <TeamUserList
                        teamPK={teamPK}
                        showUser={setShowUser}
                        teammodalUserPK={setteammodalUserPK}
                      />
                    </p>
                  </div>

                  <div className="mt-4 flex flex-row space-x-2 justify-center">
                    {teamButton === 0 ? (
                      false
                    ) : teamButton === 1 ? (
                      <>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={apply}
                        >
                          팀의 제안 수락
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={apply}
                        >
                          팀의 제안 거절
                        </button>
                      </>
                    ) : teamButton === 2 ? (
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={apply}
                      >
                        팀 가입 신청 취소
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={apply}
                      >
                        팀 가입 신청
                      </button>
                    )}
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      창 닫기
                    </button>
                  </div>
                </div>
              )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </tr>
  );
}

export default TeamOfferedCard;
