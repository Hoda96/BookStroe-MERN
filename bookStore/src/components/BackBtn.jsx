import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

function BackBtn({ destination = "/" }) {
  return (
    <Link
      to={destination}
      className="bg-blue-600 text-slate-100 p-2 rounded-full w-fit flex justify-between items-baseline gap-1 hover:animate-pulse"
    >
      <RiArrowGoBackFill className="text-2xl" />
    </Link>
  );
}

export default BackBtn;
// BackBtn.propType = {
//   destination: PropTypes.string,
// };
