import React, { ReactElement, useEffect } from "react";
import { PaperClipIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import axios from "axios";

interface Props {
  userPK?: number;
}

function UserDetail({ userPK }: Props): ReactElement {
  const router = useRouter();
  const PK = router.query.userPK;
  // pk를 이용해 유저정보 가져오기
  useEffect(()=>{
    const token: string | null = localStorage.getItem("token")
    if (typeof token === "string") {
      axios.get(`/api/users/detail/${userPK}`, {
        headers: { Authorization: token }
      })
        .then((res: any) => {
          console.log(res);
        
        })
        .catch((err) => alert(err))
    }
  })
  // 퇴소처리
  function leave(data: number) {
    console.log(data);
    return;
  }
  return (
    <div className="mx-3">
      <div className="shadow overflow-hidden sm:rounded-lg mt-5">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            교육생 정보
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">이름</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* {userdata.name} */}
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">주소</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* {userdata.address} */}
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">연락처</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">?</dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">이메일주소</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* {userdata.address} */}
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">퇴소유무</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">$120,000</dd>
            </div>
            {/* <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">교육지원금 서명파일</dt>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul
                  role="list"
                  className="border border-gray-200 rounded-md divide-y divide-gray-200"
                >
                  {userdata.sigfiles.map((month, i) => (
                    <li
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      key="i"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                        <span className="ml-2 flex-1 w-0 truncate">{month}.jpg</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                          Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
          </dl>
        </div>
      </div>
      <div className="my-5 text-center">
        <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border bg-red-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-red-50 mx-1"
          // onClick={() => leave(userdata.userId)}
          >
            퇴소
          </button>
          {/* <button
            type="button"
            className="inline-flex items-center px-4 py-2 border bg-blue-100 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-blue-50 mx-1"
            onClick={() =>
              router.push(`/ManageUserDetailEdit/?userId=${PK}`, "/ManageUserDetailEdit")
            }
          >
            정보수정
          </button> */}
        </span>
      </div>
    </div>
  );
}

export default UserDetail;