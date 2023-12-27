import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AlertType = {
  message: string;
  type: string;
};

type InitialState = {
  value: {
    alert?: AlertType;
  };
};

const initialState: InitialState = {
  value: {
    alert: undefined,
  },
};

export const application = createSlice({
  name: "application",
  initialState,
  reducers: {
    setSuccessfulAlert: (state, action: PayloadAction<string>) => {
      return {
        value: {
          ...state.value,
          alert: {
            message: action.payload,
            type: "success",
          },
        },
      };
    },
    setErrorAlert: (state, action: PayloadAction<string>) => {
      return {
        value: {
          ...state.value,
          alert: {
            message: action.payload,
            type: "error",
          },
        },
      };
    },
    clearAlert: (state) => {
      return {
        value: {
          ...state.value,
          alert: undefined,
        },
      };
    },
  },
});

export const { setErrorAlert, setSuccessfulAlert, clearAlert } =
  application.actions;
export default application.reducer;
