export default function CustomPagination({
  onPrev,
  onNext,
  currentPage,
  totalPages,
}) {
  return (
    <div className="flex justify-center items-center mt-6">
      <button
        className="btn btn-sm font-normal btn-ghost"
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        이전
      </button>
      <span className="mx-4 text-sm">
        {currentPage} / {totalPages}
      </span>
      <button
        className="btn btn-sm font-normal btn-ghost"
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        다음
      </button>
    </div>
  );
}
