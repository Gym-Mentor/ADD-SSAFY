import React, { ReactElement, useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import SearchTeamList from "../Team/SearchTeamList";
import axios from "axios";

const filters: filters[] = [
  {
    id: "BE",
    name: "BE",
    options: [],
  },
  {
    id: "FE",
    name: "FE",
    options: [],
  },
  {
    id: "DEVOPS",
    name: "DevOps",
    options: [],
  },
  {
    id: "FOUR",
    name: "4차 산업 기술",
    options: [],
  },
  {
    id: "ETC",
    name: "기타",
    options: [],
  },
  {
    id: "GOODBADGE",
    name: "뱃지(개발예정)",
    options: [],
  },
];
interface Props {}

interface list {
  hashTagPK: number;
  hashTagName: string;
  hashTagProp: string;
  check: boolean;
}
interface filters {
  id: string;
  name: string;
  options: list[];
}
interface Props {
  projectCode: number;
}
function TeamSearchHashTag({ projectCode }: Props): ReactElement {
  const clonedeep = require("lodash.clonedeep");
  const [can, setCan] = useState<number[]>([]);
  const [searchList, setSearchList] = useState<number[]>([]);
  const [isTeamAsc, setIsTeamAsc] = useState<boolean>(true);
  const [isNameAsc, setIsNameAsc] = useState<boolean>(true);
  useEffect(() => {
    if (isTeamAsc) {
      sortTeamAsc();
    } else {
      sortTeamDesc();
    }
  }, [isTeamAsc]);
  const sortTeamDesc = () => {
    var list = searchList.sort(function (a: any, b: any) {
      if (a.enough > b.enough) {
        return 1;
      }
      if (a.enough < b.enough) {
        return -1;
      }
      return 0;
    });
    setSearchList([...list]);
  };
  const sortTeamAsc = () => {
    var list = searchList.sort(function (a: any, b: any) {
      if (a.enough < b.enough) {
        return 1;
      }
      if (a.enough > b.enough) {
        return -1;
      }
      return 0;
    });
    setSearchList([...list]);
  };
  // 이름 오름차순
  useEffect(() => {
    if (isNameAsc === true) {
      var list = searchList.sort(function (a: any, b: any) {
        if (a.teamDto.name > b.teamDto.name) {
          return 1;
        }
        if (a.teamDto.name < b.teamDto.name) {
          return -1;
        }
        return 0;
      });
      setSearchList([...list]);
    } else {
      var list = searchList.sort(function (a: any, b: any) {
        if (a.teamDto.name < b.teamDto.name) {
          return 1;
        }
        if (a.teamDto.name > b.teamDto.name) {
          return -1;
        }
        return 0;
      });
      setSearchList([...list]);
    }
  }, [isNameAsc]);
  const check = (option: any) => {
    // 추가하는부분
    if (option.check === false) {
      option.check = !option.check;
      setCan([...can, option.hashTagPK]);
    }
    // 빼는부분
    else if (option.check === true) {
      option.check = !option.check;
      const result = can.filter((value: any) => value != option.hashTagPK);
      setCan(result);
    }
  };
  // 검색
  const search = () => {
    // setSearchList(TeamDump);
    const token: string | null = localStorage.getItem("token");
    if (typeof token === "string") {
      axios
        .post(
          "/api/search/team",
          {
            projectCode: Number(projectCode),
            can: can,
          },
          { headers: { Authorization: token } }
        )
        .then((res: any) => {
          getIsFull(res.data.data);
          setSearchList([...res.data.data]);
        });
    }
  };
  const getIsFull = (res: any) => {
    res.map((value: any) => {
      axios
        .get(`/api/team/detail/${value.teamDto.teamPK}`)
        .then((res: any) => {
          if (res.data.data.teamuser.length >= 5) {
            value.enough = true;
          } else {
            value.enough = false;
          }
        })
        .catch((err) => alert(err));
    });
  };
  useEffect(() => {
    setSearchList([]);
  }, [projectCode]);
  const getHashTagList = () => {
    axios.get("/api/search/hashtag").then(function (res: any) {
      filters[0].options.push(...clonedeep(res.data.data.BE));
      filters[1].options.push(...clonedeep(res.data.data.FE));
      filters[2].options.push(...clonedeep(res.data.data.DEVOPS));
      filters[3].options.push(...clonedeep(res.data.data.FOUR));
      filters[4].options.push(...clonedeep(res.data.data.ETC));
      filters[5].options.push(...clonedeep(res.data.data.GOODBADGE));
      filters.map((value) => {
        value.options.map((val) => {
          val.check = false;
        });
      });
    });
  };
  const badge = (event: any) => {
    alert("클릭");
  };
  useEffect(() => {
    if (filters[0].options.length == 0) getHashTagList();
  }, []);
  return (
    <div className="bg-white">
      <div>
        <main className="w-full mx-auto">
          {/* <div className="relative z-10 flex items-baseline justify-between pt-5 pb-6 border-b border-gray-200">
            <div className="text-4xl font-extrabold tracking-tight text-gray-900">팀 검색</div>
          </div> */}
          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <div className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </div>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.hashTagPK + section.name + optionIdx}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.hashTagPK}
                                  type="checkbox"
                                  defaultChecked={option.check}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  onClick={() => check(option)}
                                  disabled={section.id === "GOODBADGE"}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.hashTagName}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <button
                  type="button"
                  className=" px-8 py-2 bg-blue-600 text-white rounded-lg  shadow-sm hover:bg-blue-500 focus:ring-2 focus:ring-indigo-200 m-2 "
                  onClick={search}
                >
                  검색
                </button>
              </form>
              <div className="lg:col-span-3">
                <div className="">
                  <div className="font-bold text-lg mb-4">검색 결과</div>
                  <SearchTeamList
                    list={searchList}
                    projectCode={projectCode}
                    setIsNameAsc={setIsNameAsc}
                    isNameAsc={isNameAsc}
                    isTeamAsc={isTeamAsc}
                    setIsTeamAsc={setIsTeamAsc}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TeamSearchHashTag;
