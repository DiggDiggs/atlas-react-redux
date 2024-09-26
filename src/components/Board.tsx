import { List } from "../components/List";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { deleteList, moveCard } from "../slices/listsSlice";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

export const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.lists.lists);
  const cards = useAppSelector((state) => state.lists.cards);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDeleteList = (id: string) => {
    console.log(`Deleting list with ID: ${id}`);
    dispatch(deleteList({ id }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      console.log("Drag ended without moving:", { active, over });
      return;
    }

    const fromListId = active.data?.current?.listId ?? "";
    const toListId = over.data?.current?.listId ?? "";

    if (fromListId && toListId) {
      console.log(`Moving card ${active.id} from ${fromListId} to ${toListId}`);
      dispatch(
        moveCard({
          cardId: active.id.toString(),
          fromListId,
          toListId,
        }),
      );
    }

    setActiveId(null);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="m-auto h-screen w-screen overflow-x-scroll text-center">
        <div className="flex h-full space-x-4">
          {lists.map((list) => {
            const filteredCards = Object.keys(cards)
              .filter((cardId) => cards[cardId].listId === list.id)
              .map((cardId) => cards[cardId]);

            return (
              <SortableContext
                key={list.id}
                items={filteredCards.map((card) => card.id)}
              >
                <List
                  id={list.id}
                  title={list.title}
                  cards={filteredCards}
                  onDelete={handleDeleteList}
                  activeId={activeId}
                />
              </SortableContext>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
};
