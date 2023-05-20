import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Example() {
  const user = null;
  return (
    <header className="bg-transparent">
      <nav
        className="mx-auto flex items-center justify-between p-3 px-4"
        aria-label="Global"
      >
        <div className=" flex flex-1 justify-start">
          <Link to="/" className="ml-2 font-bold text-2xl text-white">
            ChatApp
          </Link>
        </div>
        {user ? (
          <header className="flex flex-col items-center me-3 text-white">
            <Link to="/login" className="flex flex-col items-center">
              <FaSignOutAlt />
              <span className="mt-1">Logout</span>
            </Link>
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
