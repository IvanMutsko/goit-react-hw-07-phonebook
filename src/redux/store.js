import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import { contactsApi } from './contactsSlice';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
