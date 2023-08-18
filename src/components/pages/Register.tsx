import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { PrimaryButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';

export const Register = () => {
  const initialReqData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const [reqData, setReqData] = useState(initialReqData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);
    setReqData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerEventHandler = async () => {
    const csrf = () => axios.get('http://localhost/sanctum/csrf-cookie');
    await csrf();

    const reqData1 = {
      name: 'example',
      email: 'example@example.com',
      password: 'password',
      password_confirmation: 'password',
    };

    await axios
      .post('http://localhost/register', reqData1, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <InputFormWithLabel
        labelText="名前"
        formName="name"
        onChange={handleInputChange}
      />
      <InputFormWithLabel
        labelText="メールアドレス"
        formName="email"
        onChange={handleInputChange}
      />
      <InputFormWithLabel
        labelText="パスワード"
        formName="password"
        onChange={handleInputChange}
      />
      <InputFormWithLabel
        labelText="パスワード (確認用)"
        formName="password_confirmation"
        onChange={handleInputChange}
      />
      <PrimaryButton
        type="button"
        text="登録"
        id="register-button"
        onClickHandler={registerEventHandler}
      />
    </>
  );
};
