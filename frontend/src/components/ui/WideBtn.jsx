export default function WideBtn({ onClickFunc, textValue }) {
  return (
    <button onClick={onClickFunc} className="btn btn-outline mt-4 w-full">
      {textValue}
    </button>
  );
}
