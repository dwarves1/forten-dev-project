import { useState } from "react";
import CardLayout from "../components/layouts/CardLayout";
import MainLayout from "../components/layouts/MainLayout";
import CardTitle from "../components/ui/CardTitle";
import PageTitle from "../components/ui/PageTitle";
import mockTestData from "../mockTestData";
import scoreTable from "../testScoreTable.json";

const testItem = [
  "제자리멀리뛰기",
  "윗몸일으키기",
  "Z-런달리기",
  "메디신볼",
  "100M달리기",
  "유연성(좌전굴)",
  "던지기",
  "배근력",
  "10M왕복",
  "20M왕복",
];

export default function AddAcademyTest() {
  const students = mockTestData;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [records, setRecords] = useState(
    testItem.reduce((acc, cur) => ({ ...acc, [cur]: "" }), {})
  );
  const [scores, setScores] = useState(
    testItem.reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {})
  );

  const filteredStudents = students.filter((student) =>
    student.name.includes(searchTerm)
  );

  const handleSelectStudent = (value) => {
    if (selectedStudent !== null) {
      const reSelect = window.confirm(
        "저장되지 않은 정보가 있습니다. 학생을 변경할까요?"
      );

      if (reSelect) {
        setSelectedStudent(value);
        setSearchTerm("");
        setSelectedMonth("");
        setRecords(testItem.reduce((acc, cur) => ({ ...acc, [cur]: "" }), {}));
        setScores(testItem.reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {}));
      } else {
        setSearchTerm("");
      }
    } else {
      setSelectedStudent(value);
      setSearchTerm("");
      setSelectedMonth("");
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getScore = (testName, gender, record) => {
    const eventData = scoreTable[testName];
    if (!eventData) return 0;

    const { higherIsBetter, [gender]: records } = eventData;
    if (!records) return 0;

    if (record === "" || record === null || isNaN(record) || record === "0")
      return 0;

    const recordValue = Number(record);

    if (higherIsBetter) {
      const matched = records.find((item) => recordValue >= item.record);
      return matched ? matched.score : 0;
    } else {
      const matched = records.find((item) => recordValue <= item.record);
      return matched ? matched.score : 0;
    }
  };

  const handleRecordChange = (testName, value) => {
    setRecords((prev) => ({ ...prev, [testName]: value }));

    const newScore = getScore(testName, selectedStudent.gender, value);
    setScores((prev) => ({ ...prev, [testName]: newScore }));
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <MainLayout>
      <PageTitle textvaule={"실기 기록 추가"} />
      <CardLayout>
        <div className="relative">
          <div className="flex justify-center">
            <label className="input h-8 sm:h-10 w-full mb-8">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                type="text"
                className="grow"
                placeholder="학생이름"
              />
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
            </label>
          </div>
          {searchTerm ? (
            filteredStudents.length > 0 ? (
              <div className="bg-white text-sm absolute top-8 sm:top-10 z-10 w-full border border-stone-200 max-h-56 overflow-y-auto">
                <ul className="divide-y divide-stone-200">
                  {filteredStudents.map((student) => (
                    <li
                      key={student.studentId}
                      className="p-4 hover:bg-neutral-100 cursor-pointer"
                      onClick={() => handleSelectStudent(student)}
                    >
                      <div className="flex">
                        <div>
                          {student.name}(
                          {student.gender === "female" ? "여" : "남"})
                        </div>
                        <div className="text-sm text-gray-500 ml-auto">
                          {student.school} / {student.educationalGroup}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white p-4 text-sm absolute w-full shadow-sm">
                일치하는 학생이 없습니다.
              </div>
            )
          ) : null}
        </div>
        <CardTitle textValue={"학생 정보"} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          <div className="text-sm">
            <p className="text-neutral-500">이름</p>
            <p>{selectedStudent?.name ?? ""}</p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">성별</p>
            <p>
              {selectedStudent
                ? selectedStudent.gender === "female"
                  ? "여"
                  : "남"
                : ""}
            </p>
            <p></p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">학생코드</p>
            <p>{selectedStudent === null ? "" : selectedStudent.studentId}</p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">학교</p>
            <p>{selectedStudent?.school ?? ""}</p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">교육권</p>
            <p>{selectedStudent?.educationalGroup ?? ""}</p>
          </div>
        </div>
      </CardLayout>
      <CardLayout>
        <CardTitle textValue={"실기 기록 입력"} />
        {selectedStudent && (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">날짜선택</legend>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="select"
              >
                <option disabled value="">
                  날짜를 선택하세요
                </option>
                <option value={"2025-01"}>2025-01</option>
                <option value={"2025-02"}>2025-02</option>
                <option value={"2025-03"}>2025-03</option>
                <option value={"2025-04"}>2025-04</option>
                <option value={"2025-05"}>2025-05</option>
                <option value={"2025-06"}>2025-06</option>
                <option value={"2025-07"}>2025-07</option>
                <option value={"2025-08"}>2025-08</option>
                <option value={"2025-09"}>2025-09</option>
                <option value={"2025-10"}>2025-10</option>
                <option value={"2025-11"}>2025-11</option>
                <option value={"2025-12"}>2025-12</option>
              </select>
            </fieldset>
            <div className="mt-4">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-sky-50 text-center">
                    <td className="w-[60%] py-2">종목</td>
                    <td className="py-2">기록</td>
                    <td className="py-2">점수</td>
                  </tr>
                </thead>
                <tbody>
                  {testItem.map((item) => (
                    <tr key={item}>
                      <td className="py-2">{item}</td>
                      <td className="py-2">
                        <input
                          type="number"
                          className="input h-8"
                          value={records[item]}
                          onChange={(e) =>
                            handleRecordChange(item, e.target.value)
                          }
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          readOnly
                          className="input h-8"
                          value={scores[item]}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-green-50">
                    <td className="w-[60%] text-center">총점</td>
                    <td colSpan={2} className="text-center font-semibold">
                      {totalScore}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardLayout>
    </MainLayout>
  );
}
