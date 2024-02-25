import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ForCheckupByDoctor = {
  id: number;
  count: number;
  name: string;
};

type DashboardType = {
  noOfPatientsForFollowUp: number;
  forCheckupByDoctors: ForCheckupByDoctor[];
};

type InitialState = {
  value: {
    dashboard?: DashboardType;
  };
};

const initialState: InitialState = {
  value: {
    dashboard: undefined,
  },
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardValue: (state, action: PayloadAction<DashboardType>) => {
      return {
        value: {
          ...state.value,
          dashboard: action.payload,
        },
      };
    },
  },
});

export const { setDashboardValue } = dashboard.actions;
export default dashboard.reducer;
