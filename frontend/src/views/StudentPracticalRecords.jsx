import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";

export default function StudentPracticalRecords() {
  // 예제 데이터 (API 연동 필요)
  const [selectedEvent, setSelectedEvent] = useState("100m 달리기(초)");

  const practicalRecords = [
    { event: "100m 달리기(초)", record: "12.5", date: "2025-03-10" },
    { event: "멀리뛰기(cm)", record: "279", date: "2025-03-08" },
    { event: "100m 달리기(초)", record: "12.8", date: "2025-02-25" },
    { event: "멀리뛰기(cm)", record: "272", date: "2025-02-20" },
  ];

  // 선택한 종목에 따른 필터링
  const filteredRecords = practicalRecords.filter(
    (record) => record.event === selectedEvent
  );

  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl font-bold">실기 기록 조회</h2>
        <div
          className="btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
          onClick={() => navigate(-1)}
        >
          대시보드
        </div>
      </div>

      {/* 종목 선택 필터 */}
      <div className="flex gap-2 mb-4">
        {["100m 달리기(초)", "멀리뛰기(cm)"].map((event) => (
          <button
            key={event}
            className={`btn btn-sm ${
              selectedEvent === event ? "btn-accent" : "btn-outline"
            }`}
            onClick={() => setSelectedEvent(event)}
          >
            {event}
          </button>
        ))}
      </div>

      {/* 실기 기록 테이블 */}
      <div className="card bg-white shadow-lg p-6">
        <h3 className="text-lg font-bold mb-2">{selectedEvent}</h3>
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-24 sm:w-28">기록</th>
              <th>측정 날짜</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.record}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 실기 기록 변화 그래프 (차트 라이브러리 연동 가능) */}
      <div className="card bg-white shadow-lg p-6 mt-6">
        <h3 className="text-lg font-bold mb-2">기록 변화 추이</h3>
        <p className="text-gray-600">선택한 종목의 기록 변화를 추적합니다.</p>
        <div className="h-40 bg-gray-200 rounded mt-4 flex items-center justify-center">
          <span className="text-gray-500">📊 차트 추가 예정</span>
        </div>
      </div>
    </MainLayout>
  );
}
