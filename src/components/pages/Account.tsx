import React, { useState, useContext } from 'react';
import axios from 'axios';
import { PageTemplate } from '../templates/PageTemplate';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PrimaryButton, DangerButton } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Block } from '../atoms/Block';
import { Text } from '../atoms/Text';
import { AlertContext } from '../../context/AlertProvider';
import { AuthInfoContext } from '../../context/AuthProvider';
import { useAuth } from '../../hooks/useAuth';

export const Account = () => {
  const { setAlert } = useContext(AlertContext)!;
  const { setUserInfo, userInfo } = useContext(AuthInfoContext)!;
  const { getUserInfo } = useAuth();

  type AccountInfoReqType = {
    name: string;
    email: string;
  };
  const initialAccountInfoReq: AccountInfoReqType = {
    name: userInfo?.name ?? '',
    email: userInfo?.email ?? '',
  };
  const [accountInfoReq, setAccountInfoReq] = useState<AccountInfoReqType>(
    initialAccountInfoReq
  );

  type PasswordChangeType = {
    current_password: string | undefined;
    password: string | undefined;
    password_confirmation: string | undefined;
  };
  const initialPasswordChange: PasswordChangeType = {
    current_password: undefined,
    password: undefined,
    password_confirmation: undefined,
  };
  const [passwordChange, setPasswordChange] = useState<PasswordChangeType>(
    initialPasswordChange
  );

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

  const accountInfoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccountInfoReq((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setPasswordChange((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateAccountInfoHandler = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/user`, accountInfoReq)
      .then(async () => {
        setSuccessAlert('アカウント情報を更新しました。');

        // Contextのユーザー情報を更新
        await getUserInfo({});
      })
      .catch((error) => {
        setErrorAlert(
          `エラーが発生しました。[${error?.response?.data?.message}]`
        );
      });
  };

  return (
    <PageTemplate headerText="アカウント">
      {/* アカウント情報ブロック (名前、メアド更新) */}
      <Block>
        <Heading.H5 text="アカウント情報" />
        <Text>アカウント情報とメールアドレスを更新できます</Text>
        <InputFormWithLabel
          labelText="名前"
          formName="name"
          value={userInfo?.name ?? ''}
          onChange={accountInfoHandler}
        />
        <InputFormWithLabel
          labelText="メールアドレス"
          formName="email"
          value={userInfo?.email ?? ''}
          onChange={accountInfoHandler}
        />
        <div className="flex justify-center place-items-center relative">
          <PrimaryButton
            type="button"
            text="更新"
            id="register-button"
            addClass={['w-32']}
            onClick={updateAccountInfoHandler}
          />
        </div>
      </Block>

      {/* パスワード変更ブロック */}
      <Block>
        <Heading.H5 text="パスワード変更" />
        <Text>
          十分に長くランダムなパスワードを使用して、アカウントのセキュリティを高めましょう
        </Text>
        <InputFormWithLabel
          labelText="現在のパスワード"
          formName="current_password"
          onChange={passwordChangeHandler}
        />
        <InputFormWithLabel
          labelText="新しいパスワード"
          formName="password"
          onChange={passwordChangeHandler}
        />
        <InputFormWithLabel
          labelText="新しいパスワード (確認用)"
          formName="password_confirmation"
          onChange={passwordChangeHandler}
        />
        <div className="flex justify-center place-items-center relative">
          <PrimaryButton
            type="button"
            text="変更"
            id="register-button"
            addClass={['w-32']}
            // onClick={updateProfileHandler}
          />
        </div>
      </Block>

      {/* アカウント削除ブロック */}
      <Block>
        <Heading.H5 text="アカウント削除" />
        <Text>
          アカウントを削除すると、全てのデータとファイルも完全に削除されます。
          <br />
          アカウントを削除する前に必要なデータがあれば事前にダウンロードの実施をお願いします。
        </Text>
        <div className="flex justify-center place-items-center relative">
          <DangerButton
            type="button"
            text="アカウントの削除"
            id="register-button"
            addClass={['w-64']}
            // onClick={updateProfileHandler}
          />
        </div>
      </Block>
    </PageTemplate>
  );
};
