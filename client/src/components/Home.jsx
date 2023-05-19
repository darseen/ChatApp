import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return <div className="min-h-screen"></div>;
};

export default Home;
