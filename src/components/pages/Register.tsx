import React, { useState, ChangeEvent, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from '../atoms/Link';
import { PrimaryButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PageTemplete } from '../templates/PageTemplate';
import { IsAuthedContext, AuthInfoContext } from '../../context/AuthProvider';
import { AlertContext } from '../../context/AlertProvider';

export const Register = () => {
  const navigate = useNavigate();
  const initialReqData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const [reqData, setReqData] = useState(initialReqData);
  const { setIsAuthed } = useContext(IsAuthedContext)!;
  const { setUserInfo } = useContext(AuthInfoContext)!;
  const { setAlert } = useContext(AlertContext)!;

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReqData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerEventHandler = async () => {
    const csrf = () =>
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);
    await csrf();

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, reqData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 204) {
          const getUserInfo = async () => {
            const userInfoRes = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/user`
            );

            setIsAuthed(true);
            setUserInfo({
              id: userInfoRes.data.user.id,
              name: userInfoRes.data.user.name,
              email: userInfoRes.data.user.email,
            });

            navigate('/', {
              state: { msg: 'ユーザー登録しました。', color: 'success' },
            });
          };

          getUserInfo();
        }
      })
      .catch((error) => {
        setAlert({
          color: 'failure',
          msg: `ユーザー登録できませんでした。[${error?.response?.data?.message}]`,
        });
      });
  };

  return (
    <PageTemplete headerText="ユーザー登録">
      <InputFormWithLabel
        labelText="名前"
        formName="name"
        onChange={inputChangeHandler}
      />
      <InputFormWithLabel
        labelText="メールアドレス"
        formName="email"
        onChange={inputChangeHandler}
      />
      <InputFormWithLabel
        labelText="パスワード"
        formName="password"
        type="password"
        onChange={inputChangeHandler}
      />
      <InputFormWithLabel
        labelText="パスワード (確認用)"
        formName="password_confirmation"
        type="password"
        onChange={inputChangeHandler}
      />

      <div className="flex justify-center place-items-center relative">
        <PrimaryButton
          type="button"
          text="登録"
          id="register-button"
          addClass={['w-32']}
          onClickHandler={registerEventHandler}
        />
        <Link
          text="ログイン画面へ"
          href="/login"
          addClass={['absolute', '-right-0']}
        />
      </div>
    </PageTemplete>
  );
};
