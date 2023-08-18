import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { PrimaryButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { Navbar } from '../organism/Navbar';
import { PageTemplete } from '../templates/PageTemplate';

export const Login = () => {
  const initialReqData = {
    email: '',
    password: '',
  };

  const [reqData, setReqData] = useState(initialReqData);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);
    setReqData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginEventHandler = async () => {
    const csrf = () =>
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);
    await csrf();

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, reqData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 204) {
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <PageTemplete headerText="ログイン">
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
      <PrimaryButton
        type="button"
        text="登録"
        id="login-button"
        onClickHandler={loginEventHandler}
      />
    </PageTemplete>
  );
};
