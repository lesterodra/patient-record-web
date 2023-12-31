"use client";

import { useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fetchNoOfPatientsForFollowUp } from "@/utils/dataFetchers";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePatientRecordListQueryParameters } from "@/redux/features/record-slice";
import { convertToDateString } from "@/utils/displayParser";

const Cards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { noOfPatientsForFollowUp } = useAppSelector(
    (state) => state.recordReducer.value
  );

  const dateObject = new Date();
  const dateNextThreeDays = new Date(
    dateObject.setDate(dateObject.getDate() + 3)
  );
  const followUpDate = convertToDateString(dateNextThreeDays);

  useEffect(() => {
    fetchNoOfPatientsForFollowUp(dispatch, { followUpDate });
  }, []);

  const onViewPatientsForFollowUpClick = () => {
    dispatch(updatePatientRecordListQueryParameters({ followUpDate }));
    router.push("/records");
  };

  return (
    <div className="flex gap-5 flex-wrap">
      <Card className="max-w-sm">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          No. of Patient for Follow up
        </h5>
        <p className="text-center text-5xl font-extrabold text-gray-700 dark:text-gray-400">
          {noOfPatientsForFollowUp === undefined ? (
            <Spinner />
          ) : (
            noOfPatientsForFollowUp
          )}
        </p>
        <Button onClick={onViewPatientsForFollowUpClick}>
          View
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Card>
    </div>
  );
};

export default Cards;
