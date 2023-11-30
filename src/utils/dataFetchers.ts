import { fetchPatients } from "@/redux/features/patient-slice";
import {
  fetchRecords,
  appendRecords,
  setDrawingList,
} from "@/redux/features/record-slice";
import { fetchUsers } from "@/redux/features/user-slice";
import { AppDispatch } from "@/redux/store";
import axios from "axios";

export const createPatientRecord = async (
  dispatch: AppDispatch,
  data: {
    patientInformationId: number;
    reasonForVisit?: string[];
    previousMedicines?: string;
    autoRefractionOD?: string;
    autoRefractionOs?: string;
    appointmentTime?: string;
    intraOcularPressureOD?: string;
    intraOcularPressureOS?: string;
    medicalDoctor?: string;
    refractionOd?: string;
    refractionOdNegative?: string;
    refractionOdX?: string;
    refractionOs?: string;
    refractionOsNegative?: string;
    refractionOsX?: string;
    refractionAdd?: string;
    refractionPd?: string;
    visualAcuities?: any[];
    visitType?: string;
  }
) => {
  try {
    const {
      patientInformationId,
      reasonForVisit,
      previousMedicines,
      autoRefractionOD,
      autoRefractionOs,
      appointmentTime,
      intraOcularPressureOD,
      intraOcularPressureOS,
      medicalDoctor,
      visualAcuities,
      refractionOd,
      refractionOdNegative,
      refractionOdX,
      refractionOs,
      refractionOsNegative,
      refractionOsX,
      refractionAdd,
      refractionPd,
      visitType,
    } = data;

    const response = await axios.post("/api/records", {
      patientInformationId,
      reasonForVisit,
      previousMedicines,
      autoRefractionOD,
      autoRefractionOs,
      appointmentTime,
      intraOcularPressureOD,
      intraOcularPressureOS,
      medicalDoctor,
      visualAcuities,
      refractionOd,
      refractionOdNegative,
      refractionOdX,
      refractionOs,
      refractionOsNegative,
      refractionOsX,
      refractionAdd,
      refractionPd,
      visitType,
    });

    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

export const getPatientRecordList = async (
  dispatch: AppDispatch,
  data?: {
    patientInformationId?: number;
    page?: number;
    limit?: number;
    sortOrder?: string;
  }
) => {
  try {
    const { patientInformationId, sortOrder, page = 1, limit = 5 } = data ?? {};
    const response = await axios.get("/api/records", {
      params: { page, limit, sortOrder, patientInformationId },
    });

    dispatch(fetchRecords(response.data));
  } catch (error) {
    console.log({ error });
  }
};

export const appendPatientRecordList = async (
  dispatch: AppDispatch,
  data?: {
    page?: number;
    limit?: number;
    patientInformationId?: number;
    sortOrder?: string;
  }
) => {
  try {
    const { page = 1, limit = 5, patientInformationId, sortOrder } = data ?? {};
    const response = await axios.get("/api/records", {
      params: { page, limit, patientInformationId, sortOrder },
    });

    dispatch(appendRecords(response.data));
  } catch (error) {
    console.log({ error });
  }
};

export const getPatientList = async (
  dispatch: AppDispatch,
  data?: { page?: number; limit?: number }
) => {
  try {
    const { page = 1, limit = 5 } = data ?? {};
    const response = await axios.get("/api/patients", {
      params: { page, limit },
    });

    dispatch(fetchPatients(response.data));
  } catch (error) {
    console.log({ error });
  }
};

export const saveDrawing = async (
  dispatch: AppDispatch,
  data: {
    patientRecordId: number;
    dataUrl: string;
  }
) => {
  try {
    const { patientRecordId, dataUrl } = data;

    const response = await axios.post("/api/drawings", {
      patientRecordId,
      dataUrl,
    });

    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

export const deleteDrawing = async (dispatch: AppDispatch, id: number) => {
  try {
    const response = await axios.delete(`/api/drawings/${id}`);

    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchDrawings = async (
  dispatch: AppDispatch,
  patientRecordId: number
) => {
  try {
    const response = await axios.get("/api/drawings", {
      params: { patientRecordId },
    });

    dispatch(setDrawingList(response.data));
    return;
  } catch (error) {
    console.log({ error });
  }
};

export const saveUser = async (
  dispatch: AppDispatch,
  data: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    email?: string;
    departmentId?: number;
  }
) => {
  try {
    const { firstName, lastName, middleName, email, departmentId } = data;

    const response = await axios.post("/api/users", {
      firstName,
      lastName,
      middleName,
      email,
      departmentId,
    });

    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

export const getUserList = async (
  dispatch: AppDispatch,
  data?: { page?: number; limit?: number }
) => {
  try {
    const { page = 1, limit = 5 } = data ?? {};
    const response = await axios.get("/api/users", {
      params: { page, limit },
    });

    dispatch(fetchUsers(response.data));
  } catch (error) {
    console.log({ error });
  }
};
