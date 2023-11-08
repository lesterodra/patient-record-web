"use client";

import { fetchPatients } from "@/redux/features/patient-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { patientList } = useAppSelector((state) => state.patientReducer.value);

  const onButtonClick = () => {
    // dispatch(fetchPatients([{ firstName: "test111", lastName: "22222" }]));
  };

  return (
    <div>
      <h1>home</h1>
      <button onClick={onButtonClick}>test dispatch</button>
    </div>
  );
};

export default Home;
