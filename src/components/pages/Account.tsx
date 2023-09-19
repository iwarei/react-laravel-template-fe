import React, { useState, useContext } from 'react';
import axios from 'axios';
import { PageTemplate } from '../templates/PageTemplate';
import { Modal } from '../organisms/Modal';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PrimaryButton, CommonButton, DangerButton } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Block } from '../atoms/Block';
import { Text } from '../atoms/Text';
import { AlertContext } from '../../context/AlertProvider';
import { AuthInfoContext } from '../../context/AuthProvider';
import { useAuth } from '../../hooks/useAuth';

export const Account = () => {
  const { setAlert, clearAlert } = useContext(AlertContext)!;
  const { userInfo } = useContext(AuthInfoContext)!;
  const { getUserInfo } = useAuth();

  // アカウント削除確認用モーダルの表示状態
  const [showAccountDeleteModal, setShowAccountDeleteModal] = useState(false);

  // アカウント情報更新時のリクエストパラメータの準備、初期化
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

  // パスワード変更時のリクエストパラメータの準備、初期化
  type PasswordChangeReqType = {
    current_password: string | undefined;
    password: string | undefined;
    password_confirmation: string | undefined;
  };
  const initialPasswordChange: PasswordChangeReqType = {
    current_password: undefined,
    password: undefined,
    password_confirmation: undefined,
  };
  const [passwordChangeReq, setPasswordChangeReq] =
    useState<PasswordChangeReqType>(initialPasswordChange);

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

  // アカウント情報更新の入力フォーム内容変更時のイベントハンドラ
  const accountInfoFormHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setAccountInfoReq((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // パスワード変更の入力フォーム内容変更時のイベントハンドラ
  const passwordChangeFormHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setPasswordChangeReq((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // アカウント情報更新ボタン押下時のイベントハンドラ
  const updateAccountInfoHandler = async () => {
    // 入力内容検証
    const validation = () => {
      clearAlert();
      if (!accountInfoReq.name || !accountInfoReq.email) {
        // 未入力項目がある場合
        setErrorAlert('入力されていない項目があります。');
        return false;
      }
      return true;
    };

    // 入力検証がNGだった場合、処理中断
    if (!validation()) {
      return;
    }

    // ユーザ情報更新APIを投げる
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

  // パスワード変更ボタン押下時のイベントハンドラ
  const updatePasswordHandler = async () => {
    // 入力内容検証
    const validation = () => {
      clearAlert();
      if (
        passwordChangeReq.password !== passwordChangeReq.password_confirmation
      ) {
        // パスワードとパスワード(再入力)が一致しない場合
        setErrorAlert(
          '新しいパスワードと新しいパスワード(再入力)が一致しません。'
        );
        return false;
      }
      if (
        passwordChangeReq.password &&
        (passwordChangeReq?.password.length < 8 ||
          passwordChangeReq?.password.length > 16)
      ) {
        // パスワードが8文字以上16文字以下でない場合
        setErrorAlert('パスワードは8文字以上16文字以下で入力してください。');
        return false;
      }
      if (
        !passwordChangeReq.password ||
        !passwordChangeReq.password_confirmation ||
        !passwordChangeReq.current_password
      ) {
        // 未入力項目がある場合
        setErrorAlert('入力されていない項目があります。');
        return false;
      }
      return true;
    };

    // 入力検証がNGだった場合、処理中断
    if (!validation()) {
      return;
    }

    // パスワード更新APIを叩く
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/user`, passwordChangeReq)
      .then(async () => {
        setSuccessAlert('パスワードを更新しました。');
      })
      .catch((error) => {
        setErrorAlert(
          `エラーが発生しました。[${error?.response?.data?.message}]`
        );
      });
  };

  // アカウント削除ボタン押下時のイベントハンドラ (モーダルを開く)
  const openDeleteAccountModalHandler = () => {
    console.log('test');
  };

  // アカウント削除確認モーダルのボディ部分
  const accountDeleteModalBody: JSX.Element = (
    <>
      <Heading.H5 text="アカウント削除の確認" />
      <Text>
        アカウントを削除すると、全てのデータとファイルも完全に削除されます。
        <br />
        本当に削除する場合は、確認のためにパスワードを入力し削除ボタンを押してください。
      </Text>
      <InputFormWithLabel
        labelText="パスワード"
        type="password"
        formName="password"
        formId="account-delete-password"
        onChange={accountInfoFormHandler}
      />
    </>
  );

  // アカウント削除確認モーダルのフッター部分
  const accountDeleteModalFooter: JSX.Element = (
    <div className="w-full flex justify-end">
      <CommonButton text="キャンセル" />
      <DangerButton text="アカウントを削除" />
    </div>
  );

  return (
    <PageTemplate headerText="アカウント">
      {/* アカウント情報ブロック (名前、メアド更新) */}
      <Block>
        <Heading.H5 text="アカウント情報" />
        <Text>アカウント情報とメールアドレスを更新できます。</Text>
        <InputFormWithLabel
          labelText="名前"
          formName="name"
          value={userInfo?.name ?? ''}
          onChange={accountInfoFormHandler}
        />
        <InputFormWithLabel
          labelText="メールアドレス"
          formName="email"
          value={userInfo?.email ?? ''}
          onChange={accountInfoFormHandler}
        />
        <div className="flex justify-center place-items-center relative">
          <PrimaryButton
            type="button"
            text="更新"
            addClass={['w-32']}
            onClick={updateAccountInfoHandler}
          />
        </div>
      </Block>

      {/* パスワード変更ブロック */}
      <Block>
        <Heading.H5 text="パスワード変更" />
        <Text>
          十分に長くランダムなパスワードを使用して、アカウントのセキュリティを高めましょう。
        </Text>
        <InputFormWithLabel
          labelText="現在のパスワード"
          type="password"
          formName="current_password"
          onChange={passwordChangeFormHandler}
        />
        <InputFormWithLabel
          labelText="新しいパスワード"
          type="password"
          formName="password"
          onChange={passwordChangeFormHandler}
        />
        <InputFormWithLabel
          labelText="新しいパスワード (確認用)"
          type="password"
          formName="password_confirmation"
          onChange={passwordChangeFormHandler}
        />
        <div className="flex justify-center place-items-center relative">
          <PrimaryButton
            type="button"
            text="変更"
            addClass={['w-32']}
            onClick={updatePasswordHandler}
          />
        </div>
      </Block>

      {/* アカウント削除ブロック */}
      <Block>
        <Heading.H5 text="アカウント削除" />
        <Text>
          アカウントを削除すると、全てのデータとファイルも完全に削除されます。
        </Text>
        <div className="flex justify-center place-items-center relative">
          <DangerButton
            type="button"
            text="アカウントの削除"
            addClass={['w-64']}
            onClick={openDeleteAccountModalHandler}
          />
        </div>
      </Block>
      {/* アカウント削除確認モーダル */}
      <Modal
        openModal={showAccountDeleteModal}
        setOpenModalBoolean={setShowAccountDeleteModal}
        footer={accountDeleteModalFooter}
      >
        {accountDeleteModalBody}
      </Modal>
    </PageTemplate>
  );
};
