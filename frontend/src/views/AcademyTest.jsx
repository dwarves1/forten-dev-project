import React, { useEffect, useMemo } from "react";
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

const SORT_TYPE = { desc: "desc", asc: "asc" };

export default function AcademyTest() {
  const lists = mockTestData;

  const allMonths = Array.from(
    new Set(mockTestData.flatMap((s) => Object.keys(s.monthlyTests)))
  );
  const sortedMonths = allMonths.sort().reverse();
  const [selectedMonth, setSelectedMonth] = useState(sortedMonths[0]); // 가장 최근 월 선택

  const [filteredLists, setFilteredLists] = useState(
    lists.filter((item) => {
      if (selectedMonth === "all") {
        return true;
      }
      return item.monthlyTests[selectedMonth];
    })
  );

  const [displayedList, setDisplayedList] = useState(
    filteredLists.flatMap((student) =>
      Object.entries(student.monthlyTests)
        .filter(([month]) => selectedMonth === "all" || selectedMonth === month)
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
    )
  );

  const [searchTerm, setSearchTerm] = useState({
    gender: "all",
    educationalGroup: "all",
    name: "",
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });

  const handleSelectMonth = (e) => {
    const value = e.target.value;
    setSelectedMonth(value);
    setSearchTerm({
      gender: "all",
      educationalGroup: "all",
      name: "",
    });
    setFilteredLists(
      lists.filter((item) => {
        if (selectedMonth === "all") {
          return true;
        }
        return item.monthlyTests[selectedMonth];
      })
    );
    setSortConfig({ key: null, direction: "desc" });
  };

  const handleHeaderClick = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "desc" ? "asc" : "desc" };
      }

      return { key, direction: "desc" };
    });
  };

  const sortedDisplayedList = useMemo(() => {
    if (!sortConfig.key) return displayedList;

    const sorted = [...displayedList].sort((x, y) => {
      if (sortConfig.key.startsWith("score:")) {
        const testName = sortConfig.key.split(":")[1];

        const xEvent = x.tests.find((test) => test.name === testName);
        const yEvent = y.tests.find((test) => test.name === testName);

        const xScore = parseFloat(xEvent.score);
        const yScore = parseFloat(yEvent.score);

        const res = xScore - yScore;

        return sortConfig.direction === "desc" ? -res : res;
      } else if (sortConfig.key.startsWith("record:")) {
        const testName = sortConfig.key.split(":")[1];

        const xEvent = x.tests.find((test) => test.name === testName);
        const yEvent = y.tests.find((test) => test.name === testName);

        const xRecord = parseFloat(xEvent.record);
        const yRecord = parseFloat(yEvent.record);

        const res = xRecord - yRecord;

        return sortConfig.direction === "desc" ? -res : res;
      }

      const v1 = x[sortConfig.key];
      const v2 = y[sortConfig.key];

      const n1 = parseFloat(v1);
      const n2 = parseFloat(v2);
      const isNum = !isNaN(n1) && !isNaN(n2);

      let res = 0;
      if (isNum) {
        res = n1 - n2;
      } else {
        res = String(v1).localeCompare(String(v2));
      }
      return sortConfig.direction === "desc" ? -res : res;
    });
    return sorted;
  }, [displayedList, sortConfig]);

  const handleSearchTermChange = (value, field) => {
    setSearchTerm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearchClick = () => {
    const newList = lists.filter((student) => {
      const matchName =
        searchTerm.name === "" || student.name.includes(searchTerm.name);
      const matchGender =
        searchTerm.gender === "all" || student.gender === searchTerm.gender;
      const matchEducatinalGroup =
        searchTerm.educationalGroup === "all" ||
        student.educationalGroup === searchTerm.educationalGroup;

      return matchName && matchGender && matchEducatinalGroup;
    });

    setFilteredLists(newList);
  };

  useEffect(() => {
    const newDisplayed = filteredLists.flatMap((student) =>
      Object.entries(student.monthlyTests)
        .filter(([month]) => selectedMonth === "all" || selectedMonth === month)
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
    );

    setDisplayedList(newDisplayed);
  }, [selectedMonth, filteredLists]);

  return (
    <div className="min-h-[calc(100vh-10rem)] pt-20 sm:pt-28 bg-base-200 px-4 pb-10 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <PageTitle textvaule={"포텐 실기 테스트"} />
        </div>

        <div className="flex items-center gap-2 justify-between mb-2 flex-wrap">
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
            <Link to="/academy-test/add-record">
              <button className="btn btn-sm btn-outline btn-info">
                개별등록
              </button>
            </Link>
            <Link to="/academy-test/add-student">
              <button className="btn btn-sm btn-outline btn-primary">
                학생등록
              </button>
            </Link>
          </div>
        </div>
        <CardLayout>
          <div>
            <fieldset className="fieldset flex items-end">
              <legend className="fieldset-legend">학생 검색</legend>
              <div className="flex gap-4 items-center justify-center flex-wrap">
                <div>
                  <span>성별</span>
                  <div className="h-8 flex items-center">
                    <label className="mr-2">
                      전체
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio radio-xs ml-1 checked:before:bg-blue-400 checked:border-blue-400"
                        value="all"
                        checked={searchTerm.gender === "all"}
                        onChange={(e) =>
                          handleSearchTermChange(e.target.value, "gender")
                        }
                      />
                    </label>
                    <label className="mr-2">
                      남
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio radio-xs ml-1 checked:before:bg-blue-400 checked:border-blue-400"
                        value="male"
                        checked={searchTerm.gender === "male"}
                        onChange={(e) =>
                          handleSearchTermChange(e.target.value, "gender")
                        }
                      />
                    </label>
                    <label>
                      여
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio radio-xs ml-1 checked:before:bg-blue-400 checked:border-blue-400"
                        value="female"
                        checked={searchTerm.gender === "female"}
                        onChange={(e) =>
                          handleSearchTermChange(e.target.value, "gender")
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span>교육권</span>
                  <select
                    value={searchTerm["educationalGroup"]}
                    onChange={(e) =>
                      handleSearchTermChange(e.target.value, "educationalGroup")
                    }
                    className="select h-8 w-fit focus:border-blue-400"
                  >
                    <option value={"all"}>전체</option>
                    <option value={"남구"}>남구</option>
                    <option value={"동구"}>동구</option>
                    <option value={"북구"}>북구</option>
                    <option value={"중구"}>중구</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <span>학생 이름</span>
                  <input
                    value={searchTerm["name"]}
                    className="input h-8 w-32 focus:border-blue-400"
                    placeholder="이름"
                    onChange={(e) =>
                      handleSearchTermChange(e.target.value, "name")
                    }
                  />
                </div>
              </div>
              <button onClick={handleSearchClick} className="btn h-8">
                검색
              </button>
            </fieldset>
          </div>
          <CardTitle textValue={"목록"} />
          <div className="w-full overflow-x-auto mt-4 pb-2">
            <table className="table w-full text-sm">
              <thead>
                <tr className="bg-sky-50 text-center">
                  <th rowSpan={2} className="px-2 py-1 sticky left-0 bg-sky-50">
                    <div className="flex flex-col items-center">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleHeaderClick("name")}
                      >
                        이름
                      </span>
                    </div>
                  </th>
                  <th rowSpan={2} className="px-2 py-1">
                    성별
                  </th>
                  <th rowSpan={2} className="px-2 py-1">
                    월별
                  </th>
                  <th rowSpan={2} className="px-2 py-1">
                    <div className="flex flex-col items-center">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleHeaderClick("educationalGroup")}
                      >
                        교육권
                      </span>
                    </div>
                  </th>
                  <th
                    rowSpan={2}
                    className="px-2 py-1 border-r border-stone-300"
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleHeaderClick("school")}
                      >
                        학교
                      </span>
                    </div>
                  </th>
                  {testItem.map((item) => (
                    <th key={item} colSpan={2} className="px-2 py-1">
                      <div className="flex flex-col items-center">
                        <span>{item}</span>
                      </div>
                    </th>
                  ))}
                  <th rowSpan={2} className="px-2 py-1 bg-red-100">
                    <div className="flex flex-col items-center">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleHeaderClick("totalScore")}
                      >
                        총점
                      </span>
                    </div>
                  </th>
                </tr>
                <tr className="text-xs text-center">
                  {testItem.map((item, i) => (
                    <React.Fragment key={i}>
                      <th
                        onClick={() => handleHeaderClick(`record:${item}`)}
                        className="px-2 py-1 text-sky-400 cursor-pointer"
                      >
                        기록
                      </th>
                      <th
                        onClick={() => handleHeaderClick(`score:${item}`)}
                        className="px-2 py-1 text-rose-400 cursor-pointer"
                      >
                        점수
                      </th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedDisplayedList.map((entry, index) => {
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
                        const test = entry.tests.find((t) => t.name === name);

                        return (
                          <React.Fragment key={`${entry.studentId}_${name}`}>
                            <td className="px-1 text-neutral-600 bg-neutral-100">
                              {test?.record ?? "-"}
                            </td>
                            <td className="px-1">{test?.score ?? "-"}</td>
                          </React.Fragment>
                        );
                      })}
                      <td className="py-1 px-1 font-semibold">
                        {entry.totalScore}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardLayout>
      </div>
    </div>
  );
}
