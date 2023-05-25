import { io } from "socket.io-client";
import { useState, useEffect } from "react";

import GlobalSidebar from "../components/GlobalSidebar";
import MessageDirection from "../components/MessageDirection";
import UsernameModal from "../components/UsernameModal";

const socket = io("http://192.168.1.113:3001");

const GlobalChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  /* SEND MESSAGES */
  const handleSendMessage = () => {
    const messageData = {
      username: username,
      message: message,
    };
    if (message !== "") {
      socket.emit("global_client", messageData);
      setMessages((messagesList) => [...messagesList, messageData]);
      setMessage("");
    }
  };

  /* RECEIVE ACTIVE USERS */
  useEffect(() => {
    socket.on("send_users", (data) => {
      setUsers([...data]);
    });
  }, [socket]);

  /* RECEIVE MESSAGES */
  useEffect(() => {
    socket.on("global_server", (data) => {
      setMessages((messagesList) => [...messagesList, data]);
    });
  }, [socket]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      {!username ? (
        <UsernameModal setUsername={setUsername} socket={socket} />
      ) : (
        ""
      )}
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <GlobalSidebar users={users} />
        <div className="flex flex-col flex-auto h-full p-1">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-tranparent h-full p-1">
            <div className="flex flex-col h-full overflow-x-auto">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-y-2">
                  <MessageDirection messages={messages} username={username} />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center h-16 rounded-xl bg-transparent w-full px-4 sm:static text-white fixed bottom-0">
              <div>
                <button className="flex items-center justify-center text-[#2196f3] hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
              </div>
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
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-[#2196f3] hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
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

export default GlobalChat;
