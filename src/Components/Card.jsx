import { FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../states/Reducers/SongReducer";
import useAudioPlayer from "./useAudioPlayer";

const Card = ({ song }) => {
  const dispatch = useDispatch();
  const { togglePlayPause } = useAudioPlayer();

  const { currentSong, isPlaying } = useSelector((state) => state.songs);
  const handlePlay = () => {
    if (currentSong && currentSong.id === song.id && isPlaying) {
      togglePlayPause();
    } else {
      dispatch(setCurrentSong(song));
    }
  };

  return (
    song && (
      <div className="card w-full p-4 px-3 col-span-1 rounded-md transition-all duration-300 hover:bg-[#2c2c2c] cursor-pointer">
        <div className="h-36 rounded-md w-full overflow-hidden relative bg-no-repeat bg-center bg-cover">
          <img
            className="w-full h-full object-cover object-center"
            src={song.img}
            alt=""
          />
          <button
            onClick={handlePlay}
            className="play bg-green-600 p-3 transition-all duration-300 opacity-0 absolute bottom-[-5%] opacity- right-3 rounded-full"
          >
            {currentSong?.id === song.id && isPlaying ? (
              <FaPause className="text-black" />
            ) : (
              <FaPlay className="text-black" />
            )}
          </button>
        </div>
        <div className="mt-3">
          <span className="font-semibold">{song.title}</span>
          <p className="text-sm mt-2">{song.artist}</p>
        </div>
      </div>
    )
  );
};

export default Card;
