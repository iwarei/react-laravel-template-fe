import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../context/AlertProvider';
import { LoadingContext } from '../context/LoadingProvider';
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

type LogoutType = {
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
  const { setLoading, unsetLoading } = useContext(LoadingContext)!;
  const { setAlert } = useContext(AlertContext)!;

  const setErrorAlert = (msg: string) => {
    setAlert({
      color: 'failure',
      msg,
    });
  };

  const setSuccessAlert = (msg: string) => {
    setAlert({
      color: 'success',
      msg,
    });
  };

  const getCsrf = async () => {
    setLoading();
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`)
      .catch((error) => {
        setErrorAlert(
          `ログインできませんでした。[${error?.response?.data?.message ?? ''}]`
        );
      })
      .finally(() => {
        unsetLoading();
      });
  };

  const autoLogin = async ({ redirect = '/' }) => {
    setLoading();
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/user`)
      .then((response) => {
        if (response.status === 200) {
          setIsAuthed(true);
          setUserInfo({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
          });

          navigate(redirect);
        }
      })
      .catch(() => {
        // 特に何もしない ログイン後の401を想定
      })
      .finally(() => {
        unsetLoading();
      });
  };

  const getUserInfo = async ({
    redirect,
    msg,
  }: {
    redirect?: string | undefined;
    msg?: string | undefined;
  }) => {
    setLoading();
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/user`)
      .then((response) => {
        setIsAuthed(true);
        setUserInfo({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        });
        // redirectが指定されていない場合何もしない
        if (!redirect) {
          return;
        }
        navigate(redirect, {
          state: { msg, color: 'success' },
        });
      })
      .catch((error) => {
        setErrorAlert(
          `エラーが発生しました。[${error?.response?.data?.message ?? ''}]`
        );
      })
      .finally(() => {
        unsetLoading();
      });
  };

  const register = async ({ reqData, redirect = '/' }: RegisterType) => {
    setLoading();
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
          await getUserInfo({
            redirect,
            msg: 'ユーザー登録しました。',
          });
        }
      })
      .catch((error) => {
        setErrorAlert(
          `ユーザー登録できませんでした。[${error?.response?.data?.message}]`
        );
      })
      .finally(() => {
        unsetLoading();
      });
  };

  const login = async ({ reqData, redirect = '/' }: LoginType) => {
    setLoading();
    await getCsrf();

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, reqData)
      .then(async (response) => {
        if (response.status === 204) {
          await getUserInfo({ redirect, msg: `ログインしました。` });
        }
      })
      .catch((error) => {
        setErrorAlert(
          `ログインできませんでした。[${error?.response?.data?.message}]`
        );
      })
      .finally(() => {
        unsetLoading();
      });
  };

  const logout = async ({ redirect = '/login' }: LogoutType) => {
    const logoutProcess = () => {
      // ログイン状態の変更と保持していたユーザ情報を空にする
      setIsAuthed(false);
      setUserInfo(undefined);
      navigate(redirect);
    };
    setLoading();
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/logout`)
      .then(() => {
        logoutProcess();
      })
      .catch(() => {
        logoutProcess();
      })
      .finally(() => {
        unsetLoading();
      });
  };

  const sendResetMail = async ({ reqData }: SendResetMailType) => {
    setLoading();
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
          setSuccessAlert(
            `登録されているメールアドレスに再設定用のメールを送信しました。`
          );
        } else {
          setErrorAlert(`エラーが発生しました。[${response?.data?.message}]`);
        }
      })
      .catch((error) => {
        setErrorAlert(
          `エラーが発生しました。[${error?.response?.data?.message}]`
        );
      })
      .finally(() => {
        unsetLoading();
      });
  };

  const resetPassword = async ({ reqData }: ResetPasswordType) => {
    setLoading();
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
          setErrorAlert(`エラーが発生しました。[${response?.data?.message}]`);
        }
      })
      .catch((error) => {
        setErrorAlert(
          `エラーが発生しました。[${error?.response?.data?.message}]`
        );
      })
      .finally(() => {
        unsetLoading();
      });
  };

  return {
    autoLogin,
    register,
    getUserInfo,
    login,
    logout,
    sendResetMail,
    resetPassword,
  };
};
