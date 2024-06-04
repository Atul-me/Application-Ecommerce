import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<PrivateRoute />}>
        <Route path='' element= {<Dashboard />} />
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/policy' element={<Policy />} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </>
  );
}

export default App;
