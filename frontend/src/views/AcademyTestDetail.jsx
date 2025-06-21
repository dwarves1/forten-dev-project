import CardLayout from "../components/layouts/CardLayout";
import MainLayout from "../components/layouts/MainLayout";
import CardTitle from "../components/ui/CardTitle";
import PageTitle from "../components/ui/PageTitle";
import { useParams } from "react-router-dom";
import EventLineChart from "../components/common/EventLineChart";
import { useDispatch, useSelector } from "react-redux";
import { testNameList } from "../constants";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { getAcademyTests } from "../service/studentTestsSlice";
import { ClipLoader } from "react-spinners";
import EventRadarChart from "../components/common/EventRadarChart";
import { getStudents } from "../service/studentSlice";

export default function AcademyTestDetail() {
  const { studentCode } = useParams();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.academyTests);
  const { students } = useSelector((state) => state.student);

  // 페이지 진입 시 스크롤 위치 조정
  useLayoutEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  // test 데이터 로드
  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(getAcademyTests());
    }
  }, [dispatch, data]);

  // 학생 데이터 로드
  useEffect(() => {
    if (!students || students.length === 0) {
      dispatch(getStudents());
    }
  }, [dispatch, students]);

  const testData = useMemo(
    () => data?.find((item) => item.studentCode === studentCode),
    [data, studentCode]
  );

  const studentData = useMemo(
    () => students?.find((st) => st.studentCode === studentCode),
    [students, studentCode]
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <PageTitle textvaule={"개인 실기 기록 데이터"} />
      </div>

      <CardLayout>
        <CardTitle textValue={"학생정보"} />
        {loading || !testData ? (
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
            {studentData?.imageSrc != null ? (
              <img
                className="border-1 border-stone-400 h-32 sm:h-40 md:h-52 aspect-2/3 object-cover transition-height duration-100"
                src={`${import.meta.env.VITE_API_BASE_URL}/${
                  studentData.imageSrc
                }`}
                alt="학생 사진"
              />
            ) : (
              <div className="flex items-center justify-center text-center bg-stone-300 h-32 sm:h-40 md:h-52 aspect-2/3 transition-height duration-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M19 5v11.17l2 2V5c0-1.1-.9-2-2-2H5.83l2 2zM2.81 2.81L1.39 4.22L3 5.83V19c0 1.1.9 2 2 2h13.17l1.61 1.61l1.41-1.41zM5 19V7.83l7.07 7.07l-.82 1.1L9 13l-3 4h8.17l2 2z"
                  ></path>
                </svg>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 md:gap-10 ml-4 sm:ml-8 w-full min-w-40">
              <div className="text-sm">
                <p className="text-neutral-500">이름</p>
                <p>{studentData?.name}</p>
              </div>
              <div className="text-sm">
                <p className="text-neutral-500">성별</p>
                <p>{studentData?.gender === "female" ? "여" : "남"}</p>
              </div>
              <div className="text-sm">
                <p className="text-neutral-500">학교</p>
                <p>{studentData?.school}</p>
              </div>
              <div className="text-sm">
                <p className="text-neutral-500">교육원</p>
                <p>{studentData?.district}</p>
              </div>
            </div>
          </div>
        )}
      </CardLayout>
      <CardLayout minHeight={"min-h-150"}>
        <CardTitle textValue={"실기 기록 데이터"} />
        {loading || !testData ? (
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
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 mt-4 pt-4">
              {testNameList.map((item) => (
                <EventLineChart
                  key={item.code}
                  monthlyTests={testData?.monthlyTests}
                  eventName={item.code}
                />
              ))}
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
              <EventRadarChart
                monthlyTests={testData?.monthlyTests}
                gender={testData?.gender}
                type="avg"
              />
              <EventRadarChart
                monthlyTests={testData?.monthlyTests}
                gender={testData?.gender}
                type="max"
              />
            </div>
          </>
        )}
      </CardLayout>
    </MainLayout>
  );
}
