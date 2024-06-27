import { useSelector } from "react-redux"
import { song } from "../Home/home"


const SongBar = () => {

    // const { masterSong, isPlaying } = useSelector((state) => state.mainSong)
const play = () => {
  song.mp3.play()
}
  return (
    <div className='bg-red-500 fixed bottom-0 left-0 h-20 w-full'>SongBar
    <button onClick={play} className="rounded-full p-3 bg-green-500">Play</button>
    </div>
  )
}

export default SongBar