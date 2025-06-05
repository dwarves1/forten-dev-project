import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import mockData from "../mockUnivData";
import MainLayout from "../components/layouts/MainLayout";
import ItemBadge from "../components/ui/ItemBadge";
import CardLayout from "../components/layouts/CardLayout";
import { LOCATION_MAP } from "../constants";
import CardTitle from "../components/ui/CardTitle";

const SUBJECTS = {
  korean: "국어",
  english: "영어",
  math: "수학",
  exploration: "탐구",
};

const UNIT = { cm: "cm", m: "m", seconds: "초", counts: "회" };

export default function UniversityDetail() {
  const { univId } = useParams(); // URL에서 대학 ID 가져오기
  const navigate = useNavigate();

  // 선택 대학
  const univ = mockData.filter((data) => data.id === univId)[0];

  // 수시, 정시 타입
  const [selectedAdmissionType, setSelectedAdmissionType] = useState("early");

  // 선택된 종목
  const [selectedEvent, setSelectedEvent] = useState(univ.events[0].eventName);

  const handleSelectAdmissionType = (typeName) => {
    setSelectedAdmissionType(typeName);
  };

  const handleSelectEvent = (eventName) => {
    setSelectedEvent(eventName);
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="ml-auto btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
        >
          목록
        </button>
      </div>

      {/* 대학 기본 정보 */}
      <div className="card bg-white shadow-lg p-6 mb-6">
        <CardTitle textValue={"대학 기본 정보"} />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-neutral-400">대학명</p>
            <p>{univ.univName}</p>
          </div>
          <div>
            <p className="text-neutral-400">학과</p>
            <p>{univ.department}</p>
          </div>
          <div>
            <p className="text-neutral-400">교직이수</p>
            <p>{univ.teacherCertification ? "가능" : "불가능"}</p>
          </div>
          <div>
            <p className="text-neutral-400">소재지</p>
            <p>{LOCATION_MAP[univ.location]}</p>
          </div>
        </div>
      </div>

      {/* 수시/정시 선택 */}
      <div role="tablist" className="tabs tabs-lift w-full">
        <div
          role="tab"
          className={`flex-1 tab ${
            selectedAdmissionType == "early"
              ? "tab-active text-pink-500 hover:text-pink-500"
              : "null"
          } font-bold`}
          onClick={() => handleSelectAdmissionType("early")}
        >
          수시
        </div>
        <div
          role="tab"
          className={`flex-1 tab ${
            selectedAdmissionType == "regular"
              ? "tab-active text-pink-500 hover:text-pink-500"
              : "null"
          } font-bold`}
          onClick={() => handleSelectAdmissionType("regular")}
        >
          정시
        </div>
      </div>

      {/* 전형 소개 */}
      <CardLayout>
        <CardTitle
          textValue={`${
            selectedAdmissionType == "early" ? "수시" : "정시"
          } 전형`}
        />
        <ul className="divide-y divide-sky-700">
          {univ.admissionType[selectedAdmissionType].map((type, index) => (
            <li className="py-8 px-2" key={index}>
              <div className="grid grid-cols-2 sm:grid-cols-3 mb-4">
                <div>
                  <ItemBadge textValue={"전형명"} />
                  <p className="pl-1 pt-1 text-sm">{type.type}</p>
                </div>
                {type.minimumCsatGrades && (
                  <div className="text-sm">
                    <ItemBadge textValue={"수능 최저 등급"} />
                    <div className="pl-1 pt-1">
                      {type.minimumCsatGrades.value ? (
                        <div>
                          <div>
                            {type.minimumCsatGrades.subjects.map(
                              (subject, index) => (
                                <span key={subject}>
                                  {SUBJECTS[subject]}
                                  {index !==
                                    type.minimumCsatGrades.subjects.length -
                                      1 && ", "}
                                </span>
                              )
                            )}
                            <span>
                              중 {type.minimumCsatGrades.subjectCount}과목 합{" "}
                            </span>
                            <span>
                              {type.minimumCsatGrades.maxGradeSum} 이내
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>없음</div>
                      )}
                      {type.minimumCsatGrades.koreanHistory.value && (
                        <span>
                          한국사 {type.minimumCsatGrades.koreanHistory.grade}
                          등급 이내
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <div>
                  <ItemBadge textValue={"모집  인원(명)"} />
                  <p className="pl-1 pt-1 text-sm">{type.recruitCount}</p>
                </div>
              </div>
              <ItemBadge textValue={"반영비율"} />
              <div className="grid grid-cols-3 bg-sky-50 p-1 pt-1 mt-1 mb-4 text-sm">
                <div>
                  <p className="border-b border-neutral-300 text-nowrap text-neutral-500">
                    {selectedAdmissionType == "early"
                      ? "학생부교과(%)"
                      : "수능(%)"}
                  </p>
                  {selectedAdmissionType == "early" ? (
                    <div className="mr-1">
                      <p>{type.academicGrades.total}</p>
                      <table className="table table-xs w-full bg-white mt-1">
                        <thead>
                          <tr className="text-xs text-center">
                            <th className="font-normal">1학년</th>
                            <th className="font-normal">2학년</th>
                            <th className="font-normal">3학년</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-center">
                            <td>{type.academicGrades.yearRatio.grade1}</td>
                            <td>{type.academicGrades.yearRatio.grade2}</td>
                            <td>{type.academicGrades.yearRatio.grade3}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
                <div>
                  <p className="border-b border-neutral-300 text-neutral-500">
                    실기(%)
                  </p>
                  <p className="pl-1 pt-1">{type.practical}</p>
                </div>
                <div>
                  <p className="border-b border-neutral-300 text-neutral-500">
                    기타(%)
                  </p>
                  <p className="pl-1 pt-1">{type.etc}</p>
                </div>
              </div>
              {type.note && (
                <div>
                  <ItemBadge textValue={"비고"} />
                  <p className="pl-1 pt-1 whitespace-pre-wrap text-sm">
                    {type.note}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardLayout>

      {/* 실기 배점표 */}
      <div className="card bg-white shadow-lg p-6 mb-6">
        <CardTitle textValue={"실기 배점표"} />
        <div className="py-2 flex overflow-x-scroll">
          {univ.events.map((event) => (
            <button
              onClick={() => handleSelectEvent(event.eventName)}
              key={event.eventName}
              className={`btn btn-sm mr-2 ${
                selectedEvent == event.eventName
                  ? "bg-sky-400 text-white"
                  : "null"
              }`}
            >
              {`${event.eventName}(${UNIT[event.unit]})`}
            </button>
          ))}
        </div>
        <div className="px-2">
          <table className="table w-full mt-4 text-center">
            <thead className="text-sm text-neutral-600 bg-indigo-50">
              <tr className="text-xs sm:text-sm">
                <th scope="col" className="px-4 py-2 w-[20%]">
                  배점
                </th>
                <th scope="col" className="tpx-4 py-2">
                  남자
                </th>
                <th scope="col" className="px-4 py-2">
                  여자
                </th>
              </tr>
            </thead>
            <tbody>
              {univ.events
                .find((event) => event.eventName === selectedEvent)
                ?.scoreTable.map((score, index) => (
                  <tr
                    key={index}
                    className="text-center border-b border-stone-200 text-sm"
                  >
                    <th
                      scope="row"
                      className="px-4 py-2 text-xs sm:text-sm text-neutral-800 bg-green-50"
                    >
                      {score.points}
                    </th>
                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                      {score.male}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                      {score.female}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
