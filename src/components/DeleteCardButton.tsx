import React from "react";

// Define the expected props for the DeleteCardButton component
interface DeleteCardButtonProps {
  handleDelete: () => void; // Function to be executed on button click
}

/**
 * DeleteCardButton Component
 *
 * Renders a button for deleting a card. The button becomes visible when its parent card is hovered.
 */
export const DeleteCardButton: React.FC<DeleteCardButtonProps> = ({
  handleDelete,
}) => {
  const handleClick = () => {
    console.log("Delete action initiated"); // Log the button click
    handleDelete(); // Call the provided delete function
  };

  return (
    <div className="hidden group-hover/card:block">
      {" "}
      {/* Make button visible on hover */}
      <button
        onClick={handleClick} // Trigger the delete function when clicked
        aria-label="Remove this card" // Accessibility label
        className="p-1"
      >
        <DeleteIcon /> {/* Custom SVG icon for deletion */}
      </button>
    </div>
  );
};

// Extracted SVG icon for better code separation
const DeleteIcon = () => (
  <svg
    className="h-5 w-5" // Adjust icon size
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165" />
  </svg>
);
