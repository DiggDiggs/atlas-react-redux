import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { deleteCard } from "../slices/listsSlice";
import { DeleteCardButton } from "./DeleteCardButton";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Define the properties expected by the Card component
interface CardProps {
  id: string; // Unique identifier for the card
  title: string; // Title of the card
  description: string; // Description of the card
  listId: string; // ID of the list this card belongs to
}

/**
 * Card Component
 *
 * This component represents a single card in a list. It allows users
 * to view, edit, and delete the card. The card can also be dragged and
 * dropped between lists.
 */
export const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  listId,
}) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false); // Track whether the card is in edit mode
  const [editTitle, setEditTitle] = useState(title); // State for the title being edited
  const [editDescription, setEditDescription] = useState(description); // State for the description being edited

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { listId }, // Attach list ID for drag-and-drop context
  });

  // Define styles for the card based on drag state
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Adjust opacity when dragging
  };

  /**
   * Handles the deletion of the card
   */
  const handleDelete = () => {
    console.log(`Deleting card with ID: ${id}`); // Log the ID of the card being deleted
    dispatch(deleteCard({ id })); // Dispatch action to delete the card
  };

  /**
   * Toggles the edit mode for the card
   */
  const handleEditToggle = () => {
    console.log(isEditing ? "Canceling edit mode" : "Entering edit mode"); // Log the edit mode status
    setIsEditing(!isEditing); // Toggle editing state
  };

  /**
   * Handles saving the edits made to the card
   *
   * @param e - The form submission event
   */
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log(`Saving edits for card with ID: ${id}`, {
      editTitle,
      editDescription,
    }); // Log the details of the edits
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div
      ref={setNodeRef} // Set the reference for the sortable element
      style={style} // Apply dynamic styles
      {...attributes} // Attach DnD attributes
      {...listeners} // Attach DnD listeners
      className="card group/card m-5 flex min-h-24 w-full flex-col items-start rounded bg-off-white-light px-4 py-2 text-blue shadow-md"
    >
      {isEditing ? (
        <form onSubmit={handleSave} className="w-full">
          <input
            className="mb-2 w-full resize-none border-0 bg-off-white-light text-xl font-black text-blue outline-none"
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              console.log("Editing title:", e.target.value); // Log title edits
            }}
            placeholder="Title"
          />
          <textarea
            className="w-full resize-none border-0 bg-off-white-light text-blue outline-none"
            value={editDescription}
            onChange={(e) => {
              setEditDescription(e.target.value);
              console.log("Editing description:", e.target.value); // Log description edits
            }}
            placeholder="Description"
          />
          <div className="mt-2 flex justify-between">
            <button
              type="submit"
              className="rounded bg-green-500 p-2 text-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleEditToggle} // Toggle edit mode on button click
              className="rounded bg-gray-500 p-2 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="my-2 flex w-full items-end justify-between text-xl font-black">
            <span>{title}</span>
            <div className="flex space-x-2">
              <DeleteCardButton onClick={handleDelete} />{" "}
              {/* Render delete button */}
            </div>
          </div>
          <p className="mt-2 text-left">{description}</p>{" "}
          {/* Display the card description */}
        </>
      )}
    </div>
  );
};
