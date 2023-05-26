/* SET MESSAGE DIRECTION BASED ON SENDER OR RECEIVER */

const MessagesDirection = ({ messages, username }) => {
  return messages.map((data) => {
    return username === data?.username ? (
      <Sender
        key={Math.random()}
        message={data?.message}
        username={data?.username}
      />
    ) : (
      <Receiver
        key={Math.random()}
        message={data?.message}
        username={data?.username}
      />
    );
  });
};

const Sender = ({ message, username }) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center text-white h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {username?.[0]?.toUpperCase()}
        </div>
        <div className="relative mr-3 text-sm bg-transparent text-white py-2 px-4 shadow rounded-xl">
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

const Receiver = ({ message, username }) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center text-white h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {username?.[0]?.toUpperCase()}
        </div>
        <div className="relative ml-3 text-sm bg-transparent text-white py-2 px-4 shadow rounded-xl">
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default MessagesDirection;
