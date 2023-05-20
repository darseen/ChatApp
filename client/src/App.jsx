import { Routes, Route } from "react-router-dom";

/* COMPONENTS IMPORT */
import Home from "./components/Home";
import Chats from "./components/Chats";
import Register from "./components/Register";
import Login from "./components/Login";

import "./App.css";

const App = () => {
  return (
    <>
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
