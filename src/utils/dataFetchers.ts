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
  setNoOfPatientsForFollowUp,
  setAttachmentList,
} from "@/redux/features/record-slice";
import {
  fetchDoctors,
  fetchUsers,
  setDepartmentList,
} from "@/redux/features/user-slice";
import { AppDispatch } from "@/redux/store";
import axios, { AxiosError } from "axios";

export const createPatientRecord = async (
  dispatch: AppDispatch,
  data: {
    patientInformationId: number;
    reasonForVisit?: string[];
    surgeries?: string[];
    surgeryNotes?: string | null;
    dilateType?: string;
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
    autoRefractionByUserId?: string | null;
    visualAcuityByUserId?: string | null;
    refractionByUserId?: string | null;
    intraOcularPressureByUserId?: string | null;
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
      dilateType,
      surgeries,
      surgeryNotes,
      autoRefractionByUserId,
      visualAcuityByUserId,
      refractionByUserId,
      intraOcularPressureByUserId,
    } = data;

    const response = await axios.post("/api/records", {
      patientInformationId,
      reasonForVisit,
      surgeries,
      surgeryNotes,
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
      dilateType,
      autoRefractionByUserId,
      visualAcuityByUserId,
      refractionByUserId,
      intraOcularPressureByUserId,
    });

    dispatch(setSuccessfulAlert("Success"));

    return response.data;
  } catch (error) {
    console.log({ error });
    dispatch(setErrorAlert("Error"));
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
    followUpDate?: string;
    status?: string;
    medicalDoctorUserId?: number;
    surgery?: string;
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
      followUpDate,
      page = 1,
      limit = 5,
      status,
      medicalDoctorUserId,
      surgery,
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
        followUpDate,
        status,
        medicalDoctorUserId,
        surgery,
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

export const fetchNoOfPatientsForFollowUp = async (
  dispatch: AppDispatch,
  data?: {
    followUpDate: string;
  }
) => {
  try {
    const { followUpDate } = data ?? {};
    const response = await axios.get("/api/records", {
      params: { page: 1, limit: 1, followUpDate },
    });

    dispatch(setNoOfPatientsForFollowUp(response.data.totalRecords));
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

    dispatch(setSuccessfulAlert("Success"));

    return response.data;
  } catch (error) {
    console.log({ error });

    dispatch(setErrorAlert("Error"));
  }
};

export const deleteDrawing = async (dispatch: AppDispatch, id: number) => {
  try {
    const response = await axios.delete(`/api/drawings/${id}`);

    dispatch(setSuccessfulAlert("Success"));

    return response.data;
  } catch (error) {
    console.log({ error });

    dispatch(setErrorAlert("Error"));
  }
};

export const deleteAttachment = async (dispatch: AppDispatch, id: number) => {
  try {
    const response = await axios.delete(`/api/attachments/${id}`);

    dispatch(setSuccessfulAlert("Success"));

    return response.data;
  } catch (error) {
    console.log({ error });

    dispatch(setErrorAlert("Error"));
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

export const fetchAttachments = async (
  dispatch: AppDispatch,
  patientRecordId: number
) => {
  try {
    const response = await axios.get("/api/attachments", {
      params: { patientRecordId },
    });

    dispatch(setAttachmentList(response.data));
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

export const validateUserEmail = async (email: string) => {
  try {
    const response = await axios.get("/api/registration/validate", {
      params: { email },
    });

    return response.data;
  } catch (error) {
    console.log({ error });
    throw error;
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
    return { status: response.status, message: response.data.message };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: error.response?.status,
        message: error.response?.data.message,
      };
    }

    throw error;
  }
};

export const updateRecordStatus = async (
  dispatch: AppDispatch,
  patientRecordId: number,
  status: string
) => {
  try {
    await axios.patch(`/api/records/${patientRecordId}/status`, {
      body: { status },
    });

    dispatch(setSuccessfulAlert("Success"));
  } catch (error) {
    dispatch(setErrorAlert("Error"));
  }
};

export const updateRecordFollowUpDate = async (
  dispatch: AppDispatch,
  patientRecordId: number,
  followUpDate: string
) => {
  try {
    await axios.patch(`/api/records/${patientRecordId}/followUpDate`, {
      body: { followUpDate },
    });

    dispatch(setSuccessfulAlert("Success"));
  } catch (error) {
    dispatch(setErrorAlert("Error"));
  }
};

export const updateUserSettings = async (
  dispatch: AppDispatch,
  data: {
    userId: number;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }
) => {
  try {
    const { userId, username, password, confirmPassword } = data;
    const response = await axios.patch(`/api/users/${userId}/settings`, {
      body: { username, password, confirmPassword },
    });

    dispatch(setSuccessfulAlert("Success"));

    return { status: response.status, message: response.data.message };
  } catch (error) {
    dispatch(setErrorAlert("Error"));
    if (error instanceof AxiosError) {
      return {
        status: error.response?.status,
        message: error.response?.data.message,
      };
    }

    throw error;
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

export const updatePatientDetails = async (
  dispatch: AppDispatch,
  id: number,
  data: PatientType
) => {
  try {
    await axios.patch(`/api/patients/${id}`, data);

    dispatch(setSuccessfulAlert("Success"));
  } catch (error) {
    console.error({ error });

    dispatch(setErrorAlert("Error"));
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
  dispatch: AppDispatch,
  id: number,
  data: RecordInputType
) => {
  try {
    await axios.patch(`/api/records/${id}`, data);

    dispatch(setSuccessfulAlert("Success"));
  } catch (error) {
    console.error({ error });

    dispatch(setErrorAlert("Error"));
  }
};

export const uploadImages = async (
  dispatch: AppDispatch,
  id: number,
  formData: FormData
) => {
  try {
    await axios.post(`/api/records/${id}/attachments`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch(setSuccessfulAlert("Success"));
  } catch (error) {
    console.error({ error });

    dispatch(setErrorAlert("Error"));
  }
};
