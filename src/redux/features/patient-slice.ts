import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PatientType = {
  id?: string;
  patientNo?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  philHealthNo?: string;
  height?: string;
  weight?: string;
  birthDate?: string;
  address?: string;
  province?: string;
  municipality?: string;
  barangay?: string;
  gender?: string;
  nationality?: string;
  civilStatus?: string;
  contactNo?: string;
  knownAllergies?: string[];
  personalMedicalHistories?: string[];
  previousSurgeries?: string[];
  appointmentType?: string;
  dilateType?: string;
  sourceOfReferral?: string;
};

type PatientListResponse = {
  data: PatientType[];
  page: number;
  limit: number;
  totalPage: number;
  totalRecords: number;
};

type InitialState = {
  value: {
    patientList?: PatientListResponse;
    patientInformationInput?: PatientType;
  };
};

const initialState: InitialState = {
  value: {
    patientList: undefined,
    patientInformationInput: {},
  },
};

export const patient = createSlice({
  name: "patient",
  initialState,
  reducers: {
    fetchPatients: (state, action: PayloadAction<PatientListResponse>) => {
      return {
        value: {
          ...state.value,
          patientList: action.payload,
        },
      };
    },
    updatePatientInformationInput: (
      state,
      action: PayloadAction<PatientType>
    ) => {
      return {
        value: {
          ...state.value,
          patientInformationInput: {
            ...(state.value.patientInformationInput ?? {}),
            ...action.payload,
          },
        },
      };
    },
    clearPatientInformationInput: (state) => ({
      value: { ...state.value, patientInformationInput: {} },
    }),
  },
});

export const {
  fetchPatients,
  updatePatientInformationInput,
  clearPatientInformationInput,
} = patient.actions;
export default patient.reducer;
