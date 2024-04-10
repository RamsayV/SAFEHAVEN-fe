import ToiletApi from "../components/Toilets/ToiletApi";
import Navbar from "../components/Navbar";



// interface Toilet {
//   name: string;
//   street: string;
//   city: string;
//   state: string;
//   ada: boolean;
//   unisex: boolean;
// }

const Toilets = () => {
  return (
    <>
    <Navbar />
    <ToiletApi />
    </>
  )
};

export default Toilets;