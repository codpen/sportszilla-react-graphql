import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from './Apollo.module.scss';
import Loader from '../Loader/Loader';
import Read from './Read/Read';
import Create from './Create/Create';
import Update from './Update/Update';
import Delete from './Delete/Delete';

interface UserDetails {
  ID: number;
  email: string;
  __typeName?: string;
}
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

const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      ID
      email
    }
  }
`;

const Apollo: React.FC = () => {
  interface Response {
    getAllUsers: UserDetails[];
  }
  const { loading, data, error } = useQuery<Response>(GET_ALL_USERS);
  const [selectedUser, setSelectedUser] = useState<UserData>({
    ID: 0,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    passW: '',
    birthday: new Date(),
    creationDate: new Date(),
    updatedOn: new Date(),
    deletionDate: undefined,
    __typeName: '',
  });

  if (loading) return <Loader boxHeight={400} />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (!data) return <p>User not found</p>;

  let allUsers;
  if (data && data.getAllUsers) {
    allUsers = data.getAllUsers.map((user) => (
      <span key={user.ID}> | {user.email} | </span>
    ));
  }

  return (
    <div className={styles.Apollo} data-testid="Apollo">
      <h2 style={{ color: 'gray' }}>Apollo All users</h2>
      {data && data.getAllUsers && (
        <>
          {allUsers}
          <Create />
          <Read users={data.getAllUsers} setSelectedUser={setSelectedUser} />
          <Update selectedUser={selectedUser} />
          <Delete />
        </>
      )}
    </div>
  )
};

export default Apollo;
