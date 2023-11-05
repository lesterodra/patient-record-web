import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PatientType = {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  philHealthNo?: string;
  height?: string;
  weight?: string;
  birthDate?: string;
  address?: string;
  gender?: string;
  nationality?: string;
  civilStatus?: string;
  contactNo?: string;
  knownAllergies?: string[];
  personalMedicalHistories?: string[];
  previousSurgeries?: string[];
  appointmentType?: string;
  dilateType?: string;
  sourceOfReferral?: string[];
};

type InitialState = {
  value: {
    patientList?: PatientType[];
    patientInformationInput?: PatientType;
  };
};

const initialState: InitialState = {
  value: {
    patientList: [],
    patientInformationInput: {},
  },
};

export const patient = createSlice({
  name: "patient",
  initialState,
  reducers: {
    fetchPatients: (state, action: PayloadAction<PatientType[]>) => {
      return {
        value: {
          patientList: [...(state.value.patientList ?? []), ...action.payload],
        },
      };
    },
    updatePatientInformationInput: (
      state,
      action: PayloadAction<PatientType>
    ) => {
      return {
        value: {
          patientInformationInput: {
            ...(state.value.patientInformationInput ?? {}),
            ...action.payload,
          },
        },
      };
    },
  },
});

export const { fetchPatients, updatePatientInformationInput } = patient.actions;
export default patient.reducer;
