import { useCallback, useEffect, useMemo, useState } from "react";
import CardLayout from "../components/layouts/CardLayout";
import MainLayout from "../components/layouts/MainLayout";
import CardTitle from "../components/ui/CardTitle";
import PageTitle from "../components/ui/PageTitle";
import { getScore, scoreTable } from "../constants/scores";
import { useDispatch, useSelector } from "react-redux";
import {
  academyTestsSliceResetStatus,
  addTestRecord,
  getAcademyTests,
} from "../service/studentTestsSlice";
import { getStudents } from "../service/studentSlice";
import { getTestNameInKorean, testNameList } from "../constants";
import toast from "react-hot-toast";

export default function AddAcademyTest() {
  const dispatch = useDispatch();
  const { data, success, error, loading } = useSelector(
    (state) => state.academyTests
  );
  const { students } = useSelector((state) => state.student);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedStudentTests, setSelectedStudentTests] = useState(null);
  const [allMonths, setAllmonths] = useState([]);
  const [newMonth, setNewMonth] = useState("");
  const [records, setRecords] = useState(
    testNameList.reduce((acc, cur) => ({ ...acc, [cur.code]: "" }), {})
  );
  const [scores, setScores] = useState(
    testNameList.reduce((acc, cur) => ({ ...acc, [cur.code]: 0 }), {})
  );

  // 학생 검색 필터링
  const filteredStudents = useMemo(() => {
    return students?.filter((student) => student.name.includes(searchTerm));
  }, [students, searchTerm]);

  // 학생 선택 함수
  const handleSelectStudent = useCallback(
    (value) => {
      if (selectedStudent !== null) {
        const reSelect = window.confirm(
          "저장하지 않은 정보는 사라지게 됩니다. 학생을 변경할까요?"
        );

        if (reSelect) {
          setSelectedStudent(value);
          setSearchTerm("");
          setSelectedMonth("");
          setRecords(
            testNameList.reduce((acc, cur) => ({ ...acc, [cur.code]: "" }), {})
          );
          setScores(
            testNameList.reduce((acc, cur) => ({ ...acc, [cur.code]: 0 }), {})
          );
        } else {
          setSearchTerm("");
        }
      } else {
        setSelectedStudent(value);
        setSearchTerm("");
        setSelectedMonth("");
      }
      dispatch(getAcademyTests());
    },
    [dispatch, selectedStudent]
  );

  // 날짜 선택 함수
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    if (selectedStudentTests !== null && selectedStudentTests[month]) {
      const { tests } = selectedStudentTests[month];

      const updatedRecords = tests.reduce((acc, test) => {
        acc[test.name] = test.record;
        return acc;
      }, {});

      const updatedScores = tests.reduce((acc, test) => {
        acc[test.name] = Number(test.score);
        return acc;
      }, {});

      setRecords(updatedRecords);
      setScores(updatedScores);
    }
  };

  // 기록 input 핸들러 함수
  const handleRecordChange = (testName, value) => {
    setRecords((prev) => ({
      ...prev,
      [testName]: value,
    }));

    const newScore = getScore(testName, selectedStudent.gender, value);
    setScores((prev) => ({ ...prev, [testName]: newScore }));
  };

  // 저장 요청 함수
  const handleSubmit = () => {
    if (loading) return;

    if (selectedMonth === "" && newMonth === "") {
      alert("날짜 선택은 필수입니다.");
      return;
    }

    let payload = {
      studentCode: selectedStudent.studentCode,
    };

    if (selectedMonth === "newMonth") {
      payload["recordYm"] = newMonth.replace("-", "");
    } else {
      payload["recordYm"] = selectedMonth.replace("-", "");
    }

    testNameList.forEach((item) => {
      if (
        records[item.code] !== "" &&
        records[item.code] !== 0 &&
        !isNaN(records[item.code])
      ) {
        payload[item.code] = Number(records[item.code]);
      }
    });

    dispatch(addTestRecord(payload));
  };

  // 테스트 총점
  const totalScore = useMemo(() => {
    return Object.values(scores).reduce((a, b) => a + b, 0);
  }, [scores]);

  // 학생 목록 로드
  useEffect(() => {
    dispatch(getStudents());

    // 주기적으로 학생 목록 최신화
    const interval = setInterval(() => {
      dispatch(getStudents());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (selectedStudent) {
      dispatch(getAcademyTests());
    }
  }, [dispatch, selectedStudent]);

  useEffect(() => {
    if (!selectedStudent || !data) return;

    const found = data.find(
      (d) => d.studentCode === selectedStudent.studentCode
    );

    // 테스트 기록이 없는 학생일 경우
    if (!found) {
      setSelectedStudentTests(null);
      setAllmonths([]);
      return;
    }

    setSelectedStudentTests(found.monthlyTests);

    if (found.monthlyTests) {
      const months = Object.keys(found.monthlyTests).sort();
      setAllmonths(months);
    } else {
      setAllmonths([]);
    }
  }, [data, selectedStudent]);

  // 등록 성공&실패 시 알림
  useEffect(() => {
    if (success) {
      toast.success("테스트 기록이 성공적으로 저장되었습니다.");

      dispatch(academyTestsSliceResetStatus());
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(`테스트 기록 저장에 실패했습니다. \n ${error}`);

      dispatch(academyTestsSliceResetStatus());
    }
  }, [error]);

  return (
    <MainLayout>
      <PageTitle textvaule={"실기 기록 등록"} />
      <div className="flex justify-end mb-4">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="btn btn-sm btn-outline btn-info"
        >
          {loading ? "저장중" : "저장"}
        </button>
      </div>
      <CardLayout>
        <div className="relative">
          <div className="flex justify-center">
            <label className="input h-10 w-full mb-8">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                type="text"
                className="grow"
                placeholder="학생이름"
                disabled={loading}
              />
            </label>
          </div>
          {searchTerm ? (
            filteredStudents.length > 0 ? (
              <div className="bg-white text-sm absolute top-8 sm:top-10 z-10 w-full border border-stone-200 max-h-56 overflow-y-auto">
                <ul className="divide-y divide-stone-200">
                  {filteredStudents.map((student) => (
                    <li
                      key={student.name}
                      className="p-4 hover:bg-neutral-100 cursor-pointer"
                      onClick={() => handleSelectStudent(student)}
                    >
                      <div className="flex">
                        <div>
                          {student.name}(
                          {student.gender === "female" ? "여" : "남"})
                        </div>
                        <div className="text-sm text-gray-500 ml-auto">
                          {student.school} / {student.district}
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
        <div className="flex w-full items-center mt-4">
          {selectedStudent && selectedStudent?.imageSrc !== null ? (
            <img
              className="border-1 border-stone-400 h-28 sm:h-36 md:h-48 aspect-2/3 object-cover transition-height duration-100"
              src={`http://localhost:8080/images/${selectedStudent?.imageSrc}`}
              alt="학생 이미지"
            />
          ) : (
            <div className="flex items-center justify-center text-center bg-stone-300 h-28 sm:h-36 md:h-48 aspect-2/3 transition-height duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
              >
                <path
                  fill="currentColor"
                  d="M19 5v11.17l2 2V5c0-1.1-.9-2-2-2H5.83l2 2zM2.81 2.81L1.39 4.22L3 5.83V19c0 1.1.9 2 2 2h13.17l1.61 1.61l1.41-1.41zM5 19V7.83l7.07 7.07l-.82 1.1L9 13l-3 4h8.17l2 2z"
                ></path>
              </svg>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 md:gap-10 ml-4 sm:ml-8 w-full min-w-40">
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
              <p className="text-neutral-500">학교</p>
              <p>{selectedStudent?.school ?? ""}</p>
            </div>
            <div className="text-sm">
              <p className="text-neutral-500">교육원</p>
              <p>{selectedStudent?.district ?? ""}</p>
            </div>
          </div>
        </div>
      </CardLayout>
      <CardLayout>
        <CardTitle textValue={"실기 기록 입력"} />
        {!selectedStudent && (
          <span className="text-neutral-400 text-sm text-center my-auto">
            선택된 학생이 없습니다.
          </span>
        )}
        {selectedStudent && (
          <>
            <fieldset className="fieldset flex flex-col sm:flex-row">
              <legend className="fieldset-legend">날짜선택</legend>
              <div>
                <select
                  disabled={loading}
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="max-w-52 select select-sm sm:select-md focus:border-blue-400"
                >
                  <option disabled value="">
                    날짜를 선택하세요
                  </option>
                  {allMonths.map((month) => (
                    <option value={month}>{month}</option>
                  ))}
                  <option value={"newMonth"}>새 날짜 추가</option>
                </select>
              </div>
              {selectedMonth === "newMonth" && (
                <div className="max-w-52">
                  <input
                    type="month"
                    value={newMonth}
                    onChange={(e) => setNewMonth(e.target.value)}
                    className="select select-sm sm:select-md focus:border-blue-400"
                  />
                </div>
              )}
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
                  {testNameList.map((item) => (
                    <tr key={item.code}>
                      <td className="py-2 text-nowrap">
                        {getTestNameInKorean(item.code)}(
                        {scoreTable[item.code]["recordUnit"]})
                      </td>
                      <td className="py-2 px-2 sm:px-3">
                        <input
                          disabled={loading}
                          type="number"
                          className="input h-8 focus:border-blue-400"
                          value={records[item.code] ?? ""}
                          onChange={(e) =>
                            handleRecordChange(item.code, e.target.value)
                          }
                        />
                      </td>
                      <td className="py-2 px-2 sm:px-3">
                        <input
                          type="number"
                          readOnly
                          className="input h-8"
                          value={scores[item.code] ?? 0}
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
