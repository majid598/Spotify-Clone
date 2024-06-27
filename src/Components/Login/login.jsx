import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [password, setpassword] = useState("");
  const [show, setshow] = useState(false);
  return (
    <div className="main min-h-screen w-full relative">
      <div className="h-24 w-full flex items-center px-14 bg-[#121212]">
        <Link to="/">
          <img className="w-32" src="./assets/spotify.png" />
        </Link>
      </div>
      <div className="w-full text-white h-full flex items-center justify-center">
        <div className="h-[90vh] py-14 px-20  flex flex-col items-center bg-[#121212] mt-10 w-[45vw] rounded-md">
          <h1 className="font-bold text-5xl">Log in to Spotify</h1>
          <hr className="border-none w-full mt-6 h-[2px] bg-[#242424]" />
          <form className="mt-10 w-[22vw] relative">
            <label for="email" className="font-bold text-sm">
              Email or username
            </label>
            <input
              className="bg-[#121212] my-2 px-2 mb-4 py-3 w-full rounded-sm hover:border-white outline-none focus:ring-2 ring-inset ring-current border-[#5a5a5a] border-[1px]"
              type="text"
              id="email"
              name="email"
              placeholder="email or username"
            />
            <label for="pass" className="font-bold mt-4 text-sm">
              Password
            </label>
            <input
              className="bg-[#121212] my-2 px-2 mb-4 py-3 w-full rounded-sm hover:border-white outline-none focus:ring-2 ring-inset ring-current border-[#5a5a5a] border-[1px]"
              type={`${show ? "text" : "password"}`}
              id="pass"
              name="pass"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
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
          <div className="flex gap-3 mt-10">
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
