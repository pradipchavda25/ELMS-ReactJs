import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import CoursesMain from './pages/Courses';
import Blogs from './pages/Blogs';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ITcourses from './components/Course-page/it-courses/ITCourse';
import Mycourses from './components/my-cart/Mycourses';
import WebDevelopmentBlog from './components/blog-section/WebDevelopmentBlog';
import CyberSecurityBlog from './components/blog-section/CyberSecurityBlog';
import Purchasecourses from './components/purchase-courses/Purchasecourses';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<CoursesMain />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="it-courses" element={<ITcourses />} />
          <Route path="mycourses" element={<Mycourses />} />
          <Route path="purchase-courses" element={<Purchasecourses />} />
          <Route path="Web-Development-blog" element={<WebDevelopmentBlog />} />
          <Route path="Cyber-Security-blog" element={<CyberSecurityBlog />} />

        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
