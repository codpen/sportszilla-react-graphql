import React, { useState } from 'react';
import styles from './Create.module.scss';
import { useMutation, gql } from '@apollo/client';

const NEW_USER = gql`
  mutation NewUser ($userData: UserData!) {
    newUser (userData: $userData) {
        ID
      }
  }
`
/*
const [, { error, data }] = useMutation<
  { saveRocket: RocketInventory },
  { rocket: NewRocketDetails }
>(NEW_USER, {
  variables: { rocket: { model, year: +year, stock: +stock } }
});
 */

const Create: React.FC = () => (
  <div className={styles.Create} data-testid="Create">
    <h2 style={{color: 'green'}}>Apollo Create</h2>
  </div>
);

export default Create;
