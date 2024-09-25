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
  activeId?: string |null;
}

export const List: React.FC<ListProps> = ({ title, id, cards, onDelete }) => {
  // console.log("Rendering List:", title, cards);
  console.log("Cards in List:", cards);

  const handleDeleteList = () => {
    onDelete(id);
  };

  const { setNodeRef } = useDroppable({
    id,
  })


  return (
    <div ref={setNodeRef} className="group/list h-full min-w-96 p-4">
      <DeleteListButton listId={id} onClick={handleDeleteList} />
      <h3 className="justify-center">{title}</h3>

      <SortableContext items={cards.map((card) => card.id)}>
        <div className="flex flex-col space-y-4 w-full">
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
      <NewCardForm listId={id} />
    </div>
  );
};
