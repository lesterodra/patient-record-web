"use client";

import { useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboard } from "@/utils/dataFetchers";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePatientRecordListQueryParameters } from "@/redux/features/record-slice";
import { convertToDateString } from "@/utils/displayParser";
import { pusherClient } from "@/libs/pusher";
import TimeAgo from "timeago-react";

const Cards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { dashboard } = useAppSelector((state) => state.dashboardReducer.value);
  const { noOfPatientsForFollowUp, forCheckupByDoctors } = dashboard ?? {};
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  const dateObject = new Date();
  const dateNextThreeDays = new Date(
    dateObject.setDate(dateObject.getDate() + 3)
  );
  const followUpDate = convertToDateString(dateNextThreeDays);

  useEffect(() => {
    fetchDashboard(dispatch, { followUpDate });

    const channel = pusherClient.subscribe("dashboard");
    channel.bind("updateDoctorRecordCount", (data: any) => {
      fetchDashboard(dispatch, { followUpDate });
      setCurrentDateTime(new Date());
    });

    return () => {
      pusherClient.unsubscribe("dashboard");
    };
  }, []);

  const onViewPatientsForFollowUpClick = () => {
    dispatch(updatePatientRecordListQueryParameters({ followUpDate }));
    router.push("/records");
  };

  return dashboard ? (
    <div>
      <div className="flex gap-3 justify-end mb-8">
        <p>
          <b>Last update: </b>
        </p>
        <TimeAgo
          datetime={currentDateTime}
          locale="en_US"
          opts={{ minInterval: 30 }}
        />
      </div>
      <div className="flex gap-5 flex-wrap justify-center">
        <Card className="max-w-sm w-52">
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
          <Button onClick={onViewPatientsForFollowUpClick}>View</Button>
        </Card>
        {forCheckupByDoctors?.map((doctor, index) => (
          <Card className="max-w-sm w-52" key={`card-${index}`}>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              For Checkup By: <p>{doctor.name}</p>
            </h5>
            <p className="text-center text-5xl font-extrabold text-gray-700 dark:text-gray-400">
              {doctor.count}
            </p>
            <Button
              onClick={() => {
                dispatch(
                  updatePatientRecordListQueryParameters({
                    medicalDoctorUserId: doctor.id,
                    status: "1",
                  })
                );
                router.push("/records");
              }}
            >
              View
            </Button>
          </Card>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <p>Please wait </p>
      <Spinner />
    </div>
  );
};

export default Cards;
