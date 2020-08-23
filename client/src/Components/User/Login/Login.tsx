import React, {
  ReactElement,
  useState,
  FormEvent,
  ChangeEvent,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Field, Label, Input, MediaInput, Message } from '@zendeskgarden/react-forms';
import { Button } from '@zendeskgarden/react-buttons';
import { VALIDATION } from '@zendeskgarden/react-forms/dist/typings/utils/validation';
import styled from 'styled-components';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { LoginRequest, LoginData, jwtToken } from '../../Main/main';
import Loader from '../../Loader/Loader';
import { ReactComponent as EndIcon } from '../../../Images/eye.svg';
import styles from './Login.module.scss';

const SButton = styled(Button)`
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

interface PropTypes {
  loginRequest: LoginRequest<jwtToken>;
}
function Login({ loginRequest }: PropTypes): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [passW, setPassW] = useState<string>('');
  const [mailValid, setMailValid] = useState<VALIDATION | undefined>(undefined);
  const [passValid, setPassValid] = useState<VALIDATION | undefined>(undefined);
  const [mailValidMsg, setMailValidMsg] = useState<string>('');
  const [passValidMsg, setPassValidMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const history = useHistory();

  const validateEmail = (email: string): boolean => {
    const mailRgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailRgx.test(email);
  };

  const validatePassW = (passW: string): boolean => {
    const passWRgx = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
    return passWRgx.test(passW);
  };

  interface FormMethod<E> {
    (event: E): void;
  }
  const handleChange: FormMethod<ChangeEvent<HTMLInputElement>> = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
      if (value.length === 0) {
        setMailValid(undefined);
        setMailValidMsg(' ');
      } else if (validateEmail(value)) {
        setMailValid('success');
        setMailValidMsg('OK');
      } else {
        setMailValid('warning');
        setMailValidMsg('Invalid email!');
      }
    } else if (name === 'passW') {
      setPassW(value);
      if (value.length === 0) {
        setPassValid(undefined);
        setPassValidMsg(' ');
      } else if (validatePassW(value)) {
        setPassValid('success');
        setPassValidMsg('OK');
      } else {
        setPassValid('warning');
        setPassValidMsg('Invalid password');
      }
    }
  };

  const verifyForm = (): boolean => {
    if (passValid !== 'success') {
      setPassValid('error');
      setPassValidMsg('Please, give a correct password!');
    }
    if (mailValid !== 'success') {
      setMailValid('error');
      setMailValidMsg('Please, give a correct email address!');
    }
    return passValid === 'success' && mailValid === 'success';
  };

  const tokenResponse = (tokenObj: jwtToken) => {
    const { jwtToken } = tokenObj;
    localStorage.setItem('jwtToken', jwtToken);
    setPassValid(undefined);
    setPassValidMsg('');
    setPassW('');
    setMailValid(undefined);
    setMailValidMsg('');
    setEmail('');
    setIsLoading(false);
    history.push('/user/profile');
  };

  const handleSubmit: FormMethod<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();
    if (!verifyForm()) return null;
    setIsLoading(true);
    loginRequest({ email, passW, path: 'returning' })
      .then((tokenResponse));
  };

  const FBResp = (userInfo: ReactFacebookLoginInfo) => {
    console.log('userInfo: ', userInfo);
    setIsLoading(true);
    loginRequest({ path: 'returningFace', accessTokenFB: userInfo.accessToken })
      .then((tokenResponse));
  };

  const onFailure = (error: string) => alert(error);

  if (isLoading) return <Loader boxHeight={800} />;

  return (
    <div className={styles.Login} data-testid="Login">
      <h2 className={styles.welcome}>Welcome back!</h2>

      <FacebookLogin
        appId="607268229976801"
        autoLoad={false}
        fields="name,email,picture"
        textButton="Log in with facebook"
        callback={FBResp}
      />
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <Field className={styles.emailField}>
          <Label>Email</Label>
          <Input
            name="email"
            value={email}
            style={{ height: '62px', fontSize: '22px' }}
            validation={mailValid}
            onChange={handleChange}
          />
          <Message validation={mailValid}>{mailValidMsg}&nbsp;</Message>
        </Field>
        <Field className={styles.passWField}>
          <Label>Password</Label>
          <MediaInput
            name="passW"
            value={passW}
            type="password"
            style={{ height: '40px', fontSize: '22px' }}
            validation={passValid}
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
          <Message validation={passValid}>{passValidMsg}&nbsp;</Message>
        </Field>
        <SButton type="submit">Log in</SButton>
      </form>
    </div>
  );
}

export default Login;
