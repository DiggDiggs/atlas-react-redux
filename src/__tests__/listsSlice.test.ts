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
  nextListId: number; // Added for incremental list ID
  nextCardId: number; // Added for incremental card ID
}

const initialState: ListsState = {
  lists: [],
  cards: {},
  nextListId: 0,
  nextCardId: 0,
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ title: string }>) => {
      const newList = {
        id: state.nextListId.toString(),
        title: action.payload.title,
      };
      state.lists.push(newList);
      state.nextListId++;
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
      const newCard = {
        ...action.payload,
        id: state.nextCardId.toString(),
      };
      state.cards[newCard.id] = newCard;
      state.nextCardId++;
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
