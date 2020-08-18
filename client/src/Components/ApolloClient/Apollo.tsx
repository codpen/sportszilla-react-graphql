import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from './Apollo.module.scss';
import Loader from '../Loader/Loader';
import Read from './Read/Read';
import Create from './Create/Create';
import Update from './Update/Update';
import Delete from './Delete/Delete';

interface UserData {
  ID: number;
  email: string;
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
    getAllUsers: UserData[];
  }
  const { loading, data, error } = useQuery<Response>(GET_ALL_USERS);

  if (loading) return <Loader boxHeight={400} />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (!data) return <p>User not found</p>;

  return (
    <div className={styles.Apollo} data-testid="Apollo">
      <h2 style={{ color: 'blue' }}>Apollo Allusersfetch</h2>
      {data && data.getAllUsers && (
        <>
          <Read users={data.getAllUsers} />
          <Create />
          <Update />
          <Delete />
        </>
      )}
    </div>
  )
};

export default Apollo;
