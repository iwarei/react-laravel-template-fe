import React, { useState, ChangeEvent, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from '../atoms/Link';
import { PrimaryButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PageTemplete } from '../templates/PageTemplate';
import { IsAuthedContext, AuthInfoContext } from '../../context/AuthProvider';
import { AlertContext } from '../../context/AlertProvider';
import { RegisterReqType, useAuth } from '../../hooks/useAuth';

export const Register = () => {
  const navigate = useNavigate();
  const initialReqData: RegisterReqType = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const [reqData, setReqData] = useState<RegisterReqType>(initialReqData);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReqData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { register } = useAuth();
  const registerEventHandler = async () => {
    await register({ reqData });
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
          onClick={registerEventHandler}
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
