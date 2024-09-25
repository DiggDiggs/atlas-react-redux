import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { deleteCard } from "../components/slices/listsSlice";
import { DeleteCardButton } from "./DeleteCardButton";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  id: string;
  title: string;
  description: string;
  listId: string;
}

export const Card: React.FC<CardProps> = ({ id, title, description, listId }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { listId }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = () => {
    dispatch(deleteCard({ id }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="card group/card m-5 flex min-h-24 w-full flex-col items-start rounded bg-off-white-light px-4 py-2 text-blue shadow-md"
    >
      {isEditing ? (
        <form onSubmit={handleSave} className="w-full">
          <input
            className="w-full mb-2 resize-none border-0 bg-off-white-light text-xl font-black text-blue outline-none"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="w-full resize-none border-0 bg-off-white-light text-blue outline-none"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="flex justify-between mt-2">
            <button type="submit" className="p-2 bg-green-500 text-white rounded">
              Save
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="p-2 bg-gray-500 text-white rounded"
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
              <DeleteCardButton onClick={handleDelete} />
            </div>
          </div>
          <p className="mt-2 text-left">{description}</p>
        </>
      )}
    </div>
  );
};
