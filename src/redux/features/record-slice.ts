import {
  Attachment,
  Drawing,
  PatientInformation,
  PatientRecord,
} from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./user-slice";

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
  autoRefractionByUserId?: number | null;
  visualAcuityByUserId?: number | null;
  refractionByUserId?: number | null;
  intraOcularPressureByUserId?: number | null;
  paymentType?: string;
  paymentNotes?: string;
  diagnosisNotes?: string;
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
  medicalDoctorUser: UserType;
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
  autoRefractionByUserId: number;
  visualAcuityByUserId: number;
  refractionByUserId: number;
  intraOcularPressureByUserId: number;
  paymentType: string;
  paymentNotes: string;
  diagnosisNotes: string;
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
  status?: string;
  statusName?: string;
  doctorName?: string;
  medicalDoctorUserId?: number;
  surgery?: string;
};

type InitialState = {
  value: {
    recordList?: RecordListResponse;
    patientRecordInput?: RecordInputType;
    drawingDataUrl?: string;
    drawingList?: Drawing[];
    patientRecordListQueryParameters: PatientRecordListQueryParameters;
    patientRecordListSearchParameters: PatientRecordListQueryParameters;
    patientRecord?: RecordType;
    noOfPatientsForFollowUp?: number;
    attachmentList?: Attachment[];
  };
};

const initialState: InitialState = {
  value: {
    recordList: undefined,
    patientRecordInput: {},
    drawingDataUrl: "",
    drawingList: undefined,
    patientRecordListQueryParameters: {},
    patientRecordListSearchParameters: {},
    patientRecord: undefined,
    noOfPatientsForFollowUp: undefined,
    attachmentList: undefined,
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
    setAttachmentList: (state, action: PayloadAction<Attachment[]>) => {
      return {
        value: {
          ...state.value,
          attachmentList: action.payload,
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
    setPatientRecordListFilterParameters: (
      state,
      action: PayloadAction<PatientRecordListQueryParameters>
    ) => ({
      value: {
        ...state.value,
        patientRecordListSearchParameters: {
          ...action.payload,
        },
      },
    }),
    clearPatientRecordListQueryParameters: (state) => ({
      value: {
        ...state.value,
        patientRecordListQueryParameters: {},
      },
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
  setAttachmentList,
  setPatientRecordListFilterParameters,
} = record.actions;
export default record.reducer;
