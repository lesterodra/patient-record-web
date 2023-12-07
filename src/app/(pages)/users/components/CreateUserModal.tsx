"use client";

import Dropdown from "@/app/components/Dropdown";
import LabeledInput from "@/app/components/LabeledInput";
import { clearUserInput, updateUserInput } from "@/redux/features/user-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getDepartmentList, getUserList, saveUser } from "@/utils/dataFetchers";
import { Department } from "@prisma/client";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CreateUserModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { userInput } = useAppSelector((state) => state.userReducer.value);

  useEffect(() => {
    async function setDepartmentList() {
      const departmentList = await getDepartmentList();

      setDepartments(departmentList);
    }

    setDepartmentList();
  }, []);

  const onCreateUserClick = async () => {
    await saveUser(dispatch, userInput ?? {});
    setIsOpen(false);
    dispatch(clearUserInput());
    getUserList(dispatch, {});
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create New User</Button>
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Create User Information</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex gap-10 flex-wrap">
              <LabeledInput
                label="First Name"
                onChange={(e) => {
                  dispatch(updateUserInput({ firstName: e.target.value }));
                }}
              />
              <LabeledInput
                label="Last Name"
                onChange={(e) => {
                  dispatch(updateUserInput({ lastName: e.target.value }));
                }}
              />
              <LabeledInput
                label="Middle Name"
                onChange={(e) => {
                  dispatch(updateUserInput({ middleName: e.target.value }));
                }}
              />
            </div>
            <div className="flex gap-10 flex-wrap">
              <LabeledInput
                label="Email"
                onChange={(e) => {
                  dispatch(updateUserInput({ email: e.target.value }));
                }}
              />
              {/* <Dropdown
                label="Department"
                options={["Admin", "Doctor"]}
                onChange={(e) => {
                  dispatch(updateUserInput({ departmentId: 1 }));
                }}
              /> */}
              <div>
                <p>Department</p>
                <select
                  className="rounded-md"
                  name="department"
                  onChange={(e) => {
                    dispatch(
                      updateUserInput({ departmentId: Number(e.target.value) })
                    );
                  }}
                >
                  <option value=""></option>
                  {departments.map((department, index) => (
                    <option key={`department-${index}`} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
              <Dropdown
                label="Status"
                options={["Active", "Inactive"]}
                onChange={(e) => {
                  dispatch(updateUserInput({ status: e.target.value }));
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={onCreateUserClick}>Create</Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateUserModal;
