export default function SingleSearchBar({
  searchFunc,
  onChangeFunc,
  onChangeValue,
  placeholder,
}) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        className="input h-8 sm:h-10 input max-w-[50%] sm:max-w-[60%] rounded-r-none focus:outline-hidden focus:border-neutral-500"
        placeholder={placeholder}
        onChange={(e) => onChangeFunc(e.target.value)}
        onKeyDown={(e) => e.key == "Enter" && searchFunc(onChangeValue)}
      />
      <button
        onClick={() => searchFunc(onChangeValue)}
        className="h-8 sm:h-10 rounded-r-sm rounded-l-none bg-neutral-500 border-neutral-500 text-white btn btn-sm sm:btn-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-search w-4 h-4 sm:w-5 sm:h-5"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </div>
  );
}
