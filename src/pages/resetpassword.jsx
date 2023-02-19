import { useState } from "react";

import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  InformationCircleIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/solid";
import { resetPasswordRequests } from "@/redux/auth/auth.actions";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
export default function Resetpassword() {
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
  const [error, setError] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const dispatch = useDispatch();
  const handlePasswordVisibility = function () {
    setPasswordVisibility((prev) => !prev);
  };
  const handleLoginData = function (e) {
    setError(null);
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLoading = () => {
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginData.newPassword != loginData.confirmPassword) {
      setError("Password and confirm password should match");
    } else {
      const token = router.query.token;
      const data = {
        password: loginData.confirmPassword,
        token: token,
      };
      console.log(data);
      setLoading(true);
      dispatch(resetPasswordRequests(data, handleLoading));
    }
  };

  return (
    <div className="container max-w-md mx-auto flex items-center">
      <div className="m-5 mt-20 w-full relative text-slate-800">
        <div className="font-medium flex gap-4">
          <button onClick={() => router.back()}>
            <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
          </button>
          <span>Reset password</span>
        </div>

        <h1 className="text-3xl font-bold text-center">Welcome</h1>
        <div className="mb-12">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="email" className="text-sm">
              New Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 -top-5 flex items-center ml-3 pointer-events-none">
                <LockClosedIcon className="w-6 h-6 fill-slate-400" />
              </div>
              <input
                type={passwordVisibility ? "text" : "password"}
                id="password"
                name="newPassword"
                className={`input-field ${
                  (loggedIn === false && "border-red-500") || "border-slate-300"
                }`}
                placeholder="Password"
                onChange={handleLoginData}
                required
              />
              {/* <InformationCircleIcon className="w-5 h-5 absolute right-12 top-5 fill-red-600" /> */}
              {passwordVisibility ? (
                <button onClick={handlePasswordVisibility}>
                  <EyeSlashIcon className={styles["visibility-icon"]} />
                </button>
              ) : (
                <button onClick={handlePasswordVisibility}>
                  <EyeIcon className={styles["visibility-icon"]} />
                </button>
              )}
            </div>
            <label htmlFor="email" className="text-sm">
              Confirm new Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 -top-5 flex items-center ml-3 pointer-events-none">
                <LockClosedIcon className="w-6 h-6 fill-slate-400" />
              </div>
              <input
                type={passwordVisibility ? "text" : "password"}
                id="password"
                name="confirmPassword"
                className={`input-field ${
                  (loggedIn === false && "border-red-500") || "border-slate-300"
                }`}
                placeholder="Password"
                onChange={handleLoginData}
                required
              />
              {error && <div className="text-red-700">{error}</div>}
              {/* <InformationCircleIcon className="w-5 h-5 absolute right-12 top-5 fill-red-600" /> */}
              {passwordVisibility ? (
                <button onClick={handlePasswordVisibility}>
                  <EyeSlashIcon className={styles["visibility-icon"]} />
                </button>
              ) : (
                <button onClick={handlePasswordVisibility}>
                  <EyeIcon className={styles["visibility-icon"]} />
                </button>
              )}
            </div>

            <button
              disabled={
                loginData?.newPassword && loginData?.confirmPassword
                  ? false
                  : true
              }
              className={`btn-primary mb-6 ${
                loginData?.newPassword && loginData?.confirmPassword
                  ? "pointer-events-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
                  : "pointer-events-none bg-slate-300 text-slate-500"
              }`}
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
