export default function CardLayout({ children, bgColor, minHeight }) {
  return (
    <div
      className={`card ${bgColor || "bg-white"} shadow-lg p-6 mb-4 text-black ${
        minHeight || "min-h-60"
      }`}
    >
      {children}
    </div>
  );
}
