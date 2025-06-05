import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";

export default function StudentInfo() {
  const { studentId } = useParams(); // URL에서 학생 ID 가져오기
  const navigate = useNavigate();

  // 예제 학생 정보 (API 연동 필요)
  const student = {
    id: studentId,
    name: "이서연",
    birthdate: "2007-03-22",
    school: "서울여자고등학교",
    adress: "서울시 관악구 보라매로 123 101동 101호",
    studentPhone: "010-1234-5678",
    guardians: [
      { relation: "어머니", phone: "010-9876-5432" },
      { relation: "할머니", phone: "010-5678-1234" },
    ],
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={`학생 정보 | ${student.name}`} />
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm border-neutral-500 hover:bg-neutral-500 hover:text-white font-light"
        >
          목록
        </button>
      </div>

      {/* 학생 기본 정보 카드 */}
      <div className="card bg-white shadow-lg p-6 mb-6">
        <CardTitle textValue={"기본 정보"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-500 mb-1 text-sm">이름</p>
            <p className="text-sm">{student.name}</p>
          </div>
          <div>
            <p className="text-neutral-500 mb-1 text-sm">학교</p>
            <p className="text-sm">{student.school}</p>
          </div>
          <div>
            <p className="text-neutral-500 mb-1 text-sm">생년월일</p>
            <p className="text-sm">{student.birthdate}</p>
          </div>
          <div>
            <p className="text-neutral-500 mb-1 text-sm">학생 연락처</p>
            <p className="text-sm">{student.studentPhone}</p>
          </div>
          <div>
            <p className="text-neutral-500 mb-1 text-sm">주소</p>
            <p className="text-sm">{student.adress}</p>
          </div>
        </div>
      </div>

      {/* 보호자 정보 카드 */}
      <div className="card bg-white shadow-lg p-4 sm:p-6">
        <CardTitle textValue={"보호자 정보"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="divide-y divide-stone-200">
            {student.guardians.map((guardian, index) => (
              <li className="px-2 py-4 text-sm" key={index}>
                <div className="flex">
                  <p className="text-neutral-500 mr-2">관계</p>
                  <p>{guardian.relation}</p>
                </div>
                <div className="flex">
                  <p className="text-neutral-500 mr-2">연락처</p>
                  <p>{guardian.phone}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
