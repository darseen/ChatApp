import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";

export default function Example() {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className="bg-transparent">
      <nav
        className="mx-auto flex items-center justify-between p-3 px-4"
        aria-label="Global"
      >
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
        <div className=" flex flex-1 justify-start">
          <Link to="/" className="ml-2 font-bold text-2xl text-white">
            ChatApp
          </Link>
        </div>
        {user.token ? (
          <header className="flex flex-col items-center me-3 text-white">
            <button
              className="flex flex-col items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span className="mt-1">Logout</span>
            </button>
          </header>
        ) : (
          <div className=" flex flex-1 justify-end">
            <Link
              to="/login"
              className="flex flex-col items-center me-3 text-white"
            >
              <FaSignInAlt />
              <span className="mt-1">Login</span>
            </Link>
            <Link
              to="/register"
              className="flex flex-col items-center ms-3 text-white"
            >
              <FaUser />
              <span className="mt-1">Register</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
