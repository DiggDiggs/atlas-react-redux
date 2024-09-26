import { useState } from "react";
import { useDispatch } from "react-redux";
import { addList, clearBoard } from "../slices/listsSlice";

/**
 * Footer Component
 *
 * This component renders a footer with a form to add a new list and a button to clear the board.
 * It dispatches actions to add a list or clear the board using Redux.
 */
export default function Footer() {
  const [title, setTitle] = useState(""); // State for the title input
  const dispatch = useDispatch(); // Redux dispatch function

  // Handle form submission to add a new list
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (title.trim()) {
      console.log(`Adding new list with title: ${title}`); // Log the title of the new list
      dispatch(addList({ title })); // Dispatch the addList action
      setTitle(""); // Reset the title input
    } else {
      alert("What's you want to Name it?"); // Alert if the title is empty
    }
  };

  // Handle clearing the board
  const handleClearBoard = () => {
    console.log("Clearing the board"); // Log when the board is cleared
    dispatch(clearBoard()); // Dispatch the clearBoard action
  };

  return (
    <footer className="sticky bottom-0 left-0 flex w-screen items-center justify-center space-x-8 border-t-2 border-blue bg-off-white-light p-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log("Updating title input:", e.target.value); // Log title input updates
          }}
          placeholder="List title"
          name="Title"
          className="border-0 bg-transparent text-3xl font-semibold text-blue placeholder:text-blue placeholder:opacity-50 focus:outline-none"
        />
        <button
          type="submit"
          className="mr-2 rounded bg-teal px-6 py-4 text-xl font-semibold text-off-white-light"
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
}
