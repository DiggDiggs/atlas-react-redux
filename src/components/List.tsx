import React from "react";
import { Card } from "./Card";
import { DeleteListButton } from "./DeleteListButton";
import { NewCardForm } from "./NewCardForm";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

interface ListProps {
  title: string;
  id: string;
  cards: { id: string; title: string; description: string }[];
  onDelete: (id: string) => void;
  activeId?: string | null;
}

export const List: React.FC<ListProps> = ({ title, id, cards, onDelete }) => {
  // Keep logging to debug card content in the list
  console.log("Cards in List:", cards);

  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="group h-full min-w-96 p-4">
      {/* Moved title and delete button next to each other */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <DeleteListButton listId={id} onClick={() => onDelete(id)} />
      </div>

      {/* Sortable context for drag and drop functionality */}
      <SortableContext items={cards.map((card) => card.id)}>
        <div className="flex w-full flex-col space-y-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              listId={id}
            />
          ))}
        </div>
      </SortableContext>

      {/* Form to add a new card */}
      <NewCardForm listId={id} />
    </div>
  );
};
