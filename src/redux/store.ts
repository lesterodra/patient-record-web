import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import patientReducer from "./features/patient-slice";
import recordReducer from "./features/record-slice";
import userReducer from "./features/user-slice";

export const store = configureStore({
  reducer: {
    patientReducer,
    recordReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
