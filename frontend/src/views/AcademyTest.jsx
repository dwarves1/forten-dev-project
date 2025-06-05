import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import PageTitle from "../components/ui/PageTitle";
import CardLayout from "../components/layouts/CardLayout";
import CardTitle from "../components/ui/CardTitle";
import { useState } from "react";
import mockTestData from "../mockTestData";
import { Link } from "react-router-dom";

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

export default function AcademyTest() {
  const lists = mockTestData;

  const allMonths = Array.from(
    new Set(mockTestData.flatMap((s) => Object.keys(s.monthlyTests)))
  );
  const sortedMonths = allMonths.sort().reverse();
  const [selectedMonth, setSelectedMonth] = useState(sortedMonths[0]); // 가장 최근 월 선택
  const filteredLists = lists.filter((item) => {
    if (selectedMonth === "all") {
      return true;
    }
    return item.monthlyTests[selectedMonth];
  });

  const handleSelectMonth = (e) => {
    const value = e.target.value;
    setSelectedMonth(value);
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] pt-20 sm:pt-28 bg-base-200 px-4 pb-10 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <PageTitle textvaule={"포텐 실기 테스트"} />
        </div>

        <div className="flex items-center justify-between mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">날짜 선택</legend>
            <select
              value={selectedMonth}
              className="select select-sm"
              onChange={(e) => handleSelectMonth(e)}
            >
              <option value={"all"}>전체</option>
              {allMonths.map((month) => (
                <option value={month} key={month}>
                  {month}
                </option>
              ))}
            </select>
          </fieldset>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-outline">양식다운로드</button>
            <button className="btn btn-sm btn-outline btn-success">
              엑셀업로드
            </button>
            <Link to="/academy-test/add">
              <button className="btn btn-sm btn-outline btn-info">
                개별등록
              </button>
            </Link>
          </div>
        </div>
        <CardLayout>
          <CardTitle textValue={"목록"} />
          <div className="w-full overflow-x-auto mt-4 pb-2">
            <table className="table w-full text-sm">
              <thead>
                <tr className="bg-sky-50 text-center">
                  <th rowSpan={2} className="px-2 py-1 sticky left-0 bg-sky-50">
                    이름
                  </th>
                  <th rowSpan={2} className="px-2 py-1">
                    성별
                  </th>
                  <th rowSpan={2} className="px-2 py-1">
                    월별
                  </th>
                  <th rowSpan={2} className="px-2 py-1">
                    교육권
                  </th>
                  <th
                    rowSpan={2}
                    className="px-2 py-1 border-r border-stone-300"
                  >
                    학교
                  </th>
                  {testItem.map((item) => (
                    <th key={item} colSpan={2} className="px-2 py-1">
                      {item}
                    </th>
                  ))}
                  <th rowSpan={2} className="px-2 py-1 bg-red-100">
                    총점
                  </th>
                </tr>
                <tr className="text-xs text-center">
                  {[...Array(10)].map((_, i) => (
                    <React.Fragment key={i}>
                      <th className="px-2 py-1 text-sky-400">기록</th>
                      <th className="px-2 py-1 text-rose-400">점수</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedMonth === "all" ? (
                  <>
                    {filteredLists.flatMap((student) =>
                      Object.entries(student.monthlyTests)
                        .map(([month, data]) => ({
                          studentId: student.studentId,
                          name: student.name,
                          gender: student.gender,
                          school: student.school,
                          educationalGroup: student.educationalGroup,
                          month,
                          totalScore: data.totalScore,
                          tests: data.tests,
                        }))
                        .map((entry, index) => {
                          return (
                            <tr
                              key={`${entry.studentId}_${index}`}
                              className="text-center"
                            >
                              <td className="py-1 px-2 text-nowrap sticky left-0 bg-white">
                                <Link
                                  to={`/academy-test/detail/${entry.studentId}`}
                                  className="hover:text-sky-500"
                                >
                                  {entry.name}
                                </Link>
                              </td>
                              <td className="py-1 px-1">
                                {entry.gender == "female" ? "여" : "남"}
                              </td>
                              <td className="py-1 px-1 tracking-tight">
                                {entry.month}
                              </td>
                              <td className="py-1 px-1 tracking-tight">
                                {entry.educationalGroup}
                              </td>
                              <td className="py-1 px-1 tracking-tight text-nowrap border-r border-stone-300">
                                {entry.school}
                              </td>
                              {testItem.map((name) => {
                                const test = entry.tests.find(
                                  (t) => t.name === name
                                );

                                return (
                                  <React.Fragment
                                    key={`${entry.studentId}_${name}`}
                                  >
                                    <td className="px-1 text-neutral-600 bg-neutral-100">
                                      {test?.record ?? "-"}
                                    </td>
                                    <td className="px-1">
                                      {test?.score ?? "-"}
                                    </td>
                                  </React.Fragment>
                                );
                              })}
                              <td className="py-1 px-1 font-semibold">
                                {entry.totalScore}
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </>
                ) : (
                  <>
                    {filteredLists.map((item) => {
                      const testData = item.monthlyTests[selectedMonth];

                      return (
                        <tr key={item.studentId} className="text-center">
                          <td className="py-1 px-2 text-nowrap sticky left-0 bg-white">
                            <Link
                              to={`/academy-test/detail/${item.studentId}`}
                              className="hover:text-sky-500"
                            >
                              {item.name}
                            </Link>
                          </td>
                          <td className="py-1 px-1">
                            {item.gender == "female" ? "여" : "남"}
                          </td>
                          <td className="py-1 px-1 tracking-tight">
                            {selectedMonth}
                          </td>
                          <td className="py-1 px-1 tracking-tight">
                            {item.educationalGroup}
                          </td>
                          <td className="py-1 px-1 tracking-tight text-nowrap border-r border-stone-300">
                            {item.school}
                          </td>
                          {testItem.map((name) => {
                            const test = testData.tests.find(
                              (t) => t.name === name
                            );

                            return (
                              <React.Fragment key={`${item.studentId}_${name}`}>
                                <td className="px-1 text-neutral-600 bg-neutral-100">
                                  {test?.record ?? "-"}
                                </td>
                                <td className="px-1">{test?.score ?? "-"}</td>
                              </React.Fragment>
                            );
                          })}
                          <td className="py-1 px-1 font-semibold">
                            {testData.totalScore}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </CardLayout>
      </div>
    </div>
  );
}
