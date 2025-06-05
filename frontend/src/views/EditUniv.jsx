import { useParams } from "react-router-dom";
import { useState } from "react";
import DeleteSquareBtn from "../components/ui/DeleteSquareBtn";
import MainLayout from "../components/layouts/MainLayout";
import ItemBadge from "../components/ui/ItemBadge";
import mockUnivData from "../mockUnivData";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";
import OutlineItemBadge from "../components/ui/OutlineItemBadge";
import { LOCATION } from "../constants";

const TEACHER_CERTIFICATION_TYPE = {
  possible: { text: "가능", color: "bg-green-200" },
  impossible: { text: "불가능", color: "bg-red-200" },
  conditionally: { text: "조건부가능", color: "bg-orange-200" },
};

const SUBJECTS = [
  { value: "korean", label: "국어" },
  { value: "english", label: "영어" },
  { value: "math", label: "수학" },
  { value: "exploration", label: "탐구" },
];

const UNIT = { cm: "cm", m: "m", seconds: "초", counts: "회" };

export default function EditUniv() {
  const { univId } = useParams();

  // 예제 대학 정보 (API 연동 필요)
  const [univ, setUniv] = useState(
    mockUnivData.filter((data) => data.id === univId)[0]
  );

  const [editMode, setEditMode] = useState(false);

  // 입시 정보 수정
  const handleEditMode = () => {
    if (editMode) {
      window.alert("저장되었습니다");
    }
    setEditMode(!editMode);
  };

  // 입시 정보 수정 취소
  const handleCancelBtn = () => {
    setEditMode(false);
    setUniv(mockUnivData.filter((data) => data.id === univId)[0]);
  };

  // 전형 추가
  const handleAddAdmission = (type) => {
    const newType =
      type === "early"
        ? {
            type: "",
            minimumCsatGrades: "",
            recruitCount: "",
            academicGrades: {
              total: "",
              yearRatio: {
                grade1: "",
                grade2: "",
                grade3: "",
              },
            },
            practical: "",
            etc: "",
            note: "",
          }
        : {
            type: "",
            recruitCount: "",
            academicGrades: "",
            practical: "",
            etc: "",
            note: "",
          };

    setUniv((prev) => ({
      ...prev,
      admissionType: {
        ...prev.admissionType,
        [type]: [...prev.admissionType[type], newType],
      },
    }));
  };

  // 전형 식제
  const handleDeleteAdmission = (type, admissionIndex) => {
    if (window.confirm("이 전형을 삭제할까요?")) {
      setUniv((prev) => ({
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

  // 실기 배점표 배점기준 추가
  const handleAddScoreStandard = (eventIndex) => {
    const newScore = { points: "", male: "", female: "" };

    setUniv((prev) => ({
      ...prev,
      events: prev.events.map((event, index) =>
        index === eventIndex
          ? { ...event, scoreTable: [...event.scoreTable, newScore] }
          : event
      ),
    }));
  };

  // 실기 종목 추가
  const handleAddEvent = () => {
    const newEvent = {
      eventName: "",
      unit: "cm",
      scoreTable: [{ points: "", male: "", female: "" }],
    };

    setUniv((prev) => ({ ...prev, events: [...prev.events, newEvent] }));
  };

  // 대학 정보 onchange
  const handleUnivInfoChange = (value, type) => {
    setUniv((prev) => ({ ...prev, [type]: value }));
  };

  // 전형 input onchange
  const handleAdmissionChange = (value, admissionType, index, field) => {
    setUniv((prev) => ({
      ...prev,
      admissionType: {
        ...prev.admissionType,
        [admissionType]: prev.admissionType[admissionType].map((element, idx) =>
          idx === index ? { ...element, [field]: value } : element
        ),
      },
    }));
  };

  // 내신 비율 핸들러
  const handleAcademicGradesTotalChange = (value, index, admissionType) => {
    setUniv((prev) => ({
      ...prev,
      admissionType: {
        ...prev.admissionType,
        [admissionType]: prev.admissionType[admissionType].map((element, idx) =>
          idx === index
            ? {
                ...element,
                academicGrades: {
                  ...element.academicGrades,
                  total: value,
                },
              }
            : element
        ),
      },
    }));
  };

  // 내신반영비율 input
  const handleAcademicGradeRatioChange = (value, gradeKey, index) => {
    setUniv((prev) => ({
      ...prev,
      admissionType: {
        ...prev.admissionType,
        early: prev.admissionType.early.map((element, idx) =>
          idx === index
            ? {
                ...element,
                academicGrades: {
                  ...element.academicGrades,
                  yearRatio: {
                    ...element.academicGrades.yearRatio,
                    [gradeKey]: value,
                  },
                },
              }
            : element
        ),
      },
    }));
  };

  // 수능최저등급 유무
  const handleMinimumGradeRadioChange = (value, index, type) => {
    setUniv((prev) => {
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

    setUniv((prev) => {
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

    setUniv((prev) => {
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

  // 한국사 등급
  const handleKoreanHistoryGradeChange = (eventValue, index, type) => {
    setUniv((prev) => {
      const updated = { ...prev };
      updated.admissionType[type][index].minimumCsatGrades.koreanHistory.grade =
        eventValue;
      return updated;
    });
  };

  // 종목명 onchange
  const handleEventChange = (value, eventIndex) => {
    setUniv((prev) => ({
      ...prev,
      events: prev.events.map((event, index) =>
        index === eventIndex ? { ...event, eventName: value } : event
      ),
    }));
  };

  // 배점표 onchange
  const handleScoreTableChange = (value, eventIndex, scoreIndex, field) => {
    setUniv((prev) => ({
      ...prev,
      events: prev.events.map((event, index) =>
        index === eventIndex
          ? {
              ...event,
              scoreTable: event.scoreTable.map((score, idx) =>
                idx === scoreIndex ? { ...score, [field]: value } : score
              ),
            }
          : event
      ),
    }));
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"입시 정보 상세"} />
        <div className="flex">
          {editMode && (
            <button
              className="btn btn-sm btn-outline"
              onClick={handleCancelBtn}
            >
              취소
            </button>
          )}
          <button
            onClick={handleEditMode}
            className="btn btn-sm btn-outline btn-info ml-2"
          >
            {editMode ? "저장" : "수정"}
          </button>
        </div>
      </div>

      {/* 대학 정보 */}
      <div className="card bg-white shadow-lg p-6 mb-4">
        <CardTitle textValue={"기본 정보"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-500">
              학교명{" "}
              <input
                onChange={(e) =>
                  handleUnivInfoChange(e.target.value, "univName")
                }
                placeholder="학교명"
                type="text"
                value={univ.univName}
                className={`h-8 px-2 py-1 text-black p-2 outline-none w-full ${
                  editMode ? "input focus:border-blue-400 mt-1" : "border-white"
                }`}
                disabled={!editMode}
              />
            </label>
          </div>
          <div>
            <label className="text-sm text-neutral-500">
              학과명{" "}
              <input
                onChange={(e) =>
                  handleUnivInfoChange(e.target.value, "department")
                }
                placeholder="학과명"
                type="text"
                value={univ.department}
                className={`h-8 px-2 py-1 text-black p-2 outline-none w-full ${
                  editMode ? "input focus:border-blue-400 mt-1" : "border-white"
                }`}
                disabled={!editMode}
              />
            </label>
          </div>
          <div>
            <h4 className="text-sm text-neutral-500">소재지</h4>
            {editMode ? (
              <select
                onChange={(e) =>
                  handleUnivInfoChange(e.target.value, "location")
                }
                defaultValue={univ.location}
                className="select h-8 px-2 py-1 w-full cursor-pointer outline-none focus:border-blue-400"
              >
                {LOCATION.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.location}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={
                  LOCATION.find((loc) => loc.value === univ.location)
                    ?.location || ""
                }
                className="px-2 py-1 text-sm text-black outline-none w-full border border-white"
                disabled
              />
            )}
          </div>
          <div>
            <h4 className="text-sm text-neutral-500">교직이수여부</h4>
            {editMode ? (
              <select
                onChange={(e) =>
                  handleUnivInfoChange(e.target.value, "teacherCertification")
                }
                defaultValue={univ.teacherCertification}
                className="select h-8 px-2 py-1 w-full cursor-pointer outline-none focus:border-blue-400"
              >
                <option
                  className="hover:bg-yellow-500 hover:text-green"
                  value={"possible"}
                >
                  가능
                </option>
                <option value={"conditionally"}>조건부가능</option>
                <option value={"impossible"}>불가능</option>
              </select>
            ) : (
              <input
                placeholder="학과명"
                type="text"
                value={
                  TEACHER_CERTIFICATION_TYPE[univ.teacherCertification].text
                }
                className="px-2 py-1 text-sm outline-none w-full border border-white"
                disabled
              />
            )}
          </div>
        </div>
      </div>

      {/* 정시 전형 */}
      <div className="card bg-white shadow-lg p-6 mb-4">
        <CardTitle textValue={"정시 전형"} />
        {univ.admissionType.regular.length > 0 && (
          <ul className="divide-y divide-sky-700">
            {univ.admissionType.regular.map((element, index) => (
              <li className="py-8" key={index}>
                {editMode && (
                  <div className="flex justify-end">
                    <DeleteSquareBtn
                      deleteFunc={() => handleDeleteAdmission("regular", index)}
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <label className="text-sm">
                    전형명
                    <input
                      type="text"
                      placeholder="전형명"
                      value={element.type}
                      onChange={(e) => {
                        handleAdmissionChange(
                          e.target.value,
                          "regular",
                          index,
                          "type"
                        );
                      }}
                      className={`px-2 py-1 h-8 outline-none w-full ${
                        editMode
                          ? "input focus:border-blue-400 mt-1"
                          : "border-white"
                      }`}
                      disabled={!editMode}
                    />
                  </label>
                  {univ.minimumCsatGrades && (
                    <label className="text-sm">
                      수능 최저 등급
                      <input
                        type="text"
                        placeholder="최저 등급"
                        value={element.minimumCsatGrades}
                        onChange={(e) => {
                          handleAdmissionChange(
                            e.target.value,
                            "regular",
                            index,
                            "minimumCsatGrades"
                          );
                        }}
                        className={`px-2 py-1 h-8 outline-none w-full ${
                          editMode
                            ? "input focus:border-blue-400 mt-1"
                            : "border-white"
                        }`}
                        disabled={!editMode}
                      />
                    </label>
                  )}
                  <label className="text-sm">
                    모집 인원(명)
                    <input
                      onChange={(e) => {
                        handleAdmissionChange(
                          e.target.value,
                          "regular",
                          index,
                          "recruitCount"
                        );
                      }}
                      type="text"
                      placeholder="모집인원수"
                      value={element.recruitCount}
                      className={`px-2 py-1 h-8 outline-none w-full ${
                        editMode ? "input focus:border-blue-400 mt-1" : ""
                      }`}
                      disabled={!editMode}
                    />
                  </label>
                </div>
                <div className="px-6">
                  <div className="flex items-center">
                    <OutlineItemBadge textValue={"반영비율"} />
                    <div className="divider w-full px-4"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <label className="text-sm">
                      수능(%)
                      <input
                        onChange={(e) => {
                          handleAdmissionChange(
                            e.target.value,
                            "regular",
                            index,
                            "csat"
                          );
                        }}
                        type="text"
                        placeholder="내신 비율"
                        value={element.csat}
                        className={`px-2 py-1 h-8 w-full ${
                          editMode ? "input focus:border-blue-400 mt-1" : ""
                        }`}
                        disabled={!editMode}
                      />
                    </label>
                    <label className="text-sm">
                      실기(%)
                      <input
                        onChange={(e) => {
                          handleAdmissionChange(
                            e.target.value,
                            "regular",
                            index,
                            "practical"
                          );
                        }}
                        type="text"
                        placeholder="실기 비율"
                        value={element.practical}
                        className={`px-2 py-1 h-8 outline-none w-full ${
                          editMode ? "input focus:border-blue-400 mt-1" : ""
                        }`}
                        disabled={!editMode}
                      />
                    </label>
                    <label className="text-sm">
                      기타(%)
                      <input
                        onChange={(e) => {
                          handleAdmissionChange(
                            e.target.value,
                            "regular",
                            index,
                            "etc"
                          );
                        }}
                        type="text"
                        placeholder="기타 비율"
                        value={element.etc}
                        className={`px-2 py-1 h-8 outline-none w-full ${
                          editMode ? "input focus:border-blue-400 mt-1" : ""
                        }`}
                        disabled={!editMode}
                      />
                    </label>
                  </div>
                  <div>
                    {editMode ? (
                      <label>
                        비고
                        <textarea
                          onChange={(e) => {
                            handleAdmissionChange(
                              e.target.value,
                              "regular",
                              index,
                              "note"
                            );
                          }}
                          type="text"
                          value={element.note}
                          className="textarea h-28 resize-none placeholder:text-sm p-2 border outline-none w-full focus:border-blue-400"
                        />
                      </label>
                    ) : (
                      <>
                        <span>비고</span>
                        <p className="mt-1">{element.note}</p>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {editMode && (
          <button
            onClick={() => handleAddAdmission("regular")}
            className="btn btn-outline mt-4"
          >
            + 새 전형 추가
          </button>
        )}
      </div>

      {/* 수시 전형 */}
      <div className="card bg-white shadow-lg p-6 mb-4">
        <CardTitle textValue={"수시 전형"} />
        <ul className="divide-y divide-sky-700">
          {univ.admissionType.early.map((type, index) => (
            <li key={index} className="py-8">
              {editMode && (
                <div className="flex justify-end">
                  <DeleteSquareBtn
                    deleteFunc={() => handleDeleteAdmission("early", index)}
                  />
                </div>
              )}
              {editMode ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <ItemBadge textValue={"전형명"} />
                      <input
                        type="text"
                        placeholder="전형명"
                        className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                        value={type.type}
                        onChange={(e) => {
                          handleAdmissionChange(
                            e.target.value,
                            "early",
                            index,
                            "type"
                          );
                        }}
                      />
                    </div>
                    <div>
                      <ItemBadge textValue={"모집 인원(명)"} />
                      <input
                        type="text"
                        placeholder="모집인원수"
                        className="input h-8 placeholder:text-sm px-2 py-1 outline-none focus:border-blue-400 w-full"
                        value={type.recruitCount}
                        onChange={(e) => {
                          handleAdmissionChange(
                            e.target.value,
                            "early",
                            index,
                            "recruitCount"
                          );
                        }}
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
                              e.target.value === "true",
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
                              e.target.value === "true",
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
                              <select
                                className="select h-8 text-black w-full"
                                defaultValue={
                                  type.minimumCsatGrades.subjectCount
                                }
                              >
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
                            <select
                              className="select h-8 text-black w-full"
                              defaultValue={type.minimumCsatGrades.maxGradeSum}
                            >
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
                    <div className="flex gap-4 mb-2">
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
                        <label className="text-neutral-600 text-sm">
                          등급 기준
                          <select
                            defaultValue={
                              type.minimumCsatGrades.koreanHistory.grade
                            }
                            className="select h-8 w-full text-black"
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
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 mb-4">
                  <div>
                    <ItemBadge textValue={"전형명"} />
                    <p className="pl-1 pt-1 text-sm">{type.type}</p>
                  </div>
                  {type.minimumCsatGrades && (
                    <div className="text-sm">
                      <ItemBadge textValue={"수능 최저 등급"} />
                      {type.minimumCsatGrades.subjectCount > 0 ? (
                        <div className="pl-1 pt-1">
                          <div>
                            {type.minimumCsatGrades.subjects.map(
                              (subject, index) => {
                                const subjectObj = SUBJECTS.find(
                                  (s) => s.value === subject
                                );
                                return (
                                  <span key={subject}>
                                    {subjectObj?.label}
                                    {index !==
                                      type.minimumCsatGrades.subjects.length -
                                        1 && ", "}
                                  </span>
                                );
                              }
                            )}
                            <span>
                              중 {type.minimumCsatGrades.subjectCount}과목 합{" "}
                            </span>
                            <span>
                              {type.minimumCsatGrades.maxGradeSum} 이내
                            </span>
                          </div>
                          {type.minimumCsatGrades.koreanHistory.value && (
                            <span className="block pt-1">
                              한국사{" "}
                              {type.minimumCsatGrades.koreanHistory.grade}
                              등급 이내
                            </span>
                          )}
                        </div>
                      ) : (
                        <p className="pl-1 pt-1 text-sm">없음</p>
                      )}
                    </div>
                  )}
                  <div>
                    <ItemBadge textValue={"모집  인원(명)"} />
                    <p className="pl-1 pt-1 text-sm">{type.recruitCount}</p>
                  </div>
                </div>
              )}
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
                        onChange={(e) => {
                          handleAcademicGradesTotalChange(
                            e.target.value,
                            index,
                            "early"
                          );
                        }}
                        type="text"
                        placeholder="내신 비율"
                        value={type.academicGrades.total}
                        className={`h-8 px-2 py-1 outline-none w-full ${
                          editMode ? "input focus:border-blue-400 mt-1" : ""
                        }`}
                        disabled={!editMode}
                      />
                    </label>
                    {editMode ? (
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
                              <input
                                type="text"
                                className="input h-8"
                                value={type.academicGrades.yearRatio.grade1}
                                onChange={(e) =>
                                  handleAcademicGradeRatioChange(
                                    e.target.value,
                                    "grade1",
                                    index
                                  )
                                }
                              />
                            </td>
                            <td className="px-1">
                              {" "}
                              <input
                                type="text"
                                className="input h-8"
                                value={type.academicGrades.yearRatio.grade2}
                                onChange={(e) =>
                                  handleAcademicGradeRatioChange(
                                    e.target.value,
                                    "grade2",
                                    index
                                  )
                                }
                              />
                            </td>
                            <td className="px-1">
                              {" "}
                              <input
                                type="text"
                                className="input h-8"
                                value={type.academicGrades.yearRatio.grade3}
                                onChange={(e) =>
                                  handleAcademicGradeRatioChange(
                                    e.target.value,
                                    "grade3",
                                    index
                                  )
                                }
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
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
                    )}
                  </div>
                  <div>
                    <label className="text-sm">
                      실기(%)
                      <input
                        onChange={(e) => {
                          handleAdmissionChange(
                            e.target.value,
                            "early",
                            index,
                            "practical"
                          );
                        }}
                        type="text"
                        placeholder="실기 비율"
                        value={type.practical}
                        className={`px-2 py-1 h-8 outline-none w-full ${
                          editMode ? "input focus:border-blue-400 mt-1" : ""
                        }`}
                        disabled={!editMode}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="text-sm">
                      기타(%)
                      <input
                        onChange={(e) => {
                          handleAdmissionChange(
                            e.target.value,
                            "early",
                            index,
                            "etc"
                          );
                        }}
                        type="text"
                        placeholder="기타 비율"
                        value={type.etc.length == 0 ? "0" : type.etc}
                        className={`px-2 py-1 h-8 outline-none w-full ${
                          editMode ? "input focus:border-blue-400 mt-1" : ""
                        }`}
                        disabled={!editMode}
                      />
                    </label>
                  </div>
                </div>
                <div className="text-sm">
                  {editMode ? (
                    <label>
                      비고
                      <textarea
                        onChange={(e) => {
                          handleAdmissionChange(
                            e.target.value,
                            "early",
                            index,
                            "note"
                          );
                        }}
                        type="text"
                        value={type.note}
                        className="textarea h-28 resize-none placeholder:text-sm p-2 border outline-none w-full focus:border-blue-400"
                      />
                    </label>
                  ) : (
                    <>
                      <span>비고</span>
                      <p className="mt-1">{type.note}</p>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {editMode && (
          <button
            onClick={() => handleAddAdmission("early")}
            className="btn btn-outline mt-4"
          >
            + 새 전형 추가
          </button>
        )}
      </div>

      {/* 실기 배점표 */}
      <div className="card bg-white shadow-lg p-6 mb-6">
        <CardTitle textValue={"실기 배점표"} />
        <ul className="divide-y divide-sky-700">
          {univ.events.map((event, eventIndex) => (
            <li key={eventIndex} className="py-8">
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm">
                      <ItemBadge textValue={"종목명"} />
                      <input
                        className={`h-8 p-2 outline-none border w-full ${
                          editMode
                            ? "input focus:border-blue-400"
                            : "border-white"
                        }`}
                        disabled={!editMode}
                        type="text"
                        value={`${
                          editMode
                            ? event.eventName
                            : `${event.eventName}(${UNIT[event.unit]})`
                        }`}
                        placeholder="종목명(단위)"
                        onChange={(e) => {
                          handleEventChange(e.target.value, eventIndex);
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    {editMode ? (
                      <>
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
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="flex items-center px-6">
                  <OutlineItemBadge textValue={"배점기준"} />
                  <div
                    className={`divider w-full px-4 ${!editMode && "pr-0"}`}
                  ></div>
                  <button
                    onClick={() => {
                      handleAddScoreStandard(eventIndex);
                    }}
                    className={`btn btn-sm ${editMode ? "display" : "hidden"}`}
                  >
                    배점 추가
                  </button>
                </div>
                <div className="px-6">
                  <table className="table w-full text-center">
                    <thead className="text-sm text-neutral-600 bg-indigo-100">
                      <tr>
                        <th className="py-1 px-1 w-[20%]">배점</th>
                        <th className="py-1 px-2">남자</th>
                        <th className="py-1 px-2">여자</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.scoreTable.map((score, scoreIndex) => (
                        <tr
                          key={scoreIndex}
                          className="text-center border-b border-stone-200 text-sm"
                        >
                          <th scope="row" className="bg-emerald-50 py-1 px-1">
                            {editMode ? (
                              <input
                                type="number"
                                value={score.points}
                                onChange={(e) => {
                                  handleScoreTableChange(
                                    e.target.value,
                                    eventIndex,
                                    scoreIndex,
                                    "points"
                                  );
                                }}
                                className={`h-8 px-2 py-1 outline-none w-full font-normal ${
                                  editMode
                                    ? "input focus:border-blue-400 bg-white"
                                    : ""
                                }`}
                                disabled={!editMode}
                              />
                            ) : (
                              <span>{score.points}</span>
                            )}
                          </th>
                          <td className="py-1 px-2">
                            {editMode ? (
                              <input
                                type="text"
                                value={score.male}
                                className={`px-2 py-1 h-8 outline-none w-full ${
                                  editMode ? "input focus:border-blue-400" : ""
                                }`}
                                disabled={!editMode}
                                onChange={(e) => {
                                  handleScoreTableChange(
                                    e.target.value,
                                    eventIndex,
                                    scoreIndex,
                                    "male"
                                  );
                                }}
                              />
                            ) : (
                              <span>{score.male}</span>
                            )}
                          </td>
                          <td className="py-1 px-2">
                            {editMode ? (
                              <input
                                type="text"
                                value={score.female}
                                className={`px-2 py-1 h-8 outline-none w-full ${
                                  editMode ? "input focus:border-blue-400" : ""
                                }`}
                                disabled={!editMode}
                                onChange={(e) => {
                                  handleScoreTableChange(
                                    e.target.value,
                                    eventIndex,
                                    scoreIndex,
                                    "female"
                                  );
                                }}
                              />
                            ) : (
                              <span>{score.female}</span>
                            )}
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
        {editMode && (
          <button onClick={handleAddEvent} className="btn btn-outline mt-4">
            + 새 종목 추가
          </button>
        )}
      </div>
    </MainLayout>
  );
}
