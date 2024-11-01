import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import Loading from "../components/Loading";

function ShowBooks() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center my-4 px-2">
        <h1 className="text-2xl"> Show Book</h1>
        <BackBtn />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-between  border-2 rounded-md border-green-700 p-2">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id:</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title: </span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author: </span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publis Year: </span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created at: </span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Last Update Time:
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBooks;
