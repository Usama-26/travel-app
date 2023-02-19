import socket from "@/socket";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  EnvelopeIcon,
  HomeIcon,
  MapIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const [loggedIn, setLoggedIn] = useState(false);
  const count = useRef(0);
  const [notify, setNotify] = useState(0);
  useEffect(() => {
    if (isLoggedIn) setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);
  const router = useRouter();
  useEffect(() => {
    socket.once("receive-message", (data) => {
      console.log("notification");
      setNotify((prev) => prev + 1);
      count.current += 1;
    });
    setNotify(count.current);
  }, []);
  return (
    <div className="container max-w-md fixed w-full p-5 text-slate-600 shadow-md bottom-0 bg-white">
      <nav className="flex justify-between items-center text-center">
        <Link href={"/"} className={router.pathname === "/" ? "active" : ""}>
          <HomeIcon className="w-6 h-6 mx-auto fill-slate-600" />
          <span className="font-medium text-sm">Home</span>
        </Link>
        <Link
          href={"/activitys"}
          className={router.pathname === "/activitys" ? "active" : ""}
        >
          <MapIcon className="w-6 h-6  mx-auto fill-slate-600" />
          <span className="font-medium text-sm">Activitys</span>
        </Link>
        <Link
          href={loggedIn ? "/post/create" : "/login"}
          className={router.pathname === "/" ? "active" : ""}
        >
          <PlusIcon className="w-8 h-8  mx-auto stroke-[3] stroke-blue-600 " />
        </Link>
        <Link
          href={"/chat"}
          className={router.pathname === "/chat" ? "active" : ""}
        >
          <div className="relative">
            <EnvelopeIcon className="w-6 h-6  mx-auto fill-slate-600" />
            {notify > 0 && (
              <span className="absolute top-0 right-4 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"></span>
            )}
          </div>
          <span className="font-medium text-sm">Messages</span>
        </Link>
        <Link
          href={"/profile"}
          className={router.pathname === "/profile" ? "active" : ""}
        >
          <UserIcon className="w-6 h-6  mx-auto fill-slate-600" />
          <span className="font-medium text-sm">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
