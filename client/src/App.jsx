import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/* COMPONENTS IMPORT */
import Home from "./components/Home";
import Chats from "./components/Chats";
import Register from "./components/Register";

import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

const App = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    // useNavigate("/");
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
