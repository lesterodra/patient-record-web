import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PatientType = {
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
  knownAllergiesNotes?: string;
  personalMedicalHistories?: string[];
  personalMedicalHistoriesNotes?: string;
  previousSurgeries?: string[];
  previousSurgeriesNotes?: string;
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

type PatientListQueryParameters = {
  quickSearchInput?: string;
  patientNo?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  birthDate?: string;
  currentPage?: number;
};

type InitialState = {
  value: {
    patientList?: PatientListResponse;
    patientInformationInput?: PatientType;
    patientListQueryParameters?: PatientListQueryParameters;
    patientInformation?: PatientType;
  };
};

const initialState: InitialState = {
  value: {
    patientList: undefined,
    patientInformationInput: {},
    patientListQueryParameters: {},
    patientInformation: undefined,
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
    updatePatientListQueryParameters: (
      state,
      action: PayloadAction<PatientListQueryParameters>
    ) => ({
      value: {
        ...state.value,
        patientListQueryParameters: {
          ...state.value.patientListQueryParameters,
          ...action.payload,
        },
      },
    }),
    clearPatientInformationInput: (state) => ({
      value: { ...state.value, patientInformationInput: {} },
    }),
    clearPatientListQueryParameters: (state) => ({
      value: { ...state.value, patientListQueryParameters: {} },
    }),
    setPatientInformation: (state, action: PayloadAction<PatientType>) => ({
      value: {
        ...state.value,
        patientInformation: action.payload,
      },
    }),
  },
});

export const {
  fetchPatients,
  updatePatientInformationInput,
  clearPatientInformationInput,
  updatePatientListQueryParameters,
  clearPatientListQueryParameters,
  setPatientInformation,
} = patient.actions;
export default patient.reducer;
