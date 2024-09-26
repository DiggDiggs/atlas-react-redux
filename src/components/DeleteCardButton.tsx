import React from "react";

// Define the props expected by the DeleteCardButton component
interface DeleteCardButtonProps {
  onClick: () => void; // Function to be called when the button is clicked
}

/**
 * DeleteCardButton Component
 *
 * This component renders a button that allows users to delete a card.
 * The button is only visible when its parent card is hovered over.
 */
export const DeleteCardButton: React.FC<DeleteCardButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="hidden group-hover/card:block" // Show button only on hover
      onClick={() => {
        console.log("Delete button clicked"); // Log when the delete button is clicked
        onClick(); // Execute the onClick prop function
      }}
      aria-label="Delete card" // Accessibility label for screen readers
    >
      <svg
        className="h-[20px] w-[20px]" // Set SVG size
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#00003c" // Set stroke color
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165"
        />
      </svg>
    </button>
  );
};
