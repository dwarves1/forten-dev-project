import { useEffect } from "react";
import AppRouter from "./AppRouter";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

function App() {
  useEffect(() => {
      fetch("http://localhost:8080/api/performance-test/selectListAllPerformanceTest")
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  },[])
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
