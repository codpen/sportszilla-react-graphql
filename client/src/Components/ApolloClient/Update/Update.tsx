import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { Datepicker } from '@zendeskgarden/react-datepickers';
import { Button } from '@zendeskgarden/react-buttons';
import Loader from '../../Loader/Loader';
import styles from './Update.module.scss';

interface UserData {
  ID?: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  passW: string;
  birthday?: Date | undefined;
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date | undefined;
  __typeName?: string;
}

const UPDATE_USER = gql`
  mutation UpdateUser($id: Float!, $userData: UpdateUser!) {
    updateUser(ID: $id, userData: $userData) {
      firstName
      lastName
      userName
      email
      passW
      birthday
    }
  }
`;

interface PropTypes {
  selectedUser: UserData;
}
const Update: React.FC<PropTypes> = ({ selectedUser }) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: selectedUser.firstName,
    lastName: selectedUser.lastName,
    userName: selectedUser.userName,
    email: selectedUser.email,
    passW: selectedUser.passW,
    birthday: selectedUser.birthday,
  });

  interface Response {
    userData: UserData;
  }
  interface Arguments {
    id: number | undefined;
    userData: UserData;
  }
  const [updateUser, { loading, error, data }] = useMutation<Response, Arguments>(UPDATE_USER, {
    variables: { id: selectedUser.ID, userData },
  });

  interface FormMethod<E> {
    (event: E): void;
  }
  const handleChange: FormMethod<ChangeEvent<HTMLInputElement>> = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  interface HandleDate {
    (date: Date): void;
  }
  const handleDate: HandleDate = (date) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      birthday: date,
    }));
  };
  interface VerifyForm {
    (): boolean;
  }
  // TODO: correct this
  const verifyForm: VerifyForm = () => {
    const isNoNulls = Object.values(userData).every((value) => value !== '' && value !== undefined);
    return true;
  };
  const handleSubmit: FormMethod<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();
    // TODO: pop up notification here if form is incorrect
    if (!verifyForm()) return null;
    updateUser();
  };

  if (loading) return <Loader boxHeight={400} />;
  if (error) return <p>Oopsie: {error.message}</p>;

  return (
    <div className={styles.Update} data-testid="Update">
      <h2 style={{ color: 'Teal' }}>Apollo Update</h2>
      {data && data.userData ? <p>Saved!</p> : null}
      <form className={styles.userForm} onSubmit={handleSubmit}>
        <Field className={styles.userInput}>
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={userData.firstName}
            validation={undefined}
            onChange={(event) => handleChange(event)}
            placeholder={selectedUser.firstName}
          />
        </Field>
        <Field className={styles.userInput}>
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={userData.lastName}
            validation={undefined}
            onChange={(event) => handleChange(event)}
            placeholder={selectedUser.lastName}
          />
        </Field>
        <Field className={styles.userInput}>
          <Label>Username</Label>
          <Input
            name="userName"
            value={userData.userName}
            validation="warning"
            onChange={(event) => handleChange(event)}
            placeholder={selectedUser.userName}
          />
          <Message validation="warning">Too short username</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Email</Label>
          <Input
            name="email"
            value={userData.email}
            type="email"
            validation="success"
            onChange={(event) => handleChange(event)}
            placeholder={selectedUser.email}
          />
          <Message validation="success">Correct email</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Password</Label>
          <Input
            name="passW"
            value={userData.passW}
            type="password"
            validation="error"
            onChange={(event) => handleChange(event)}
            placeholder={selectedUser.passW}
          />
          <Message validation="error">Incorrect password</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Birthday</Label>
          <Datepicker value={userData.birthday} onChange={handleDate} >
            <Input name="birthday" placeholder={String(selectedUser.birthday)} />
          </Datepicker>
        </Field>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Update;
