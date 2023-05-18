import { Container } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return <Container sx={{ height: "100vh" }}></Container>;
};

export default Home;
