import { FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../states/Reducers/SongReducer";
import useAudioPlayer from "./useAudioPlayer";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ artist, role = "artist" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { togglePlayPause } = useAudioPlayer();
  const { user } = useSelector((state) => state.auth);

  const { currentSong, isPlaying } = useSelector((state) => state.songs);

  const click = () => {
    if (role === "profile" && artist?._id === user?._id) {
      navigate(`/profile`);
    } else {
      navigate(`/user/${artist?._id}`);
    }
  };

  const handlePlay = () => {
    if (currentSong && isPlaying) {
      togglePlayPause();
    } else {
      dispatch(setCurrentSong(song));
    }
  };

  return (
    <div
      onClick={click}
      className="card w-full p-4 px-3 col-span-1 rounded-md transition-all duration-300 hover:bg-[#2c2c2c] cursor-pointer"
    >
      <div
        className={`${
          role === "profile" ? "h-44" : "h-36"
        } w-full overflow-hidden relative bg-no-repeat bg-center bg-cover`}
      >
        <img
          className="w-full rounded-full h-full object-cover object-center"
          src={artist?.profile}
          alt=""
        />
        {role !== "profile" && (
          <button
            onClick={handlePlay}
            className="play bg-green-600 p-3 transition-all duration-300 opacity-0 absolute bottom-[-5%] opacity- right-3 rounded-full"
          >
            {/* {currentSong?.id === song.id && isPlaying ? (
              <FaPause className="text-black" />
            ) : ( */}
            <FaPlay className="text-black" />
            {/* // )} */}
          </button>
        )}
      </div>
      <div className="mt-3">
        <span className="font-semibold">{artist.name}</span>
        <p className="text-sm mt-2">
          {role === "profile" ? "Profile" : "Artist"}
        </p>
      </div>
    </div>
  );
};

export default ArtistCard;
