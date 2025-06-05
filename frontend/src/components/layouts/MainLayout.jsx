export default function MainLayout({ children }) {
  return (
    <div className="min-h-[calc(100vh-10rem)] pt-20 sm:pt-28 bg-base-200 px-4 pb-10 sm:px-6">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}
