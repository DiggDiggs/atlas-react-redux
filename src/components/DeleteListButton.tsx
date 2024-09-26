import deleteListButton from "../assets/deleteListButton.svg";
import { useDispatch } from "react-redux";
import { deleteList } from "../slices/listsSlice";

// Define the props expected by the DeleteListButton component
interface DeleteListButtonProps {
  listId: string; // ID of the list to be deleted
  onClick?: () => void; // Optional function to be called after deletion
}

/**
 * DeleteListButton Component
 *
 * This component renders a button that allows users to delete a list.
 * Upon clicking, it dispatches the deleteList action and optionally calls
 * a provided onClick handler.
 */
export const DeleteListButton: React.FC<DeleteListButtonProps> = ({
  listId,
  onClick,
}) => {
  const dispatch = useDispatch();

  // Handle the delete action
  const handleDelete = () => {
    console.log(`Deleting list with ID: ${listId}`); // Log the ID of the list being deleted
    dispatch(deleteList({ id: listId })); // Dispatch the delete action

    if (onClick) {
      onClick(); // Call the optional onClick prop if provided
      console.log("Additional onClick handler executed"); // Log when the onClick handler is called
    }
  };

  return (
    <div className="h-[30px]">
      <button
        className="h-[30px] w-[30px] cursor-pointer"
        onClick={handleDelete}
        aria-label="Delete list" // Accessibility label for screen readers
      >
        <img
          src={deleteListButton}
          alt="Delete Button" // Alt text for the image
          className="invert filter" // CSS classes for styling
        />
      </button>
    </div>
  );
};
