import { PatientInformation, PatientRecord } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VisualAcuity = {
  eyeType: string;
  sc: string;
  ph: string;
  cc: string;
  ncc: string;
  j: string;
};

type RecordType = {
  id?: number;
  recordNo?: string;
  patientInformationId?: number;
  reasonForVisit?: string[];
  previousMedicines?: string;
  autoRefractionOD?: string;
  autoRefractionOs?: string;
  appointmentTime?: string;
  intraOcularPressureOD?: string;
  intraOcularPressureOS?: string;
  medicalDoctor?: string;
  patientInformation?: PatientInformation;
  visualAcuities?: VisualAcuity[];
  createdAt?: string;
  updatedAt?: string;
};

type RecordListResponse = {
  data: PatientRecord[];
  page: number;
  limit: number;
  totalPage: number;
  totalRecords: number;
};

type InitialState = {
  value: {
    recordList?: RecordListResponse;
    patientRecordInput?: RecordType;
  };
};

const initialState: InitialState = {
  value: {
    recordList: undefined,
    patientRecordInput: {},
  },
};

export const record = createSlice({
  name: "record",
  initialState,
  reducers: {
    fetchRecords: (state, action: PayloadAction<RecordListResponse>) => {
      return {
        value: {
          ...state.value,
          recordList: action.payload,
        },
      };
    },
    appendRecords: (state, action: PayloadAction<RecordListResponse>) => {
      console.log({
        prev: state.value.recordList?.data,
        current: action.payload,
      });
      return {
        value: {
          ...state.value,
          recordList: {
            ...action.payload,
            data: [
              ...(state.value.recordList?.data ?? []),
              ...action.payload.data,
            ],
          },
        },
      };
    },
    updatePatientRecordInput: (state, action: PayloadAction<RecordType>) => {
      return {
        value: {
          ...state.value,
          patientRecordInput: {
            ...(state.value.patientRecordInput ?? {}),
            ...action.payload,
          },
        },
      };
    },
  },
});

export const { fetchRecords, updatePatientRecordInput, appendRecords } =
  record.actions;
export default record.reducer;
