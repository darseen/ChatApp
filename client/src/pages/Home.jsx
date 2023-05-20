import { Outlet, useOutlet } from "react-router-dom";

import Header from "../components/Header";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Home;
