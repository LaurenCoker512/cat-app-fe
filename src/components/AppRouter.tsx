import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
// import Dashboard from './Dashboard';
// import Cats from './Cats';
// import Activities from './Activities';
// import Profile from './Profile';
// import Settings from './Settings';
// import Login from './Login';
// import Signup from './Signup';
// import NotFound from './NotFound';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/about" element={<LandingPage />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
