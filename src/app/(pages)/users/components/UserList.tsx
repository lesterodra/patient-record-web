"use client";

import { useState } from "react";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import { Pagination, Table } from "flowbite-react";

const sampleUsers = [
  {
    id: 1,
    username: "sampleUser1",
    firstName: "john",
    lastName: "doe",
    email: "john.doe@email.com",
    role: "admin",
  },
  {
    id: 2,
    username: "sampleUser2",
    firstName: "jane",
    lastName: "doe",
    email: "jane.doe@email.com",
    role: "doctor",
  },
];

const UserList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <ConfirmationDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
      <div className="mt-5">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="w-52">Username</Table.HeadCell>
            <Table.HeadCell className="w-52">Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell className="w-52">Role</Table.HeadCell>
            <Table.HeadCell className="w-3">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {sampleUsers.map((user) => (
              <Table.Row
                key={user.id}
                className="bg-white text-black dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell className="text-black">
                  {`${user.lastName}, ${user.firstName}`}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>
                  <p
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    onClick={() => {}}
                  >
                    View
                  </p>
                  <p
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    onClick={() => {}}
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
          </Table.Body>
        </Table>
        <div className="flex justify-between items-center">
          <div>
            <p>Showing 10 of 100 Records</p>
          </div>
          <Pagination
            currentPage={1}
            onPageChange={(page) => {
              // setCurrentPage(page);
            }}
            totalPages={100}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
