import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import ActiveUsers from "./ActiveUsers";

const GlobalSidebar = ({ users, socket }) => {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isMobileScreen ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isMobileScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobileScreen]);

  useEffect(() => {
    isMobileScreen && setOpen(false);
  }, [pathname]);

  const Nav_animation = {
    open: {
      width: "17rem",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: 0,
      transition: {
        damping: 40,
      },
    },
  };

  return (
    <div className="text-white md:static absolute">
      {isMobileScreen && (
        <div
          onClick={() => setOpen(false)}
          className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
            open ? "block" : "hidden"
          } `}
        ></div>
      )}
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        animate={open ? "open" : "closed"}
        className=" md:bg-transparent bg-slate-950 text-gray shadow-xl z-[998] max-w-[17rem] w-[17rem] overflow-hidden md:relative fixed h-screen"
      >
        <div className=" flex-col py-8 pl-6 pr-2 w-64 bg-transparent flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-[#2196f3] bg-transparent h-10 w-10">
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div onClick={() => socket.disconnect()}>
              <Link
                to="/"
                className="ml-2 font-bold text-2xl animate-text bg-gradient-to-r from-[#2196f3] via-white to-[#2196f3] bg-clip-text text-transparent"
              >
                ChatApp
              </Link>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold text-white">Active Users</span>
              <span className="flex items-center justify-center bg-indigo-600 h-4 w-4 rounded-full">
                {users.length}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 mx-2 h-48 overflow-y-auto overflow-visible">
              <ActiveUsers users={users} />
            </div>
          </div>
        </div>
      </motion.div>

      {isMobileScreen && (
        <div className="m-3 md:hidden " onClick={() => setOpen(true)}>
          <MdMenu size={25} />
        </div>
      )}
    </div>
  );
};

export default GlobalSidebar;
