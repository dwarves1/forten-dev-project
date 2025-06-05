import { useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import mockUnivData from "../mockUnivData";
import { Link } from "react-router-dom";
import CardLayout from "../components/layouts/CardLayout";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";
import { LOCATION } from "../constants";
import CustomPagination from "../components/common/CustomPagination";

export default function RecommendByRecord() {
  const [univs] = useState(mockUnivData);
  const [location, setLocation] = useState("all");
  const [teacherCertification, setTeacherCertification] = useState("all");
  const [grades, setGrades] = useState([0, 0, 0]);
  const [recommendations, setRecommendations] = useState([]);

  // Pagination 설정
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(recommendations.length / itemsPerPage);

  // 현재 페이지의 공지 필터링
  const displayedNotices = recommendations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 가중 평균 계산
  const calculateWeightAverage = (grades, yearRatio) => {
    const weights = [
      parseFloat(yearRatio.grade1),
      parseFloat(yearRatio.grade2),
      parseFloat(yearRatio.grade3),
    ];

    const weightedSum =
      grades[0] * weights[0] + grades[1] * weights[1] + grades[2] * weights[2];

    return weightedSum / 100;
  };

  //필터 라벨
  const getFilterLabel = (userAverage, average, cutoff) => {
    if (userAverage > cutoff) return "위험";
    else if (userAverage <= average) return "가능";
    return "경계";
  };

  // 내신 평균 입력
  const handleGradeInput = (inputValue, index) => {
    setGrades((prev) => {
      const updateGrade = [...prev];
      updateGrade[index] = inputValue;
      return updateGrade;
    });
  };

  // 위치 필터링
  const locationFilter = (univ) => {
    return location === "all" || univ.location === location;
  };

  // 교직이수 필터링
  const teacherCertFilter = (univ) => {
    return (
      teacherCertification === "all" ||
      univ.teacherCertification === teacherCertification
    );
  };

  // 등급 필터링
  const gradeFilter = (grades, univs) => {
    const filtered = univs
      .map((univ) => {
        const earlyAdmissions = univ.admissionType.early;

        const safeAdmissions = earlyAdmissions
          .map((admission) => {
            const { academicGrades } = admission;

            if (
              !academicGrades ||
              !academicGrades.yearRatio ||
              Object.values(academicGrades.yearRatio).some((v) => v === "")
            ) {
              return null; // 필터 불가능한 전형은 제외
            }

            // 사용자등급평균, 작년합격평균, 컷오프
            const userAverage = calculateWeightAverage(
              grades,
              academicGrades.yearRatio
            );

            const average = parseFloat(academicGrades.average);
            const cutoff = parseFloat(academicGrades.cutoff85);

            if (isNaN(average) || isNaN(cutoff)) return null;

            const label = getFilterLabel(userAverage, average, cutoff);

            if (label === "위험") return null; // 위험 제외

            return {
              ...admission,
              admissionLabel: label,
            };
          })
          .filter(Boolean); // null 제거

        if (safeAdmissions.length === 0) return null; // 안전한 전형 없으면 제외

        return {
          ...univ,
          admissionType: {
            ...univ.admissionType,
            early: safeAdmissions,
          },
        };
      })
      .filter(Boolean); // 대학 중 null 제외

    return filtered;
  };

  const handleSubmit = () => {
    if (!grades.every((grade) => grade !== 0)) {
      window.alert("내신 성적을 입력해주세요");
      return;
    }
    const based = univs.filter(locationFilter).filter(teacherCertFilter);
    const gradeFiltered = gradeFilter(grades, based);

    setCurrentPage(1);
    setRecommendations(gradeFiltered);
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"대학 추천"} />
      </div>

      {/* 입력 폼 */}
      <CardLayout bgColor={"bg-slate-100"}>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 지역 */}
            <label>
              <span className="label text-sm text-neutral-500">지역</span>
              <select
                defaultValue="all"
                className="select h-8 sm:select-md w-full"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value={"all"}>전지역</option>
                {LOCATION.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.location}
                  </option>
                ))}
              </select>
            </label>
            {/* 교직이수 */}
            <label>
              <span className="label text-sm text-neutral-500">
                교직이수여부
              </span>
              <select
                defaultValue="all"
                className="select h-8 sm:select-md w-full"
                onChange={(e) => {
                  setTeacherCertification(e.target.value);
                }}
              >
                <option value={"all"}>무관</option>
                <option value={"possible"}>가능</option>
                <option value={"conditionally"}>조건부가능</option>
                <option value={"impossible"}>불가능</option>
              </select>
            </label>
          </div>
          {/* 내신 성적 */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[1, 2, 3].map((element, index) => (
              <label key={element}>
                <span className="label text-sm text-neutral-500">
                  {element}학년 평균 등급
                </span>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="9"
                  className="input h-8 w-full"
                  value={grades[index]}
                  onChange={(e) => handleGradeInput(e.target.value, index)}
                />
              </label>
            ))}
          </div>
        </form>

        <div className="text-right my-6">
          <button className="btn btn-sm" onClick={handleSubmit}>
            추천 대학 보기
          </button>
        </div>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi bi-exclamation-circle fill-neutral-500 w-4 h-4"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
          <p className="text-xs text-center text-neutral-500 whitespace-pre-wrap mt-1">
            이 추천은 간이 계산 결과를 기반으로 한 예상치이며, 실제 지원 가능
            여부와 차이가 있을 수 있습니다. <br></br> 정확한 진학 계획 수립을
            위해 반드시 담당 선생님과 상담하시기 바랍니다.
          </p>
        </div>
      </CardLayout>

      {/* 추천 결과 리스트 */}

      <CardLayout>
        <CardTitle textValue={"목록"} />
        <ul className="divide-y divide-stone-200">
          {recommendations.length > 0 ? (
            displayedNotices.map((univ) => (
              <li
                key={univ.id}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100"
              >
                <Link
                  to={`/university/detail/${univ.id}`}
                  className="w-full p-2 sm:p-4"
                >
                  <div className="">
                    <div className="flex text-sm items-center">
                      <h4 className="mr-2">{univ.univName}</h4>
                      <span className="text-neutral-600">
                        {univ.department}
                      </span>
                    </div>
                    <ul className="divide-y divide-blue-100 text-sm mt-2 bg-blue-50">
                      {univ.admissionType.early.map((admission, index) => (
                        <li key={index} className="p-2">
                          <div className="flex justify-between">
                            <span className="text-gray-700">
                              {admission.type}
                            </span>
                            <span
                              className={
                                admission.admissionLabel === "가능"
                                  ? "text-sky-500"
                                  : admission.admissionLabel === "경계"
                                  ? "text-yellow-500"
                                  : "text-gray-400"
                              }
                            >
                              {admission.admissionLabel}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-center text-sm text-neutral-600 py-16">
              검색 결과가 없습니다.
            </p>
          )}
        </ul>
      </CardLayout>

      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => {
          if (currentPage > 1) setCurrentPage((prev) => prev - 1);
        }}
        onNext={() => {
          if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
        }}
      />
    </MainLayout>
  );
}
