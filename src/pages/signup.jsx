import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import {
  InformationCircleIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userSignUpRequest } from "@/redux/auth/auth.actions";

export default function Signup() {
  const styles = {
    "btn-active":
      "pointer-events-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white",
    "btn-disabled": "pointer-events-none bg-slate-300 text-slate-500",
  };
  const [signupData, setSignupData] = useState({});
  const [formStep, setFormStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const nextStep = () => {
    setFormStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setFormStep((prev) => prev - 1);
  };
  const handleBackButton = () => {
    if (formStep > 1) prevStep();
    else router.back();
  };

  const handleNextButton = () => {
    if (formStep < 4) nextStep();
    else handleFormSubmit();
  };
  const handleSignupData = function (e) {
    const { name, value } = e.target;

    setSignupData((prev) => ({ ...signupData, [name]: value }));
  };
  const handleLoading = () => {
    setLoading(false);
  };
  const handleFormSubmit = function (e) {
    e.preventDefault();
    const payload = {
      email: signupData.email,
      password: signupData.password,
      birthDate: signupData.dob,
      username: signupData.username,
    };
    console.log("signup called");
    setLoading(true);
    dispatch(userSignUpRequest(payload, handleLoading));
  };

  return (
    <>
      <div className="container max-w-md mx-auto flex items-center">
        <div className="m-5 mt-20 w-full text-slate-800 ">
          <div className="font-medium flex gap-4">
            <button onClick={handleBackButton}>
              <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
            </button>
            <span>Create Account</span>
          </div>
          <div className="relative">
            <h1 className={`text-3xl font-bold my-12 text-center`}>
              {(formStep === 1 && "Enter your Email") ||
                (formStep === 2 && "Select a Username") ||
                (formStep === 3 && "Enter your Birthday") ||
                (formStep === 4 && "User Agreement")}
            </h1>
            <form className="overflow-hidden" onSubmit={handleFormSubmit}>
              <div
                className={`w-full absolute top-20 transition duration-300 ease-in-out ${
                  (formStep === 1 && "translate-x-0") ||
                  (formStep >= 1 && "-translate-x-full hidden")
                }`}
              >
                <div className="mb-6">
                  <label htmlFor="email" className="text-sm">
                    Enter Email
                  </label>
                  <div className="relative mb-6">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`input-field`}
                      placeholder="someone@example.com"
                      onChange={handleSignupData}
                      required
                    />
                    {/* <InformationCircleIcon className="w-5 h-5 absolute right-12 top-5 fill-red-600" /> */}
                  </div>
                  <label htmlFor="username" className="text-sm">
                    Enter Username
                  </label>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={`input-field`}
                      placeholder="@user"
                      onChange={handleSignupData}
                      required
                    />
                    {/* <InformationCircleIcon className="w-5 h-5 absolute right-12 top-5 fill-red-600" /> */}
                  </div>
                </div>
              </div>
              <div
                className={`w-full absolute top-20 transition duration-300 ease-in-out ${
                  (formStep === 2 && "translate-x-0") ||
                  (formStep >= 2 && "-translate-x-full hidden") ||
                  (formStep <= 2 && "translate-x-full hidden")
                }`}
              >
                <div className="mb-6">
                  <label htmlFor="password" className="text-sm">
                    Enter Password
                  </label>
                  <div className="relative mb-6">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`input-field`}
                      placeholder="Enter new Password"
                      onChange={handleSignupData}
                      required
                    />
                    {/* <InformationCircleIcon className="w-5 h-5 absolute right-12 top-5 fill-red-600" /> */}
                  </div>
                  <label htmlFor="confirmPass" className="text-sm">
                    Confirm Password
                  </label>
                  <div className="relative mb-6">
                    <input
                      type="password"
                      id="confirmPass"
                      name="confirmPass"
                      className={`input-field }`}
                      placeholder="Confirm new Password"
                      onChange={handleSignupData}
                      required
                    />
                    {/* <InformationCircleIcon className="w-5 h-5 absolute right-12 top-5 fill-red-600" /> */}
                  </div>
                </div>
              </div>
              <div
                className={`w-full absolute top-20 transition duration-300 ease-in-out ${
                  (formStep === 3 && "translate-x-0") ||
                  (formStep >= 3 && "-translate-x-full hidden") ||
                  (formStep <= 3 && "translate-x-full hidden")
                }`}
              >
                <label htmlFor="dob" className="text-sm">
                  Your Birthday
                </label>
                <div className="relative mb-6">
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className={`input-field`}
                    placeholder="DD/MM/YYYY"
                    onChange={handleSignupData}
                    required
                  />
                  {/* <InformationCircleIcon className="w-5 h-5 absolute right-12 top-5 fill-red-600" /> */}
                </div>
              </div>
              <div
                className={`w-full absolute top-20 transition duration-300 ease-in-out ${
                  (formStep === 4 && "translate-x-0") ||
                  (formStep <= 4 && "translate-x-full hidden")
                }`}
              >
                <div className="relative mb-6">
                  By Signing up you agree to our{" "}
                  <Link
                    href={"/terms"}
                    className="underline underline-offset-4 hover:text-slate-700 focus:text-slate-700"
                  >
                    terms and conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={"/privacy"}
                    className="underline underline-offset-4 hover:text-slate-700 focus:text-slate-700"
                  >
                    privacy policy
                  </Link>
                </div>
              </div>
              <button
                disabled={
                  signupData?.email && signupData?.username ? false : true
                }
                type="button"
                className={`btn-primary mt-48 mb-6 ${
                  formStep === 1 ? "block" : "hidden"
                } ${
                  signupData?.email && signupData?.username
                    ? styles["btn-active"]
                    : styles["btn-disabled"]
                } `}
                onClick={handleNextButton}
              >
                Next
              </button>
              <button
                type="button"
                disabled={
                  signupData?.password?.length > 0 &&
                  signupData?.confirmPass?.length > 0 &&
                  signupData?.password === signupData?.confirmPass
                    ? false
                    : true
                }
                className={`btn-primary mt-48 mb-6 ${
                  formStep === 2 ? "block" : "hidden"
                } ${
                  signupData?.password?.length > 0 &&
                  signupData?.confirmPass?.length > 0 &&
                  signupData?.password === signupData?.confirmPass
                    ? styles["btn-active"]
                    : styles["btn-disabled"]
                } `}
                onClick={handleNextButton}
              >
                Next
              </button>
              <button
                type="button"
                disabled={signupData?.dob ? false : true}
                className={`btn-primary mt-48 mb-6 ${
                  formStep === 3 ? "block" : "hidden"
                } ${
                  signupData?.dob
                    ? styles["btn-active"]
                    : styles["btn-disabled"]
                } `}
                onClick={handleNextButton}
              >
                Next
              </button>
              <button
                type="submit"
                className={`btn-primary mt-48 mb-6 ${styles["btn-active"]} ${
                  formStep === 4 ? "block" : "hidden"
                }`}
              >
                Submit
              </button>
            </form>

            <div className="m-4">
              <div className="text-sm my-1">Step {formStep}/4</div>
              <div
                className={`rounded-full transition-all duration-300 ease-out bg-blue-600 p-1 ${
                  (formStep === 1 && "w-1/4") ||
                  (formStep === 2 && "w-2/4") ||
                  (formStep === 3 && "w-3/4") ||
                  (formStep === 4 && "w-full")
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
