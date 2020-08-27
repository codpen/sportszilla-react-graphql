import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { Datepicker } from '@zendeskgarden/react-datepickers';
import { Button } from '@zendeskgarden/react-buttons';
import Loader from '../../Loader/Loader';
import styles from './Create.module.scss';

interface UserData {
  [index: string]: number | string | Date | undefined;
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

const NEW_USER = gql`
  mutation NewUser($userData: NewUser!) {
    newUser(userData: $userData) {
      ID
    }
  }
`;

const Create: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    passW: '',
    birthday: new Date(),
  });

  interface Response {
    userData: UserData;
  }
  interface Arguments {
    userData: UserData;
  }
  const [createUser, { loading, error, data }] = useMutation<Response, Arguments>(NEW_USER, {
    variables: { userData },
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
  // TODO: write complete FE verification
  const verifyForm: VerifyForm = () => {
    const isNoNulls = Object.values(userData).every((value) => value !== '' && value !== undefined);
    return isNoNulls;
  };
  const handleSubmit: FormMethod<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();
    // TODO: pop up notification here if form is incorrect
    if (!verifyForm()) return null;
    createUser();
  };

  if (loading) return <Loader />;
  if (error) return <p>Oopsie: {error.message}</p>;

  return (
    <div className={styles.Create} data-testid="Create">
      <h2 style={{ color: 'purple' }}>Apollo Create</h2>
      {data && data.userData ? <p>Saved!</p> : null}
      <form className={styles.userForm} onSubmit={handleSubmit}>
        <Field className={styles.userInput}>
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={userData.firstName}
            validation={undefined}
            onChange={(event) => handleChange(event)}
          />
        </Field>
        <Field className={styles.userInput}>
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={userData.lastName}
            validation={undefined}
            onChange={(event) => handleChange(event)}
          />
        </Field>
        <Field className={styles.userInput}>
          <Label>Username</Label>
          <Input
            name="userName"
            value={userData.userName}
            validation="warning"
            onChange={(event) => handleChange(event)}
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
          />
          <Message validation="error">Incorrect password</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Birthday</Label>
          <Datepicker value={userData.birthday} onChange={handleDate}>
            <Input name="birthday" />
          </Datepicker>
        </Field>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Create;
