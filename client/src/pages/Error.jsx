import Header from "../components/Header";

const Error = () => {
  return (
    <>
      <div className="min-h-screen ">
        <Header />
        <div className="flex justify-center items-center h-screen">
          <p className="text-4xl text-white font-bold mb-40">
            404 Page Not Found!
          </p>
        </div>
      </div>
    </>
  );
};

export default Error;
