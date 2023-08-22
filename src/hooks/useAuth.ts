import React, { useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../context/AlertProvider';
import { IsAuthedContext, AuthInfoContext } from '../context/AuthProvider';

// 型定義
export type RegisterReqType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type RegisterType = {
  reqData: RegisterReqType;
  redirect?: string;
};

export type LoginReqType = {
  email: string;
  password: string;
};

type LoginType = {
  reqData: LoginReqType;
  redirect?: string;
};

export type SendResetMailReqType = {
  email: string;
};

type SendResetMailType = {
  reqData: SendResetMailReqType;
};

export type ResetPasswordReqType = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

type ResetPasswordType = {
  reqData: SendResetMailReqType;
};

export const useAuth = () => {
  const navigate = useNavigate();

  const { setIsAuthed } = useContext(IsAuthedContext)!;
  const { setUserInfo } = useContext(AuthInfoContext)!;
  const { setAlert } = useContext(AlertContext)!;

  const getCsrf = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`)
      .catch((error) => {
        setAlert({
          color: 'failure',
          msg: `ログインできませんでした。[${
            error?.response?.data?.message ?? ''
          }]`,
        });
      });
  };

  const getUserInfo = async (redirect: string, msg: string) => {
    const userInfoRes = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/user`
    );

    setIsAuthed(true);
    setUserInfo({
      id: userInfoRes.data.user.id,
      name: userInfoRes.data.user.name,
      email: userInfoRes.data.user.email,
    });

    navigate(redirect, {
      state: { msg, color: 'success' },
    });
  };

  const register = async ({ reqData, redirect = '/' }: RegisterType) => {
    await getCsrf();

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, reqData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(async (response) => {
        if (response.status === 204) {
          await getUserInfo(redirect, `ユーザー登録しました。`);
        }
      })
      .catch((error) => {
        setAlert({
          color: 'failure',
          msg: `ユーザー登録できませんでした。[${error?.response?.data?.message}]`,
        });
      });
  };

  const login = async ({ reqData, redirect = '/' }: LoginType) => {
    await getCsrf();

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, reqData)
      .then(async (response) => {
        if (response.status === 204) {
          await getUserInfo(redirect, `ログインしました。`);
        }
      })
      .catch((error) => {
        setAlert({
          color: 'failure',
          msg: `ログインできませんでした。[${error?.response?.data?.message}]`,
        });
      });
  };

  const sendResetMail = async ({ reqData }: SendResetMailType) => {
    await getCsrf();

    await axios
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

  const resetPassword = async ({ reqData }: ResetPasswordType) => {
    await getCsrf();

    await axios
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
          navigate('/login', {
            state: {
              msg: 'パスワードをリセットしました。',
              color: 'success',
            },
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

  return { register, login, sendResetMail, resetPassword };
};
