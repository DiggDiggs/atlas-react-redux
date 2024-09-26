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

/**
 * Board Component
 *
 * This component renders the Kanban board, displaying lists and cards.
 * It handles drag-and-drop functionality for moving cards between lists
 * and the deletion of lists.
 */
export const Board: React.FC = () => {
  const dispatch = useAppDispatch();

  // Selecting lists and cards from the Redux store
  const lists = useAppSelector((state) => state.lists.lists);
  const cards = useAppSelector((state) => state.lists.cards);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Minimum distance before drag is activated
      },
    }),
  );

  /**
   * Handles the deletion of a list
   *
   * @param id - The ID of the list to be deleted
   */
  const handleDeleteList = (id: string) => {
    console.log(`Deleting list with ID: ${id}`); // Log the ID of the list being deleted
    dispatch(deleteList({ id })); // Dispatch action to delete the list
  };

  /**
   * Handles the end of a drag event
   *
   * @param event - The drag end event containing information about the drag
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      console.log("Drag ended without moving:", { active, over }); // Log if no movement occurred
      return;
    }

    const fromListId = active.data?.current?.listId ?? ""; // Get the source list ID
    const toListId = over.data?.current?.listId ?? ""; // Get the target list ID

    if (fromListId && toListId) {
      console.log(`Moving card ${active.id} from ${fromListId} to ${toListId}`); // Log the card movement
      dispatch(
        moveCard({
          cardId: active.id.toString(),
          fromListId,
          toListId,
        }),
      ); // Dispatch action to move the card
    }

    setActiveId(null); // Reset the active ID
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="m-auto h-screen w-screen overflow-x-scroll text-center">
        <div className="flex h-full space-x-4">
          {lists.map((list) => {
            // Filter cards that belong to the current list
            const filteredCards = Object.keys(cards)
              .filter((cardId) => cards[cardId].listId === list.id)
              .map((cardId) => cards[cardId]);

            return (
              <SortableContext
                key={list.id}
                items={filteredCards.map((card) => card.id)} // Get IDs of the filtered cards for sorting
              >
                <List
                  id={list.id}
                  title={list.title}
                  cards={filteredCards}
                  onDelete={handleDeleteList} // Pass delete handler
                  activeId={activeId} // Pass active card ID for drag-and-drop
                />
              </SortableContext>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
};
