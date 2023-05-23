const UserInfo = ({ user, activeUsers }) => {
  return (
    <div className="flex flex-col items-center bg-tranparent border border-[#2196f3] mt-3 w-full py-4 px-3 rounded-lg">
      <div className="h-20 w-20 rounded-full border border-[#2196f3] overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/1417638339/vector/image-dark-mode-glyph-ui-icon.jpg?s=612x612&w=0&k=20&c=12mBopJ4LTaS0q-j9ezuwlmxdJnlu_Ikn4CUncgjLp0="
          alt="Avatar"
          className="h-full w-full"
        />
      </div>
      <div className="text-sm font-semibold mt-2 text-white">
        {user.username}
      </div>
      <div className="text-xs text-gray-500">Registered User</div>
      <div className="flex flex-row items-center mt-3">
        <p
          className={`${
            activeUsers.includes(user.username)
              ? "text-emerald-400"
              : "text-red-500"
          } leading-none ml-1 text-xs`}
        >
          {activeUsers.includes(user.username) ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
