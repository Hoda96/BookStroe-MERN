import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import BackBtn from "../components/BackBtn";

function CreateBooks() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ title: "", author: "", publishYear: "" });
  const navigate = useNavigate();
  const handleSaveBook = () => {
    // const data = {
    //   data.title,
    //  data.author,
    //   data.publishYear,
    // };
    setIsLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
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
            value={data.title}
            onChange={(e) => setData(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={data.author}
            onChange={(e) => setData(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={data.publishYear}
            onChange={(e) => setData(e.target.value)}
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
