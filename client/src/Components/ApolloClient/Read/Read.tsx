import React from 'react';
import styles from './Read.module.scss';
import { useQuery, gql } from '@apollo/client';

interface UserData {
  ID?: number;
  firstName?: string;
  lastName?: string | null;
  userName?: string | null;
  email?: string;
  passW?: string;
  birthday?: Date;
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date | null;
  __typeName?: string;
}
interface GetOneUserArgs {
  id: number;
}
const GET_ONE_USER = gql`
  query GetOneUser ($id: Float!) {
    getOneUser (ID: $id) {
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
    getOneUser: UserData;
  }
  const { loading, data } = useQuery<Response, GetOneUserArgs>(
    GET_ONE_USER,
    { variables: { id: 1 } }
  );

  return (
    <div className={styles.Apollo} data-testid="Apollo">
      <h2 style={{color: 'blue'}}>Apollo Read</h2>
      {loading ? (
        <p>Loading ...</p>
      ) : (data && data.getOneUser &&
        <div>
            <p>{ data.getOneUser.ID }</p>
            <p>{ data.getOneUser.firstName }</p>
            <p>{ data.getOneUser.lastName }</p>
            <p>{ data.getOneUser.userName }</p>
            <p>{ data.getOneUser.email }</p>
            <p>{ data.getOneUser.passW }</p>
            <p>{ data.getOneUser.birthday }</p>
            <p>{ data.getOneUser.creationDate }</p>
            <p>{ data.getOneUser.updatedOn }</p>
            <p>{ data.getOneUser.deletionDate }</p>
        </div>
      )}
    </div>
  )
};

export default Apollo;
