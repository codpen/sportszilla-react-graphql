import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { Button } from '@zendeskgarden/react-buttons';
import Spinner from '../../Spinner/Spinner';
import styles from './Create.module.scss';

interface UserData {
  ID?: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  passW: string;
  birthday?: Date | null;
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date | null;
  __typeName?: string;
}

const NEW_USER = gql`
  mutation NewUser ($userData: UserData!) {
    newUser (userData: $userData) {
        ID
      }
  }
`
const Create: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    passW: '',
    birthday: new Date(),
  });

  const [savedUser, { loading, error, data }] = useMutation<
    { savedUser: UserData },
    { newUser: UserData }
  >(NEW_USER, {
    variables: { newUser: userData }
  });

  interface FormMethod<E> {
    (event: E): void;
  }
  const handleChange: FormMethod<ChangeEvent<HTMLInputElement>> = (event) => {
    console.log(event)
    const { name, value } = event.target;
    console.log('hey: ', name, value);
  };
  const handleSubmit: FormMethod<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();
  };

  if (loading) return <Spinner boxHeight={400}/>;
  if (error) return <p>Oopsie: {error.message}</p>;

  return (
    <div className={styles.Create} data-testid="Create">
      <h2 style={{color: 'purple'}}>Apollo Create</h2>
      {data && data.savedUser ? <p>Saved!</p> : null}
      <form className={styles.userForm} onSubmit={handleSubmit}>
        <Field className={styles.userInput}>
          <Label>First Name</Label>
          <Input name="firstName" value={userData.firstName} validation={undefined} onChange={(event) => handleChange(event)}/>
        </Field>
        <Field className={styles.userInput}>
          <Label>Last Name</Label>
          <Input name="lastName" value={userData.lastName} validation={undefined} onChange={(event) => handleChange(event)} />
        </Field>
        <Field className={styles.userInput}>
          <Label>Username</Label>
          <Input name="userName" value={userData.userName} validation="warning" onChange={(event) => handleChange(event)} />
          <Message validation="warning">Too short username</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Email</Label>
          <Input name="email" value={userData.email} type="email" validation="success" onChange={(event) => handleChange(event)} />
          <Message validation="success">Correct email</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Password</Label>
          <Input name="password" value={userData.passW} type="password" validation="error" onChange={(event) => handleChange(event)} />
          <Message validation="error">Incorrect password</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Birthday</Label>
          <Input name="birthday" type="datetime-local" value={String(userData.birthday)} validation={undefined} onChange={(event) => handleChange(event)} />
        </Field>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
};

export default Create;
