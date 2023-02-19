import { logOutRequest } from "@/redux/auth/auth.actions";
import { updateUserProfileRequest } from "@/redux/userDashboard/userDashboard.actions";
import { uploadImage } from "@/src/components/ImageUpload";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ArrowSmallLeftIcon,
  KeyIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { Chip, useSelect } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(({ auth }) => auth);
  const [userData, setUserData] = useState({});

  const changeProfilePicture = (e) => {
    console.log(e.target.files);

    e.target.files.length > 0 &&
      uploadImage(e.target.files, (url, success) => {
        if (success) {
          const payload = {
            photoUrl: url[0],
          };
          console.log(payload);
          dispatch(updateUserProfileRequest(payload, userData.id, () => {}));
        }
      });
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOutRequest(user?.id));
  };
  useEffect(() => {
    if (user) setUserData(user);
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [user]);
  return (
    <>
      <div className="container max-w-md mx-auto flex items-center">
        <div className="m-5 my-20 w-full relative text-slate-800">
          <div className="font-medium flex gap-4">
            <button onClick={() => router.back()}>
              <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
            </button>
            <span>Edit Profile</span>
          </div>
          <div className="w-full rounded-lg p-8 mt-8 bg-blue-600 text-center">
            <Image
              src={userData?.photoUrl}
              width={100}
              height={100}
              alt="User Display Picture"
              className="rounded-full object-cover mx-auto aspect-square"
            />
            <div>
              <h4 className="font-medium text-lg text-white">
                {userData.username}
              </h4>
            </div>
            <div className="flex justify-center">
              <MapPinIcon className="w-4 h-4 fill-white" />
              <span className="text-slate-300  text-xs">
                {userData.country}
              </span>
            </div>
            <label
              htmlFor="displayPicture"
              className="inline-block p-5 rounded-full bg-blue-600"
            >
              <span className="underline underline-offset-2 text-white">
                Change Picture
              </span>
              <input
                type="file"
                onChange={changeProfilePicture}
                name="displayPicture"
                id="displayPicture"
                className="hidden"
              />
            </label>
          </div>
          {/* Basic Information */}
          <div className="relative my-5">
            <h3 className="text-lg font-bold text-slate-600 my-2">
              Basic Information
            </h3>
            <div className="relative my-5">
              <Link href={"/profile/edit?type=text&name=username"}>
                <span className="text-xs">Name</span>
                <div className="flex items-center justify-between border-b border-b-gray-400">
                  <p className="py-4">{userData.username}</p>
                  <ChevronRightIcon className="w-4 h-4 stroke-blue-700" />
                </div>
              </Link>
            </div>
            <div className="relative my-5">
              <Link href={"/profile/edit?type=text&name=bio"}>
                <span className="text-xs">Bio</span>
                <div className="flex items-center justify-between border-b border-b-gray-400">
                  <p className="py-4">{userData.bio}</p>
                  <ChevronRightIcon className="w-4 h-4 stroke-blue-700" />
                </div>
              </Link>
            </div>
            <div className="relative my-5">
              <Link href={"/profile/edit?type=text&name=country"}>
                <span className="text-xs">Location</span>
                <div className="flex items-center justify-between border-b border-b-gray-400">
                  <p className="py-4">{userData.country}</p>
                  <ChevronRightIcon className="w-4 h-4 stroke-blue-700" />
                </div>
              </Link>
            </div>
            <h3 className="text-lg font-bold text-slate-600 my-2">Security</h3>
            <div className="relative my-5">
              <Link href={"/profile/edit?type=password&name=password"}>
                <span className="text-xs">Password</span>
                <div className="flex items-center justify-between border-b border-b-gray-400">
                  <p className="py-4">Change Password</p>
                  <ChevronRightIcon className="w-4 h-4 stroke-blue-700" />
                </div>
              </Link>
            </div>
            <h3 className="text-lg font-bold text-slate-600 my-2">
              My Travels
            </h3>
            <div className="relative my-5">
              <Link href={"/profile/edit?type=select&name=visitedCountries"}>
                <span className="text-xs">{"Countries I've visited"}</span>
                <div className="flex flex-wrap gap-1 items-center text-sm justify-between py-2 border-b border-b-gray-400">
                  {userData?.visitedCountries?.map((country, key) => (
                    <span
                      key={key}
                      className="rounded-full py-1 px-2 bg-blue-100 text-blue-800"
                    >
                      {country}
                    </span>
                  ))}
                  <ChevronRightIcon className="w-4 h-4 stroke-blue-700" />
                </div>
              </Link>
            </div>
            <div className="relative my-5">
              <Link href={"/profile/edit?type=select&name=wantToVisit"}>
                <span className="text-xs">{"Countries I want to visit"}</span>
                <div className="flex flex-wrap gap-1 items-center text-sm justify-between py-2 border-b border-b-gray-400">
                  {userData?.wantToVisit?.map((country, key) => (
                    <span
                      key={key}
                      className="rounded-full py-1 px-2 bg-blue-100 text-blue-800"
                    >
                      {country}
                    </span>
                  ))}

                  <ChevronRightIcon className="w-4 h-4 stroke-blue-700" />
                </div>
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`btn-primary mb-6 bg-red-600 text-white  inline-flex gap-2 items-center justify-center`}
          >
            <KeyIcon className="w-6 h-6 stroke-2 fill-white" />
            <span>Logout</span>
          </button>
        </div>
        <Navbar />
      </div>
    </>
  );
}
