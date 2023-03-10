import {
  AdjustmentsVerticalIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function SearchResults() {
  return (
    <div className="container max-w-md mx-auto flex items-center overflow-hidden text-slate-800">
      <div className="w-full relative">
        <div className="relative m-5">
          <div className="absolute inset-y-0 left-0 flex items-center ml-4">
            <MagnifyingGlassIcon className="w-5 h-5 fill-slate-400" />
          </div>
          <input
            type="text"
            id="search"
            name="search"
            className={`bg-slate-50 border text-gray-900 rounded-full  block w-full pl-10 p-3 shadow placeholder:text-base placeholder:text-gray-500 focus:outline-none`}
            placeholder="Search for trip"
          />
          <button className="absolute right-5 top-3">
            <AdjustmentsVerticalIcon className="w-6 h-6 fill-blue-600" />
          </button>
        </div>
        {/* Filter Overlay */}

        <div className="p-4 m-5 top-0 w-full rounded-lg mx-auto -z-10 bg-red-300 absolute">
          Filter Box
        </div>

        <div className="relative m-5">
          <div className="w-full grid grid-cols-2 gap-4">
            <Link href={"/tripDetails"}>
              <div className="relative py-2 min-w-[130px] rounded-md shadow-md">
                <Image
                  src={"/images/hunza.jpg"}
                  alt="Place"
                  width={100}
                  height={100}
                  className="rounded-t-md w-full h-20 object-cover shadow-md"
                />
                <div className="flex justify-between mx-1">
                  <div className="flex items-center my-1">
                    <MapPinIcon className="w-4 h-4 mr-1 fill-slate-700" />
                    <span className="text-xs">Iceland</span>
                  </div>
                  <div className="flex items-center my-1">
                    <ClockIcon className="w-4 h-4 mr-1 fill-slate-700" />
                    <span className="text-xs">02.02.2023</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-600 m-2">
                    Sking Adventure
                  </h2>
                </div>
              </div>
            </Link>
            <Link href={"/tripDetails"}>
              <div className="relative py-2 min-w-[130px] rounded-md shadow-md">
                <Image
                  src={"/images/hunza.jpg"}
                  alt="Place"
                  width={100}
                  height={100}
                  className="rounded-t-md w-full h-20 object-cover shadow-md"
                />
                <div className="flex justify-between mx-1">
                  <div className="flex items-center my-1">
                    <MapPinIcon className="w-4 h-4 mr-1 fill-slate-700" />
                    <span className="text-xs">Iceland</span>
                  </div>
                  <div className="flex items-center my-1">
                    <ClockIcon className="w-4 h-4 mr-1 fill-slate-700" />
                    <span className="text-xs">02.02.2023</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-600 m-2">
                    Sking Adventure
                  </h2>
                </div>
              </div>
            </Link>
            <Link href={"/tripDetails"}>
              <div className="relative py-2 min-w-[130px] rounded-md shadow-md">
                <Image
                  src={"/images/hunza.jpg"}
                  alt="Place"
                  width={100}
                  height={100}
                  className="rounded-t-md w-full h-20 object-cover shadow-md"
                />
                <div className="flex justify-between mx-1">
                  <div className="flex items-center my-1">
                    <MapPinIcon className="w-4 h-4 mr-1 fill-slate-700" />
                    <span className="text-xs">Iceland</span>
                  </div>
                  <div className="flex items-center my-1">
                    <ClockIcon className="w-4 h-4 mr-1 fill-slate-700" />
                    <span className="text-xs">02.02.2023</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-600 m-2">
                    Sking Adventure
                  </h2>
                </div>
              </div>
            </Link>
            <Link href={"/tripDetails"}>
              <div className="relative py-2 min-w-[130px] rounded-md shadow-md">
                <Image
                  src={"/images/hunza.jpg"}
                  alt="Place"
                  width={100}
                  height={100}
                  className="rounded-t-md w-full h-20 object-cover shadow-md"
                />
                <div className="flex justify-between mx-1">
                  <div className="flex items-center my-1">
                    <MapPinIcon className="w-4 h-4 mr-1 fill-slate-700" />
                    <span className="text-xs">Iceland</span>
                  </div>
                  <div className="flex items-center my-1">
                    <ClockIcon className="w-4 h-4 mr-1 fill-slate-700" />
                    <span className="text-xs">02.02.2023</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-600 m-2">
                    Sking Adventure
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
