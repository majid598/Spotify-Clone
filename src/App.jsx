import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home, { songs } from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/signup";
import Search from "./Pages/search";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { userExists } from "./states/Reducers/userReducer";
import Playlist from "./Pages/Playlist";
import Collection from "./Pages/Collection";
import { setCurrentSong } from "./states/Reducers/SongReducer";
import Profile from "./Pages/Profile";
import Track from "./Pages/Track";
// import Lotu from "./Components/Lotu";

const server = "http://localhost:5000";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentSong } = useSelector((state) => state.songs);

  useEffect(() => {
    if (!currentSong) {
      dispatch(setCurrentSong(songs[0]));
    }
  }, []);
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(userExists(data.user));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collection/tracks" element={<Collection />} />
        <Route path="/track/:id" element={<Track />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        {/* <Route path="/lotu" element={<Lotu />} /> */}
      </Routes>
      <ToastContainer position="bottom-center" />
    </Router>
  );
};

export default App;
