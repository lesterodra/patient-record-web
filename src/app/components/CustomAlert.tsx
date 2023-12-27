"use client";

import { clearAlert } from "@/redux/features/application-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Alert } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CustomAlert = () => {
  const { alert } = useAppSelector((state) => state.applicationReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
    }
  }, [alert]);

  return (
    alert && (
      <div className="absolute w-full mt-10" style={{ zIndex: 500 }}>
        <div className="flex justify-center">
          <Alert
            color={alert.type === "success" ? "success" : "failure"}
            onDismiss={() => dispatch(clearAlert())}
          >
            {alert.type === "success"
              ? "Successfully saved!"
              : "Error encountered. Please contact administrator."}
          </Alert>
        </div>
      </div>
    )
  );
};

export default CustomAlert;
