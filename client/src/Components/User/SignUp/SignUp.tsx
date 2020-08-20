import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { Datepicker } from '@zendeskgarden/react-datepickers';
import { Button } from '@zendeskgarden/react-buttons';
import { VALIDATION } from '@zendeskgarden/react-forms/dist/typings/utils/validation';
import styled from 'styled-components';
import styles from './SignUp.module.scss';

const SButton = styled(Button)`
  margin-top: 3vh;
  font-size: 30px;
  border-color: #90755f;
  color: #90755f;
  width: 50%;
  &:hover {
    border-color: #ffffff;
    color: #ffffff;
  }
`;

interface UserData {
  [index: string]: string | Date | undefined;
  firstName: string;
  lastName: string;
  userName?: string;
  email: string;
  passW: string;
  birthday?: Date | undefined;
}
interface ValidStatuses {
  [index: string]: VALIDATION | undefined;
  firstName: VALIDATION | undefined;
  lastName: VALIDATION | undefined;
  userName: VALIDATION | undefined;
  email: VALIDATION | undefined;
  passW: VALIDATION | undefined;
}
interface ValidMsgs {
  [index: string]: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  passW: string;
}

const SignUp: React.FC = () => {
  const initialUD: UserData = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    passW: '',
    birthday: undefined,
  }
  const [userData, setUserData] = useState<UserData>(initialUD);

  const initialSts: ValidStatuses = {
    firstName: undefined,
    lastName: undefined,
    userName: undefined,
    email: undefined,
    passW: undefined,
  }
  const [validStatuses, setValidStatuses] = useState<ValidStatuses>(initialSts);

  const initialMsgs: ValidMsgs = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    passW: '',
  }
  const [validMsgs, setValidMsgs] = useState<ValidMsgs>(initialMsgs);

  const validateField = (fieldName: string, fieldValue: string): boolean => {
    switch (fieldName) {
      case 'firstName':
        return fieldValue.length < 40 && fieldValue.length > 2;
      case 'lastName':
        return fieldValue.length < 60 && fieldValue.length > 2;
      case 'userName':
        return fieldValue.length < 40;
      case 'email':
        const mailRgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return mailRgx.test(fieldValue);
      case 'passW':
        const passWRgx = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
        return passWRgx.test(fieldValue);
      default:
        return false;
    }
  };

  const handleDate = (date: Date): void => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      birthday: date,
    }));
  };

  interface FormMethod<E> {
    (event: E): void;
  }
  const handleChange: FormMethod<ChangeEvent<HTMLInputElement>> = (event) => {
    const { name, value } = event.target;
    setUserData((userData) => ({ ...userData, [name]: value }));
    const updatedVals = validStatuses;
    const updatedMsgs = validMsgs;
    if (value.length === 0) {
      updatedVals[name] = undefined;
      updatedMsgs[name] = ' ';
      setValidStatuses(updatedVals);
      setValidMsgs(updatedMsgs);
    } else if (validateField(name, value)) {
      console.log(name, value);
      updatedVals[name] = 'success';
      updatedMsgs[name] = 'OK';
      setValidStatuses(updatedVals);
      setValidMsgs(updatedMsgs);
    } else {
      updatedVals[name] = 'warning';
      updatedMsgs[name] = `Invalid ${name}`;
      setValidStatuses(updatedVals);
      setValidMsgs(updatedMsgs);
    }
  };

  const verifyForm = (): string[] => {
    const notValids = Object
      .keys(validStatuses)
      .reduce<string[]>((notValids: string[], key: string) => {
        // not compulsory values (can be undefined, not just success):
        const correct = ((validStatuses[key] === 'success') ||
          (key === 'userName' && validStatuses[key] === undefined));
        !correct && notValids.push(key);
        return notValids
      }, []);
   return notValids;
  };

  const handleSubmit: FormMethod<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();
    const notValids = verifyForm();
    if (notValids.length > 0) {
      notValids.forEach((key) => {
        setValidStatuses((validStatuses) => ({ ...validStatuses, [key]: 'error' }));
        setValidMsgs((validMsgs) => ({ ...validMsgs, [key]: 'Please, give a correct value!' }));
      });
      return null;
    }

    setUserData(initialUD);
    setValidStatuses(initialSts);
    setValidMsgs(initialMsgs);
  };

  return (
    <div className={styles.SignUp} data-testid="SignUp">
      <h2 className={styles.welcome}>Thank you for signing up with us.</h2>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <Field style={{marginTop: '3vh', width: '300px'}}>
          <Label>First name</Label>
          <Input
            name="firstName"
            value={userData.firstName}
            style={{ fontSize: '20px' }}
            validation={validStatuses.firstName}
            onChange={handleChange}
          />
          <Message validation={validStatuses.firstName}>{validMsgs.firstName}&nbsp;</Message>
        </Field>

        <Field className={styles.Field}>
          <Label>Last name</Label>
          <Input
            name="lastName"
            value={userData.lastName}
            style={{ fontSize: '20px' }}
            validation={validStatuses.lastName}
            onChange={handleChange}
          />
          <Message validation={validStatuses.lastName}>{validMsgs.lastName}&nbsp;</Message>
        </Field>

        <Field className={styles.Field}>
          <Label>Username</Label>
          <Input
            name="userName"
            value={userData.userName}
            style={{ fontSize: '20px' }}
            validation={validStatuses.userName}
            onChange={handleChange}
          />
          <Message validation={validStatuses.userName}>{validMsgs.userName}&nbsp;</Message>
        </Field>

        <Field className={styles.Field}>
          <Label>Email</Label>
          <Input
            name="email"
            value={userData.email}
            style={{ fontSize: '20px' }}
            validation={validStatuses.email}
            onChange={handleChange}
          />
          <Message validation={validStatuses.email}>{validMsgs.email}&nbsp;</Message>
        </Field>

        <Field className={styles.Field}>
          <Label>Password</Label>
          <Input
            name="passW"
            value={userData.passW}
            type="password"
            style={{ fontSize: '20px' }}
            validation={validStatuses.passW}
            onChange={handleChange}
          />
          <Message validation={validStatuses.passW}>{validMsgs.passW}&nbsp;</Message>
        </Field>

        <Field className={styles.Field}>
          <Label>Birthday</Label>
          <Datepicker value={userData.birthday} onChange={handleDate}>
            <Input
              name="birthday"
              style={{ fontSize: '20px' }}
            />
          </Datepicker>
        </Field>

        <SButton type="submit">Sign up</SButton>
      </form>
    </div>
  );
};

export default SignUp;
