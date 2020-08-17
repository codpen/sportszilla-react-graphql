import React from 'react';
import styles from './Create.module.scss';
import { useMutation, gql } from '@apollo/client';

const NEW_USER = gql`
  mutation NewUser ($userData: UserData!) {
    newUser (userData: $userData) {
        ID
      }
  }
`

const [saveRocket, { error, data }] = useMutation<
  { saveRocket: RocketInventory },
  { rocket: NewRocketDetails }
>(SAVE_ROCKET, {
  variables: { rocket: { model, year: +year, stock: +stock } }
});

const Create: React.FC = () => (
  <div className={styles.Create} data-testid="Create">
    <h2 style={{color: 'green'}}>Apollo Create</h2>
  </div>
);

export default Create;
