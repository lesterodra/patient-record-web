import { useState, useEffect } from "react";

type GenderSelectProps = {
  onGenderChanged: (value: string) => void;
};

const RadioButton = ({ onGenderChanged }: GenderSelectProps) => {
  const [selectedGender, setSelectedGender] = useState<string>();

  useEffect(() => {
    if (selectedGender) {
      onGenderChanged(selectedGender);
    }
  }, [selectedGender]);

  return (
    <div>
      <p>Gender</p>
      <div className="flex gap-1 items-center">
        <input
          type="radio"
          name="gender"
          value="Male"
          onClick={() => {
            setSelectedGender("Male");
          }}
        />
        <span className="mr-1">Male</span>
        <input
          type="radio"
          name="gender"
          value="Female"
          onClick={() => {
            setSelectedGender("Female");
          }}
        />
        <span className="mr-1">Female</span>
      </div>
    </div>
  );
};

export default RadioButton;
