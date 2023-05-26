import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import MessageDirection from "../components/MessageDirection";

const socket = io("http://192.168.1.113:3001");

const Chats = () => {
  const { user, token } = useSelector((state) => state);
  const [user2, setUser2] = useState({});
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [displayMessages, setDisplayMessages] = useState([]);
  const [oldChatMessages, setOldChatMessages] = useState([]);
  const [newChatMessages, setNewChatMessages] = useState([]);
  const autoScrollRef = useRef(null);

  // auto scroll
  const scrollToBottom = () => {
    if (autoScrollRef.current) {
      autoScrollRef.current.scrollTop = autoScrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

  //clear displayMessages when user2 changes
  useEffect(() => {
    setDisplayMessages([]);
  }, [user2]);

  //  update display messages when old messages are fetched
  useEffect(() => {
    if (oldChatMessages) {
      const oldChatMessagesFormat = oldChatMessages.map((obj) => ({
        username: obj.sender?.username,
        message: obj.content,
      }));

      setDisplayMessages(oldChatMessagesFormat);
    }
  }, [oldChatMessages]);

  // fetch old messages from database
  useEffect(() => {
    const fetchMessages = async () => {
      if (user._id === user2._id) return;
      try {
        const res = await axios.get("http://192.168.1.113:3001/fetchMessages", {
          headers: {
            Authorization: "Bearer " + token,
            user1: user?._id,
            user2: user2?._id,
          },
        });
        setChatId(res.data?.chat?._id);
        setOldChatMessages(res.data?.chat?.messages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [user2, token]);

  // update the messages on the screen
  useEffect(() => {
    setDisplayMessages((currentList) => [...currentList, ...newChatMessages]);
  }, [newChatMessages]);

  const handleSendMessage = () => {
    // send message to server to store in the database
    const sendMessage = async (data) => {
      const { content, user1, user2, token } = data;

      try {
        const res = await axios.post(
          "http://192.168.1.113:3001/message",
          { content, user1, user2 },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return res.data;
      } catch (err) {
        console.log(err.message);
      }
    };
    const data = {
      token,
      content: message,
      user1: user?._id,
      user2: user2?._id,
    };
    sendMessage(data);

    const messageData = {
      username: user.username,
      message,
    };
    //send message to private room
    socket.emit("send_private_message", { messageData, chatId });

    setNewChatMessages((currentList) => [...currentList, messageData]);
    setMessage("");
  };

  /* SOCKET CONNECTION */

  // join private chat room
  useEffect(() => {
    if (chatId) {
      socket.emit("join_private_chat", chatId);
    }
  }, [chatId]);

  // receive message
  useEffect(() => {
    socket.on("receive_private_message", (message) => {
      setDisplayMessages((currentList) => [...currentList, message]);
    });
  }, [socket]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Sidebar setUser2={setUser2} />
        <div className="flex flex-col flex-auto h-full p-1">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-tranparent h-full p-1">
            <div
              className="flex flex-col h-full overflow-x-auto"
              ref={autoScrollRef}
            >
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-y-2">
                  <MessageDirection
                    username={user.username}
                    messages={displayMessages}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center h-16 rounded-xl bg-transparent w-full px-4 static text-white bottom-0">
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleSendMessage();
                    }}
                    className="flex w-full border rounded-xl bg-transparent  border-[#2196f3] focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                </div>
              </div>
              <div className="ml-4">
                <button
                  className="flex items-center justify-center bg-[#2196f3] hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  onClick={handleSendMessage}
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
