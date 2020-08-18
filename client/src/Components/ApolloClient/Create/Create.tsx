import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import Spinner from '../../Spinner/Spinner';
import styles from './Create.module.scss';

interface UserData {
  ID?: number;
  firstName: string;
  lastName?: string | null;
  userName?: string | null;
  email: string;
  passW: string;
  birthday?: Date;
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date | null;
  __typeName?: string;
}

const NEW_USER = gql`
  mutation NewUser ($userData: UserData!) {
    newUser (userData: $userData) {
        ID
      }
  }
`
const Create: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passW, setPassW] = useState<string>('');
  const [birthday, setBirthday] = useState<Date>(new Date());

  const [savedUser, { loading, error, data }] = useMutation<
    { savedUser: UserData },
    { newUser: UserData }
  >(NEW_USER, {
    variables: { newUser: {
      firstName,
      lastName,
      userName,
      email,
      passW,
      birthday,
    }}
  });

  if (loading) return <Spinner boxHeight={400}/>;
  if (error) return <p>Oopsie: {error.message}</p>;

  return (
    <div className={styles.Create} data-testid="Create">
      <h2 style={{color: 'purple'}}>Apollo Create</h2>
      {data && data.savedUser ? <p>Saved!</p> : null}
      <form>
        <Field>
          <Label>Plant</Label>
          <Input validation="success" />
          <Message validation="success">A cactus is a beautiful plant</Message>
        </Field>
        <Field>
          <Label>Plant</Label>
          <Input validation="warning" />
          <Message validation="warning">A cactus has thorns</Message>
        </Field>
        <Field>
          <Label>Plant</Label>
          <Input validation="error" />
          <Message validation="error">A cactus belongs in the desert</Message>
        </Field>
      </form>
    </div>
  )
};

export default Create;
