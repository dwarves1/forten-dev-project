import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import CustomPagination from "../components/common/CustomPagination";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";

export default function StudentList() {
  // 예제 학생 데이터 (API 연동 필요)
  const students = [
    { id: 1, name: "김민수", birthdate: "2006-05-15", school: "서울고등학교" },
    {
      id: 2,
      name: "이서연",
      birthdate: "2007-03-22",
      school: "서울여자고등학교",
    },
    {
      id: 3,
      name: "박지훈",
      birthdate: "2006-10-18",
      school: "인천체육고등학교",
    },
    {
      id: 4,
      name: "최지훈",
      birthdate: "2006-11-10",
      school: "인천체육고등학교",
    },
    {
      id: 5,
      name: "김지원",
      birthdate: "2006-11-10",
      school: "인천체육고등학교",
    },
    {
      id: 6,
      name: "김서진",
      birthdate: "2006-11-10",
      school: "인천체육고등학교",
    },
    {
      id: 7,
      name: "박서준",
      birthdate: "2007-11-10",
      school: "서울체육고등학교",
    },
    {
      id: 8,
      name: "박정훈",
      birthdate: "2008-04-10",
      school: "인천체육고등학교",
    },
    {
      id: 9,
      name: "정지석",
      birthdate: "2009-06-19",
      school: "인천체육고등학교",
    },
    {
      id: 10,
      name: "박지영",
      birthdate: "2006-11-10",
      school: "서울체육고등학교",
    },
    {
      id: 11,
      name: "이정원",
      birthdate: "2006-08-01",
      school: "구리체육고등학교",
    },
    {
      id: 12,
      name: "김수영",
      birthdate: "2006-08-01",
      school: "구리체육고등학교",
    },
    {
      id: 13,
      name: "박지영",
      birthdate: "2008-09-02",
      school: "구리체육고등학교",
    },
    {
      id: 14,
      name: "최수현",
      birthdate: "2006-08-01",
      school: "구리체육고등학교",
    },
  ];

  // Pagination 설정
  const itemsPerPage = 10;
  const [filtered, setFilterd] = useState(students);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const [searchTerm, setSearchTerm] = useState({ student: "", school: "" });
  const navigate = useNavigate();

  // 현재 페이지의 학생 데이터 필터링
  const displayedStudents = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchBtn = () => {
    // 학생명 필수
    if (searchTerm.student === "") {
      alert("학생명을 입력하세요");
      return;
    }

    const filteredStudents = students.filter((student) => {
      const studentMatch = student.name
        .toLowerCase()
        .includes(searchTerm.student.toLowerCase());
      const schoolMatch = searchTerm.school
        ? student.school.toLowerCase().includes(searchTerm.school.toLowerCase())
        : true; // school 검색은 빈값 허용

      return studentMatch && schoolMatch;
    });

    setFilterd(filteredStudents);
    setCurrentPage(1);
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"학생 조회"} />
        <div
          className="btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
          onClick={() => navigate(-1)}
        >
          대시보드
        </div>
      </div>

      <div className="card bg-white shadow-lg p-6">
        {/* 검색 */}
        <div className="flex justify-center mb-8">
          <div className="flex justify-center">
            <div className="mr-1">
              <label className="input input-sm sm:input-md w-full mb-2">
                <span className="label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-building"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="학교명"
                  className="min-w-20"
                  onChange={(e) =>
                    setSearchTerm((prev) => ({
                      ...prev,
                      school: e.target.value,
                    }))
                  }
                />
              </label>
              <label className="input input-sm sm:input-md w-full">
                <span className="label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="학생명"
                  onChange={(e) =>
                    setSearchTerm((prev) => ({
                      ...prev,
                      student: e.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <button
              onClick={handleSearchBtn}
              className="btn btn-sm sm:btn-md h-18 sm:h-22"
            >
              검색
            </button>
          </div>
        </div>
        {/* 학생목록 */}
        <CardTitle textValue={"목록"} />
        <ul className="space-y-2 divide-y divide-stone-200">
          {displayedStudents.map((student) => (
            <li
              key={student.id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-2 py-4 cursor-pointer"
            >
              <div className="mb-1 sm:mb-0">
                <h4>{student.name}</h4>
                <p className="text-neutral-500 text-sm">
                  {student.birthdate} | {student.school}
                </p>
              </div>
              <div className="flex gap-1 ml-auto">
                <Link to={`/studentinfo/${student.id}`}>
                  <button className="btn btn-xs sm:btn-sm btn-outline font-normal">
                    학생정보
                  </button>
                </Link>
                <Link to={`/grades/${student.id}`}>
                  <button className="btn btn-xs sm:btn-sm btn-outline font-normal">
                    성적
                  </button>
                </Link>
                <Link to={`/records/${student.id}`}>
                  <button className="btn btn-xs sm:btn-sm btn-outline font-normal">
                    실기기록
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {/* Pagination */}
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((prev) => prev - 1)}
          onNext={() => setCurrentPage((prev) => prev + 1)}
        />
      </div>
    </MainLayout>
  );
}
