import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardLayout from "../components/layouts/CardLayout";
import MainLayout from "../components/layouts/MainLayout";
import DeleteSquareBtn from "../components/ui/DeleteSquareBtn";
import WideBtn from "../components/ui/WideBtn";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";

export default function AddRecord() {
  const { studentId } = useParams(); // URL에서 학생 및 테스트 ID 가져오기
  const navigate = useNavigate();

  // 예제 학생 정보 (실제 API 연동 필요)
  const student = {
    id: studentId,
    name: "이서연",
    birthdate: "2007-03-22",
    school: "서울여자고등학교",
  };

  const [recordsData, setRecordsData] = useState({
    id: 0,
    title: "3월 정규 테스트",
    date: "2025-03-10",
    records: [{ event: "", record: "" }],
  });

  const handleTestChange = (field, value) => {
    setRecordsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRecordChange = (index, field, value) => {
    setRecordsData((prev) => {
      const updateRecords = [...prev.records];
      updateRecords[index] = { ...updateRecords[index], [field]: value };
      return { ...prev, records: updateRecords };
    });
  };

  const handleAddRecord = () => {
    const newEvent = { event: "", record: "" };
    setRecordsData((prev) => ({
      ...prev,
      records: [...prev.records, newEvent],
    }));
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = [...recordsData.records];
    updatedRecords.splice(index, 1); // 해당 인덱스의 기록 삭제
    setRecordsData((prev) => ({
      ...prev,
      records: updatedRecords,
    }));
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"실기기록 추가"} />
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
        >
          목록
        </button>
      </div>
      {/* 저장 버튼 */}
      <div className="flex mb-4">
        <button className="btn btn-sm btn-outline btn-info ml-auto">
          저장
        </button>
      </div>

      {/* 테스트 정보 */}
      <CardLayout>
        <CardTitle textValue={"테스트 정보"} />
        <table className="table w-full">
          <thead>
            <tr>
              <th>이름</th>
              <th>학교</th>
              <th>테스트</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="1">{student.name}</td>
              <td rowSpan="1">{student.school}</td>
              <td>
                <input
                  onChange={(e) => handleTestChange("title", e.target.value)}
                  className="p-2 rounded-md outline-none
                      border border-gray-400 focus:border-blue-400"
                  type="text"
                />
              </td>
              <td>
                <input
                  className="p-2 rounded-md outline-none
                      border border-gray-400 focus:border-blue-400"
                  type="date"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </CardLayout>

      {/* 실기 기록 테이블 */}
      <CardLayout>
        <CardTitle textValue={"실기 기록"} />
        <table className="table w-full">
          <thead>
            <tr>
              <th>측정 종목</th>
              <th>기록</th>
              <th className="text-center max-w-16 min-w-14">삭제</th>
            </tr>
          </thead>
          <tbody>
            {recordsData.records.map((record, index) => (
              <tr key={index}>
                <td className="max-w-56 py-1">
                  <input
                    onChange={(e) =>
                      handleRecordChange(index, "event", e.target.value)
                    }
                    value={record.event}
                    type="text"
                    className="w-full h-8 p-2 rounded-md outline-none border border-gray-400 focus:border-blue-400"
                  />
                </td>
                <td className="max-w-56 py-1">
                  <input
                    onChange={(e) =>
                      handleRecordChange(index, "record", e.target.value)
                    }
                    value={record.record}
                    type="text"
                    className="w-full h-8 p-2 rounded-md outline-none border border-gray-400 focus:border-blue-400"
                  />
                </td>
                {/* 삭제 버튼 */}
                <td className="text-center py-1">
                  <DeleteSquareBtn deleteFunc={() => handleDeleteRecord()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <WideBtn
          onClickFunc={() => handleAddRecord()}
          textValue={"+ 새 종목 추가"}
        />
      </CardLayout>
    </MainLayout>
  );
}
