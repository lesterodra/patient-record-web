import { Pagination } from "flowbite-react";

type PaginationFooterProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalRecords: number;
  totalPage: number;
  pageSize: number;
};

const PaginationFooter = (props: PaginationFooterProps) => {
  const { totalPage, totalRecords, currentPage, onPageChange, pageSize } =
    props;

  const countFrom = (currentPage - 1) * pageSize + 1;
  const countTo = currentPage * pageSize;

  return (
    <div className="flex justify-between items-center">
      <div>
        <p>{`Showing ${countFrom} to ${
          countTo > totalRecords ? totalRecords : countTo
        } of ${totalRecords} Records`}</p>
      </div>
      <Pagination
        currentPage={totalPage ? currentPage : 0}
        onPageChange={onPageChange}
        totalPages={totalPage}
      />
    </div>
  );
};

export default PaginationFooter;
