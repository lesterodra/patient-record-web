import { useDispatch } from "react-redux";
import { FormState, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AppDispatch } from "@/redux/store";
import FormGenderSelect from "@/app/components/FormGenderSelect";
import {
  ERROR_MESSAGE,
  MEDICAL_HISTORY,
  NATIONALITY_LIST,
  PREVIOUS_SURGERIES,
} from "@/utils/constants";
import AddressInput from "@/app/components/AddressInput";
import { useCallback } from "react";
import FormInput from "@/app/components/FormInput";
import FormDropdown from "@/app/components/FormDropdown";
import FormDatePicker from "@/app/components/FormDatePicker";
import FormCheckboxItem from "@/app/components/FormCheckboxItem";
import FormNotes from "@/app/components/FormNotes";
import PersonalMedicalHistoryInput from "./PersonalMedicalHistoryInput";
import PreviousLaserSurgeryInput from "./PreviousLaserSurgery";

type PersonalInformationInputProps = {
  formRegister: UseFormRegister<any>;
  formState: FormState<any>;
  formSetValue: UseFormSetValue<any>;
  addressDetails?: {
    province?: string;
    municipality?: string;
    barangay?: string;
  };
};

const PersonalInformationInput = (props: PersonalInformationInputProps) => {
  const { formRegister, formState, formSetValue, addressDetails } = props;
  const { errors } = formState;
  const dispatch = useDispatch<AppDispatch>();
  const addressInputComponent = useCallback(
    () => (
      <AddressInput
        formRegister={formRegister}
        formState={formState}
        formSetValue={formSetValue}
        addressDetails={addressDetails}
      />
    ),
    [formState]
  );

  const appointmentTypeErrorMessage =
    errors?.appointmentType?.message?.toString();

  return (
    <>
      <p className="mb-3 font-bold text-xl">Personal Information</p>
      <div className=" flex justify-between  mb-3">
        <div>
          <FormCheckboxItem
            name="appointmentType"
            isRow
            items={["W/IN", "PVT"]}
            formRegister={formRegister("appointmentType", {
              required: ERROR_MESSAGE.REQUIRED,
              onChange: (e) => {
                formSetValue(
                  "appointmentType",
                  e.target.checked ? e.target.value : null,
                  {
                    shouldValidate: true,
                  }
                );
              },
            })}
          />
          {appointmentTypeErrorMessage && (
            <p className="text-xs text-red-500">
              {appointmentTypeErrorMessage}
            </p>
          )}
        </div>
      </div>
      <hr className="my-5" />
      <div className="mb-3"></div>
      <div className="content">
        <div className="mb-3">
          <FormInput
            label="PHIC"
            formRegister={formRegister("philHealthNo", {
              value: null,
              required: ERROR_MESSAGE.REQUIRED,
            })}
            errorMessage={errors?.philHealthNo?.message?.toString()}
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-between mb-3">
          <FormInput
            label="First Name"
            formRegister={formRegister("firstName", {
              value: null,
              required: ERROR_MESSAGE.REQUIRED,
            })}
            errorMessage={errors?.firstName?.message?.toString()}
          />
          <FormInput
            label="Last Name"
            formRegister={formRegister("lastName", {
              value: null,
              required: ERROR_MESSAGE.REQUIRED,
            })}
            errorMessage={errors?.lastName?.message?.toString()}
          />
          <FormInput
            label="Middle Name"
            formRegister={formRegister("middleName", {
              value: null,
              required: ERROR_MESSAGE.REQUIRED,
            })}
            errorMessage={errors?.middleName?.message?.toString()}
          />
        </div>
        <hr className="my-5" />
        <div className="mb-3">{addressInputComponent()}</div>
        <hr className="my-5" />
        <div className="flex gap-10 mb-3 flex-wrap">
          <FormGenderSelect
            formRegister={formRegister}
            errorMessage={errors?.gender?.message?.toString()}
          />
          <FormDatePicker
            label="Birth Date"
            formRegister={formRegister("birthDate", {
              required: ERROR_MESSAGE.REQUIRED,
            })}
            errorMessage={errors?.birthDate?.message?.toString()}
          />
          <FormDropdown
            label="Nationality"
            options={["Others", ...NATIONALITY_LIST]}
            formRegister={formRegister("nationality", {
              required: ERROR_MESSAGE.REQUIRED,
            })}
            errorMessage={errors?.nationality?.message?.toString()}
          />
          <FormDropdown
            label="Civil Status"
            options={["Single", "Married", "Divorced", "Widowed", "Children"]}
            formRegister={formRegister("civilStatus", {
              required: ERROR_MESSAGE.REQUIRED,
            })}
            errorMessage={errors?.civilStatus?.message?.toString()}
          />
        </div>
        <div className="flex gap-10 mb-3">
          <FormInput
            label="Mobile Number"
            formRegister={formRegister("contactNo", { value: null })}
            errorMessage={errors?.contactNo?.message?.toString()}
          />
          <div className="flex gap-10">
            <FormInput
              label="Height"
              inputClassName="w-14"
              formRegister={formRegister("height", { value: null })}
              errorMessage={errors?.height?.message?.toString()}
            />
            <FormInput
              label="Weight"
              inputClassName="w-14"
              formRegister={formRegister("weight", { value: null })}
              errorMessage={errors?.weight?.message?.toString()}
            />
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <p className="mb-3 mt-8 font-bold text-xl">
        How did you know of our institution?
      </p>
      <div className="flex gap-10">
        <FormCheckboxItem
          name="sourceOfReferral"
          isRow
          items={[
            "Referral from MD",
            "Relatives",
            "Friends",
            "Social Media",
            "Coordinator",
            "Others",
          ]}
          formRegister={formRegister("sourceOfReferral", {
            onChange: (e) => {
              formSetValue(
                "sourceOfReferral",
                e.target.checked ? e.target.value : null,
                {
                  shouldValidate: true,
                }
              );
            },
          })}
        />
      </div>
      <FormNotes formRegister={formRegister("sourceOfReferralNotes", {})} />
      <p className="mb-3 mt-8 font-bold text-xl">Known Allergies</p>
      <div className="flex gap-10">
        <FormCheckboxItem
          name="knownAllergies"
          items={["Dust", "Seafood", "Medication", "Others"]}
          isRow
          formRegister={formRegister("knownAllergies", {})}
        />
      </div>
      <FormNotes formRegister={formRegister("knownAllergiesNotes", {})} />
      <p className="mb-3 mt-8 font-bold text-xl">Personal Medical History</p>
      <PersonalMedicalHistoryInput formRegister={formRegister} />
      <FormNotes
        formRegister={formRegister("personalMedicalHistoriesNotes", {})}
      />
      <p className="mb-3 mt-8 font-bold text-xl">Previous Laser/Surgery</p>
      <PreviousLaserSurgeryInput formRegister={formRegister} />
      <FormNotes formRegister={formRegister("previousSurgeriesNotes", {})} />
    </>
  );
};

export default PersonalInformationInput;
