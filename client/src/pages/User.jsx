import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { io } from "socket.io-client";
import Header from "../components/Header";

const socket = io("http://192.168.1.113:3001");

const User = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);

  // get active users list
  useEffect(() => {
    socket.emit("get_active_users");
    socket.on("send_users", (data) => {
      setActiveUsers(data);
    });
  }, [socket]);

  // get user's info from server
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://192.168.1.113:3001/user/${userId}`);
        setUser(res.data);
      } catch (err) {
        setIsLoading(false);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-[#071e34]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Header />
      <section
        style={{ fontFamily: "Montserrat" }}
        className=" bg-[#071e34] flex font-medium items-center justify-center h-screen"
      >
        <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
          <div className="mt-6 w-fit mx-auto">
            <img
              src="https://media.istockphoto.com/id/1417638339/vector/image-dark-mode-glyph-ui-icon.jpg?s=612x612&w=0&k=20&c=12mBopJ4LTaS0q-j9ezuwlmxdJnlu_Ikn4CUncgjLp0="
              className="rounded-full w-28"
              alt="profile picture"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="mt-8 ">
              <h2 className="text-white font-bold text-2xl tracking-wide">
                {user.username}
              </h2>
            </div>
            <p
              className={`${
                activeUsers.includes(user.username)
                  ? "text-emerald-400"
                  : "text-red-500"
              } font-semibold mt-2.5`}
            >
              {activeUsers.includes(user.username) ? "Online" : "Offline"}
            </p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default User;
