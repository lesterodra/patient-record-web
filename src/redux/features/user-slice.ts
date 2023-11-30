import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  departmentId?: number;
  department?: { name: string };
};

type UserListResponse = {
  data: UserType[];
  page: number;
  limit: number;
  totalPage: number;
  totalRecords: number;
};

type InitialState = {
  value: {
    userList?: UserListResponse;
    userInput?: UserType;
  };
};

const initialState: InitialState = {
  value: {
    userList: undefined,
    userInput: {},
  },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<UserListResponse>) => {
      return {
        value: {
          ...state.value,
          userList: action.payload,
        },
      };
    },
    updateUserInput: (state, action: PayloadAction<UserType>) => {
      return {
        value: {
          ...state.value,
          userInput: {
            ...(state.value.userInput ?? {}),
            ...action.payload,
          },
        },
      };
    },
    clearUserInput: (state) => ({
      value: { ...state.value, userInput: {} },
    }),
  },
});

export const { fetchUsers, updateUserInput, clearUserInput } = user.actions;
export default user.reducer;
