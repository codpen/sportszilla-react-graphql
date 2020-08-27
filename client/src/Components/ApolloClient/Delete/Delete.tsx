import React, { useState, FormEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button } from '@zendeskgarden/react-buttons';
import styles from './Delete.module.scss';
import Loader from '../../Loader/Loader';

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

const DELETE_USER = gql`
  mutation DeleteUser($id: Float!) {
    deleteUser(ID: $id) {
      ID
    }
  }
`;
interface LoadUsers {
  (): void;
}
interface PropTypes {
  users: UserData[];
  loadUsers: LoadUsers;
}
const Delete: React.FC<PropTypes> = ({ users, loadUsers }) => {
  interface Response {
    getOneUser: UserData;
  }
  interface Arguments {
    id: number;
  }
  const [selectedID, setSelectedID] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<UserData>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    passW: '',
  });

  const [deleteUser, { loading, error, data }] = useMutation<Response, Arguments>(DELETE_USER, {
    variables: { id: selectedID },
  });

  interface FormMethod<E> {
    (event: E): void;
  }
  const handleSubmit: FormMethod<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();
    deleteUser();
    loadUsers();
  };

  if (loading) return <Loader />;
  if (error) return <p>Oopsie: {error.message}</p>;

  const options = users.map((user) => (
    <option key={`${user.ID}_${user.email}`} value={user.ID}>
      {user.email}
    </option>
  ));

  return (
    <div className={styles.Delete} data-testid="Delete">
      <h2 style={{ color: 'brown' }}>Apollo Delete</h2>
      <select
        value={selectedID}
        onChange={(event) => {
          const ID = Number(event.target.value);
          setSelectedID(ID);
          const user = users.find((user) => user.ID === ID);
          user && setSelectedUser(user);
        }}
      >
        <option hidden disabled value={0}>
          {' '}
          -- Select a user --{' '}
        </option>
        {options}
      </select>
      {selectedUser && (
        <form onSubmit={handleSubmit}>
          <h4>User data:</h4>
          <p>ID: {selectedUser.ID}</p>
          <p>Username: {selectedUser.userName}</p>
          <p>email: {selectedUser.email}</p>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
};

export default Delete;
