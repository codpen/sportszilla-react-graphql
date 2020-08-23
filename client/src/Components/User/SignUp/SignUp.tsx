import React, {
  ReactElement,
  useState,
  FormEvent,
  ChangeEvent,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Field, Label, Input, MediaInput, Message } from '@zendeskgarden/react-forms';
import { Button } from '@zendeskgarden/react-buttons';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { VALIDATION } from '@zendeskgarden/react-forms/dist/typings/utils/validation';
import styled from 'styled-components';
import { ReactComponent as EndIcon } from '../../../Images/eye.svg';
import { LoginRequest, LoginData, jwtToken } from '../../Main/main';
import Loader from '../../Loader/Loader';
import styles from './SignUp.module.scss';
import { UserData } from '../UserData';

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

const EyeIcon = styled(EndIcon)`
  width: 35px;
  height: 35px;
  &:hover {
    cursor: pointer;
  }
`

interface ValidStatuses {
  [index: string]: VALIDATION | undefined;
  firstName: VALIDATION | undefined;
  email: VALIDATION | undefined;
  passW: VALIDATION | undefined;
}
interface ValidMsgs {
  [index: string]: string;
  firstName: string;
  email: string;
  passW: string;
}

interface PropTypes {
  loginRequest: LoginRequest<jwtToken>;
}
function SignUp({ loginRequest }: PropTypes): ReactElement {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const initialUD: UserData = {
    firstName: '',
    email: '',
    passW: '',
  };
  const [userData, setUserData] = useState<UserData>(initialUD);

  const initialSts: ValidStatuses = {
    firstName: undefined,
    email: undefined,
    passW: undefined,
  };
  const [validStatuses, setValidStatuses] = useState<ValidStatuses>(initialSts);

  const initialMsgs: ValidMsgs = {
    firstName: '',
    email: '',
    passW: '',
  };
  const [validMsgs, setValidMsgs] = useState<ValidMsgs>(initialMsgs);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateField = (fieldName: string, fieldValue: string): boolean => {
    switch (fieldName) {
      case 'firstName':
        return fieldValue.length < 40 && fieldValue.length > 2;
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
    const notValids = Object.keys(validStatuses).reduce<string[]>(
      (notValids: string[], key: string) => {
        const correct = validStatuses[key] === 'success';
        !correct && notValids.push(key);
        return notValids;
      },
      []
    );
    return notValids;
  };

  const tokenResponse = (tokenObj: jwtToken) => {
    const { jwtToken } = tokenObj;
    localStorage.setItem('jwtToken', jwtToken);
    setUserData(initialUD);
    setValidStatuses(initialSts);
    setValidMsgs(initialMsgs);
    setIsLoading(false);
    history.push('/user/profile');
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
    setIsLoading(true);
    loginRequest({
      firstName: userData.firstName!,
      email: userData.email!,
      passW: userData.passW!,
      path: 'new'
    })
      .then(tokenResponse);
  };

  const FBResp = (userInfo: ReactFacebookLoginInfo) => {
    console.log('userInfo: ', userInfo);
    setIsLoading(true);
    loginRequest({ email: userInfo.email, accessTokenFB: userInfo.accessToken, path: 'newFace' })
      .then(tokenResponse);
  };

  const onFailure = (error: string) => {
    alert(error);
  }

  if (isLoading) return <Loader boxHeight={800} />;

  return (
    <div className={styles.SignUp} data-testid="SignUp">
      <h2 className={styles.welcome}>Thank you for signing up with us.</h2>

      <FacebookLogin
        appId="607268229976801"
        autoLoad={false}
        fields="name,email,picture"
        textButton="Sign up with facebook"
        callback={FBResp}
      />

      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <Field style={{ marginTop: '3vh', width: '300px' }}>
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
          <MediaInput
            name="passW"
            value={userData.passW}
            type="password"
            style={{ height: '40px', fontSize: '22px' }}
            validation={validStatuses.passW}
            onChange={handleChange}
            end={
              <EyeIcon
                onMouseDown={(event) => {
                  const mediaInput = event.currentTarget.parentNode?.firstElementChild;
                  mediaInput?.setAttribute('type', 'text');
                }}
                onTouchStart={(event) => {
                  const mediaInput = event.currentTarget.parentNode?.firstElementChild;
                  mediaInput?.setAttribute('type', 'text');
                }}
                onMouseUp={(event) => {
                  const mediaInput = event.currentTarget.parentNode?.firstElementChild;
                  mediaInput?.setAttribute('type', 'password');
                }}
                onTouchEnd={(event) => {
                  const mediaInput = event.currentTarget.parentNode?.firstElementChild;
                  mediaInput?.setAttribute('type', 'password');
                }}
              />
            }
          />
          <Message validation={validStatuses.passW}>{validMsgs.passW}&nbsp;</Message>
        </Field>

        <SButton type="submit">Sign up</SButton>
      </form>
    </div>
  );
}

export default SignUp;
