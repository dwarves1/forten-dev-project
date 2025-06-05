import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mockUnivData from "../mockUnivData";
import SingleSearchBar from "../components/common/SingleSearchBar";
import MainLayout from "../components/layouts/MainLayout";
import CustomPagination from "../components/common/CustomPagination";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";

const TEACHER_CERTIFICATION_TYPE = {
  possible: { text: "가능", color: "bg-green-200" },
  impossible: { text: "불가능", color: "bg-red-200" },
  conditionally: { text: "조건부가능", color: "bg-orange-200" },
};

export default function UniversityList() {
  // 예제 대학 데이터 (API 연동 필요)
  const [universities] = useState(mockUnivData);

  // 검색
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUniversites, setFilteredUniversites] = useState(universities);

  // Pagination 설정
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUniversites.length / itemsPerPage);

  // 현재 페이지의 대학 데이터 필터링
  const displayedUniversities = filteredUniversites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 검색 기능
  const handleSearchBtn = () => {
    const filtered = universities.filter((univ) =>
      univ.univName.includes(searchTerm)
    );
    setCurrentPage(1);
    setFilteredUniversites(filtered);
  };

  useEffect(() => {
    setFilteredUniversites(universities);
  }, [universities]);

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"대학입시정보"} />
      </div>

      {/* 대학 리스트 */}
      <div className="card bg-white shadow-lg p-6">
        <div className="flex justify-end items-center mb-4">
          <span className="text-sm">교직이수</span>
          <div className="badge badge-sm bg-green-200 ml-1">가능</div>
          <div className="badge badge-sm bg-orange-200 ml-1">조건부가능</div>
          <div className="badge badge-sm bg-red-200 ml-1">불가능</div>
        </div>
        {/* 검색 */}
        <SingleSearchBar
          searchFunc={handleSearchBtn}
          onChangeFunc={setSearchTerm}
          onChangeValue={searchTerm}
          placeholder={"대학명"}
        />

        <CardTitle textValue={"목록"} />
        <ul className="divide-y divide-stone-200 mt-2">
          {displayedUniversities.length > 0 ? (
            displayedUniversities.map((univ) => (
              <li
                key={univ.id}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100"
              >
                <Link
                  to={`/university/detail/${univ.id}`}
                  className="w-full px-2 py-4"
                >
                  <div>
                    <h4 className="text-sm">{univ.univName}</h4>

                    <div>
                      <span className="text-sm text-neutral-600">
                        {univ.department}
                      </span>
                      <div
                        className={`ml-1 badge badge-sm ${
                          TEACHER_CERTIFICATION_TYPE[univ.teacherCertification]
                            .color
                        }`}
                      >
                        {
                          TEACHER_CERTIFICATION_TYPE[univ.teacherCertification]
                            .text
                        }
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-center text-sm text-neutral-600 py-16">
              검색 결과가 없습니다.
            </p>
          )}
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
