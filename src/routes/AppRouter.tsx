import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
// import Activities from './Activities';
// import Profile from './Profile';
// import Settings from './Settings';
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import About from "../components/About";
import CatProfile from "../components/CatProfile";
import NotFound from "../components/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/cats/:catId" element={<CatProfile />} />
        {/* <Route path="/activities" element={<Activities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} /> */}
        {/* <Route path="/about" element={<LandingPage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
