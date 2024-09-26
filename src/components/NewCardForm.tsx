import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../slices/listsSlice";
import { nanoid } from "@reduxjs/toolkit";

interface NewCardFormProps {
  listId: string;
}

/**
 * NewCardForm Component
 *
 * This component renders a form to add a new card to a specified list.
 * It captures the title and description of the card and dispatches
 * an action to add the card to the Redux store.
 */
export const NewCardForm: React.FC<NewCardFormProps> = ({ listId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log form submission
    console.log("Submitting new card:", { title, description });

    if (title) {
      dispatch(
        addCard({
          id: nanoid(),
          listId,
          title,
          description,
        }),
      );

      // Reset form fields
      setTitle("");
      setDescription("");

      // Log successful card addition
      console.log("Card added:", { title, description });
    } else {
      console.warn("Title is required to add a new card."); // Log warning if title is empty
    }
  };

  return (
    <div className="group/new-card m-5 flex h-44 w-full justify-center">
      <form
        onSubmit={handleSubmit}
        className="min-h-24 w-full flex-col items-start rounded bg-off-white-light px-4 text-blue"
      >
        <input
          className="w-11/12 resize-none overflow-auto rounded-t-3xl border-0 bg-off-white-light px-0 py-6 text-xl font-black text-blue outline-none"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          className="w-11/12 resize-none overflow-auto border-0 bg-off-white-light text-blue outline-none"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="w-full">
          <button type="submit" className="w-full p-4">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
