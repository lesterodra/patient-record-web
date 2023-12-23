"use client";

import { useEffect, useState } from "react";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import { Pagination, Table } from "flowbite-react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getDepartmentList, getUserList } from "@/utils/dataFetchers";
import { getValueDisplay } from "@/utils/displayParser";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import UpdateUserModal from "./UpdateUserModal";
import { UserType } from "@/redux/features/user-slice";

const UserList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { userList } = useAppSelector((state) => state.userReducer.value);
  const [selectedUser, setSelectedUser] = useState<UserType>();

  useEffect(() => {
    getDepartmentList(dispatch);
  }, []);

  useEffect(() => {
    getUserList(dispatch, { page: currentPage });
  }, [currentPage]);

  return (
    <>
      <UpdateUserModal
        isOpen={isUpdateUserOpen}
        setIsOpen={setIsUpdateUserOpen}
        user={selectedUser}
      />
      <ConfirmationDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
      <div className="mt-5">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="w-52">Username</Table.HeadCell>
            <Table.HeadCell className="w-52">Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell className="w-52">Department</Table.HeadCell>
            <Table.HeadCell className="w-52">Status</Table.HeadCell>
            <Table.HeadCell className="w-3">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {userList?.data.map((user) => (
              <Table.Row
                key={user.id}
                className="bg-white text-black dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{getValueDisplay(user.username)}</Table.Cell>
                <Table.Cell className="text-black">
                  {`${getValueDisplay(user.lastName)}, ${getValueDisplay(
                    user.firstName
                  )} ${getValueDisplay(user.middleName)}`}
                </Table.Cell>
                <Table.Cell>{getValueDisplay(user.email)}</Table.Cell>
                <Table.Cell>
                  {getValueDisplay(user?.department?.name)}
                </Table.Cell>
                <Table.Cell>{getValueDisplay(user?.status)}</Table.Cell>
                <Table.Cell>
                  <p
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsUpdateUserOpen(true);
                    }}
                  >
                    Edit
                  </p>
                  <p
                    onClick={() => {
                      setIsDialogOpen(true);
                    }}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                  >
                    Delete
                  </p>
                </Table.Cell>
              </Table.Row>
            ))}
            {userList?.totalRecords === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5}>No Records found!</Table.Cell>
              </Table.Row>
            )}
            {!userList && (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <LoadingSpinner />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <div className="flex justify-between items-center">
          <div>
            <p>Showing 10 of 100 Records</p>
          </div>
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            totalPages={userList?.totalPage ?? 0}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
