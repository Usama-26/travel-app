import {
  ClockIcon,
  EnvelopeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

import Datepicker from "react-tailwindcss-datepicker";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import userDashboardRepository from "@/repositories/userDashboardRepository";
import { formatDate } from "../components/DateFormat";

export default function Home() {
  let [isOpen, setIsOpen] = useState(true);
  const [tripDate, setTripDate] = useState({
    startDate: new Date(),
    endDate: new Date().setDate(new Date().getDate() + 1),
  });
  const handleDateChange = (newDate) => {
    setTripDate(newDate);
  };

  const handleFindTrip = () => {
    // Find Trip Function goes here...
    setIsOpen(false);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const router = useRouter();
  const [latestPosts, setLatestPosts] = useState([]);
  const getLatestPosts = async () => {
    try {
      const { result } = await userDashboardRepository.latestPosts();
      console.log(result.results);
      setLatestPosts(result.results);
    } catch (err) {
      console.log(err);
    }
  };
  const handleNav = (post) => {
    localStorage.setItem("tripDetail", JSON.stringify(post));
    router.push("/tripdetails");
  };
  useEffect(() => {
    getLatestPosts();
  }, []);
  return (
    <>
      <Head>
        <title>tripFriend</title>
        <meta name="description" content="z" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container max-w-md mx-auto flex items-center overflow-hidden text-slate-800">
          <div className="w-full">
            {/* Hero Section */}

            <div className="py-2 hero-background flex flex-col gap-20">
              <h1 className="m-5 text-3xl text-white font-bold w-full relative ">
                tripFriend.
              </h1>
              {/* Search Box */}
              <div className="relative m-5">
                <div className="absolute inset-y-0 left-0 flex items-center ml-4">
                  <MagnifyingGlassIcon className="w-5 h-5 fill-slate-400" />
                </div>
                <button
                  className={`bg-slate-50 border text-gray-900 rounded-full text-start cursor-text  block w-full pl-10 p-3 shadow focus:outline-none`}
                  onClick={openModal}
                >
                  Search for trip
                </button>
              </div>
            </div>

            {/* Popular Destinations */}

            <div className="relative m-5">
              <h3 className="text-lg font-bold text-slate-600 my-2">
                Popular Destinations
              </h3>
              <div className="max-w-full flex gap-2 justify-between overflow-x-auto">
                <div className=" min-w-[150px]">
                  <Image
                    src={"/images/uppsala.jpg"}
                    alt="Place"
                    width={170}
                    height={150}
                    className="rounded-md shadow-md"
                  />
                  <div className="p-3 mx-2 rounded-md shadow-md  -translate-y-4 bg-white border text-center">
                    <span>Uppsala</span>
                  </div>
                </div>
                <div className=" min-w-[150px]">
                  <Image
                    src={"/images/fuji.jpg"}
                    alt="Place"
                    width={170}
                    height={150}
                    className="rounded-md shadow-md"
                  />
                  <div className="p-3 mx-2 rounded-md shadow-md  -translate-y-4 bg-white border text-center">
                    <span>Fuji</span>
                  </div>
                </div>
                <div className=" min-w-[150px]">
                  <Image
                    src={"/images/hunza.jpg"}
                    alt="Place"
                    width={170}
                    height={150}
                    className="rounded-md shadow-md"
                  />
                  <div className="p-3 mx-2 rounded-md shadow-md  -translate-y-4 bg-white border text-center">
                    <span>Hunza</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Posts */}
            <div className="relative m-5 mb-20">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-600 my-2">
                  Latest Posts
                </h3>
                <button className="text-blue-500 text-sm font-medium">
                  See All
                </button>
              </div>
              <div className="w-full grid grid-cols-2 gap-4">
                {latestPosts.map((post, key) => (
                  <div
                    key={key}
                    className="relative min-w-[130px] rounded-md shadow-md"
                    onClick={() => handleNav(post)}
                  >
                    <Image
                      src={post.pictures[0]}

                      alt="Place"
                      width={100}
                      height={100}
                      className="rounded-t-md w-full h-20 object-cover shadow-md"
                    />
                    <div className="flex justify-between mx-1">
                      <div className="flex items-center my-1">
                        <MapPinIcon className="w-4 h-4 mr-1 fill-slate-700" />

                        <span className="text-xs">{post.location}</span>
                      </div>
                      <div className="flex items-center my-1">
                        <ClockIcon className="w-4 h-4 mr-1 fill-slate-700" />
                        <span className="text-xs">
                          {formatDate(post.startDate)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-600 m-2">
                        {post.title}
                      </h2>
                    </div>
                  </div>
                ))}

              </div>
            </div>
            <Navbar />
          </div>
        </div>
        {/* Search Dialog */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed mx-auto inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Find Trip
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="relative mb-3 pb-3 border-b border-b-gray-300">
                        <div className="absolute inset-y-0  -top-2 left-0 flex items-center ml-4">
                          <MagnifyingGlassIcon className="w-5 h-5 fill-slate-400" />
                        </div>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          className={`bg-slate-50 border text-gray-900 rounded-full text-start cursor-text  block w-full pl-10 p-3 shadow focus:outline-none`}
                          placeholder="Search for trip"
                          required
                        />
                        {/* <InformationCircleIcon className="w-5 h-5 absolute right-5 top-5 fill-red-600" /> */}
                      </div>
                      <div className="relative mb-3 pb-3 border-b border-b-gray-300">
                        <Datepicker
                          primaryColor={"blue"}
                          value={tripDate}
                          useRange={false}
                          startFrom={new Date(Date.now())}
                          minDate={new Date(Date.now())}
                          separator={"to"}
                          placeholder="timeframe"
                          inputClassName={
                            "dark:bg-slate-50 dark:text-slate-800"
                          }
                          displayFormat={"DD.MM.YYYY"}
                          onChange={handleDateChange}
                        />
                        {/* <InformationCircleIcon className="w-5 h-5 absolute right-5 top-5 fill-red-600" /> */}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        className="w-1/2 inline-flex justify-center shadow rounded-full border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        className="w-1/2 inline-flex justify-center shadow rounded-full border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleFindTrip}
                      >
                        Find Trip
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    </>
  );
}
