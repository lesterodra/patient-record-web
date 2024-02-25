import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";
import { ForCheckupByDoctor } from "@/redux/features/dashboard-slice";
import { updatePatientRecordListQueryParameters } from "@/redux/features/record-slice";
import { AppDispatch } from "@/redux/store";
import { Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

type ForDoctorCheckupCardProps = {
  doctor: ForCheckupByDoctor;
};

const ForDoctorCheckupCard = (props: ForDoctorCheckupCardProps) => {
  const { doctor } = props;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Card className="max-w-sm w-52">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        For Checkup By: <p>{doctor.name}</p>
      </h5>
      <p className="text-center text-5xl font-extrabold text-gray-700 dark:text-gray-400">
        {doctor.count}
      </p>
      <ButtonWithSpinner
        isLoading={isLoading}
        onClick={() => {
          setIsLoading(true);
          dispatch(
            updatePatientRecordListQueryParameters({
              medicalDoctorUserId: doctor.id,
              status: "1",
            })
          );
          router.push("/records");
        }}
        buttonClass="w-full"
      >
        View
      </ButtonWithSpinner>
    </Card>
  );
};

export default ForDoctorCheckupCard;
