import { Button } from "flowbite-react";
import LoadingSpinner from "./LoadingSpinner";
import { ReactNode } from "react";

type ButtonWithSpinnerProps = {
  isLoading?: boolean;
  isSuccess?: boolean;
  children: ReactNode;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  buttonClass?: string;
};

const ButtonWithSpinner = (props: ButtonWithSpinnerProps) => {
  const { isLoading, children, color, onClick, disabled, buttonClass } = props;

  return (
    <div>
      <Button
        disabled={isLoading || disabled}
        color={color}
        onClick={onClick}
        className={buttonClass ?? ""}
      >
        {isLoading ? <LoadingSpinner /> : children}
      </Button>
    </div>
  );
};

export default ButtonWithSpinner;
