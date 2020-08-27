import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import styles from './Read.module.scss';
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

interface PropTypes {
  users: UserData[];
}
const Read: React.FC<PropTypes> = ({ users }) => {
  interface Response {
    getOneUser: UserData;
  }
  interface Arguments {
    id: number;
  }
  const [getOneUser, { loading, data, error }] = useLazyQuery<Response, Arguments>(GET_ONE_USER);
  const [selectedID, setSelectedID] = useState<number>(0);

  if (loading) return <Loader />;
  if (error) return <p>Oopsie: {error.message}</p>;

  const options = users.map((user) => (
    <option key={`${user.ID}_${user.email}`} value={user.ID}>
      {user.email}
    </option>
  ));

  return (
    <div className={styles.Read} data-testid="Read">
      <h2 style={{ color: 'blue' }}>Apollo Read</h2>
      <select
        value={selectedID}
        onChange={(event) => {
          const ID = Number(event.target.value);
          setSelectedID(ID);
          getOneUser({ variables: { id: ID } });
        }}
      >
        <option hidden disabled value={0}>
          {' '}
          -- Select a user --{' '}
        </option>
        {options}
      </select>
      {data && data.getOneUser && (
        <div>
          <h4>User data:</h4>
          <p>ID: {data.getOneUser.ID}</p>
          <p>First name: {data.getOneUser.firstName}</p>
          <p>Last name: {data.getOneUser.lastName}</p>
          <p>User name: {data.getOneUser.userName}</p>
          <p>email: {data.getOneUser.email}</p>
          <p>password: {data.getOneUser.passW}</p>
          <p>birthday: {data.getOneUser.birthday?.toLocaleString()}</p>
          <p>creationDate: {data.getOneUser.creationDate?.toLocaleString()}</p>
          <p>updatedOn: {data.getOneUser.updatedOn?.toLocaleString()}</p>
          <p>deletionDate: {data.getOneUser.deletionDate?.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Read;
