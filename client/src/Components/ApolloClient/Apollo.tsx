import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from './Apollo.module.scss';
import Loader from '../Loader/Loader';
import Read from './Read/Read';
import Create from './Create/Create';
import Update from './Update/Update';
import Delete from './Delete/Delete';

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

const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      ID
      firstName
      lastName
      userName
      email
      passW
      birthday
      creationDate
      updatedOn
      deletionDate
    }
  }
`;

const Apollo: React.FC = () => {
  interface Response {
    getAllUsers: UserData[];
  }
  const { loading, data, error, refetch } = useQuery<Response>(GET_ALL_USERS);

  interface LoadUsers {
    (): void;
  };
  const loadUsers: LoadUsers = () => {
    refetch();
  };

  if (loading) return <Loader boxHeight={400} />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (!data) return <p>User not found</p>;

  let userIDs: JSX.Element[] | null = null;
  let users: UserData[] = [{
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    passW: '',
  }];
  if (data && data.getAllUsers) {
    users = (data.getAllUsers);
    userIDs = data.getAllUsers.map((user) => (
      <span key={user.ID}> | {user.email} | </span>
    ));
  }

  return (
    <div className={styles.Apollo} data-testid="Apollo">
      <h2 style={{ color: 'gray' }}>Apollo All users</h2>
      {users && (
        <>
          {userIDs}
          <Create />
          <Read users={users} />
          <Update users={users} loadUsers={loadUsers} />
          <Delete users={users} loadUsers={loadUsers}/>
        </>
      )}
    </div>
  )
};

export default Apollo;
