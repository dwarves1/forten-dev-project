import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";

export default function StudentDashboard() {
  // 예제 데이터 (실제 데이터는 API 연동 필요)
  const [grades, setGrades] = useState({
    국어: 85,
    수학: 90,
    영어: 88,
  });

  const [practicalRecords, setPracticalRecords] = useState({
    "100m 달리기(초)": "12.5",
    "멀리뛰기(m)": "5.2",
  });

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* 대시보드 헤더 */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-lg sm:text-xl font-bold">학생 대시보드</h2>
        </div>

        {/* 성적 및 실기 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-white shadow-lg p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">내 성적 요약</h3>
              <Link to="/studentdashboard/grades">
                <button className="btn btn-sm btn-outline">상세 조회</button>
              </Link>
            </div>
            <ul className="divide-y divide-stone-200">
              {Object.entries(grades).map(([subject, score]) => (
                <li key={subject} className="flex justify-between p-2 text-sm">
                  <span>{subject}</span>
                  <span>{score}점</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card bg-white shadow-lg p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">실기 기록 요약</h3>
              <Link to="/studentpracticalrecords">
                <button className="btn btn-sm btn-outline">상세 조회</button>
              </Link>
            </div>
            <ul className="divide-y divide-stone-200">
              {Object.entries(practicalRecords).map(([event, record]) => (
                <li key={event} className="flex justify-between p-2 text-sm">
                  <span>{event}</span>
                  <span>{record}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
