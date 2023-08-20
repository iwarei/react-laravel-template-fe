import React, { useState, ChangeEvent, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PageTemplete } from '../templates/PageTemplate';
import { IsAuthedContext, AuthInfoContext } from '../../context/AuthProvider';
import { AlertContext } from '../../context/AlertProvider';

export const ForgotPassword = () => {
  const initialReqData = {
    email: '',
  };

  const [reqData, setReqData] = useState(initialReqData);
  const { setAlert } = useContext(AlertContext)!;

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
        `${process.env.REACT_APP_BACKEND_URL}/api/forgot-password`,
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
          setAlert({
            color: 'success',
            msg: `登録されているメールアドレスに再設定用のメールを送信しました。`,
          });
        } else {
          setAlert({
            color: 'failure',
            msg: `エラーが発生しました。[${response?.data?.message}]`,
          });
        }
      })
      .catch((error) => {
        setAlert({
          color: 'failure',
          msg: `エラーが発生しました。[${error?.response?.data?.message}]`,
        });
      });
  };

  return (
    <PageTemplete headerText="パスワードリセット">
      <InputFormWithLabel
        labelText="メールアドレス"
        formName="email"
        onChange={inputChangeHandler}
      />
      <div className="flex justify-center">
        <PrimaryButton
          type="button"
          text="確認用メールを送信"
          id="reset-button"
          addClass={['w-48']}
          onClickHandler={resetEventHandler}
        />
      </div>
    </PageTemplete>
  );
};
