import React, { useState, ChangeEvent } from 'react';
import { Block } from '../atoms/Block';
import { Heading } from '../atoms/Heading';
import { PrimaryButton, DangerButton } from '../atoms/Button';
import { InputFormWithLabel } from '../molecules/InputFormWithLabel';
import { PageTemplate } from '../templates/PageTemplate';
import { RegisterReqType, useAuth } from '../../hooks/useAuth';

export const Account = () => {
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
    <PageTemplate headerText="アカウント">
      {/* アカウント情報ブロック (名前、メアド更新) */}
      <Block>
        <Heading.H5 text="アカウント情報" />
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
        <div className="flex justify-center place-items-center relative">
          <PrimaryButton
            type="button"
            text="更新"
            id="register-button"
            addClass={['w-32']}
            // onClick={updateProfileHandler}
          />
        </div>
      </Block>

      {/* パスワード変更ブロック */}
      <Block>
        <Heading.H5 text="パスワード変更" />
        <InputFormWithLabel
          labelText="現在のパスワード"
          formName="name"
          onChange={inputChangeHandler}
        />
        <InputFormWithLabel
          labelText="新しいパスワード"
          formName="email"
          onChange={inputChangeHandler}
        />
        <InputFormWithLabel
          labelText="新しいパスワード (確認用)"
          formName="email"
          onChange={inputChangeHandler}
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
