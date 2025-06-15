import React, { useEffect, useMemo } from "react";
import PageTitle from "../components/ui/PageTitle";
import CardLayout from "../components/layouts/CardLayout";
import CardTitle from "../components/ui/CardTitle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAcademyTests } from "../service/studentTestsSlice";
import { ClipLoader } from "react-spinners";
import { testNameList } from "../constants";

const SORT_TYPE = { desc: "desc", asc: "asc" };

export default function AcademyTest() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.academyTests);

  const [allMonths, setALLMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [displayedList, setDisplayedList] = useState([]);
  const [gender, setGender] = useState("all");
  const [district, setDistrict] = useState("all");
  const [name, setName] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: SORT_TYPE.desc,
  });

  // 월 선택 변경 핸들러 함수
  const handleSelectMonth = async (e) => {
    const value = e.target.value;
    setSelectedMonth(value);

    setGender("all");
    setDistrict("all");
    setName("");

    setSortConfig({ key: null, direction: SORT_TYPE.desc });

    await dispatch(getAcademyTests());
  };

  // 학생 검색 버튼 함수
  const handleSearchClick = async () => {
    setSortConfig({ key: null, direction: SORT_TYPE.desc });

    await dispatch(getAcademyTests());
  };

  // 데이터 정렬 함수
  const handleHeaderClick = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === SORT_TYPE.desc ? "asc" : "desc",
        };
      }

      return { key, direction: SORT_TYPE.desc };
    });
  };

  // 화면용 정렬 리스트
  const sortedDisplayedList = useMemo(() => {
    if (!displayedList) return [];
    if (!sortConfig.key) return displayedList;

    const sorted = [...displayedList].sort((x, y) => {
      if (sortConfig.key.startsWith("score:")) {
        const testName = sortConfig.key.split(":")[1];

        const xEvent = x.testMap.get(testName);
        const yEvent = y.testMap.get(testName);

        const xScore = parseFloat(xEvent?.score ?? "0");
        const yScore = parseFloat(yEvent?.score ?? "0");

        const res = xScore - yScore;

        return sortConfig.direction === SORT_TYPE.desc ? -res : res;
      } else if (sortConfig.key.startsWith("record:")) {
        const testName = sortConfig.key.split(":")[1];

        const xEvent = x.testMap.get(testName);
        const yEvent = y.testMap.get(testName);

        const xRecord = parseFloat(xEvent?.record ?? "0");
        const yRecord = parseFloat(yEvent?.record ?? "0");

        const res = xRecord - yRecord;

        return sortConfig.direction === SORT_TYPE.desc ? -res : res;
      }

      let res = 0;

      if (sortConfig.key === "month") {
        const date1 = new Date(x.month + "-01");
        const date2 = new Date(x.month + "-01");

        res = date1 - date2;
      } else {
        const v1 = x[sortConfig.key];
        const v2 = y[sortConfig.key];

        const n1 = parseFloat(v1);
        const n2 = parseFloat(v2);
        const isNum = !isNaN(n1) && !isNaN(n2);

        if (isNum) {
          res = n1 - n2;
        } else {
          res = String(v1).localeCompare(String(v2));
        }
      }
      return sortConfig.direction === SORT_TYPE.desc ? -res : res;
    });

    return sorted;
  }, [displayedList, sortConfig]);

  // 데이터 최초 로드
  useEffect(() => {
    dispatch(getAcademyTests());
  }, [dispatch]);

  // 데이터 세팅
  useEffect(() => {
    if (!data || data.length === 0) return;

    const months = Array.from(
      new Set(data.flatMap((s) => Object.keys(s.monthlyTests)))
    );
    const sortedMonths = months.sort().reverse();
    const initialMonth = sortedMonths[0] || "all";

    setALLMonths(sortedMonths);
    setSelectedMonth((prev) => prev ?? initialMonth);

    // 필터링
    const filtered = data.filter((student) => {
      const matchName = name === "" || student.name.includes(name);
      const matchGender = gender === "all" || student.gender === gender;
      const matchDistrict = district === "all" || student.district === district;
      const matchDate =
        selectedMonth === "all" ? true : student.monthlyTests[selectedMonth];

      return matchName && matchGender && matchDistrict && matchDate;
    });

    // 디스플레이용 매핑
    const displayed = filtered.flatMap((student) =>
      Object.entries(student.monthlyTests)
        .filter(([month]) => selectedMonth === "all" || selectedMonth === month)
        .map(([month, data]) => {
          const testMap = new Map();
          data.tests.forEach((test) => {
            testMap.set(test.name, test);
          });

          return {
            studentCode: student.studentCode,
            name: student.name,
            gender: student.gender,
            school: student.school,
            district: student.district,
            month,
            totalScore: data.totalScore,
            tests: data.tests,
            testMap,
          };
        })
    );

    setDisplayedList(displayed);
  }, [data]);

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
              value={selectedMonth || "all"}
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
        <CardLayout minHeight={"min-h-200"}>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchClick();
              }}
            >
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
                          checked={gender === "all"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                      </label>
                      <label className="mr-2">
                        남
                        <input
                          type="radio"
                          name="radio-10"
                          className="radio radio-xs ml-1 checked:before:bg-blue-400 checked:border-blue-400"
                          value="male"
                          checked={gender === "male"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                      </label>
                      <label>
                        여
                        <input
                          type="radio"
                          name="radio-10"
                          className="radio radio-xs ml-1 checked:before:bg-blue-400 checked:border-blue-400"
                          value="female"
                          checked={gender === "female"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span>교육원</span>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="select h-8 w-fit focus:border-blue-400"
                    >
                      <option value={"all"}>전체</option>
                      <option value={"남구"}>남구</option>
                      <option value={"동구"}>동구</option>
                      <option value={"북구"}>북구</option>
                      <option value={"중구"}>중구</option>
                      <option value={"기타"}>기타</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <span>학생 이름</span>
                    <input
                      value={name}
                      className="input h-8 w-32 focus:border-blue-400"
                      placeholder="이름"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <button onClick={handleSearchClick} className="btn h-8">
                  검색
                </button>
              </fieldset>
            </form>
          </div>
          <div className="flex h-10">
            <CardTitle textValue={"목록"} />
            {loading && (
              <div className="ml-auto">
                <ClipLoader
                  aria-label="Loading Spinner"
                  color="#003AAC"
                  speedMultiplier={0.8}
                  size={18}
                />
              </div>
            )}
          </div>
          <div className="w-full overflow-x-auto pb-2">
            <table
              className={`table w-full text-sm ${
                !data || (data.length === 0 && "min-h-100 h-full")
              }`}
            >
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
                    <span
                      className="cursor-pointer"
                      onClick={() => handleHeaderClick("month")}
                    >
                      월별
                    </span>
                  </th>
                  <th rowSpan={2} className="px-2 py-1">
                    <div className="flex flex-col items-center">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleHeaderClick("district")}
                      >
                        교육원
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
                  {testNameList.map((item) => (
                    <th key={item.code} colSpan={2} className="px-2 py-1">
                      <div className="flex flex-col items-center">
                        <span>{item.label}</span>
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
                  {testNameList.map((item, i) => (
                    <React.Fragment key={i}>
                      <th
                        onClick={() => handleHeaderClick(`record:${item.code}`)}
                        className="px-2 py-1 text-sky-400 cursor-pointer"
                      >
                        기록
                      </th>
                      <th
                        onClick={() => handleHeaderClick(`score:${item.code}`)}
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
                      key={`${entry.studentCode}_${index}`}
                      className="text-center"
                    >
                      <td className="py-1 px-2 text-nowrap sticky left-0 bg-white">
                        <Link
                          to={`/academy-test/detail/${entry.studentCode}`}
                          className="hover:text-sky-500"
                        >
                          {entry.name}
                        </Link>
                      </td>
                      <td
                        className={`py-1 px-1 ${
                          entry.gender === "female"
                            ? "text-red-400"
                            : "text-blue-400"
                        }`}
                      >
                        {entry.gender == "female" ? "여" : "남"}
                      </td>
                      <td className="py-1 px-1 tracking-tight">
                        {entry.month}
                      </td>
                      <td className="py-1 px-1 tracking-tight">
                        {entry.district}
                      </td>
                      <td className="py-1 px-1 tracking-tight text-nowrap border-r border-stone-300">
                        {entry.school}
                      </td>
                      {testNameList.map((item, index) => {
                        const test = entry.testMap.get(item.code);

                        return (
                          <React.Fragment
                            key={`${entry.studentCode}_${item.code}_${index}`}
                          >
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
