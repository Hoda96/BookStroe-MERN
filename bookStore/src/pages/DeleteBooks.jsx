import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";

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
    <div>
      <BackBtn />
      <button onClick={handleDeleteBook}>Delet?</button>
    </div>
  );
}

export default DeleteBooks;
