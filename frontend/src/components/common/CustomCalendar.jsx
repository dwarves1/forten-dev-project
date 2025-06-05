import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ko from "date-fns/locale/ko";
import { useState } from "react";

// date-fns 지역 설정
const locales = {
  "ko-kr": ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CustomCalendar({
  events,
  onSelectEvent,
  onDrillDown,
  onShowMore,
}) {
  const [curDate, setCurDate] = useState(new Date());

  // calendar 툴바
  const CustomToolbar = (props) => {
    // 이전 달로 이동
    const handlePrevMonth = () => {
      const newDate = new Date(curDate);
      newDate.setMonth(curDate.getMonth() - 1);
      setCurDate(newDate);
      props.onNavigate("PREV");
    };

    // 다음 달로 이동
    const handleNextMonth = () => {
      const newDate = new Date(curDate);
      newDate.setMonth(curDate.getMonth() + 1);
      setCurDate(newDate);
      props.onNavigate("NEXT");
    };

    return (
      <div className="flex justify-between mb-5 text-black">
        <button
          className="hover:cursor-pointer"
          onClick={() => handlePrevMonth()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left-short fill-neutral-600"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
        </button>
        <span className="text-sm sm:text-base">
          {format(curDate, "yyyy. MM")}
        </span>
        <button
          className="hover:cursor-pointer"
          onClick={() => handleNextMonth()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right-short fill-neutral-600"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
        </button>
      </div>
    );
  };

  // 이벤트 타입별 css
  const eventStyleGetter = (event) => {
    let backgroundColor = "";
    let textColor = "oklch(0 0 1)";

    switch (event.type) {
      case "inschoolTest":
        backgroundColor = "oklch(81% 0.117 11.638) ";
        break;
      case "practicalTest":
        backgroundColor = "oklch(76.5% 0.177 163.223)";
        break;
      case "submissionPeriod":
        backgroundColor = "oklch(87.9% 0.169 91.605)";
        break;
      default:
        backgroundColor = "oklch(0.923 0.003 48.717)";
    }

    return { style: { backgroundColor, color: textColor } };
  };

  return (
    <div className="h-112 sm:h-128">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        components={{ toolbar: CustomToolbar }}
        date={curDate}
        eventPropGetter={eventStyleGetter}
        selectable
        onSelectEvent={onSelectEvent}
        onDrillDown={onDrillDown}
        onShowMore={onShowMore}
      />
    </div>
  );
}
