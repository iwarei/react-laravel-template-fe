import React, { useState, ChangeEvent, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PageTemplete } from '../templates/PageTemplate';
import { IsAuthedContext, AuthInfoContext } from '../../context/AuthProvider';

export const Register = () => {
  const navigate = useNavigate();
  const initialReqData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const [reqData, setReqData] = useState(initialReqData);
  const { isAuthed, setIsAuthed } = useContext(IsAuthedContext)!;
  const { userInfo, setUserInfo } = useContext(AuthInfoContext)!;

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
        console.log(response);
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

            navigate('/');
          };

          getUserInfo();
        }
      })
      .catch((error) => {
        console.error(error);
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
        onChange={inputChangeHandler}
      />
      <InputFormWithLabel
        labelText="パスワード (確認用)"
        formName="password_confirmation"
        onChange={inputChangeHandler}
      />
      <PrimaryButton
        type="button"
        text="登録"
        id="register-button"
        onClickHandler={registerEventHandler}
      />
    </PageTemplete>
  );
};
