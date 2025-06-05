import { Link } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import DashboardCard from "../components/dashboard/DashboardCard";
import PageTitle from "../components/ui/PageTitle";

const dashBoardCards = [
  {
    cardName: "학생 조회",
    linkString: "/managestudents",
    bgColor: "bg-sky-50",
  },
  {
    cardName: "학원 일정",
    linkString: "/manageschedules",
    bgColor: "bg-green-50",
  },
  {
    cardName: "대학 입시 정보 관리",
    linkString: "/manageuniversities",
    bgColor: "bg-violet-50",
  },
  {
    cardName: "공지사항 관리",
    linkString: "/managenotices",
    bgColor: "bg-yellow-50",
  },
];

export default function DirectorDashboard() {
  return (
    <MainLayout>
      {/* 대시보드 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"강사 대시보드"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 담당 학생 목록 */}
        {dashBoardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </MainLayout>
  );
}
