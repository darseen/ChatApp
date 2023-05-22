const ActiveUsers = ({ users }) => {
  return users.map((user) => {
    return (
      <button
        key={Math.random()}
        className="flex flex-row items-center hover:bg-[#2196f3] rounded-xl p-2"
      >
        <div className="flex items-center justify-center h-8 w-8 bg-indigo-600 rounded-full">
          {user[0].toUpperCase()}
        </div>
        <div className="ml-2 text-sm font-semibold">{user}</div>
      </button>
    );
  });
};

export default ActiveUsers;
