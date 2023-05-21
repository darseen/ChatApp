import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <section className=" body-font min-h-screen mt-24">
        <div className="text-80 text-center font-4 text-3xl font-bold text-white">
          <div className="flex items-center justify-center rounded-2xl text-[#2196f3] bg-transparent h-10 w-full mb-8">
            <svg
              className="w-14 h-14 mb-5"
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

          <span> A MERN Stack Chat Application</span>

          <h2 className="text-2xl font-4 font-semibold text-[#2196f3] text-center mt-8">
            <br />
            Built With Node.js, Mongodb, Express.js, Socket.io, React.js and
            Redux. Styled with Tailwind CSS
          </h2>
          <div className="text-center flex flex-row justify-center mt-10">
            <Link
              className="inline-flex items-center py-2 font-semibold rounded-xl text-black ml-3 bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline"
              to="/global"
            >
              <div className="flex text-lg">
                <span className="justify-center">Global Chat</span>
              </div>
            </Link>
            <Link
              className="inline-flex items-center p-1 font-semibold text-lg rounded-xl tracking-tighter mr-3 text-white  bg-transparent ml-11 bg-gradient-to-r from-blue-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline"
              to="/register"
            >
              <div className="flex text-lg">
                <span className="justify-center">Register</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
