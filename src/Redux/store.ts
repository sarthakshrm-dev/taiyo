import { configureStore } from '@reduxjs/toolkit';
import contactsReducer, { ContactsState } from './ContactsSlice';

interface RootState {
  contacts: ContactsState;
}

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export default store;
export type { RootState };