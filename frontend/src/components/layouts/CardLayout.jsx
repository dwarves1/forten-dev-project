export default function CardLayout({ children, bgColor }) {
  return (
    <div
      className={`card ${bgColor || "bg-white"} shadow-lg p-6 mb-4 text-black`}
    >
      {children}
    </div>
  );
}
