import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import BackBtn from "../components/BackBtn";
import { enqueueSnackbar } from "notistack";

function CreateBooks() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ title: "", author: "", publishYear: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSaveBook = () => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("book created succesfully :)", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar("Book is NOT created :(", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="text-3xl my-4">Create Book</h1>
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateBooks;
