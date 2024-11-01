import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import Loading from "../components/Loading";

function DeleteBooks() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDeleteBook = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center my-4 px-2">
        <h1 className="text-3xl my-4">Delete Book</h1>
        <BackBtn />
      </div>
      {isLoading ? <Loading /> : ""}
      <div className="flex flex-col justify-between text-center mx-auto border-2 rounded-md border-green-700 w-[600px] p-4 ">
        Are you sure to Delete this Book?
        <button
          className="bg-red-700 px-4 py-2 mt-5 rounded-md w-fit mx-auto text-white"
          onClick={handleDeleteBook}
        >
          Yes,Delete{" "}
        </button>
      </div>
    </div>
  );
}

export default DeleteBooks;
