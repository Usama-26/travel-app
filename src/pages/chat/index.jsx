import chatsRepository from "@/repositories/chatsRepository";
import socket from "@/socket";
import Conversation from "@/src/components/Conversation";
import Navbar from "@/src/components/Navbar";
import {
  ArrowSmallLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Chat() {
  const { user, isLoggedIn } = useSelector(({ auth }) => auth);
  const [chats, setChats] = useState(null);
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getChats = async () => {
      try {
        const { result } = await chatsRepository.getUserChats(user.id);
        setChats(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    user && getChats();
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="container max-w-md mx-auto flex items-center">
      <div className="m-5 mt-20 w-full  relative text-slate-800">
        <div className="font-medium flex gap-4">
          <Link href={"/"}>
            <ArrowSmallLeftIcon className="w-6 h-6 fill-slate-800" />
          </Link>
          <span>Messages</span>
        </div>
        {/* Not Logged In */}
        {/* <Login /> */}
        <div className="my-4">
          {chats?.map((chat, key) => (
            <Link
              key={key}
              href={`/chat/${encodeURIComponent(JSON.stringify(chat))}`}
            >
              <Conversation
                data={
                  chat.senderId.id == user?.id ? chat.receiverId : chat.senderId
                }
                unreadCount={
                  chat.senderId.id == user?.id
                    ? chat?.senderCount
                    : chat?.receiverCount
                }
                chatId={chat?.id}
              ></Conversation>
            </Link>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
}
