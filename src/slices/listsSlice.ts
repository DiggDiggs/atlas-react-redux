import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface List {
  title: string;
  id: string;
}

interface Card {
  id: string;
  listId?: string;
  title: string;
  description: string;
}

interface ListsState {
  lists: List[];
  cards: Record<string, Card>;
  nextCardId: number; // Add a nextCardId to keep track of IDs
}

const initialState: ListsState = {
  lists: [],
  cards: {},
  nextCardId: 0, // Initialize the nextCardId
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ title: string }>) => {
      const newList = {
        id: `list-${state.lists.length}`, // Change this to however you want to generate list IDs
        title: action.payload.title,
      };
      state.lists.push(newList);
    },

    deleteList: (state, action: PayloadAction<{ id: string }>) => {
      const listId = action.payload.id;
      state.lists = state.lists.filter((list) => list.id !== listId);
      Object.keys(state.cards).forEach((cardId) => {
        if (state.cards[cardId].listId === listId) {
          delete state.cards[cardId];
        }
      });
    },

    clearBoard: (state) => {
      state.lists = [];
      state.cards = {};
    },

    deleteCard: (state, action: PayloadAction<{ id: string }>) => {
      delete state.cards[action.payload.id];
    },

    addCard: (state, action: PayloadAction<Card>) => {
      const newCard = action.payload;
      state.cards[newCard.id] = newCard;
    },

    moveCard: (
      state,
      action: PayloadAction<{
        cardId: string;
        fromListId: string;
        toListId: string;
      }>,
    ) => {
      const { cardId, fromListId, toListId } = action.payload;
      const card = state.cards[cardId];

      if (card && card.listId === fromListId) {
        const updatedCard = { ...card, listId: toListId };

        state.cards = {
          ...state.cards,
          [cardId]: updatedCard,
        };
      }
    },
  },
});

export const {
  addList,
  deleteList,
  clearBoard,
  addCard,
  deleteCard,
  moveCard,
} = listsSlice.actions;
export default listsSlice.reducer;
