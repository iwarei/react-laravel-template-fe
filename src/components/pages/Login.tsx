import React, { useState, ChangeEvent, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../atoms/Button';
import { Link } from '../atoms/Link';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PageTemplete } from '../templates/PageTemplate';
import { IsAuthedContext, AuthInfoContext } from '../../context/AuthProvider';

export const Login = () => {
  const navigate = useNavigate();
  const initialReqData = {
    email: '',
    password: '',
  };
  const [reqData, setReqData] = useState(initialReqData);
  const { isAuthed, setIsAuthed } = useContext(IsAuthedContext)!;
  const { userInfo, setUserInfo } = useContext(AuthInfoContext)!;

  // フォーム入力値変化時のイベントハンドラ
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReqData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginEventHandler = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, reqData)
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
            navigate('/');
          };

          getUserInfo();
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('login failed.');
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
      <div className="flex justify-center place-items-center relative">
        <PrimaryButton
          type="button"
          text="ログイン"
          id="login-button"
          addClass={['w-32']}
          onClickHandler={loginEventHandler}
        />
        <Link
          text="パスワードを忘れた場合"
          href="/forgot-password"
          addClass={['absolute', '-right-0', 'sm:text-xs', 'md:text-base']}
        />
      </div>
    </PageTemplete>
  );
};
