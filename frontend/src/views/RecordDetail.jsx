import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeleteSquareBtn from "../components/ui/DeleteSquareBtn";
import MainLayout from "../components/layouts/MainLayout";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";

export default function RecordDetail() {
  const { studentId, testId } = useParams(); // URL에서 학생 및 테스트 ID 가져오기
  const navigate = useNavigate();

  // 예제 학생 정보 (실제 API 연동 필요)
  const student = {
    id: studentId,
    name: "이서연",
    birthdate: "2007-03-22",
    school: "서울여자고등학교",
  };

  // 예제 테스트 정보
  const test = {
    id: testId,
    title: "3월 정규 테스트",
    date: "2025-03-10",
    records: [
      { event: "100m 달리기(초)", record: "12.5" },
      { event: "멀리뛰기(m)", record: "5.2" },
      { event: "제자리높이뛰기(cm)", record: "55" },
    ],
  };

  const [editMode, setEditMode] = useState(false);
  const [eiditingTest, setEditingTest] = useState(test);

  const onEditClick = () => {
    if (editMode) {
      window.alert("저장되었습니다");
    }
    setEditMode(!editMode);
  };

  const handleTestChange = (field, value) => {
    setEditingTest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRecordChange = (index, field, value) => {
    setEditingTest((prev) => {
      const updateRecords = [...prev.records];
      updateRecords[index] = { ...updateRecords[index], [field]: value };
      return { ...prev, records: updateRecords };
    });
  };

  const handleAddRecord = () => {
    const newEvent = { event: "", record: "" };
    setEditingTest((prev) => ({
      ...prev,
      records: [...prev.records, newEvent],
    }));
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = [...eiditingTest.records];
    updatedRecords.splice(index, 1); // 해당 인덱스의 기록 삭제
    setEditingTest((prev) => ({
      ...prev,
      records: updatedRecords,
    }));
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"실기기록 상세"} />
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
        >
          목록
        </button>
      </div>
      <div className="flex mb-4" onClick={onEditClick}>
        <button className="btn btn-sm btn-outline btn-info ml-auto">
          수정
        </button>
      </div>

      {/* 테스트 정보 */}
      <div className="card bg-white shadow-lg p-6 mb-4">
        <CardTitle textValue={"테스트 정보"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-sm">
            <p className="text-neutral-500">이름</p>
            <p>{student.name}</p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">학교</p>
            <p>{student.school}</p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">테스트명</p>
            {editMode ? (
              <input
                className="input h-8 p-2 rounded-md outline-none border border-gray-400 focus:border-blue-400"
                type="text"
                value={eiditingTest.title}
                onChange={(e) => handleTestChange("title", e.target.value)}
                disabled={!editMode}
              />
            ) : (
              <p>{test.title}</p>
            )}
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">날짜</p>
            {editMode ? (
              <input
                className="input h-8 p-2 rounded-md outline-none border border-gray-400 focus:border-blue-400"
                type="date"
                value={eiditingTest.date}
                onChange={(e) => handleTestChange("date", e.target.value)}
                disabled={!editMode}
              />
            ) : (
              <p>{test.date}</p>
            )}
          </div>
        </div>
      </div>

      {/* 실기 기록 테이블 */}
      <div className="card bg-white shadow-lg p-6">
        <CardTitle textValue={"실기 기록"} />
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="py-2 px-1">측정 종목</th>
              <th className="py-2 px-1">기록</th>
              <th className="text-center w-[10%] py-2 px-1">삭제</th>
            </tr>
          </thead>
          <tbody>
            {eiditingTest.records.map((record, index) => (
              <tr key={index}>
                <td className="max-w-56 py-2 px-1">
                  {editMode ? (
                    <input
                      className="input h-8 max-w-52 p-2 rounded-md outline-none border border-gray-400 focus:border-blue-400"
                      type="text"
                      value={record.event}
                      onChange={(e) =>
                        handleRecordChange(index, "event", e.target.value)
                      }
                      disabled={!editMode}
                    />
                  ) : (
                    <p>{record.event}</p>
                  )}
                </td>
                <td className="py-2 px-1">
                  {editMode ? (
                    <input
                      className="input h-8 max-w-52 p-2 rounded-md outline-none border border-gray-400 focus:border-blue-400"
                      type="text"
                      value={record.record}
                      onChange={(e) =>
                        handleRecordChange(index, "event", e.target.value)
                      }
                      disabled={!editMode}
                    />
                  ) : (
                    <p>{record.record}</p>
                  )}
                </td>
                {/* 종목 삭제 버튼 */}

                <td className="text-center py-2 px-1">
                  {editMode ? (
                    <DeleteSquareBtn
                      deleteFunc={() => handleDeleteRecord(index)}
                    />
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editMode && (
          <button onClick={handleAddRecord} className="btn btn-outline mt-4">
            + 새 종목 추가
          </button>
        )}
      </div>

      {/* 실기 기록 분석 (차트 라이브러리 연동 가능) */}
      <div className="card bg-white shadow-lg p-6 mt-6">
        <CardTitle textValue={"기록 변화 추이"} />
        <p className="text-gray-600">
          각 종목별 기록 변화를 시각적으로 분석합니다.
        </p>
        <div className="h-40 bg-gray-200 rounded mt-4 flex items-center justify-center">
          <span className="text-gray-500">📊 차트 추가 예정</span>
        </div>
      </div>
    </MainLayout>
  );
}
