import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from './pages/Auth/Register';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/policy' element={<Policy />} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </>
  );
}

export default App;
