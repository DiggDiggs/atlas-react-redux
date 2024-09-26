import { describe, it, expect } from "vitest";
import listsReducer, {
  addList,
  deleteList,
  clearBoard,
  addCard,
  moveCard,
} from "../slices/listsSlice";

describe("listsSlice", () => {
  it("Should handle user adding list (addList)", () => {
    const initialState = { lists: [], cards: {} };
    const userAction = addList({ title: "To Do" });
    const newState = listsReducer(initialState, userAction);

    expect(newState.lists).toHaveLength(1); // Ensure one list was added
    expect(newState.lists[0].title).toBe("To Do"); // Check the title
    expect(newState.lists[0]).toHaveProperty("id"); // Ensure the list has an ID
  });

  it("Should allow user to delete list and its cards (deleteList)", () => {
    const initialState = {
      lists: [{ id: "list-001", title: "List" }],
      cards: {
        "1": {
          id: "1",
          title: "Card Title",
          listId: "list-001",
          description: "",
        },
      },
    };
    const userAction = deleteList({ id: "list-001" });
    const newState = listsReducer(initialState, userAction);

    expect(newState.lists).toHaveLength(0); // Ensure the list is deleted
    expect(newState.cards).not.toHaveProperty("1"); // Ensure the card is deleted
  });

  it("Should allow users to clear board of all lists and cards (clearBoard)", () => {
    const initialState = {
      lists: [{ id: "list-001", title: "List Title" }],
      cards: {
        "1": {
          id: "1",
          title: "Card Title",
          listId: "list-001",
          description: "",
          text: "",
        },
      },
    };
    const userAction = clearBoard();
    const newState = listsReducer(initialState, userAction);

    expect(newState.lists).toHaveLength(0); // Ensure all lists are cleared
    expect(Object.keys(newState.cards)).toHaveLength(0); // Ensure all cards are cleared
  });

  it("Should allow user to add new card to a list (addCard)", () => {
    const initialState = {
      lists: [{ id: "list-001", title: "To Do" }],
      cards: {},
    };
    const userAction = addCard({
      id: "1", // Ensure the card ID matches your ID generation method
      title: "Card Title",
      description: "",
      listId: "list-001",
    });
    const newState = listsReducer(initialState, userAction);

    expect(newState.cards["1"]).toBeDefined(); // Check that the card exists
    expect(newState.cards["1"].listId).toBe("list-001"); // Verify the list ID
    expect(newState.cards["1"].title).toBe("Card Title"); // Verify the title
  });

  it("Should allow users to move cards from one list to another (moveCard)", () => {
    const initialState = {
      lists: [
        { id: "list-001", title: "To Do" },
        { id: "list-002", title: "Completed" },
      ],
      cards: {
        "1": {
          id: "1",
          title: "Card Title",
          listId: "list-001",
          description: "",
        },
      },
    };
    const userAction = moveCard({
      cardId: "1",
      fromListId: "list-001",
      toListId: "list-002",
    });
    const newState = listsReducer(initialState, userAction);

    expect(newState.cards["1"].listId).toBe("list-002"); // Ensure the card was moved to the new list
  });
});
