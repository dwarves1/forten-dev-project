import { useState } from "react";
import CardLayout from "../components/layouts/CardLayout";
import MainLayout from "../components/layouts/MainLayout";
import CardTitle from "../components/ui/CardTitle";
import PageTitle from "../components/ui/PageTitle";
import mockTestData from "../mockTestData";
import { useParams } from "react-router-dom";
import EventLineChart from "../components/common/EventLineChart";

const testItem = [
  "제자리멀리뛰기",
  "윗몸일으키기",
  "Z-런달리기",
  "메디신볼",
  "100M달리기",
  "유연성(좌전굴)",
  "던지기",
  "배근력",
  "10M왕복",
  "20M왕복",
];

export default function AcademyTestDetail() {
  const { studentId } = useParams();
  const [detailData] = useState(
    mockTestData.find((item) => item.studentId === studentId)
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <PageTitle textvaule={"개인 실기 기록 데이터"} />
      </div>

      <CardLayout>
        <CardTitle textValue={"학생정보"} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          <div className="text-sm">
            <p className="text-neutral-500">이름</p>
            <p>{detailData.name}</p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">성별</p>
            <p>{detailData.gender === "female" ? "여" : "남"}</p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">학생코드</p>
            <p>{detailData.studentId}</p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">학교</p>
            <p>{detailData.school}</p>
          </div>
          <div className="text-sm">
            <p className="text-neutral-500">교육권</p>
            <p>{detailData.educationalGroup}</p>
          </div>
        </div>
      </CardLayout>
      <CardLayout>
        <CardTitle textValue={"실기 기록 데이터"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 mt-4">
          {testItem.map((item) => (
            <EventLineChart
              key={item}
              monthlyTests={detailData.monthlyTests}
              eventName={item}
            />
          ))}
        </div>
      </CardLayout>
    </MainLayout>
  );
}
