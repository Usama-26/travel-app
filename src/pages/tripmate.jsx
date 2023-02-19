import {
  ArrowSmallLeftIcon,
  ChevronDoubleUpIcon,
  GlobeAltIcon,
  GlobeAsiaAustraliaIcon,
  GlobeEuropeAfricaIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function TripmateDetails() {
  const [tripMate, setTripMate] = useState({});

  const router = useRouter();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tripMate"));
    setTripMate(data);
  }, []);
  return (
    <div className="container max-w-md mx-auto flex items-center">
      <div className="m-5 mt-20 w-full relative text-slate-800">
        <div className="font-medium flex gap-4">
          <button onClick={() => router.back()}>
            <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
          </button>
          <span>About tripmate</span>
        </div>

        <div className="my-5">
          <div className=" flex gap-2 items-center">
            <Image
              src={tripMate?.photoUrl}
              width={80}
              height={80}
              className=" self-start object-cover rounded-full aspect-square"
              alt="Trip Mate"
            />
            <div>
              <h4 className="text-xl font-bold">{`Hi! I'm ${tripMate.username}`}</h4>
              <h4>{tripMate?.country}</h4>
            </div>
          </div>
        </div>
        <div className="my-5">
          <h3 className="text-lg font-bold my-2">About me</h3>
          <p>{tripMate?.bio}</p>
        </div>

        <div className="my-5">
          <h3 className="text-lg font-bold my-2">Facts</h3>
          <div className="flex gap-2">
            {/* Fact */}
            <div className="p-4 w-1/3 text-sm rounded-lg text-center bg-slate-200">
              <GlobeEuropeAfricaIcon className="h-8 w-8 fill-slate-800 mx-auto" />
              <span>
                {tripMate?.visitedCountries?.length} countries visited
              </span>
            </div>
            <div className="p-4 w-1/3 text-sm rounded-lg text-center bg-slate-200">
              <ChevronDoubleUpIcon className="h-8 w-8 fill-slate-800 mx-auto" />
              <span>{tripMate?.posts?.length} Active Trips</span>
            </div>

            <div className="p-4 w-1/3 text-sm rounded-lg text-center bg-slate-200">
              <MapPinIcon className="h-8 w-8 fill-slate-800 mx-auto" />
              <span>{tripMate?.country}</span>
            </div>
          </div>
        </div>
        <div className="my-5 mb-20">
          <h3 className="text-lg font-bold my-2">Follow me</h3>
          <span className="text-gray-600">@jennythetraveler</span>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
