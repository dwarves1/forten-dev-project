import { useState, useEffect } from "react";
import mockNoticeData from "../mockNoticeData";
import MainLayout from "../components/layouts/MainLayout";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";
import SingleSearchBar from "../components/common/SingleSearchBar";

export default function ManageNotices() {
  // 공지 유형별 스타일
  const noticeTypeStyles = {
    "시험 안내": "bg-blue-100 text-blue-800",
    "학사 일정": "bg-green-100 text-green-800",
    "기타 공지": "bg-gray-100 text-gray-800",
  };

  // 예제 공지사항 데이터 (API 연동 가능)
  const [notices, setNotices] = useState(mockNoticeData);

  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [filteredNotices, setFilteredNotices] = useState(notices);

  // 공지 유형 리스트
  const noticeTypes = ["시험 안내", "학사 일정", "기타 공지"];

  // 새 공지 데이터 관리
  const [newNotice, setNewNotice] = useState({
    title: "",
    type: "시험 안내",
    content: "",
    attachments: [],
  });

  // 공지 수정 버튼 클릭
  const handleEditClick = (notice) => {
    setSelectedNotice(notice);
    setNewNotice(notice);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // 공지 추가 버튼 클릭
  const handleAddClick = () => {
    setIsEditMode(false);
    setNewNotice({
      title: "",
      type: "시험 안내",
      content: "",
      attachments: [],
    });
    setIsModalOpen(true);
  };

  // 공지 저장 (추가 또는 수정)
  const handleSaveNotice = () => {
    if (!newNotice.title || !newNotice.content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    if (isEditMode) {
      setNotices(
        notices.map((notice) =>
          notice.id === selectedNotice.id ? newNotice : notice
        )
      );
    } else {
      setNotices([
        ...notices,
        {
          ...newNotice,
          id: notices.length + 1,
          author: "관리자",
          date: "2025-03-15",
        },
      ]);
    }

    setIsModalOpen(false);
  };

  // 공지 삭제
  const handleDeleteNotice = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setNotices(notices.filter((notice) => notice.id !== id));
    }
  };

  // 검색 기능
  const handleSearchNotice = () => {
    if (searchTerm.length == 0) {
      setFilteredNotices(notices);
      return;
    } else {
      const filtered = notices.filter((notice) =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotices(filtered);
      return;
    }
  };

  useEffect(() => {
    setFilteredNotices(notices);
  }, [notices]);

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"공지사항 관리"} />
        <button
          onClick={handleAddClick}
          className="btn btn-outline btn-info btn-sm"
        >
          공지 추가
        </button>
      </div>

      {/* 공지사항 목록 */}
      <div className="card bg-white shadow-lg p-6">
        {/* 검색 */}
        <SingleSearchBar
          onChangeFunc={setSearchTerm}
          onChangeValue={searchTerm}
          placeholder={"제목"}
          searchFunc={handleSearchNotice}
        />

        <CardTitle textValue={"목록"} />
        <ul className="divide-y divide-stone-200">
          {filteredNotices.map((notice) => (
            <li
              key={notice.id}
              className="p-4 flex flex-col sm:flex-row justify-between items-center"
            >
              <div className="mr-auto sm:w-[80%]">
                <div className="flex gap-2">
                  <h4 className="font-bold text-sm line-clamp-1">
                    {notice.title}
                  </h4>
                  <span
                    className={`badge badge-sm ${
                      noticeTypeStyles[notice.type]
                    } font-normal min-w-max sm:mr-2`}
                  >
                    {notice.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm font-light">
                  {notice.author} · {notice.date}
                </p>
              </div>
              <div className="ml-auto mt-1 sm:mt-0 flex gap-2">
                <button
                  onClick={() => handleEditClick(notice)}
                  className="btn btn-sm btn-outline btn-info"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteNotice(notice.id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 공지 추가/수정 모달 */}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "modal-open" : "none"}`}>
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-2">
              {isEditMode ? "공지 수정" : "공지 추가"}
            </h3>

            <label className="form-control mb-4">
              <span className="label-text text-sm text-neutral-500">제목</span>
              <input
                type="text"
                className="input input-bordered w-full mb-2"
                value={newNotice.title}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, title: e.target.value })
                }
              />
            </label>

            <label className="form-control mb-4">
              <span className="label-text text-sm text-neutral-500">
                공지 유형
              </span>
              <select
                className="select select-bordered w-full mb-2"
                value={newNotice.type}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, type: e.target.value })
                }
              >
                {noticeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control mb-4">
              <span className="label-text text-sm text-neutral-500">내용</span>
              <textarea
                className="textarea textarea-bordered h-44 sm:h-72 resize-none w-full h-32 mb-2"
                value={newNotice.content}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, content: e.target.value })
                }
              ></textarea>
            </label>

            <label className="form-control mb-4">
              <span className="label-text text-sm text-neutral-500">
                파일 첨부
              </span>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                multiple
                onChange={(e) =>
                  setNewNotice({
                    ...newNotice,
                    attachments: [...e.target.files],
                  })
                }
              />
            </label>

            <div className="mt-4 flex justify-end">
              <button
                className={`btn btn-info btn-outline btn-sm`}
                onClick={handleSaveNotice}
              >
                저장
              </button>
              <button
                className="btn btn-sm btn-outline ml-2"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
