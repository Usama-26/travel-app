import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import {
  ArrowSmallLeftIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { formatDate } from "../components/DateFormat";
import { calculateAge } from "../components/AgeCalculate";
import { sendMessageRequest } from "@/redux/userDashboard/userDashboard.actions";
import { useDispatch, useSelector } from "react-redux";

export default function PostDetails() {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = useState(false);
  const [tripDetail, setTripDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [tripMate, setTripMate] = useState({});
  const router = useRouter();
  const handleLoading = () => {
    setLoading(false);
  };
  const sendMessage = () => {
    const payload = {
      senderId: user?.id,
      receiverId: tripMate?.id,
    };

    if (payload.senderId === payload.receiverId) {
      alert.showErrorAlert("You couldn't send message to yourself");
      return;
    }
    console.log(payload);
    setLoading(true);
    dispatch(sendMessageRequest(payload, handleLoading));
  };
  useEffect(() => {
    const trip = JSON.parse(localStorage.getItem("tripDetail"));
    setTripDetail(trip);
    setTripMate(trip.userId);
    localStorage.setItem("tripMate", JSON.stringify(trip.userId));
  }, []);
  return (
    <div className="container max-w-md mx-auto overflow-hidden text-slate-800">
      {/* Photos Swiper */}
      <div className="w-full relative">
        <div className="font-medium flex gap-4 text-sm absolute bg-white p-2 z-10 top-10 left-5 rounded-lg">
          <button onClick={() => router.back()}>
            <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
          </button>
        </div>
        <Swiper
          autoHeight
          slidesPerView={1}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {tripDetail?.pictures?.map((data, key) => (
            <SwiperSlide key={key}>
              <Image
                src={data}
                alt="Place"
                width={170}
                height={150}
                className=" shadow-md w-full h-72 aspect-square object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Trip Shallow Info */}
      <div className="m-5 text-slate-800 ">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold my-2">{tripDetail?.title}</h2>
            <div className="flex justify-between gap-8">
              <div className="inline-flex items-center my-1">
                <MapPinIcon className="w-4 h-4 mr-2 fill-slate-700" />
                <span className="text-xs">{tripDetail?.location}</span>
              </div>
              <div className="inline-flex items-center my-1">
                <ClockIcon className="w-4 h-4 mr-2 fill-slate-700" />
                <span className="text-xs">
                  {formatDate(tripDetail.startDate)}
                </span>
              </div>
            </div>
          </div>
          <div>
            <HeartIcon
              className={`h-6 w-6 ${
                isFavourite ? "fill-red-800" : "fill-slate-800"
              }`}
            />
          </div>
        </div>
        {/* About Trip */}
        <div className="my-5">
          <h3 className="text-lg font-bold my-2">About the trip</h3>
          <p>{tripDetail?.description}</p>
        </div>
        {/* Facts */}
        <div className="my-5">
          <h3 className="text-lg font-bold my-2">Facts</h3>
          <div className="flex gap-2">
            {/* Fact */}
            <div className="p-4 w-1/3 text-sm rounded-lg text-center bg-slate-200">
              <ClockIcon className="h-8 w-8 fill-slate-800 mx-auto" />
              <span>{`${formatDate(tripDetail?.startDate)} to ${formatDate(
                tripDetail?.endDate
              )}`}</span>
            </div>
            <div className="p-4 w-1/3 text-sm rounded-lg text-center bg-slate-200">
              <BuildingOfficeIcon className="h-8 w-8 fill-slate-800 mx-auto" />
              <span>Stay in {tripDetail?.preferedStay}</span>
            </div>

            <div className="p-4 w-1/3 text-sm rounded-lg text-center bg-slate-200">
              <CheckBadgeIcon className="h-8 w-8 fill-slate-800 mx-auto" />
              <span>{tripDetail?.tripType}</span>
            </div>
          </div>
        </div>

        <div className="my-5">
          <h3 className="text-lg font-bold my-2">About tripmate</h3>
          <Link href={"/tripmate"}>
            <div className=" flex gap-2">
              <Image
                src={tripMate?.photoUrl}
                width={80}
                height={80}
                className=" self-start object-cover rounded-full aspect-square"
                alt="Trip Mate"
              />
              <div>
                <h4 className="text-xl font-bold">{tripMate?.username}</h4>
                <h4>{calculateAge(new Date(tripMate.birthDate))} years old</h4>
                <h4>{tripMate?.country}</h4>
              </div>
            </div>
          </Link>
        </div>

        <div
          onClick={sendMessage}
          className={`block mx-auto w-3/5 text-center rounded-full p-3 font-medium text-lg mt-8 mb-24  pointer-events-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none text-white`}
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
            ` Message ${tripMate.username}`
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
}
