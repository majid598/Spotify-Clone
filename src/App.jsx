import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/home";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/signup";
import Search from "./Components/Search/search";
import { Provider } from "react-redux";
import Lotu from "./Components/Lotu";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/lotu" element={<Lotu />} />
      </Routes>
    </Router>
  );
};

export default App;
