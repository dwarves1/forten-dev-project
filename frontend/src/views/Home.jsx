import { Link } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CardLayout from "../components/layouts/CardLayout";
import HomeCarousel from "../components/HomeCarousel";
import mockNoticeData from "../mockNoticeData";
import CustomCalendar from "../components/common/CustomCalendar";
import { useState } from "react";
import mockScheduleData from "../mockScheduleData";
import { format } from "date-fns";
import PageTitle from "../components/ui/PageTitle";
import CardTitle from "../components/ui/CardTitle";

export default function HomePage() {
  const [events] = useState(mockScheduleData);
  const [showMoreEventsForDate, setShowMoreEventsForDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleShowMore = (events, date) => {
    setShowMoreEventsForDate((prev) => (prev !== date ? date : prev));

    setSelectedEvents(events);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center text-white pb-10">
      <HomeCarousel />
      {/* 공지사항 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl p-4 sm:p-6">
        <CardLayout>
          <div className="flex justify-between items-center">
            <CardTitle textValue={"📢 공지사항"} />

            <button className="btn btn-ghost btn-xs text-neutral-600">
              더보기
            </button>
          </div>
          <ul className="text-sm text-neutral-800">
            {mockNoticeData.map(
              (data, index) =>
                index < 8 && (
                  <li key={data.id} className="py-2">
                    <Link to={`/notice/${data.id}`}>
                      <p className="line-clamp-1 hover:text-neutral-400">
                        {data.title}
                      </p>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </CardLayout>

        {/* 학원일정 캘린더 */}
        <div className="md:col-span-2">
          <CardLayout>
            <CardTitle textValue={"📅 학원 일정"} />
            <CustomCalendar events={events} onShowMore={handleShowMore} />
            {selectedEvents.length > 0 && (
              <div className="text-sm mt-4 pt-4 border-t-1 border-stone-200">
                <h4 className="badge bg-stone-200">
                  📌{format(showMoreEventsForDate, "MM/dd")}
                </h4>
                <ul>
                  {selectedEvents.map((event) => (
                    <li key={event.id} className="px-2 py-1 text-neutral-700">
                      - {event.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardLayout>
        </div>
      </div>
    </div>
  );
}
