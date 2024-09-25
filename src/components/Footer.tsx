import { useState } from "react";
import { useDispatch } from "react-redux";
import { addList, clearBoard } from "./slices/listsSlice";


export default function Footer() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      dispatch(addList({ title }));
      setTitle("");
    } else {
      alert("ENTER A TITLE!!!");
    }
  };

  const handleClearBoard = () => {
    dispatch(clearBoard());
  };

  return (
    <footer
    className="sticky bottom-0 left-0 flex w-screen items-center justify-center space-x-8 border-t-2 border-blue bg-off-white-light p-8">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="List title"
          name="Title"
        className="border-0 bg-transparent text-3xl font-semibold text-blue placeholder:text-blue placeholder:opacity-50 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded bg-teal px-6 py-4 text-xl font-semibold text-off-white-light mr-2"
      >
        Save
      </button>
      <button
        onClick={handleClearBoard}
        type="button"
        className="rounded bg-teal px-6 py-4 text-xl font-semibold text-off-white-light"
      >
        Clear Board
      </button>
    </form>
  </footer>
  );
};
