import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cardsReducer from "../src/components/slices/cardsSlice";
import listsReducer from "../src/components/slices/listsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
// import { useSensor } from '@dnd-kit/core';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  lists: listsReducer,
  cards: cardsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// These types are helpful for TypeScript autocomplete
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Add types to dispatch and selector hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
