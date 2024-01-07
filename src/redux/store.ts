import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import patientReducer from "./features/patient-slice";
import recordReducer from "./features/record-slice";
import userReducer from "./features/user-slice";
import applicationReducer from "./features/application-slice";
import dashboardReducer from "./features/dashboard-slice";

export const store = configureStore({
  reducer: {
    patientReducer,
    recordReducer,
    userReducer,
    applicationReducer,
    dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
