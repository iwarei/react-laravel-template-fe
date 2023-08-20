import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { PrimaryButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PageTemplete } from '../templates/PageTemplate';
import { IsAuthedContext, AuthInfoContext } from '../../context/AuthProvider';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const initialReqData = {
    email: '',
    password: '',
    password_confirmation: '',
    token: '',
  };

  const [reqData, setReqData] = useState(initialReqData);

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
    const csrf = () =>
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);
    await csrf();

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/reset-password`,
        reqData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('成功');
        } else {
          console.log(response);
          console.log('失敗');
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
        onChange={inputChangeHandler}
      />
      <InputFormWithLabel
        labelText="新しいパスワード (確認用)"
        formName="password_confirmation"
        onChange={inputChangeHandler}
      />

      <div className="flex justify-center">
        <PrimaryButton
          type="button"
          text="リセット"
          id="reset-button"
          addClass={['w-32']}
          onClickHandler={resetEventHandler}
        />
      </div>
    </PageTemplete>
  );
};