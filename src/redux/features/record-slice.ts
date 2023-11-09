import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RecordType = {
  id?: string;
  patientInformationId?: number;
  reasonForVisit?: string;
  previousMedicines?: string;
  autoRefractionOD?: string;
  autoRefractionOs?: string;
  appointmentTime?: string;
  intraOcularPressureOD?: string;
  intraOcularPressureOS?: string;
  medicalDoctor?: string;
};

type RecordListResponse = {
  data: RecordType[];
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

export const { fetchRecords, updatePatientRecordInput } = record.actions;
export default record.reducer;
