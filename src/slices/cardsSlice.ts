import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Card {
  id: string;
  title: string;
  description: string;
  listId: string;
  text: string;
}

interface CardsSlice {
  cards: Record<string, Card>;
}

const initialState: CardsSlice = {
  cards: {},
};

// Custom ID generator function
const generateUniqueId = () => {
  return `card-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (
      state,
      action: PayloadAction<{
        listId: string;
        title: string;
        text: string;
        description: string;
      }>,
    ) => {
      const newCard = {
        id: generateUniqueId(), // Using the custom ID generator
        listId: action.payload.listId,
        title: action.payload.title,
        description: action.payload.description,
        text: action.payload.text,
      };
      state.cards[newCard.id] = newCard;
    },

    deleteCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      delete state.cards[cardId];
    },

    clearBoard: (state) => {
      state.cards = {};
    },
  },
});

export const { addCard, deleteCard, clearBoard } = cardSlice.actions;
export default cardSlice.reducer;
