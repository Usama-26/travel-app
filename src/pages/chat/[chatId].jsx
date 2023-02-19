import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socket from "@/socket";
import chatsRepository from "@/repositories/chatsRepository";
import { formatDate } from "@/src/components/DateFormat";
export default function MessageBoard() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = useSelector(({ auth }) => auth.user);
  const router = useRouter();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState();
  const scroll = useRef();
  const handleSend = async (e) => {
    e.preventDefault();
    if (message !== "") {
      const messageObj = {
        chatId: chat.id,
        messageBody: { author: user?.id, message, time: new Date() },
      };
      try {
        const { result } = await chatsRepository.createMessage(messageObj);
        console.log(result);
        socket.emit(
          "send-message",
          userData?.id,
          chat?.id,
          chat?.senderId?.id == user?.id ? "receiver" : "sender",
          result
        );
        setMessages((list) => [...list, result]);
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  function checkOnlineStatus(chat) {
    const chatmember =
      chat?.senderId?.id == user?.id
        ? chat?.receiverId?.id
        : chat?.senderId?.id;
    const online = onlineUsers.find((user) => user.userId == chatmember);
    return online ? true : false;
  }
  const setUnreadCount = async (data) => {
    const payload = data
      ? data
      : {
          chatId: chat?.id,
          count: chat?.senderId?.id == user?.id ? "sender" : "receiver",
        };
    try {
      const data = await chatsRepository.setUnreadCount(payload);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user) {
      socket.emit("new-user-add", user?.id);
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }

    const chatData = decodeURI(router?.query?.chatId);
    if (chatData != "undefined") {
      setChat(JSON.parse(chatData));
    }
  }, [router.query.chatId]);
  useEffect(() => {
    setUserData(
      chat?.senderId?.id == user?.id ? chat?.receiverId : chat?.senderId
    );
    if (chat) {
      const count =
        chat?.senderId?.id == user?.id
          ? chat?.senderCount
          : chat?.receiverCount;

      count > 0 && setUnreadCount();
    }
  }, [chat]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const { result } = await chatsRepository.getMessages(chat.id);
        setMessages(result);
      } catch (err) {
        setMessages([]);
        console.log(err);
      }
    };

    if (chat) getMessages();
  }, [chat]);

  useEffect(() => {
    socket.once("receive-message", (data) => {
      setMessages([...messages, data]);
    });
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const handleBeforeHistoryBack = async () => {
      // Call an API endpoint to update the conversation's unreadCount to 0
      const chatData = decodeURI(router?.query?.chatId);

      const data = JSON.parse(chatData);
      const payload = {
        chatId: data?.id,
        count: data?.senderId?.id == user?.id ? "sender" : "receiver",
      };

      await setUnreadCount(payload);
    };

    router.events.on("routeChangeStart", handleBeforeHistoryBack);

    return () => {
      router.events.off("routeChangeStart", handleBeforeHistoryBack);
    };
  }, []);
  return (
    <div className="container max-w-md mx-auto flex  justify-center items-center">
      <div className="m-5 w-full mt-10 relative text-slate-800">
        <div className="font-medium fixed bg-white w-full py-4 top-0 flex gap-4">
          <button onClick={() => router.back()}>
            <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
          </button>
          <span>
            {chat?.senderId?.id == user?.id
              ? chat?.receiverId?.username
              : chat?.senderId?.username}
          </span>
          {checkOnlineStatus(chat) ? (
            <span className="bg-green-100 text-green-800 px-1 rounded-md">
              online
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 px-1 rounded-md">
              offline
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200"></div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto !mb-16 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >

            {messages?.map((message, key) => (
              <div className="chat-message" key={key} ref={scroll}>
                <div
                  className={`flex items-end ${
                    message?.author == user?.id ? "justify-end" : ""
                  }`}
                >
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                      <span
                        className={`px-4 py-2 rounded-lg inline-block rounded-bl-none ${
                          message?.author === user?.id
                            ? "bg-gray-100 text-gray-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {message?.message}
                        <span className="block mt-1">
                          {formatDate(message?.time)}
                        </span>
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Input Message */}
      <div className="max-w-md fixed bg-white w-full bottom-0 border-t-2 border-gray-200 p-4">
        <div className="relative flex">
          <input
            type="text"
            value={message}
            placeholder="Write your message!"
            onChange={(e) => setMessage(e.target.value)}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 p-5 bg-gray-200 rounded-full py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 flex">
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex items-center justify-center rounded-full px-3  py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
