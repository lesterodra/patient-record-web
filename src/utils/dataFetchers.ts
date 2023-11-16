import { fetchRecords, appendRecords } from "@/redux/features/record-slice";
import { AppDispatch } from "@/redux/store";
import { PatientRecord } from "@prisma/client";
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
    visualAcuities?: any[];
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
    });

    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

export const getPatientRecordList = async (
  dispatch: AppDispatch,
  data?: { page?: number; limit?: number }
) => {
  try {
    const { page = 1, limit = 5 } = data ?? {};
    const response = await axios.get("/api/records", {
      params: { page, limit },
    });

    dispatch(fetchRecords(response.data));
  } catch (error) {
    console.log({ error });
  }
};

export const appendPatientRecordList = async (
  dispatch: AppDispatch,
  data?: { page?: number; limit?: number }
) => {
  try {
    const { page = 1, limit = 5 } = data ?? {};
    const response = await axios.get("/api/records", {
      params: { page, limit },
    });

    dispatch(appendRecords(response.data));
  } catch (error) {
    console.log({ error });
  }
};
