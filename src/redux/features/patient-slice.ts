import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PatientType = {
  lastName: string;
  firstName: string;
};

type InitialState = {
  value: {
    patientList: PatientType[];
  };
};

const initialState: InitialState = {
  value: {
    patientList: [],
  },
};

export const patient = createSlice({
  name: "patient",
  initialState,
  reducers: {
    fetchPatients: (state, action: PayloadAction<PatientType[]>) => {
      return {
        value: {
          patientList: [...state.value.patientList, ...action.payload],
        },
      };
    },
  },
});

export const { fetchPatients } = patient.actions;
export default patient.reducer;
