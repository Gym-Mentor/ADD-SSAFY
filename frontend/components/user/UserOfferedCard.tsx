import React, { ReactElement, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import UserDetail from "./UserDetail";
import Image from "next/image";
interface Props {
  person: object;
}

function UserOfferedCard({ person }: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);
  function closeModal() {
    setIsOpen(false);
    setShowUser(false);
  }
  function openModal(person: number) {
    setIsOpen(true);
  }
  const apply = () => {
    alert(`${person}팀에 지원했습니다.`);
  };
  function SendMM() {
    alert("message");
  }
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <Image
              className="h-10 w-10 rounded-full"
              src="https://previews.123rf.com/images/eltoro69/eltoro691509/eltoro69150900056/46006637-%ED%8C%80-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%ED%94%84%EB%A0%88-%EC%A0%A0-%ED%85%8C%EC%9D%B4%EC%85%98%EC%9D%84%EC%9C%84%ED%95%9C-%EC%B6%94%EC%83%81%EC%A0%81-%EC%9D%B8-%EB%94%94%EC%9E%90%EC%9D%B8.jpg"
              alt=""
              width="100%"
              height="100%"
            />
          </div>
          <div className="ml-4">
            <div
              className="text-sm font-medium text-gray-900 hover:underline cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              이름
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">반</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span
          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-400 text-black cursor-pointer"
          onClick={() => SendMM()}
        >
          수락
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span
          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-black cursor-pointer"
          onClick={() => SendMM()}
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
              <div className="fixed inline-block min-w-lg max-w-5xl p-6 h-9/10  transition-all transform text-left bg-white rounded-2xl overflow-auto scrollbar-hide">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-left flex flex-row m-2 hover:underline cursor-pointer"
                  onClick={() => setShowUser(false)}
                ></Dialog.Title>
                <div className="mt-2 ">
                  <p className="text-sm text-gray-500  ">
                    <UserDetail />
                  </p>
                </div>

                <div className="mt-4 flex flex-row space-x-2 justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={apply}
                  >
                    제안 보내기
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </tr>
  );
}

export default UserOfferedCard;
