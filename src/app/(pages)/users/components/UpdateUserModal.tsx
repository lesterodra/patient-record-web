"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { getUserList, saveUser, updateUser } from "@/utils/dataFetchers";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import UserInputForm from "./UserInputForm";
import { useForm } from "react-hook-form";
import { UserType } from "@/redux/features/user-slice";
import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";

type UpdateUserModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user?: UserType;
};

const UpdateUserModal = (props: UpdateUserModalProps) => {
  const { isOpen, setIsOpen, user } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { departments } = useAppSelector((state) => state.userReducer.value);
  const { register, handleSubmit, formState, getValues, setValue } = useForm({
    values: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      middleName: user?.middleName,
      email: user?.email,
      status: user?.status,
      departmentId: user?.departmentId,
    },
  });

  const onUpdateUserClick = async () => {
    const { firstName, lastName, middleName, departmentId, email, status } =
      getValues();
    await updateUser(dispatch, Number(user?.id), {
      firstName,
      lastName,
      middleName,
      departmentId: Number(departmentId),
      email,
      status,
    });
    setIsOpen(false);
    getUserList(dispatch, {});
  };

  return (
    <>
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Update User Information</Modal.Header>
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
            onClick={handleSubmit(onUpdateUserClick)}
          >
            Update
          </ButtonWithSpinner>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
