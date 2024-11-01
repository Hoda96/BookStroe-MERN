import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { MdOutlineAddBox } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { AiOutlineTable } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [viewType, setViewType] = useState("table");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center my-4 px-2">
        <h1 className="text-2xl">Books List</h1>
        <Link to={"/books/create"}>
          <MdOutlineAddBox className="text-3xl text-green-800" />
        </Link>
      </div>

      <div className="flex justify-center mx-auto ">
        <button onClick={() => setViewType("table")}>
          <AiOutlineTable className="text-3xl px-1" />
        </button>
        <button onClick={() => setViewType("card")}>
          <BsCardText className="text-3xl px-1" />
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : viewType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}

export default Home;
