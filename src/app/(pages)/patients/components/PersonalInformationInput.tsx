import { useDispatch } from "react-redux";
import { updatePatientInformationInput } from "@/redux/features/patient-slice";
import { AppDispatch } from "@/redux/store";
import CheckboxItem from "@/app/components/CheckboxItem";
import DatePicker from "@/app/components/DatePicker";
import Dropdown from "@/app/components/Dropdown";
import GenderSelect from "@/app/components/GenderSelect";
import LabeledInput from "@/app/components/LabeledInput";
import {
  MEDICAL_HISTORY,
  NATIONALITY_LIST,
  PREVIOUS_SURGERIES,
} from "@/utils/constants";
import AddressInput from "@/app/components/AddressInput";
import { useCallback } from "react";

const PersonalInformationInput = () => {
  const dispatch = useDispatch<AppDispatch>();

  const addressInputComponent = useCallback(() => <AddressInput />, []);

  return (
    <>
      <p className="mb-3 font-bold text-xl">Personal Information</p>
      <div className=" flex justify-between  mb-3">
        <CheckboxItem
          name="patientType"
          isRow
          items={["W/IN", "PVT"]}
          isSingleSelection
          onSelectedItemsChanged={(selectedItems) => {
            dispatch(
              updatePatientInformationInput({
                appointmentType: selectedItems[0],
              })
            );
          }}
        />
        <CheckboxItem
          name="dilateType"
          isRow
          items={["OD", "OS", "OU"]}
          isSingleSelection
          onSelectedItemsChanged={(selectedItems) => {
            dispatch(
              updatePatientInformationInput({
                dilateType: selectedItems[0],
              })
            );
          }}
        />
      </div>
      <hr className="my-5" />
      <div className="mb-3"></div>
      <div className="content">
        <div className="mb-3">
          <LabeledInput
            label="PHIC"
            onChange={(e) => {
              dispatch(
                updatePatientInformationInput({
                  philHealthNo: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-between mb-3">
          <LabeledInput
            label="First Name"
            onChange={(e) => {
              dispatch(
                updatePatientInformationInput({
                  firstName: e.target.value,
                })
              );
            }}
          />
          <LabeledInput
            label="Last Name"
            onChange={(e) => {
              dispatch(
                updatePatientInformationInput({
                  lastName: e.target.value,
                })
              );
            }}
          />
          <LabeledInput
            label="Middle Name"
            onChange={(e) => {
              dispatch(
                updatePatientInformationInput({
                  middleName: e.target.value,
                })
              );
            }}
          />
        </div>
        <hr className="my-5" />
        <div className="mb-3">{addressInputComponent()}</div>
        <hr className="my-5" />
        <div className="flex gap-10 mb-3 flex-wrap">
          <GenderSelect
            onGenderChanged={(value: string) => {
              dispatch(
                updatePatientInformationInput({
                  gender: value,
                })
              );
            }}
          />
          <DatePicker
            label="Birth Date"
            onChange={(e) => {
              dispatch(
                updatePatientInformationInput({
                  birthDate: e.target.value,
                })
              );
            }}
          />
          <Dropdown
            label="Nationality"
            options={["Others", ...NATIONALITY_LIST]}
            onChange={(e) => {
              dispatch(
                updatePatientInformationInput({
                  nationality: e.target.value,
                })
              );
            }}
          />
          <Dropdown
            label="Civil Status"
            options={["Single", "Married", "Divorced", "Widowed"]}
            onChange={(e) => {
              dispatch(
                updatePatientInformationInput({
                  civilStatus: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="flex gap-10 mb-3">
          <LabeledInput
            label="Mobile Number"
            onChange={(e) => {
              dispatch(
                updatePatientInformationInput({
                  contactNo: e.target.value,
                })
              );
            }}
          />
          <div className="flex gap-10">
            <LabeledInput
              label="Height"
              inputClassName="w-14"
              onChange={(e) => {
                dispatch(
                  updatePatientInformationInput({
                    height: e.target.value,
                  })
                );
              }}
            />
            <LabeledInput
              label="Weight"
              inputClassName="w-14"
              onChange={(e) => {
                dispatch(
                  updatePatientInformationInput({
                    weight: e.target.value,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <p className="mb-3 mt-8 font-bold text-xl">Known Allergies</p>
      <div className="flex gap-10">
        <CheckboxItem
          name="knownAllergies"
          items={["Dust", "Seafood", "Medication", "Others"]}
          isRow
          onSelectedItemsChanged={(selectedItems) => {
            dispatch(
              updatePatientInformationInput({
                knownAllergies: selectedItems,
              })
            );
          }}
        />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">
        How did you know of our institution?
      </p>
      <div className="flex gap-10">
        <CheckboxItem
          name="sourceOfReferral"
          isRow
          isSingleSelection
          items={[
            "Referral from MD",
            "Relatives",
            "Friends",
            "Social Media",
            "Others",
          ]}
          onSelectedItemsChanged={(selectedItems) => {
            dispatch(
              updatePatientInformationInput({
                sourceOfReferral: selectedItems[0],
              })
            );
          }}
        />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Personal Medical History</p>
      <div className="flex gap-10">
        <CheckboxItem
          name="medicalHistory"
          items={MEDICAL_HISTORY}
          itemPerColumn={3}
          onSelectedItemsChanged={(selectedItems) => {
            dispatch(
              updatePatientInformationInput({
                personalMedicalHistories: selectedItems,
              })
            );
          }}
        />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Previous Laser/Surgery</p>
      <div className="flex gap-10">
        <CheckboxItem
          name="previousLaserSurgeries"
          items={PREVIOUS_SURGERIES}
          itemPerColumn={5}
          onSelectedItemsChanged={(selectedItems) => {
            dispatch(
              updatePatientInformationInput({
                previousSurgeries: selectedItems,
              })
            );
          }}
        />
      </div>
    </>
  );
};

export default PersonalInformationInput;
