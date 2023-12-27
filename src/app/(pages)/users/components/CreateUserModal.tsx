"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { getUserList, saveUser } from "@/utils/dataFetchers";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import UserInputForm from "./UserInputForm";
import { useForm } from "react-hook-form";
import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";

const CreateUserModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { departments } = useAppSelector((state) => state.userReducer.value);

  const { register, handleSubmit, formState, getValues, reset, setValue } =
    useForm({
      defaultValues: {
        firstName: null,
        lastName: null,
        middleName: null,
        email: null,
        status: null,
        departmentId: null,
      },
    });

  const onCreateUserClick = async () => {
    const { firstName, lastName, middleName, departmentId, email, status } =
      getValues();
    await saveUser(dispatch, {
      firstName,
      lastName,
      middleName,
      departmentId: Number(departmentId),
      email,
      status,
    });
    setIsOpen(false);
    reset();
    getUserList(dispatch, {});
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create New User</Button>
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Create User Information</Modal.Header>
        <Modal.Body>
          <UserInputForm
            formRegister={register}
            formSetValue={setValue}
            formState={formState}
            departmentList={departments ?? []}
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <ButtonWithSpinner
            isLoading={formState.isSubmitting}
            onClick={handleSubmit(onCreateUserClick)}
            isSuccess
          >
            Create
          </ButtonWithSpinner>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateUserModal;
