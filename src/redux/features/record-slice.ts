import { Drawing, PatientInformation, PatientRecord } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VisualAcuity = {
  eyeType: string;
  sc: string;
  ph: string;
  cc: string;
  ncc: string;
  j: string;
};

export type RecordInputType = {
  id?: number;
  recordNo?: string;
  visitType?: string;
  dilateType?: string;
  patientInformationId?: number;
  reasonForVisit?: string[];
  surgeries?: string[];
  surgeryNotes?: string;
  reasonForVisitNotes?: string;
  previousMedicines?: string;
  autoRefractionOD?: string;
  autoRefractionOs?: string;
  appointmentTime?: string;
  intraOcularPressureOD?: string;
  intraOcularPressureOS?: string;
  medicalDoctor?: string;
  medicalDoctorUserId?: number;
  patientInformation?: PatientInformation;
  visualAcuities?: VisualAcuity[];
  refractionOd?: string;
  refractionOdNegative?: string;
  refractionOdX?: string;
  refractionOs?: string;
  refractionOsNegative?: string;
  refractionOsX?: string;
  refractionAdd?: string;
  refractionPd?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RecordType = {
  id: number;
  status: string;
  followUpDate: string;
  dilateType: string;
  recordNo: string;
  visitType: string;
  surgeries: string[];
  surgeryNotes: string;
  patientInformationId: number;
  reasonForVisit: string[];
  reasonForVisitNotes: string;
  previousMedicines: string;
  autoRefractionOD: string;
  autoRefractionOs: string;
  appointmentTime: string;
  intraOcularPressureOD: string;
  intraOcularPressureOS: string;
  medicalDoctor: string;
  medicalDoctorUserId: number;
  patientInformation: PatientInformation;
  refractionOd: string;
  refractionOdNegative: string;
  refractionOdX: string;
  refractionOs: string;
  refractionOsNegative: string;
  refractionOsX: string;
  refractionAdd: string;
  refractionPd: string;
  visualAcuities: VisualAcuity[];
  createdAt: Date;
  updatedAt: Date;
};

type RecordListResponse = {
  data: RecordType[];
  page: number;
  limit: number;
  totalPage: number;
  totalRecords: number;
};

type PatientRecordListQueryParameters = {
  quickSearchInput?: string;
  recordNo?: string;
  patientNo?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  birthDate?: string;
  dateFrom?: string;
  dateTo?: string;
  followUpDate?: string;
};

type InitialState = {
  value: {
    recordList?: RecordListResponse;
    patientRecordInput?: RecordInputType;
    drawingDataUrl?: string;
    drawingList?: Drawing[];
    patientRecordListQueryParameters: PatientRecordListQueryParameters;
    patientRecord?: RecordType;
    noOfPatientsForFollowUp?: number;
  };
};

const initialState: InitialState = {
  value: {
    recordList: undefined,
    patientRecordInput: {},
    drawingDataUrl: "",
    drawingList: undefined,
    patientRecordListQueryParameters: {},
    patientRecord: undefined,
    noOfPatientsForFollowUp: undefined,
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
    updatePatientRecordInput: (
      state,
      action: PayloadAction<RecordInputType>
    ) => {
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
    clearRecordInput: (state) => ({
      value: { ...state.value, patientRecordInput: {} },
    }),
    setDrawingDataUrl: (state, action: PayloadAction<string>) => {
      return {
        value: {
          ...state.value,
          drawingDataUrl: action.payload,
        },
      };
    },
    setDrawingList: (state, action: PayloadAction<Drawing[]>) => {
      return {
        value: {
          ...state.value,
          drawingList: action.payload,
        },
      };
    },
    updatePatientRecordListQueryParameters: (
      state,
      action: PayloadAction<PatientRecordListQueryParameters>
    ) => ({
      value: {
        ...state.value,
        patientRecordListQueryParameters: {
          ...state.value.patientRecordListQueryParameters,
          ...action.payload,
        },
      },
    }),
    clearPatientRecordListQueryParameters: (state) => ({
      value: { ...state.value, patientRecordListQueryParameters: {} },
    }),
    setPatientRecord: (state, action: PayloadAction<RecordType>) => ({
      value: {
        ...state.value,
        patientRecord: {
          ...action.payload,
        },
      },
    }),
    setNoOfPatientsForFollowUp: (state, action: PayloadAction<number>) => ({
      value: {
        ...state.value,
        noOfPatientsForFollowUp: action.payload,
      },
    }),
  },
});

export const {
  fetchRecords,
  updatePatientRecordInput,
  appendRecords,
  clearRecordInput,
  setDrawingDataUrl,
  setDrawingList,
  updatePatientRecordListQueryParameters,
  clearPatientRecordListQueryParameters,
  setPatientRecord,
  setNoOfPatientsForFollowUp,
} = record.actions;
export default record.reducer;
