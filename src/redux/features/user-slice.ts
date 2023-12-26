import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  status?: string;
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

export type DepartmentType = {
  id: number;
  name: string;
};

type InitialState = {
  value: {
    userList?: UserListResponse;
    doctorList?: UserType[];
    userInput?: UserType;
    departments?: DepartmentType[];
  };
};

const initialState: InitialState = {
  value: {
    userList: undefined,
    doctorList: undefined,
    userInput: {},
    departments: undefined,
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
    fetchDoctors: (state, action: PayloadAction<UserType[]>) => {
      return {
        value: {
          ...state.value,
          doctorList: action.payload,
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
    setDepartmentList: (state, action: PayloadAction<DepartmentType[]>) => {
      return {
        value: {
          ...state.value,
          departments: action.payload,
        },
      };
    },
  },
});

export const {
  fetchUsers,
  updateUserInput,
  clearUserInput,
  setDepartmentList,
  fetchDoctors,
} = user.actions;
export default user.reducer;
