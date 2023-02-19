import chatsRepository from "@/repositories/chatsRepository";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Conversation = ({ data, unreadCount, chatId }) => {
  const [latestMessage, setLatestMessage] = useState(null);
  const getMessages = async () => {
    try {
      const { result } = await chatsRepository.getMessages(chatId);
      setLatestMessage(result[result.length - 1].message);
    } catch (err) {
      setLatestMessage("  ");
      console.log(err);
    }
  };
  useEffect(() => {
    if (chatId) getMessages(chatId);
  }, []);
  return (
    <div>
      <div className="flex my-2 rounded-lg shadow-[1px_1px_5px_#000000] shadow-gray-300">
        <div className="flex items-center justify-between p-4 gap-4">
          {data && latestMessage ? (
            <Image
              src={data.photoUrl}
              width={50}
              height={50}
              className="rounded-full self-start object-cover aspect-square"
              alt="User Image"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          )}
          <div>
            {data && latestMessage ? (
              <>
                <h4 className="font-medium text-base my-1">{data.username}</h4>
                <p>
                  {latestMessage}
                  {unreadCount != 0 && (
                    <span className="bg-green-100 p-1 rounded-full text-green-700">
                      {unreadCount}
                    </span>
                  )}
                </p>
              </>
            ) : (
              <>
                <div className="w-28 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-24 h-3 bg-gray-300 rounded"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
