import { Button } from "flowbite-react";
import LoadingSpinner from "./LoadingSpinner";
import { ReactNode } from "react";

type ButtonWithSpinnerProps = {
  isLoading?: boolean;
  isSuccess?: boolean;
  children: ReactNode;
  color?: string;
  onClick?: () => void;
};

const ButtonWithSpinner = (props: ButtonWithSpinnerProps) => {
  const { isLoading, children, color, onClick } = props;

  return (
    <div>
      <Button disabled={isLoading} color={color} onClick={onClick}>
        {isLoading ? <LoadingSpinner /> : children}
      </Button>
    </div>
  );
};

export default ButtonWithSpinner;
