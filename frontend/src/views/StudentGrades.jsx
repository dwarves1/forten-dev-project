import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";

export default function StudentGrades() {
  // 예제 데이터 (API 연동 필요)
  const [selectedExamType, setSelectedExamType] = useState("내신");

  const grades = [
    { subject: "국어", score: 85, examType: "내신", date: "2025-03-10" },
    { subject: "수학", score: 90, examType: "내신", date: "2025-03-10" },
    { subject: "영어", score: 88, examType: "모의고사", date: "2025-02-20" },
    { subject: "과학", score: 82, examType: "수능", date: "2025-01-05" },
  ];

  // 선택한 시험 유형에 따른 필터링
  const filteredGrades = grades.filter(
    (grade) => grade.examType === selectedExamType
  );

  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl font-bold">성적 조회</h2>

        <div
          className="btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
          onClick={() => navigate(-1)}
        >
          대시보드
        </div>
      </div>

      {/* 시험 유형 필터 */}
      <div className="flex gap-2 mb-4">
        {["내신", "모의고사", "수능"].map((type) => (
          <button
            key={type}
            className={`btn btn-sm ${
              selectedExamType === type ? "btn-accent" : "btn-outline"
            }`}
            onClick={() => setSelectedExamType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 성적 테이블 */}
      <div className="card bg-white shadow-lg p-6">
        <h3 className="text-lg font-bold mb-2">{selectedExamType} 성적</h3>
        <table className="table w-full">
          <thead>
            <tr>
              <th className="py-2">과목</th>
              <th className="py-2">점수</th>
              <th className="py-2">날짜</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrades.map((grade, index) => (
              <tr key={index}>
                <td className="py-2">{grade.subject}</td>
                <td className="py-2">{grade.score}점</td>
                <td className="py-2">{grade.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 성적 변화 그래프 (차트 라이브러리 연동 가능) */}
      <div className="card bg-white shadow-lg p-6 mt-6">
        <h3 className="text-lg font-bold mb-2">성적 변화 추이</h3>
        <p className="text-gray-600">각 과목별 성적 변화를 추적합니다.</p>
        <div className="h-40 bg-gray-200 rounded mt-4 flex items-center justify-center">
          <span className="text-gray-500">📊 차트 추가 예정</span>
        </div>
      </div>
    </MainLayout>
  );
}
