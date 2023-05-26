// username modal popup in the GlobalChat

import { useState } from "react";

const UsernameModal = ({ setUsername, socket }) => {
  const [input, setInput] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    socket.emit("users", input);
    if (input.trim() !== "") {
      setUsername(input);
    }
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="relative mx-auto w-1/2 max-w-md">
        <div className="relative flex flex-col bg-black/50 p-8 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-white">
            Enter Your Username:{" "}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              className=" text-white border border-[#2196f3] bg-transparent rounded-lg p-2 mb-4 w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-[#2196f3] text-white rounded-lg disabled:opacity-50"
                disabled={input.trim() === ""}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsernameModal;
