import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/policy' element={<Policy />} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </>
  );
}

export default App;
