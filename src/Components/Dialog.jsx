import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Dialog = ({ open, onClose, children }) => {
  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 z-[99] ${
        open ? "block" : "hidden"
      }`}
    >
      <div
        onClick={onClose}
        className="w-full h-full bg-black/70 absolute top-0 left-0"
      ></div>
      <div className="p-5 bg-[#282828] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow">
        <button onClick={onClose} className="absolute text-xl top-5 right-5">
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;

export const FilledSearchIcon = () => {
  return (
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-white absolute top-1.5 left-1.5"></div>
      <FaSearch className="text-2xl" />
    </div>
  );
};
