import prisma from "@/db";
import {
  setErrorAlert,
  setSuccessfulAlert,
} from "@/redux/features/application-slice";
import {
  PatientType,
  fetchPatients,
  setPatientInformation,
} from "@/redux/features/patient-slice";
import {
  fetchRecords,
  appendRecords,
  setDrawingList,
  setPatientRecord,
  RecordType,
  RecordInputType,
} from "@/redux/features/record-slice";
import {
  fetchDoctors,
  fetchUsers,
  setDepartmentList,
} from "@/redux/features/user-slice";
import { AppDispatch } from "@/redux/store";
import axios from "axios";

export const createPatientRecord = async (
  dispatch: AppDispatch,
  data: {
    patientInformationId: number;
    reasonForVisit?: string[];
    reasonForVisitNotes?: string | null;
    previousMedicines?: string | null;
    autoRefractionOD?: string | null;
    autoRefractionOs?: string | null;
    appointmentTime?: string | null;
    intraOcularPressureOD?: string | null;
    intraOcularPressureOS?: string | null;
    medicalDoctor?: string | null;
    medicalDoctorUserId?: number | null;
    refractionOd?: string | null;
    refractionOdNegative?: string | null;
    refractionOdX?: string | null;
    refractionOs?: string | null;
    refractionOsNegative?: string | null;
    refractionOsX?: string | null;
    refractionAdd?: string | null;
    refractionPd?: string | null;
    visualAcuities?: any[];
    visitType?: string | null;
  }
) => {
  try {
    const {
      patientInformationId,
      reasonForVisit,
      reasonForVisitNotes,
      previousMedicines,
      autoRefractionOD,
      autoRefractionOs,
      appointmentTime,
      intraOcularPressureOD,
      intraOcularPressureOS,
      medicalDoctor,
      medicalDoctorUserId,
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
      reasonForVisitNotes,
      previousMedicines,
      autoRefractionOD,
      autoRefractionOs,
      appointmentTime,
      intraOcularPressureOD,
      intraOcularPressureOS,
      medicalDoctor,
      medicalDoctorUserId,
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
    quickSearchInput?: string;
    recordNo?: string;
    patientNo?: string;
    lastName?: string;
    firstName?: string;
    middleName?: string;
    birthDate?: string;
    dateFrom?: string;
    dateTo?: string;
  }
) => {
  try {
    const {
      patientInformationId,
      quickSearchInput,
      recordNo,
      patientNo,
      lastName,
      firstName,
      middleName,
      birthDate,
      sortOrder,
      dateFrom,
      dateTo,
      page = 1,
      limit = 5,
    } = data ?? {};
    const response = await axios.get("/api/records", {
      params: {
        page,
        limit,
        sortOrder,
        patientInformationId,
        quickSearchInput,
        recordNo,
        patientNo,
        lastName,
        firstName,
        middleName,
        birthDate,
        dateFrom,
        dateTo,
      },
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
  data?: {
    page?: number;
    limit?: number;
    quickSearchInput?: string;
    patientNo?: string;
    lastName?: string;
    firstName?: string;
    middleName?: string;
    birthDate?: string;
  }
) => {
  try {
    const {
      quickSearchInput,
      patientNo,
      lastName,
      firstName,
      middleName,
      birthDate,
      page = 1,
      limit = 5,
    } = data ?? {};
    const response = await axios.get("/api/patients", {
      params: {
        quickSearchInput,
        patientNo,
        lastName,
        firstName,
        middleName,
        birthDate,
        page,
        limit,
      },
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
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    email?: string | null;
    departmentId?: number | null;
    status?: string | null;
  }
) => {
  try {
    const { firstName, lastName, middleName, email, departmentId, status } =
      data;

    const response = await axios.post("/api/users", {
      firstName,
      lastName,
      middleName,
      email,
      departmentId,
      status,
    });

    dispatch(setSuccessfulAlert("Success"));

    return response.data;
  } catch (error) {
    console.log({ error });
    dispatch(setErrorAlert("Error"));
  }
};

export const updateUser = async (
  dispatch: AppDispatch,
  id: number,
  data: {
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    email?: string | null;
    departmentId?: number | null;
    status?: string | null;
  }
) => {
  try {
    const { firstName, lastName, middleName, email, departmentId, status } =
      data;

    const response = await axios.patch(`/api/users/${id}`, {
      firstName,
      lastName,
      middleName,
      email,
      departmentId,
      status,
    });

    dispatch(setSuccessfulAlert("Success"));

    return response.data;
  } catch (error) {
    console.log({ error });
    dispatch(setErrorAlert("Error"));
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

export const getDoctorList = async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get("/api/users", {
      params: { departmentId: 2, page: 1, limit: 10000 },
    });

    dispatch(fetchDoctors(response.data.data));
  } catch (error) {
    console.log({ error });
  }
};

export const getUserByEmailAddress = async (email: string) => {
  try {
    const response = await axios.get("/api/users", {
      params: { email },
    });

    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

export const registerUser = async (
  userId: number,
  username: string,
  password: string
) => {
  try {
    const response = await axios.patch(`/api/users/${userId}/register`, {
      body: { username, password },
    });
  } catch (error) {
    console.error({ error });
    throw new Error("Register user error.");
  }
};

export const getDepartmentList = async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/api/departments`);

    dispatch(setDepartmentList(response.data));
  } catch (error) {
    console.error({ error });
    throw new Error("Fetch department error.");
  }
};

export const updatePatientDetails = async (id: number, data: PatientType) => {
  try {
    await axios.patch(`/api/patients/${id}`, data);
  } catch (error) {
    console.error({ error });
    throw new Error("Update patient error.");
  }
};

export const getPatientDetailsById = async (
  dispatch: AppDispatch,
  id: string
) => {
  try {
    const response = await axios.get(`/api/patients/${id}`);

    dispatch(setPatientInformation(response.data.data));
  } catch (error) {
    console.error({ error });
    throw new Error("Get patient error.");
  }
};

export const getPatientRecordById = async (
  dispatch: AppDispatch,
  id: string
) => {
  try {
    const response = await axios.get(`/api/records/${id}`);

    dispatch(setPatientRecord(response.data.data));
  } catch (error) {
    console.error({ error });
    throw new Error("Get patient error.");
  }
};

export const updatePatientRecord = async (
  id: number,
  data: RecordInputType
) => {
  try {
    await axios.patch(`/api/records/${id}`, data);
  } catch (error) {
    console.error({ error });
    throw new Error("Update patient error.");
  }
};
