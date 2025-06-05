import { useState } from "react";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MainLayout from "../components/layouts/MainLayout";
import CustomCalendar from "../components/common/CustomCalendar";
import mockScheduleData from "../mockScheduleData";
import CardLayout from "../components/layouts/CardLayout";
import { Link } from "react-router-dom";
import PageTitle from "../components/ui/PageTitle";

export default function ManageSchedules() {
  const [events, setEvents] = useState(mockScheduleData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showMore, setShowMore] = useState([]);
  const [showMoreEventsForDate, setShowMoreEventsForDate] = useState(null);

  // 새 일정 데이터 관리
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    type: "실기 시험",
  });

  // 일정 클릭 시 상세 정보 표시
  const handleSelectEvent = (event) => {
    if (selectedEvent) {
      setSelectedEvent(null);
      setIsEditMode(false);
    } else {
      const selected = {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      };
      setSelectedEvent(selected);
      setIsEditMode(true);
    }
  };

  // 일정 추가 버튼 클릭
  const handleAddEvent = () => {
    setIsEditMode(false);
    setNewEvent({ title: "", start: null, end: null, type: "실기 시험" });
    setIsAddMode(true);
  };

  // 일정 저장 (추가 또는 수정)
  const handleSaveEvent = () => {
    if (isEditMode) {
      if (window.confirm("수정사항을 저장할까요?")) {
        setEvents(
          events.map((event) =>
            event.id === selectedEvent.id ? selectedEvent : event
          )
        );
      }
    } else {
      if (!newEvent.title || !newEvent.start || !newEvent.end) {
        alert("모든 항목을 입력해주세요.");
        return;
      }
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    }

    // 모달 닫기 및 상태 초기화
    setIsAddMode(false);
    setSelectedEvent(null);
    setIsEditMode(false);
  };

  // 일정 삭제
  const handleDeleteEvent = () => {
    if (window.confirm("이 일정을 삭제할까요?")) {
      setEvents((prev) => prev.filter((item) => item.id !== selectedEvent.id));
      setSelectedEvent(null);
    } else {
      return;
    }
  };

  // showMore 핸들러
  const handleShowMore = (events, date) => {
    setShowMoreEventsForDate((prev) => (prev !== date ? date : prev));

    setShowMore(events);
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle textvaule={"학원 일정"} />
        <button
          className="btn btn-outline btn-info btn-sm"
          onClick={handleAddEvent}
        >
          일정 추가
        </button>
      </div>

      {/* 캘린더 */}
      <CardLayout className="card bg-white shadow-lg p-6">
        <CustomCalendar
          events={events}
          onSelectEvent={handleSelectEvent}
          onShowMore={handleShowMore}
        />
        {showMore.length > 0 && (
          <div className="text-sm mt-4 pt-4 border-t-1 border-stone-200">
            <h4 className="badge bg-stone-200">
              📌{format(showMoreEventsForDate, "MM/dd")}
            </h4>
            <ul>
              {showMore.map((event) => (
                <li
                  key={event.id}
                  className="px-2 py-1 text-neutral-700 cursor-pointer hover:text-neutral-400"
                  onClick={() => handleSelectEvent(event)}
                >
                  - {event.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardLayout>

      {/* 상세 일정 */}
      {selectedEvent && (
        <dialog className={`modal ${selectedEvent ? "modal-open" : "none"}`}>
          <div className="modal-box">
            <div className="flex mb-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveEvent();
                }}
                className="btn btn-sm btn-outline ml-auto"
              >
                수정
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteEvent();
                }}
                className="btn btn-sm btn-outline mx-2"
              >
                삭제
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectEvent(selectedEvent.id);
                }}
                className="btn btn-sm btn-outline "
              >
                닫기
              </button>
            </div>
            <label className="text-neutral-600 text-sm">
              일정 제목
              <input
                type="text"
                className="input w-full text-black"
                value={selectedEvent.title}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    title: e.target.value,
                  })
                }
              />
            </label>
            <label className="form-control mb-4">
              <span className="label text-sm text-neutral-600">시작 날짜</span>
              <input
                type="date"
                className="input input-bordered w-full mb-2"
                value={format(selectedEvent.start, "yyyy-MM-dd")}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    start: new Date(e.target.value),
                  })
                }
              />
            </label>

            <label className="form-control mb-4">
              <span className="label text-sm text-neutral-600">종료 날짜</span>
              <input
                type="date"
                className="input input-bordered w-full mb-2"
                value={format(selectedEvent.end, "yyyy-MM-dd")}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    end: new Date(e.target.value),
                  })
                }
              />
            </label>

            <label className="form-control mb-4">
              <span className="label text-sm text-neutral-600">일정 유형</span>
              <select
                defaultValue={selectedEvent?.type}
                className="select select-bordered w-full"
              >
                <option value="practicalTest">실기시험</option>
                <option value={"inschoolTest"}>학원테스트</option>
                <option value={"submissionPeriod"}>원서접수</option>
              </select>
            </label>
          </div>
        </dialog>
      )}

      {/* 일정 추가 모달 */}
      {isAddMode && (
        <div className={`modal ${isAddMode ? "modal-open" : "none"}`}>
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-2">
              {isEditMode ? "일정 수정" : "일정 추가"}
            </h3>

            <label className="form-control mb-4">
              <span className="label-text">일정 제목</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </label>

            <label className="form-control mb-4">
              <span className="label-text text-sm text-neutral-500">
                시작 날짜
              </span>
              <input
                type="date"
                className="input input-bordered w-full"
                value={
                  newEvent.start instanceof Date && !isNaN(newEvent.start)
                    ? format(newEvent.start, "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    start: new Date(e.target.value),
                  })
                }
              />
            </label>

            <label className="form-control mb-4">
              <span className="label-text">종료 날짜</span>
              <input
                type="date"
                className="input input-bordered w-full"
                value={
                  newEvent.end instanceof Date && !isNaN(newEvent.end)
                    ? format(newEvent.end, "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: new Date(e.target.value) })
                }
              />
            </label>

            <label className="form-control mb-4">
              <span className="label-text">일정 유형</span>
              <select
                className="select select-bordered w-full"
                value={newEvent.type}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, type: e.target.value })
                }
              >
                <option value="practicalTest">실기시험</option>
                <option value={"inschoolTest"}>학원테스트</option>
                <option value={"submissionPeriod"}>원서접수</option>
              </select>
            </label>

            <div className="mt-4 flex justify-end">
              {isEditMode && (
                <button
                  className="btn btn-error btn-sm mr-2"
                  onClick={handleDeleteEvent}
                >
                  삭제
                </button>
              )}
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSaveEvent}
              >
                {isEditMode ? "수정" : "추가"}
              </button>
              <button
                className="btn btn-secondary btn-sm ml-2"
                onClick={() => setIsAddMode(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
