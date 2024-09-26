import { useState } from "react";
import { useDispatch } from "react-redux";
import { addList, clearBoard } from "../slices/listsSlice";

/**
 * Footer Component
 *
 * Provides inputs to add a new list and clear the board.
 */
const Footer: React.FC = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addList({ title }));
      setTitle("");
    } else {
      alert("Please provide a list title.");
    }
  };

  const handleClear = () => dispatch(clearBoard());

  return (
    <footer className="sticky bottom-0 flex justify-center border-t-2 border-blue bg-off-white-light p-8">
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="List title"
          className="border-0 bg-transparent text-3xl font-semibold text-blue placeholder-opacity-50 placeholder:text-blue focus:outline-none"
        />
        <button
          type="submit"
          className="rounded bg-teal px-6 py-4 text-xl font-semibold text-off-white-light"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded bg-teal px-6 py-4 text-xl font-semibold text-off-white-light"
        >
          Clear Board
        </button>
      </form>
    </footer>
  );
};

export default Footer;
