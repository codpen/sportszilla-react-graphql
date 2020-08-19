import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { Datepicker } from '@zendeskgarden/react-datepickers';
import { Button } from '@zendeskgarden/react-buttons';
import Loader from '../../Loader/Loader';
import styles from './Update.module.scss';

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
interface LoadUsers {
  (): void;
};
interface PropTypes {
  users: UserData[]
  loadUsers: LoadUsers;
}
const Update: React.FC<PropTypes> = ({ users, loadUsers }) => {

  const [selectedID, setSelectedID] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<UserData>({
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
    id: number;
    userData: UserData;
  }
  const [updateUser, { loading, error, data }] = useMutation<Response, Arguments>(UPDATE_USER);

  interface FormMethod<E> {
    (event: E): void;
  }
  const handleChange: FormMethod<ChangeEvent<HTMLInputElement>> = (event) => {
    const { name, value } = event.target;
    setSelectedUser((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  interface HandleDate {
    (date: Date): void;
  }
  const handleDate: HandleDate = (date) => {
    setSelectedUser((prevUserData) => ({
      ...prevUserData,
      birthday: date,
    }));
  };
  interface VerifyForm {
    (): boolean;
  }
  // TODO: correct this
  const verifyForm: VerifyForm = () => {
    const isNoNulls = Object.values(selectedUser).every((value) => value !== '' && value !== undefined);
    return true;
  };
  const handleSubmit: FormMethod<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();
    // TODO: pop up notification here if form is incorrect
    if (!verifyForm()) return null;
    updateUser({ variables: { id: selectedID, userData: selectedUser }});
    loadUsers();
  };
  interface MakePlaceHolder {
    (property: string): string;
  }
  const makePlaceholder = (property: string) => {
    if (selectedID !== 0) {
      const user = users.find((user) => user.ID === selectedID);
      return user && String(user[property]);
    }
    return '';
  };

  if (loading) return <Loader boxHeight={400} />;
  if (error) return <p>Oopsie: {error.message}</p>;

  const options = users.map((user) => (
    <option key={`${user.ID}_${user.email}`} value={user.ID}>{user.email}</option>
  ));

  return (
    <div className={styles.Update} data-testid="Update">
      <h2 style={{ color: 'Teal' }}>Apollo Update</h2>
      {data && data.userData ? <p>Saved!</p> : null}
      <select
        value={selectedID}
        onChange={(event) => setSelectedID(Number(event.target.value))}
      >
        <option hidden disabled value={0}> -- Select a user -- </option>
        {options}
      </select>
      <form className={styles.userForm} onSubmit={handleSubmit}>
        <Field className={styles.userInput}>
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={selectedUser.firstName}
            validation={undefined}
            onChange={(event) => handleChange(event)}
            placeholder={makePlaceholder('firstName')}
          />
        </Field>
        <Field className={styles.userInput}>
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={selectedUser.lastName}
            validation={undefined}
            onChange={(event) => handleChange(event)}
            placeholder={makePlaceholder('lastName')}
          />
        </Field>
        <Field className={styles.userInput}>
          <Label>Username</Label>
          <Input
            name="userName"
            value={selectedUser.userName}
            validation="warning"
            onChange={(event) => handleChange(event)}
            placeholder={makePlaceholder('userName')}
          />
          <Message validation="warning">Too short username</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Email</Label>
          <Input
            name="email"
            value={selectedUser.email}
            type="email"
            validation="success"
            onChange={(event) => handleChange(event)}
            placeholder={makePlaceholder('email')}
          />
          <Message validation="success">Correct email</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Password</Label>
          <Input
            name="passW"
            value={selectedUser.passW}
            type="password"
            validation="error"
            onChange={(event) => handleChange(event)}
          />
          <Message validation="error">Incorrect password</Message>
        </Field>
        <Field className={styles.userInput}>
          <Label>Birthday</Label>
          <Datepicker value={selectedUser.birthday} onChange={handleDate} >
            <Input name="birthday" placeholder={makePlaceholder('birthday')} />
          </Datepicker>
        </Field>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Update;
