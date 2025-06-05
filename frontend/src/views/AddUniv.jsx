import { useState } from "react";
import CardLayout from "../components/layouts/CardLayout";
import WideBtn from "../components/ui/WideBtn";
import MainLayout from "../components/layouts/MainLayout";
import ItemBadge from "../components/ui/ItemBadge";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";
import OutlineItemBadge from "../components/ui/OutlineItemBadge";
import DeleteSquareBtn from "../components/ui/DeleteSquareBtn";
import { LOCATION } from "../constants";

const FIELDTYPE = {
  UNIV: "univName",
  DEPARTMENT: "department",
  LOCATION: "location",
  TEACHER: "teacherCertification",
  REGULAR: "regular",
  EARLY: "early",
};

const SUBJECTS = [
  { value: "korean", label: "국어" },
  { value: "english", label: "영어" },
  { value: "math", label: "수학" },
  { value: "exploration", label: "탐구" },
];

export default function AddUniv() {
  const [admission, setAdmission] = useState({
    univName: "",
    department: "",
    teacherCertification: "possible",
    location: "seoul",
    admissionType: {
      early: [
        // {
        //   type: "",
        //   minimumCsatGrades: {
        //     value: false,
        //     subjects: [],
        //     subjectCount: 0,
        //     maxGradeSum: null,
        //     koreanHistory: { value: false },
        //   },
        //   recruitCount: "",
        //   academicGrades: {
        //     total: "",
        //     yearRatio: {
        //       grade1: "",
        //       grade2: "",
        //       grade3: "",
        //     },
        //   },
        //   practical: "",
        //   etc: "",
        //   note: "",
        // },
      ],
      regular: [
        // {
        //   type: "",
        //   recruitCount: "",
        //   csat: "",
        //   practical: "",
        //   etc: "",
        //   note: "",
        // },
      ],
    },
    events: [
      {
        eventName: "",
        scoreTable: [{ points: "", male: "", female: "" }],
      },
    ],
  });

  const handleFieldChange = (fieldType, value) => {
    setAdmission((prev) => ({ ...prev, [fieldType]: value }));
  };

  const handleAddAdmissionType = (fieldType) => {
    const earlyType = {
      type: "",
      minimumCsatGrades: {
        value: false,
        subjects: [],
        subjectCount: 0,
        maxGradeSum: null,
        koreanHistory: { value: false, grade: null },
      },
      recruitCount: "",
      academicGrades: "",
      practical: "",
      etc: "",
    };
    const regularType = {
      type: "",
      recruitCount: "",
      academicGrades: "",
      practical: "",
      etc: "",
    };

    setAdmission((prev) => {
      const updateAdmissionType = {
        ...prev.admissionType,
        [fieldType]: [
          ...prev.admissionType[fieldType],
          fieldType == FIELDTYPE.EARLY ? earlyType : regularType,
        ],
      };

      return { ...prev, admissionType: updateAdmissionType };
    });
  };

  const handleAddScoreStandard = (eventIndex) => {
    const newScore = { points: "", male: "", female: "" };
    setAdmission((prev) => {
      const updateEvent = [...prev.events];
      updateEvent[eventIndex] = {
        ...updateEvent[eventIndex],
        scoreTable: [...updateEvent[eventIndex].scoreTable, newScore],
      };
      return { ...prev, events: updateEvent };
    });
  };

  const handleAddEvent = () => {
    const newEvent = {
      eventName: "",
      scoreTable: [{ points: "", male: "", female: "" }],
    };
    setAdmission((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
  };

  // 전형 식제
  const handleDeleteAdmission = (type, admissionIndex) => {
    if (window.confirm("이 전형을 삭제할까요?")) {
      setAdmission((prev) => ({
        ...prev,
        admissionType: {
          ...prev.admissionType,
          [type]: [
            ...prev.admissionType[type].filter(
              (_, index) => index !== admissionIndex
            ),
          ],
        },
      }));
    } else {
      return;
    }
  };

  // 수능최저등급 유무
  const handleMinimumGradeRadioChange = (eventValue, index, type) => {
    const value = eventValue === "true";

    setAdmission((prev) => {
      const updatedAdmission = {
        ...prev,
        admissionType: {
          ...prev.admissionType,
          [type]: prev.admissionType[type].map((item, idx) => {
            if (idx !== index) return item;

            return {
              ...item,
              minimumCsatGrades: {
                ...item.minimumCsatGrades,
                value,
                subjects: value ? item.minimumCsatGrades.subjects : [],
                subjectCount: value ? item.minimumCsatGrades.subjectCount : 0,
                maxGradeSum: value ? item.minimumCsatGrades.maxGradeSum : null,
              },
            };
          }),
        },
      };

      return updatedAdmission;
    });
  };

  // 최저등급 포함 과목
  const handleSubjectsCheckboxChange = (event, index, type) => {
    const { value, checked } = event.target;

    setAdmission((prev) => {
      const updatedSubjects = checked
        ? [...prev.admissionType[type][index].minimumCsatGrades.subjects, value]
        : prev.admissionType[type][index].minimumCsatGrades.subjects.filter(
            (subject) => subject !== value
          );

      const updatedAdmission = {
        ...prev,
        admissionType: {
          ...prev.admissionType,
          [type]: prev.admissionType[type].map((item, idx) =>
            idx === index
              ? {
                  ...item,
                  minimumCsatGrades: {
                    ...item.minimumCsatGrades,
                    subjects: updatedSubjects,
                  },
                }
              : item
          ),
        },
      };

      return updatedAdmission;
    });
  };

  /// 한국사 반영 여부
  const handleKoreanHistoryRadioChange = (eventValue, index, type) => {
    const value = eventValue === "true";

    setAdmission((prev) => {
      const updated = { ...prev };
      const koreanHistory =
        updated.admissionType[type][index].minimumCsatGrades.koreanHistory;

      updated.admissionType[type][index].minimumCsatGrades.koreanHistory = {
        value: value,
        grade: value ? koreanHistory.grade : null,
      };

      return updated;
    });
  };

  const handleKoreanHistoryGradeChange = (eventValue, index, type) => {
    setAdmission((prev) => {
      const updated = { ...prev };
      updated.admissionType[type][index].minimumCsatGrades.koreanHistory.grade =
        eventValue;
      return updated;
    });
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"입시정보 추가"} />
        <div className="flex">
          <button className="btn btn-sm btn-outline btn-info ml-auto">
            저장
          </button>
        </div>
      </div>

      {/* 대학 정보 */}
      <CardLayout>
        <CardTitle textValue={"기본 정보"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">
              학교명{" "}
              <input
                onChange={(e) =>
                  handleFieldChange(FIELDTYPE.UNIV, e.target.value)
                }
                placeholder="학교명"
                type="text"
                className="input h-8 placeholder:text-sm px-2 py-1 mt-1 outline-none
              focus:border-blue-400 w-full"
              />
            </label>
          </div>
          <div>
            <label className="text-sm">
              학과명{" "}
              <input
                onChange={(e) =>
                  handleFieldChange(FIELDTYPE.DEPARTMENT, e.target.value)
                }
                placeholder="학과명"
                type="text"
                className="input h-8  placeholder:text-sm px-2 py-1 mt-1 outline-none
                focus:border-blue-400 w-full"
              />
            </label>
          </div>
          <div>
            <h4 className="text-sm text-neutral-700">소재지</h4>
            <select
              onChange={(e) =>
                handleFieldChange(FIELDTYPE.LOCATION, e.target.value)
              }
              defaultValue="seoul"
              className="select mt-1 px-2 py-1 h-8 w-full outline-none focus:border-blue-400"
            >
              {LOCATION.map(({ location, value }) => (
                <option key={value} value={value}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h4 className="text-sm text-neutral-700">교직이수여부</h4>
            <select
              onChange={(e) =>
                handleFieldChange(FIELDTYPE.TEACHER, e.target.value)
              }
              defaultValue={"possible"}
              className="select mt-1 px-2 py-1 h-8 w-full outline-none focus:border-blue-400"
            >
              <option value={"possible"}>가능</option>
              <option value={"conditionally"}>조건부가능</option>
              <option value={"impossible"}>불가능</option>
            </select>
          </div>
        </div>
      </CardLayout>

      {/* 정시 전형 */}
      <CardLayout>
        <CardTitle textValue={"정시 전형"} />
        <ul className="divide-y divide-stone-200">
          {admission.admissionType.regular.map((_, index) => (
            <li className="py-8" key={index}>
              <div className="flex justify-end">
                <DeleteSquareBtn
                  deleteFunc={() => handleDeleteAdmission("regular", index)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <ItemBadge textValue={"전형명"} />
                  <input
                    type="text"
                    placeholder="전형명"
                    className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                  />
                </div>
                <div>
                  <ItemBadge textValue={"모집 인원(명)"} />
                  <input
                    type="text"
                    placeholder="모집인원수"
                    className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                  />
                </div>
              </div>
              <div className="px-6">
                <div className="flex items-center">
                  <OutlineItemBadge textValue={"반영비율"} />
                  <div className="divider w-full px-4"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <label className="text-sm">
                    학생부교과(%)
                    <input
                      type="text"
                      placeholder="내신 비율"
                      className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                    />
                  </label>
                  <label className="text-sm">
                    실기(%)
                    <input
                      type="text"
                      placeholder="실기 비율"
                      className="input h-8  placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                    />
                  </label>
                  <label className="text-sm">
                    기타(%)
                    <input
                      type="text"
                      placeholder="기타 비율"
                      className="input h-8  placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                    />
                  </label>
                </div>
                <div>
                  <label className="text-sm">
                    비고
                    <textarea
                      type="text"
                      className="textarea h-24 resize-none placeholder:text-sm p-2 outline-none focus:border-blue-400 w-full"
                    />
                  </label>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <WideBtn
          onClickFunc={() => handleAddAdmissionType(FIELDTYPE.REGULAR)}
          textValue={"+ 새 전형 추가"}
        />
      </CardLayout>

      {/* 수시 전형 */}
      <CardLayout>
        <CardTitle textValue={"수시 전형"} />
        <ul className="divide-y divide-stone-200">
          {admission.admissionType.early.map((type, index) => (
            <li key={index} className="py-8">
              <div className="flex justify-end">
                <DeleteSquareBtn
                  deleteFunc={() => handleDeleteAdmission("early", index)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <ItemBadge textValue={"전형명"} />
                    <input
                      type="text"
                      placeholder="전형명"
                      className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                    />
                  </div>
                  <div>
                    <ItemBadge textValue={"모집 인원(명)"} />
                    <input
                      type="text"
                      placeholder="모집인원수"
                      className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                    />
                  </div>
                </div>

                <div className="text-sm">
                  <ItemBadge textValue={"수능 최저 등급"} />
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`minimumGrade-${index}`}
                        value="false"
                        checked={type.minimumCsatGrades.value === false}
                        onChange={(e) =>
                          handleMinimumGradeRadioChange(
                            e.target.value,
                            index,
                            "early"
                          )
                        }
                        className="radio radio-xs"
                      />
                      <span>없음</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`minimumGrade-${index}`}
                        value="true"
                        checked={type.minimumCsatGrades.value === true}
                        onChange={(e) =>
                          handleMinimumGradeRadioChange(
                            e.target.value,
                            index,
                            "early"
                          )
                        }
                        className="radio radio-xs"
                      />
                      <span>있음</span>
                    </label>
                  </div>
                  {type.minimumCsatGrades.value && (
                    <div>
                      <span className="text-neutral-600">포함과목</span>
                      <div className="flex flex-col gap-2">
                        <div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {SUBJECTS.map((subject) => (
                              <label
                                key={subject.value}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  value={subject.value}
                                  checked={type.minimumCsatGrades.subjects.includes(
                                    subject.value
                                  )}
                                  onChange={(e) =>
                                    handleSubjectsCheckboxChange(
                                      e,
                                      index,
                                      "early"
                                    )
                                  }
                                  className="checkbox checkbox-xs"
                                />
                                <span>{subject.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-neutral-600">
                            과목개수
                            <select className="select h-8 text-black w-full">
                              {[1, 2, 3, 4].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <label className="text-neutral-600">
                          등급합
                          <select className="select h-8 text-black w-full">
                            {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <option key={num} value={num}>
                                {num} 이내
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <ItemBadge textValue="한국사" />
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name={`koreanHistory-${index}`}
                        value="false"
                        checked={
                          type.minimumCsatGrades.koreanHistory.value === false
                        }
                        onChange={(e) =>
                          handleKoreanHistoryRadioChange(
                            e.target.value,
                            index,
                            "early"
                          )
                        }
                        className="radio radio-xs"
                      />
                      <span>미반영</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name={`koreanHistory-${index}`}
                        value="true"
                        checked={
                          type.minimumCsatGrades.koreanHistory.value === true
                        }
                        onChange={(e) =>
                          handleKoreanHistoryRadioChange(
                            e.target.value,
                            index,
                            "early"
                          )
                        }
                        className="radio radio-xs"
                      />
                      <span>반영</span>
                    </label>
                  </div>

                  {type.minimumCsatGrades.koreanHistory.value && (
                    <div>
                      <label className="text-neutral-600">
                        등급 기준
                        <select
                          className="select h-8 mt-1 w-full text-black"
                          value={
                            type.minimumCsatGrades.koreanHistory.grade || ""
                          }
                          onChange={(e) =>
                            handleKoreanHistoryGradeChange(
                              e.target.value,
                              index,
                              "early"
                            )
                          }
                        >
                          {[1, 2, 3, 4, 5].map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}등급 이내
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-6">
                <div className="flex items-center">
                  <OutlineItemBadge textValue={"반영비율"} />
                  <div className="divider w-full px-4"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm">
                      학생부교과(%)
                      <input
                        type="text"
                        placeholder="내신 비율"
                        className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                      />
                    </label>
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
                          <td className="px-1">
                            <input type="text" className="input h-8" />
                          </td>
                          <td className="px-1">
                            {" "}
                            <input type="text" className="input h-8" />
                          </td>
                          <td className="px-1">
                            {" "}
                            <input type="text" className="input h-8" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <label className="text-sm">
                    실기(%)
                    <input
                      type="text"
                      placeholder="실기 비율"
                      className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                    />
                  </label>
                  <label className="text-sm">
                    기타(%)
                    <input
                      type="text"
                      placeholder="기타 비율"
                      className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                    />
                  </label>
                </div>
                <div>
                  <label className="text-sm">
                    비고
                    <textarea
                      type="text"
                      className="textarea h-24 resize-none placeholder:text-sm p-2 outline-none focus:border-blue-400 w-full"
                    />
                  </label>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <WideBtn
          onClickFunc={() => handleAddAdmissionType(FIELDTYPE.EARLY)}
          textValue={"+ 새 전형 추가"}
        />
      </CardLayout>

      {/* 실기 배점표 */}
      <CardLayout>
        <CardTitle textValue={"실기 배점표"} />
        <ul className="divide-y divide-sky-700">
          {admission.events.map((event, eventIndex) => (
            <li key={eventIndex} className="py-8">
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm">
                      {" "}
                      종목명
                      <input
                        className="input h-8 mb-4 placeholder:text-sm p-2 outline-none focus:border-blue-400 w-full"
                        type="text"
                        placeholder="종목명"
                        onChange={() => {
                          return;
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    <ItemBadge textValue={"단위"} />
                    <select
                      onChange={() => {}}
                      defaultValue={event.unit}
                      className="select h-8 px-2 py-1 w-full cursor-pointer outline-none focus:border-blue-400"
                    >
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="seconds">초</option>
                      <option value="counts">회</option>
                    </select>
                  </div>
                </div>
                <div className="px-6">
                  <div className="flex items-center">
                    <OutlineItemBadge textValue={"배점 기준"} />
                    <div className="divider w-full px-4"></div>
                    <button
                      onClick={() => {
                        handleAddScoreStandard(eventIndex);
                      }}
                      className="btn btn-sm"
                    >
                      배점 추가
                    </button>
                  </div>
                  <table className="table text-sm">
                    <thead className="bg-indigo-50">
                      <tr className="text-center">
                        <th className="w-[20%] py-1 px-1">배점</th>
                        <th className="py-1 px-2">남자</th>
                        <th className="py-1 px-2">여자</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.scoreTable.map((score, scoreIndex) => (
                        <tr key={scoreIndex}>
                          <td className="py-1 px-1">
                            <input
                              className="input h-8 placeholder:text-sm p-2 outline-none focus:border-blue-400 w-full"
                              type="text"
                              placeholder="배점"
                              onChange={() => {
                                return;
                              }}
                            />
                          </td>
                          <td className="py-1 px-2">
                            <input
                              className="input h-8 placeholder:text-sm p-2 outline-none focus:border-blue-400 w-full"
                              type="text"
                              placeholder="남자기록"
                              onChange={() => {
                                return;
                              }}
                            />
                          </td>
                          <td className="py-1 px-2">
                            <input
                              className="input h-8 placeholder:text-sm p-2 outline-none focus:border-blue-400 w-full"
                              type="text"
                              placeholder="여자기록"
                              onChange={() => {
                                return;
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <WideBtn
          onClickFunc={() => handleAddEvent()}
          textValue={"+ 새 종목 추가"}
        />
      </CardLayout>
    </MainLayout>
  );
}
