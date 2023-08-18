import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { PrimaryButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { Navbar } from '../organism/Navbar';

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
    await axios
      .post('http://localhost/api/login', reqData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        window.location.href = '/';
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Navbar />
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
    </>
  );
};
