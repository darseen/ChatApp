import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/userSlice";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const credentials = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    dispatch(register(credentials));
    console.log(user);
  };

  return (
    <div className="w-full p-6 m-auto  rounded-md shadow-md lg:max-w-xl bg-transparent min-h-screen mt-16">
      <div className="flex flex-col items-center text-2xl text-white mb-3">
        <FaUser />
      </div>
      <h1 className="text-3xl font-semibold text-center text-white">
        Register
      </h1>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-white"
          >
            Username
          </label>
          <input
            type="username"
            name="username"
            id="username"
            className="block w-full mb-6 px-4 bg-transparent py-2 mt-2 text-white border border-[#2196f3] rounded-md focus:border-[#2196f3] focus:ring-[#2196f3] focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full mb-6 px-4 bg-transparent py-2 mt-2 text-white border border-[#2196f3] rounded-md focus:border-[#2196f3] focus:ring-[#2196f3] focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full px-4 py-2 mt-2 text-white border border-[#2196f3] rounded-md focus:border-[#2196f3] bg-transparent focus:ring-[#2196f3] focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mt-6">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#2196f3] rounded-md hover:bg-[#2196f3] focus:outline-none focus:bg-[#2196f3]">
            Register
          </button>
        </div>
      </form>
      <p className="mt-8 text-xs font-light text-center text-white">
        {" "}
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#2196f3" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Login;
