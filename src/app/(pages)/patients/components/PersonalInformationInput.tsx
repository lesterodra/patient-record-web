import CheckboxItem from "@/app/components/CheckboxItem";
import DatePicker from "@/app/components/DatePicker";
import Dropdown from "@/app/components/Dropdown";
import GenderSelect from "@/app/components/GenderSelect";
import LabeledInput from "@/app/components/LabeledInput";
import { MEDICAL_HISTORY, PREVIOUS_SURGERIES } from "@/utils/constants";

const PersonalInformationInput = () => {
  return (
    <>
      <p className="mb-3 font-bold text-xl">Personal Information</p>
      <div className=" flex justify-between  mb-3">
        <CheckboxItem name="patientType" isRow items={["W/IN", "PVT"]} />
        <CheckboxItem name="missing" isRow items={["OD", "OS", "OU"]} />
      </div>
      <div className="mb-3"></div>
      <div className="content">
        <div className="mb-3">
          <LabeledInput label="PHIC" />
        </div>
        <div className="flex gap-2 flex-wrap justify-between mb-3">
          <LabeledInput label="First Name" />
          <LabeledInput label="Last Name" />
          <LabeledInput label="Middle Name" />
        </div>
        <div className="flex gap-3 justify-between mb-3">
          <LabeledInput label="Address" inputClassName="w-96" />
          <GenderSelect />
          <DatePicker label="Birth Date" />
        </div>
        <div className="flex gap-2 justify-between mb-3">
          <LabeledInput label="Age" />
          <Dropdown label="Nationality" options={["Filipino", "Others"]} />
          <Dropdown label="Civil Status" options={["Single", "Married"]} />
          <LabeledInput label="Mobile Number" />
        </div>
        <div className="flex gap-3">
          <LabeledInput label="Height" inputClassName="w-14" />
          <LabeledInput label="Weight" inputClassName="w-14" />
        </div>
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Known Allergies</p>
      <div className="flex gap-10">
        <CheckboxItem
          name="knownAllergies"
          isRow
          items={["Dust", "Seafood", "Medication", "Others"]}
        />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">
        How did you know of our institution?
      </p>
      <div className="flex gap-10">
        <CheckboxItem
          name="sourceOfReferral"
          isRow
          items={[
            "Referral from MD",
            "Relatives",
            "Friends",
            "Social Media",
            "Others",
          ]}
        />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Personal Medical History</p>
      <div className="flex gap-10">
        <CheckboxItem
          name="medicalHistory"
          items={MEDICAL_HISTORY.slice(0, 3)}
        />
        <CheckboxItem
          name="medicalHistory"
          items={MEDICAL_HISTORY.slice(3, 6)}
        />
        <CheckboxItem
          name="medicalHistory"
          items={MEDICAL_HISTORY.slice(6, 9)}
        />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Previous Laser/Surgery</p>
      <div className="flex gap-10">
        <CheckboxItem
          name="previousLaserSurgeries"
          items={PREVIOUS_SURGERIES.slice(0, 5)}
        />
        <CheckboxItem
          name="previousLaserSurgeries"
          items={PREVIOUS_SURGERIES.slice(5, 9)}
        />
      </div>
    </>
  );
};

export default PersonalInformationInput;
