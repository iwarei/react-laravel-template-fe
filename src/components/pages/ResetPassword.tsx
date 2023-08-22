import React, { useState, ChangeEvent, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { PrimaryButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PageTemplete } from '../templates/PageTemplate';
import { AlertContext } from '../../context/AlertProvider';
import { ResetPasswordReqType, useAuth } from '../../hooks/useAuth';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const initialReqData: ResetPasswordReqType = {
    email: '',
    password: '',
    password_confirmation: '',
    token: '',
  };

  const [reqData, setReqData] = useState<ResetPasswordReqType>(initialReqData);
  const { resetPassword } = useAuth();

  const location = useLocation();
  const token = location.pathname.split('/')[2];
  const email = location.search.split('=')[1];

  useEffect(() => {
    setReqData((prevData) => ({
      ...prevData,
      email,
      token,
    }));
  }, []);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReqData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetEventHandler = async () => {
    await resetPassword({ reqData });
  };

  return (
    <PageTemplete headerText="パスワードリセット">
      <InputFormWithLabel
        labelText="メールアドレス"
        formName="email"
        onChange={inputChangeHandler}
        value={email}
        disabled
      />
      <InputFormWithLabel
        labelText="新しいパスワード"
        formName="password"
        type="password"
        onChange={inputChangeHandler}
      />
      <InputFormWithLabel
        labelText="新しいパスワード (確認用)"
        formName="password_confirmation"
        type="password"
        onChange={inputChangeHandler}
      />

      <div className="flex justify-center">
        <PrimaryButton
          type="button"
          text="リセット"
          id="reset-button"
          addClass={['w-32']}
          onClick={resetEventHandler}
        />
      </div>
    </PageTemplete>
  );
};
