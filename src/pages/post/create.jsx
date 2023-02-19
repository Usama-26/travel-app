import {
  postTripRequest,
  savePostDraft,
} from "@/redux/userDashboard/userDashboard.actions";
import { uploadImage } from "@/src/components/ImageUpload";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { ArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ArrowSmallLeftIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/solid";

import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";
import { resolve } from "styled-jsx/css";

export default function Create() {
  const [pics, setPics] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [userData, setUserData] = useState({});
  const [tripData, setTripData] = useState({});
  const [girlsOnly, setGirlsOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [tripDate, setTripDate] = useState({});
  const [unsavedChanges, setUnsaved] = useState(true);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setUnsaved(false);
    router.push("/activitys");
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleDateChange = (newDate) => {
    console.log(newDate);
    setTripDate(newDate);
  };
  const handleTripData = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      setTripData((prev) => ({ ...prev, tripGallery: e.target.files }));
      return;
    }
    setTripData((prev) => ({ ...prev, [name]: value }));
  };
  const uploadImages = async () => {
    return new Promise((resolve, reject) =>
      uploadImage(Array.from(tripData.tripGallery), (url, success) => {
        if (success) {
          console.log(url);
          setPics(url);
          resolve(url);
        } else {
          reject(url);
        }
      })
    );
  };
  const handleLoading = () => {
    setLoading(false);
  };
  const saveDraft = () => {
    setUnsaved(false);
    const payload = {
      userId: user.id,
      title: tripData.title,
      preferedStay: tripData.stay,
      tripType: tripData.tripType,
      location: tripData.location,
      description: tripData.details,
      pictures: pics,
      startDate: tripDate.startDate,
      endDate: tripDate.endDate,
      isGirlOnly: girlsOnly,
    };
    console.log(payload);
    closeModal();
    dispatch(savePostDraft(payload));
    router.replace("/activitys");
  };
  const handleTripSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const picsData = await uploadImages();
    setUnsaved(false);
    const payload = {
      userId: user.id,
      title: tripData.title,
      preferedStay: tripData.stay,
      tripType: tripData.tripType,
      location: tripData.location,
      description: tripData.details,
      pictures: picsData,
      startDate: tripDate.startDate,
      endDate: tripDate.endDate,
      isGirlOnly: girlsOnly,
    };
    console.log(payload);
    dispatch(postTripRequest(payload, handleLoading));
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    setTripData({});
    setGirlsOnly(false);
    setTripDate({
      startDate: new Date(),
      endDate: new Date().setDate(new Date().getDate() + 1),
    });
    router.push("/activitys");
  };
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
    console.log(user);
  }, [user]);
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (unsavedChanges) {
        router.events.emit("routeChangeError");
        console.log(Object.keys(tripData).length !== 0, tripData);
        openModal();
        throw "Abort route change. Please ignore this error.";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [unsavedChanges]);

  return (
    <>
      <div className="container max-w-md mx-auto flex items-center">
        <div className="m-5 mt-20 w-full text-slate-800 ">
          <div className="font-medium flex gap-4">
            <Link href={"/activitys"}>
              <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
            </Link>
            <span>New Trip</span>
          </div>
          <div className="my-12">
            <form onSubmit={handleTripSubmit}>
              <label htmlFor="title" className="text-sm">
                Title
              </label>
              <div className="relative mb-3 pb-3 border-b border-b-gray-300">
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`input-field`}
                  placeholder="Trip Title"
                  onChange={handleTripData}
                  required
                />
                {/* <InformationCircleIcon className="w-5 h-5 absolute right-5 top-5 fill-red-600" /> */}
              </div>
              <label htmlFor="tripDates" className="text-sm">
                Trip Date
              </label>
              <div className="relative mb-3 pb-3 border-b border-b-gray-300">
                <Datepicker
                  primaryColor={"blue"}
                  value={tripDate}
                  startFrom={new Date(Date.now())}
                  minDate={new Date(Date.now())}
                  separator={"to"}
                  placeholder="timeframe"
                  inputClassName={"dark:bg-slate-50 dark:text-slate-800"}
                  displayFormat={"DD.MM.YYYY"}
                  onChange={handleDateChange}
                />
                {/* <InformationCircleIcon className="w-5 h-5 absolute right-5 top-5 fill-red-600" /> */}
              </div>
              <label htmlFor="location" className="text-sm">
                Location
              </label>
              <div className="relative mb-3 pb-3 border-b border-b-gray-300">
                <input
                  type="text"
                  id="location"
                  name="location"
                  className={`input-field`}
                  placeholder="Enter City/Region"
                  onChange={handleTripData}
                  required
                />
                {/* <InformationCircleIcon className="w-5 h-5 absolute right-5 top-5 fill-red-600" /> */}
              </div>
              <label htmlFor="details" className="text-sm">
                Details
              </label>
              <div className="relative mb-6">
                <textarea
                  id="details"
                  name="details"
                  className={`input-field resize-none`}
                  placeholder="Describe your text with max 1000 characters"
                  onChange={handleTripData}
                  required
                />
                {/* <InformationCircleIcon className="w-5 h-5 absolute right-5 top-5 fill-red-600" /> */}
              </div>
              <label htmlFor="stay" className="text-sm">
                Preferred Stay
              </label>
              <div
                className="relative mt-2 mb-3 pb-3 border-b border-b-gray-300"
                id="stay"
              >
                <label htmlFor="hotel" className="styled-label">
                  <input
                    type="radio"
                    name="stay"
                    id="hotel"
                    value={"Hotel"}
                    className="hidden"
                    onChange={handleTripData}
                  />
                  <span>Hotel</span>
                </label>
                <label htmlFor="hostel" className="styled-label">
                  <input
                    type="radio"
                    name="stay"
                    value={"Hostel"}
                    id="hostel"
                    className="hidden"
                    onChange={handleTripData}
                  />
                  <span>Hostel</span>
                </label>
                <label htmlFor="bnb" className="styled-label">
                  <input
                    type="radio"
                    name="stay"
                    id="bnb"
                    value={"BnB"}
                    className="hidden"
                    onChange={handleTripData}
                  />
                  <span>BnB</span>
                </label>
              </div>

              <label htmlFor="tripType" className="text-sm">
                Trip Type
              </label>
              <div className="relative mb-3 pb-3 border-b border-b-gray-300">
                <select
                  id="tripType"
                  name="tripType"
                  className={`input-field`}
                  onChange={handleTripData}
                  required
                >
                  <option value="Backpacking">Backpacking</option>
                  <option value="Roadtrip">Roadtrip</option>
                  <option value="Vocation">Vocation</option>
                  <option value="Work&Travel">Work&Travel</option>
                  <option value="Remotework">Remotework</option>
                </select>
                {/* <InformationCircleIcon className="w-5 h-5 absolute right-5 top-5 fill-red-600" /> */}
              </div>

              <div className="relative mb-3 pb-3 border-b border-b-gray-300 flex items-center justify-center gap-4 font-medium">
                <span>
                  {tripData && tripData?.tripGallery?.length > 0
                    ? `${tripData?.tripGallery?.length} Photos Selected`
                    : `Select upto 5 Photos`}
                </span>
                <label
                  htmlFor="tripGallery"
                  className="inline-block p-5 rounded-full bg-blue-600"
                >
                  <CloudArrowUpIcon className="w-8 h-8 fill-white" />
                  <input
                    type="file"
                    name="tripGallery"
                    id="tripGallery"
                    multiple
                    max={5}
                    className="hidden"
                    onChange={handleTripData}
                  />
                </label>
              </div>
              <div className="flex mb-3 pb-3 justify-between border-b border-b-gray-300">
                <label htmlFor="girlsOnly">Girls only trip</label>
                <Switch
                  checked={girlsOnly}
                  onChange={setGirlsOnly}
                  className={`${
                    girlsOnly ? "bg-blue-700" : "bg-gray-400"
                  } relative inline-flex h-[28px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      girlsOnly ? "translate-x-8" : "translate-x-0"
                    } pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <div className="flex justify-between gap-3">
                <button
                  className={`btn-primary mb-6 inline-flex gap-2 items-center justify-center`}
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                  ) : (
                    <>
                      <ArrowUpIcon className="w-6 h-6 stroke-2 stroke-slate-700" />
                      <span>Post</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDeletePost}
                  className={`btn-primary mb-6 bg-red-600 text-white  inline-flex gap-2 items-center justify-center`}
                >
                  <XMarkIcon className="w-6 h-6 stroke-2 stroke-white" />
                  <span>Delete</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <>
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

            <div className="fixed inset-0 overflow-y-auto">
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Warning Unsaved Changes
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Do you want to save the changes you made as draft?
                      </p>
                    </div>

                    <div className="mt-4 w-1/2 flex justify-between">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={saveDraft}
                      >
                        Save as draft
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
}
