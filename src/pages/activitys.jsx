import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../components/DateFormat";
import Navbar from "../components/Navbar";
import Login from "./login";

export default function Activitys() {
  const { user, isLoggedIn } = useSelector(({ auth }) => auth);
  const drafts = useSelector(({ users }) => users.draftPosts);
  const [userLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleNav = (post, draft, key) => {
    let newPost = { ...post, ["draft"]: draft, ["index"]: key };
    localStorage.setItem("postData", JSON.stringify(newPost));
    router.push("/post/edit");
  };
  useEffect(() => {
    if (user) setUserData(user);
      if (!isLoggedIn) {
        router.push("/login");
      }
  }, [user]);
  const router = useRouter();
  return (
    <div className="container max-w-md mx-auto flex items-center">
      <div className="m-5 mt-20 w-full  relative text-slate-800">
        <div className="font-medium flex gap-4">
          <button onClick={() => router.back()}>
            <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
          </button>
          <span>My Trips</span>
        </div>
        {/* Not Logged In */}
        {/* <Login /> */}
        <>
          {userData?.posts?.length === 0 || !userData?.posts ? (
            <div className=" text-center">
              <Image
                src={"/firewall.svg"}
                width={100}
                height={100}
                alt="Activitys"
                className="mx-auto"
              />
              <h2 className="font-bold my-4">
                {"You don't have any activity yet"}
              </h2>
              <h2>{"Your created trips will be displayed Here"}</h2>
              <Link
                href={"/post/create"}
                className={`block mx-auto w-4/5 rounded-full p-3 font-medium text-lg my-6  pointer-events-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none text-white`}
              >
                Create a Trip
              </Link>
            </div>
          ) : (
            userData?.posts?.map((post, key) => (
              <div
                key={key}
                className="cursor-pointer"
                onClick={() => handleNav(post)}
              >
                <div className="flex items-center justify-between gap-2 shadow-lg p-2">
                  <div className="self-start flex gap-2">
                    <Image
                      src={post?.pictures[0]}
                      width={100}
                      height={50}
                      className="rounded-lg self-start object-cover "
                      alt="Post Image"
                    />
                    <div>
                      <h6 className="text-gray-400 text-sm">
                        {formatDate(post?.startDate)}
                      </h6>
                      <h4 className="text-base my-1">{post.title}</h4>
                      <span className="text-xs p-1 rounded-sm font-medium bg-green-100 text-green-800">
                        Post online
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <ChevronRightIcon className="w-4 h-4 stroke-2" />
                  </div>
                </div>
              </div>
            ))
          )}
        </>
        {drafts?.map((post, key) => (
          <div
            key={key}
            className="cursor-pointer"
            onClick={() => handleNav(post, true, key)}
          >
            <div className="flex items-center justify-between gap-2 shadow-lg p-2">
              <div className="self-start flex gap-2">
                <Image
                  src={post?.pictures[0]}
                  width={50}
                  height={50}
                  className="rounded-lg self-start object-cover aspect-square"
                  alt="Post Image"
                />
                <div>
                  <h6 className="text-gray-400 text-sm">
                    {formatDate(post?.startDate)}
                  </h6>
                  <h4 className="text-base my-1">{post.title}</h4>
                  <span className="text-xs p-1 rounded-sm font-medium bg-red-100 text-red-800">
                    Draft
                  </span>
                </div>
              </div>
              <div className="">
                <ChevronRightIcon className="w-4 h-4 stroke-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
}
