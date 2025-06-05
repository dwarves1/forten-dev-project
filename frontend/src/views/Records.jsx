import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import CardLayout from "../components/layouts/CardLayout";
import CustomPagination from "../components/common/CustomPagination";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";

export default function IndividualRecords() {
  const [records, setRecords] = useState([
    { id: 1, category: "3월 정규 테스트", date: "2025-03-10" },
    { id: 2, category: "3월 임시 측정", date: "2025-03-18" },
    { id: 3, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 4, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 5, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 6, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 7, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 8, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 9, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 10, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 11, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 12, category: "2월 정규 테스트", date: "2025-02-10" },
    { id: 13, category: "2월 정규 테스트", date: "2025-02-10" },
  ]);
  const [accountIds, setAccountIds] = useState([]);

  const { studentId } = useParams();
  const navigate = useNavigate();

  // 예제 학생 정보 (API 연동 필요)
  const student = {
    id: studentId,
    name: "이서연",
    birthdate: "2007-03-22",
    school: "서울여자고등학교",
    grade: "1학년",
  };

  // Pagination 설정
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(records.length / itemsPerPage);

  // 현재 페이지의 공지 필터링
  const displayedRecords = records.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 계정 선택
  const handleCheckAccount = (id) => {
    setAccountIds((prev) =>
      prev.includes(id) ? prev.filter((accid) => accid !== id) : [...prev, id]
    );
  };

  // 계정 그룹 삭제
  const handleDeleteAccountsGroup = () => {
    if (accountIds.length == 0) {
      return;
    }
    if (window.confirm("선택한 기록을 삭제할까요?")) {
      const newAccounts = records.filter((acc) => !accountIds.includes(acc.id));
      setRecords(newAccounts);
      setAccountIds([]); // 삭제 후 체크된 ID 초기화
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={`실기기록 | ${student.name}`} />
        <div
          className="btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
          onClick={() => navigate(-1)}
        >
          학생목록
        </div>
      </div>
      {/* 학생 리스트 */}
      <CardLayout>
        <div className="flex items-center mb-6">
          <CardTitle textValue={"목록"} />
          <div className="flex ml-auto">
            <button
              className="btn btn-sm btn-outline btn-error mr-4"
              onClick={handleDeleteAccountsGroup}
            >
              삭제
            </button>
            <Link to={`/managestudents/${studentId}/addrecord`}>
              <button className="btn btn-sm btn-outline btn-accent">
                추가
              </button>
            </Link>
          </div>
        </div>
        <ul className="space-y-2 divide-y divide-stone-200">
          {displayedRecords.map((record) => (
            <li
              key={record.id}
              className="flex justify-between items-center px-4 py-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="mr-4 checkbox checkbox-xs sm:checkbox-sm"
                onChange={() => handleCheckAccount(record.id)}
              />
              <div className="mr-auto">
                <h4 className="text-sm font-bold">{record.category}</h4>
              </div>
              <div>
                <Link to={`/${studentId}/record/${record.id}`}>
                  <button className="btn btn-sm btn-outline">보기</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((prev) => prev - 1)}
          onNext={() => setCurrentPage((prev) => prev + 1)}
        />
      </CardLayout>
    </MainLayout>
  );
}
