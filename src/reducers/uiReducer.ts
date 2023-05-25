import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { INotification, UI } from "../interfaces";
import { AppState } from "../store";

const initialState: UI = {
  notifications: [],
};

const uiSlice = createSlice({
  name: "[UI]",
  initialState,
  reducers: {
    newNotification: (
      state: UI,
      action: {
        payload: INotification;
      }
    ) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (
      state: UI,
      action: {
        payload: string;
      }
    ) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export { uiSlice };

// Actions
export const { newNotification, removeNotification } = uiSlice.actions;

// Select to access to the store
export const selectUI = (state: AppState) => state.ui;

export default uiSlice.reducer;
