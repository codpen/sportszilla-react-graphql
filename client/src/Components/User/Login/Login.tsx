import React, {
  ReactElement,
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Field, Label, Input, MediaInput, Message } from '@zendeskgarden/react-forms';
import { Button } from '@zendeskgarden/react-buttons';
import { VALIDATION } from '@zendeskgarden/react-forms/dist/typings/utils/validation';
import styled from 'styled-components';
import { LoginRequest, LoginResp } from '../LoginRequest';
import Loader from '../../Loader/Loader';
import { ReactComponent as EndIcon } from '../../../Images/eye.svg';
import { UserData } from '../UserData';
import styles from './Login.module.scss';

const SButton = styled(Button)`
  font-size: 30px;
  border-color: #90755f;
  color: #90755f;
  width: 50%;
  &:hover {
    background: transparent;
    border-color: #eea551;
    color: #eea551;
  }
`;

const FaceBookBtn = styled(Button)`
  width: 300px;
  height: 50px;
  background-color: #3b5998;
  color: #ffffff;
  margin-top: 5vh;
  box-shadow: 3px 3px 5px #a9a9a9;
  &:hover {
    border-color: #ffffff;
    background-color: #3b5998;
    color: #ffffff;
    cursor: pointer;
  }
`;

const EyeIcon = styled(EndIcon)`
  width: 35px;
  height: 35px;
  &:hover {
    cursor: pointer;
  }
`;

interface PropTypes {
  loginRequest: LoginRequest<LoginResp>;
  setUser: Dispatch<SetStateAction<UserData>>;
}
function Login({ loginRequest, setUser }: PropTypes): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [passW, setPassW] = useState<string>('');
  const [mailValid, setMailValid] = useState<VALIDATION | undefined>(undefined);
  const [passValid, setPassValid] = useState<VALIDATION | undefined>(undefined);
  const [mailValidMsg, setMailValidMsg] = useState<string>('');
  const [passValidMsg, setPassValidMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleResponse = (resp: LoginResp) => {
    const { jwtToken, user } = resp;
    localStorage.setItem('jwtToken', jwtToken);
    console.log('user after login', user);

    setUser(user);
    localStorage.setItem('userInformation', JSON.stringify(user));
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
    loginRequest({ email, passW }, 'returning').then(handleResponse);
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.Login} data-testid="Login">
      <h2 className={styles.welcome}>Welcome back!</h2>

      <FaceBookBtn>
        <a
          href="https://dev-116064.okta.com/oauth2/v1/authorize?idp=0oari0hclvkisFhkK4x6&client_id=0oarhu9dyvVsoDNOI4x6&response_type=id_token&response_mode=fragment&scope=openid%20email%20profile&redirect_uri=http://localhost:3000/user/join&state=1Q7Fs42g&nonce=h8n7D2pQ"
          style={{ textDecoration: 'none', color: '#ffffff', fontSize: '18px' }}
        >
          Log in with Facebook
        </a>
      </FaceBookBtn>
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
