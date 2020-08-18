import React from 'react';
import styles from './Read.module.scss';
import Spinner from '../../Spinner/Spinner';
import { useQuery, gql } from '@apollo/client';

interface UserData {
  ID: number;
  firstName: string;
  lastName: string | null;
  userName: string | null;
  email: string;
  passW: string;
  birthday: Date;
  creationDate: Date;
  updatedOn: Date;
  deletionDate: Date | null;
  __typeName: string;
}
interface GetOneUserArgs {
  id: number;
}
const GET_ONE_USER = gql`
  query GetOneUser($id: Float!) {
    getOneUser(ID: $id) {
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

const Read: React.FC = () => {
  interface Response {
    getOneUser: UserData;
  }
  const { loading, data, error } = useQuery<Response, GetOneUserArgs>(GET_ONE_USER, {
    variables: { id: 1 },
  });

  if (loading) return <Spinner boxHeight={400} />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (!data) return <p>User not found</p>;

  return (
    <div className={styles.Read} data-testid="Read">
      <h2 style={{ color: 'blue' }}>Apollo Read</h2>
      {data && data.getOneUser && (
        <div>
          <h4>User data:</h4>
          <p>ID: {data.getOneUser.ID}</p>
          <p>First name: {data.getOneUser.firstName}</p>
          <p>Last name: {data.getOneUser.lastName}</p>
          <p>User name: {data.getOneUser.userName}</p>
          <p>email: {data.getOneUser.email}</p>
          <p>password: {data.getOneUser.passW}</p>
          <p>birthday: {data.getOneUser.birthday}</p>
          <p>creationDate: {data.getOneUser.creationDate}</p>
          <p>updatedOn: {data.getOneUser.updatedOn}</p>
          <p>deletionDate: {data.getOneUser.deletionDate}</p>
        </div>
      )}
    </div>
  );
};

export default Read;
