import { describe, it, expect } from "vitest";
import cardsReducer, {
  addCard,
  deleteCard,
  clearBoard,
} from "../slices/cardsSlice";

describe("cardsSlice", () => {
  it("Should allow user to add card (addCard)", () => {
    const initialState = { cards: {} };
    const userAction = addCard({
      listId: "list-001",
      title: "Card Title",
      text: "",
      description: "",
    });
    const newState = cardsReducer(initialState, userAction);

    // Check that a card was added and has the correct properties
    expect(Object.keys(newState.cards)).toHaveLength(1); // Ensure one card was added
    const addedCard = Object.values(newState.cards)[0]; // Get the first (and only) card
    expect(addedCard).toMatchObject({
      title: "Card Title",
      listId: "list-001",
      description: "",
      text: "",
    });
  });

  it("Should delete selected card (deleteCard)", () => {
    const cardId = "card-1"; // The ID would need to be generated during the addCard
    const initialState = {
      cards: {
        [cardId]: {
          id: cardId,
          title: "Card Title",
          listId: "list-001",
          description: "",
          text: "",
        },
      },
    };
    const userAction = deleteCard(cardId);
    const newState = cardsReducer(initialState, userAction);

    expect(newState.cards[cardId]).toBeUndefined(); // Ensure the card is deleted
  });

  it("Should clear board of all cards (clearBoard)", () => {
    const initialState = {
      cards: {
        "card-1": {
          id: "card-1",
          title: "Card Title",
          description: "",
          text: "",
          listId: "list-001",
        },
      },
    };
    const userAction = clearBoard();
    const newState = cardsReducer(initialState, userAction);

    expect(newState.cards).toEqual({}); // Ensure all cards are cleared
  });
});
