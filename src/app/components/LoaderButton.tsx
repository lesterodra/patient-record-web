import { Button } from "flowbite-react";
import LoadingSpinner from "./LoadingSpinner";

type LoaderButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const LoaderButton = (props: LoaderButtonProps) => {
  const { children, isLoading } = props;
  return (
    <Button disabled={isLoading}>
      {isLoading ? <LoadingSpinner /> : children}
    </Button>
  );
};

export default LoaderButton;
