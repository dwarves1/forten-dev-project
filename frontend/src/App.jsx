import { useEffect } from "react";
import AppRouter from "./AppRouter";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/performance-test/selectListAllPerformanceTest`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
      <Toaster position="top-center" toastOptions={{ className: "text-sm" }} />
    </>
  );
}

export default App;
