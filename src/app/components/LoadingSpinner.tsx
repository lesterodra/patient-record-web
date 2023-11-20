import { Spinner } from "flowbite-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center">
      <Spinner color="info" aria-label="Info spinner" />
    </div>
  );
};

export default LoadingSpinner;
