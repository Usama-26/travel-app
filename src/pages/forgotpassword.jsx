import { useState } from "react";
import { EnvelopeIcon, ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { forgotpasswordrequests } from "@/redux/auth/auth.actions";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
export default function Login() {
  const styles = {
    "underline-link":
      "underline underline-offset-4 hover:text-slate-700 focus:text-slate-700",
    "integration-link":
      "rounded-full border border-slate-300 hover:border-slate-500 focus:border-slate-500 p-4",
    "visibility-icon": "absolute w-6 h-6 right-5 top-5 fill-slate-400",
  };
  const router = useRouter();

  const [loginData, setLoginData] = useState({});
  const [loggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoginData = function (e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLoading = () => {
    setLoading(false);
  };
  const handleSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    dispatch(forgotpasswordrequests(loginData, handleLoading));
  };

  return (
    <div className="container max-w-md mx-auto flex items-center">
      <div className="m-5 mt-20 w-full relative text-slate-800">
        <div className="font-medium flex gap-4">
          <button onClick={() => router.back()}>
            <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
          </button>
          <span>Forgot</span>
        </div>
        {/* {loggedIn ? <SuccessAlert /> : <DangerAlert />} */}
        <h1 className="text-3xl font-bold text-center">Welcome</h1>
        <div className="mb-12">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="email" className="text-sm">
              Email
            </label>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center ml-3">
                <EnvelopeIcon className="w-6 h-6 fill-slate-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className={`input-field ${
                  (loggedIn === false && "border-red-500") || "border-slate-300"
                }`}
                placeholder="Email"
                onChange={handleLoginData}
                required
              />
              {/* <InformationCircleIcon className="w-5 h-5 absolute right-5 top-5 fill-red-600" /> */}
            </div>

            <button
              disabled={loginData?.email ? false : true}
              className={`btn-primary mb-6 ${
                loginData?.email
                  ? "pointer-events-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
                  : "pointer-events-none bg-slate-300 text-slate-500"
              }`}
            >
              Forgot password
            </button>
          </form>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
