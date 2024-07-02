import axios from "axios";
import { useState } from "react";
import { FaApple, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userExists, userNotExists } from "../states/Reducers/userReducer";
import { FaFacebookF, FaSpotify } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { server } from "../main";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setshow] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post(`${server}/api/v1/user/new`, { email, name, password })
      .then(({ data }) => {
        console.log(data);
        dispatch(userExists(data?.user));
        toast.success(data.message);
        setEmail("");
        setName("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => {
        dispatch(userNotExists(true));
        console.log(err);
      });
  };

  const loginWithGoogle = () => {
    window.open(`${server}/api/v1/user/google`, "_SELF");
  };

  return (
    <>
      <div className="min-h-screen w-full z-50 text-white absolute left-0 bg-[#121212]">
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="min-h-[90vh]  flex flex-col items-center mt-10 w-[22rem] px-4 rounded-md">
            <FaSpotify className="text-4xl mb-4" />
            <h1 className="font-bold tracking-tight text-4xl w-full text-center">
              Sign up to start listening
            </h1>
            <form className="mt-10 w-full relative" onSubmit={handleSignUp}>
              <label for="email" className="font-bold text-sm">
                Enter your email address
              </label>
              <input
                className="bg-[#121212] my-2 px-2 mb-4 py-3 w-full rounded-sm hover:border-white outline-none focus:ring-2 ring-inset ring-current border-[#5a5a5a] border-[1px]"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email or username"
              />
              <label for="email" className="font-bold text-sm">
                Enter your Name
              </label>
              <input
                className="bg-[#121212] my-2 px-2 mb-4 py-3 w-full rounded-sm hover:border-white outline-none focus:ring-2 ring-inset ring-current border-[#5a5a5a] border-[1px]"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <label for="pass" className="font-bold mt-4 text-sm">
                Password
              </label>
              <input
                className="bg-[#121212] my-2 px-2 mb-4 py-3 w-full rounded-sm hover:border-white outline-none focus:ring-2 ring-inset ring-current border-[#5a5a5a] border-[1px]"
                type={`${show ? "text" : "password"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="flex items-center w-full gap-4 font-semibold text-zinc-200 my-5">
              <div className="w-1/2 h-[2px] bg-[#242424]"></div>
              or
              <div className="w-1/2 h-[2px] bg-[#242424]"></div>
            </div>
            <div className="w-full mt-2 mb-4">
              <button
                onClick={loginWithGoogle}
                className="w-full hover:border-white py-2.5 rounded-full border border-zinc-500 flex items-center gap-10 justify-center font-bold text-zinc-200"
              >
                <FcGoogle className="text-xl" /> Continue with google
              </button>
              <button className="w-full hover:border-white mt-2 py-2.5 rounded-full border border-zinc-500 flex items-center gap-10 justify-center font-bold text-zinc-200">
                <div className="bg-[#1877F2] rounded-full p-1">
                  <FaFacebookF />
                </div>{" "}
                Continue with Facebook
              </button>
              <button className="w-full hover:border-white mt-2 py-2.5 rounded-full border border-zinc-500 flex items-center gap-10 justify-center font-bold text-zinc-200">
                <FaApple className="text-xl" /> Continue with Apple
              </button>
            </div>
            <hr className="border-none w-full mt-6 h-[2px] bg-[#242424]" />
            <div className="flex gap-3 mt-10 mb-10">
              <span className="text-[#8c8c8c]">Already have an account?</span>
              <Link className="underline" to="/login">
                Log in here
              </Link>
            </div>
            <span className="mb-10 text-[#8c8c8c] text-sm text-center">
              This site is protected by reCAPTCHA and the Google{" "}
              <Link className="underline text-xs" href="">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link className="underline text-xs" href="">
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

export default SignUp;
