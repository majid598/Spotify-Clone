import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaSpotify } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { userExists, userNotExists } from "../states/Reducers/userReducer";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa6";
import { server } from "../main";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setshow] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}/api/v1/user/login`,
        { email, password },
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        dispatch(userExists(true));
        toast.success(data.message);
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main min-h-screen w-full relative">
      <div className="w-full text-white h-full flex items-center justify-center">
        <div className="py-14 px-20 flex flex-col items-center bg-[#121212] mt-10 w-[46rem] rounded-lg">
          <FaSpotify className="text-4xl mb-8" />
          <h1 className="font-bold text-4xl">Log in to Spotify</h1>
          <div className="w-[20rem] py-3 pt-10">
            <button className="w-full py-2.5 rounded-full border border-zinc-500 flex items-center gap-6 justify-center font-bold text-zinc-200">
              <FcGoogle className="text-xl" /> Continue with google
            </button>
            <button className="w-full mt-2 py-2.5 rounded-full border border-zinc-500 flex items-center gap-6 justify-center font-bold text-zinc-200">
              <div className="bg-[#1877F2] rounded-full p-1">
                <FaFacebookF />
              </div>{" "}
              Continue with Facebook
            </button>
            <button className="w-full mt-2 py-2.5 rounded-full border border-zinc-500 flex items-center gap-6 justify-center font-bold text-zinc-200">
              <FaApple className="text-xl" /> Continue with Apple
            </button>
          </div>
          <hr className="border-none w-full mt-6 h-[2px] bg-[#242424]" />
          <form className="mt-10 w-[20rem] relative" onSubmit={handleLogin}>
            <label for="email" className="font-bold text-sm">
              Email or username
            </label>
            <input
              className="bg-[#121212] transition-all duration-300 my-2 px-2 mb-4 py-3 w-full rounded-sm hover:border-white outline-none focus:ring-2 ring-inset ring-current border-[#5a5a5a] border-[1px]"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email or username"
            />
            <label for="pass" className="font-bold mt-4 text-sm">
              Password
            </label>
            <input
              className="bg-[#121212] transition-all duration-300 my-2 px-2 mb-4 py-3 w-full rounded-sm hover:border-white outline-none focus:ring-2 ring-inset ring-current border-[#5a5a5a] border-[1px]"
              type={`${show ? "text" : "password"}`}
              id="pass"
              name="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <input
              className="bg-green-600 my-2 px-2 py-3 w-full hover:scale-105 rounded-full font-bold text-black cursor-pointer"
              type="submit"
              value="Log in"
            />
            {password.length > 0 && (
              <button
                type="button"
                onClick={() => setshow(!show)}
                className="absolute right-2 bottom-24"
              >
                {show && (
                  <div className="h-[1px] top-2 z-50 -right-1 -rotate-45 w-6 bg-white absolute"></div>
                )}
                <FaEye />
              </button>
            )}
          </form>
          <Link
            className="underline text-white hover:text-green-600 mt-6"
            to="password/forggote"
          >
            Forgot your password?
          </Link>
          <hr className="border-none w-full mt-6 h-[2px] bg-[#242424]" />
          <div className="flex gap-3 mt-16 mb-6">
            <span className="text-[#8c8c8c]">Don't have an account?</span>
            <Link
              className="underline text-white hover:text-green-600"
              to="/signup"
            >
              Sign up for Spotify
            </Link>
          </div>
        </div>
      </div>
      <div className="footer flex items-center justify-center bg-[#121212] w-full h-20 mt-10">
        <span className="text-[11px] text-[#8c8c8c]">
          This site is protected by reCAPTCHA and the Google{" "}
          <Link className="underline" href="">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link className="underline" href="">
            Terms of Service
          </Link>{" "}
          apply.
        </span>
      </div>
    </div>
  );
};

export default Login;
