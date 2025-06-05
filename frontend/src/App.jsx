import AppRouter from "./AppRouter";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
