import CardLayout from "../components/layouts/CardLayout";
import MainLayout from "../components/layouts/MainLayout";
import CardTitle from "../components/ui/CardTitle";
import PageTitle from "../components/ui/PageTitle";
import { useParams } from "react-router-dom";
import EventLineChart from "../components/common/EventLineChart";
import { useDispatch, useSelector } from "react-redux";
import { testNameList } from "../constants";
import { useEffect, useMemo } from "react";
import { getAcademyTests } from "../service/studentTestsSlice";
import { ClipLoader } from "react-spinners";

export default function AcademyTestDetail() {
  const { studentName } = useParams();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.academyTests);

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(getAcademyTests());
    }
  }, [dispatch, data]);

  const detailData = useMemo(
    () => data?.find((item) => item.name === studentName),
    [data, studentName]
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <PageTitle textvaule={"개인 실기 기록 데이터"} />
      </div>

      <CardLayout>
        <CardTitle textValue={"학생정보"} />
        {loading || !detailData ? (
          <div className="flex w-full items-center justify-center py-20">
            <div>
              <ClipLoader
                aria-label="Loading Spinner"
                color="#003AAC"
                speedMultiplier={0.8}
                size={18}
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center mt-4">
            <img
              className="border-1 border-stone-400 h-32 sm:h-40 md:h-52 object-cover transition-height duration-100"
              src="https://placehold.co/400x600"
              alt="학생 사진"
            />
            <div className="grid grid-cols-2 gap-4 md:gap-10 ml-4 sm:ml-8 w-full min-w-40">
              <div className="text-sm">
                <p className="text-neutral-500">이름</p>
                <p>{detailData?.name}</p>
              </div>
              <div className="text-sm">
                <p className="text-neutral-500">성별</p>
                <p>{detailData?.gender === "female" ? "여" : "남"}</p>
              </div>
              <div className="text-sm">
                <p className="text-neutral-500">학교</p>
                <p>{detailData?.school}</p>
              </div>
              <div className="text-sm">
                <p className="text-neutral-500">교육원</p>
                <p>{detailData?.district}</p>
              </div>
            </div>
          </div>
        )}
      </CardLayout>
      <CardLayout>
        <CardTitle textValue={"실기 기록 데이터"} />
        {loading || !detailData ? (
          <div className="flex w-full items-center justify-center py-20">
            <div>
              <ClipLoader
                aria-label="Loading Spinner"
                color="#003AAC"
                speedMultiplier={0.8}
                size={18}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 mt-4 pt-4">
            {testNameList.map((item) => (
              <EventLineChart
                key={item.code}
                monthlyTests={detailData?.monthlyTests}
                eventName={item.code}
              />
            ))}
          </div>
        )}
      </CardLayout>
    </MainLayout>
  );
}
