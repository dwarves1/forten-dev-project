import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mockNoticeData from "../mockNoticeData";
import MainLayout from "../components/layouts/MainLayout";
import CardLayout from "../components/layouts/CardLayout";
import SingleSearchBar from "../components/common/SingleSearchBar";
import CustomPagination from "../components/common/CustomPagination";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";

export default function NoticeList() {
  // 예제 공지사항 데이터 (API 연동 가능)
  const [notices] = useState(mockNoticeData);

  // 검색
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotices, setFilteredNotices] = useState(notices);

  // Pagination 설정
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);

  // 현재 페이지의 공지 필터링
  const displayedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // // 검색 버튼 클릭 시 실행
  const handleSearch = () => {
    const filtered = notices.filter((notice) =>
      notice.title.includes(searchTerm)
    );
    setCurrentPage(1);
    setFilteredNotices(filtered);
  };

  useEffect(() => {
    setFilteredNotices(notices);
  }, [notices]);

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"공지사항"} />
      </div>

      <CardLayout>
        {/* 검색 */}
        <SingleSearchBar
          searchFunc={handleSearch}
          onChangeFunc={setSearchTerm}
          onChangeValue={searchTerm}
          placeholder={"제목"}
        />

        {/* 공지사항 목록 */}
        <CardTitle textValue={"목록"} />
        <table className="table table-zebra text-sm">
          <thead>
            <tr>
              <th className="text-center font-normal">제목</th>
              <th className="px-0 w-[15%] text-center font-normal">날짜</th>
            </tr>
          </thead>
          <tbody>
            {displayedNotices.length > 0 ? (
              displayedNotices.map((notice) => (
                <tr key={notice.id}>
                  <td className="px-1">
                    <Link
                      to={`/notice/${notice.id}`}
                      className="hover:text-sky-500 line-clamp-1"
                    >
                      {notice.title}
                    </Link>
                  </td>
                  <td className="px-0 text-xs text-center text-neutral-600">
                    {notice.date}
                  </td>
                </tr>
              ))
            ) : (
              <p className="text-center text-neutral-600 py-16">
                검색 결과가 없습니다.
              </p>
            )}
          </tbody>
        </table>
      </CardLayout>

      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => {
          if (currentPage > 1) setCurrentPage((prev) => prev - 1);
        }}
        onNext={() => {
          if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
        }}
      />
    </MainLayout>
  );
}
