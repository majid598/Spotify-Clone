import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [password, setpassword] = useState("");
  const [show, setshow] = useState(false);
  return (
    <>
      <div className="min-h-screen w-full z-50 text-white absolute left-0 bg-[#121212]">
        <div className="h-24 w-full flex items-center px-14">
          <Link to="/">
            <img className="w-32" src="./assets/spotify.png" />
          </Link>
        </div>
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="h-[90vh]  flex flex-col items-center mt-10 w-[25vw] rounded-md">
            <h1 className="font-bold tracking-tight text-5xl w-full">
              Sign up to start listening
            </h1>
            <form className="mt-10 w-full relative">
              <label for="email" className="font-bold text-sm">
                Enter your email address
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
                className="bg-green-600 my-2 px-2 py-3 w-full rounded-full font-bold text-black cursor-pointer"
                type="submit"
                value="Create account"
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
            <hr className="border-none w-full mt-6 h-[2px] bg-[#242424]" />
            <div className="flex gap-3 mt-10">
              <span className="text-[#8c8c8c]">Already have an account?</span>
              <Link className="underline" to="/login">
                Log in here
              </Link>
            </div>
            <span className="text-[11px] absolute bottom-4 text-[#8c8c8c] w-[19vw] text-center">
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
      </div>
    </>
  );
};

export default Signup;
