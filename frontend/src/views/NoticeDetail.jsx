import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import mockNoticeData from "../mockNoticeData";
import MainLayout from "../components/layouts/MainLayout";

export default function NoticeDetail() {
  const { noticeId } = useParams(); // URL에서 공지사항 ID 가져오기
  const navigate = useNavigate();

  // 예제 공지사항 데이터 (실제 API 연동 필요)
  const [notice] = useState(
    mockNoticeData.filter((data) => data.id === noticeId)[0]
  );

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="ml-auto btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
        >
          목록
        </button>
      </div>

      {/* 공지사항 내용 */}
      <div className="card bg-white shadow-lg p-6 min-h-128">
        <h3 className="font-bold mb-4">{notice.title}</h3>
        <p className="text-neutral-600 text-sm">
          {notice.author} · {notice.date}
        </p>
        <div className="divider"></div>
        <p className="mt-4 overflow-auto whitespace-pre-wrap">
          {notice.content}
        </p>

        {/* 파일 첨부 섹션 */}
        {notice.attachments.length > 0 && (
          <div className="mt-20">
            <ul className="list-none text-neutral-700">
              {notice.attachments.map((file, index) => (
                <li
                  key={index}
                  className="text-sm mb-1 flex items-center underline underline-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-paperclip fill-neutral-700"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
                  </svg>
                  {/* <a href={file.url} download> */}
                  {file.name}
                  {/* </a> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
