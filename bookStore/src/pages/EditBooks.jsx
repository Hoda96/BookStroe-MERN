import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import BackBtn from "../components/BackBtn";
import { enqueueSnackbar } from "notistack";

function EditBooks() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ title: "", author: "", publishYear: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setData({
          title: response.data.title,
          author: response.data.author,
          publishYear: response.data.publishYear,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditBook = () => {
    console.log(data);
    setIsLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("book edited succesfully :)", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar("Book is NOT edited :(", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center my-4 px-2">
        <h1 className="text-3xl my-4">Edit Book</h1>
        <BackBtn />
      </div>

      {isLoading ? <Loading /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            name="author"
            value={data.author}
            onChange={handleInputChange}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            name="publishYear"
            value={data.publishYear}
            onChange={handleInputChange}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditBooks;
