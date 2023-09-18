import React from 'react';
import { Modal as FlowbiteModal } from 'flowbite-react';

type ModalProps = {
  name?: string; // モーダル名 指定なしの場合'modal'となる
  openModal?: string | undefined; // モーダル表示状態のuseState
  setOpenModal?: React.Dispatch<React.SetStateAction<string | undefined>>; // モーダル表示状態のuseState
  children: React.ReactNode; // モーダルのボディの表示内容
  header?: React.ReactNode | string | boolean; // モーダルのヘッダの表示内容
  headerClassName?: string;
  footer?: React.ReactNode; // モーダルのフッターの表示内容
  footerClassName?: string;
  size?: // モーダルの表示サイズ
  'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  staticModal?: boolean; // モーダル外を押下された場合、モーダルを閉じるか否か。
  always?: boolean; // 常に表示状態にする (モーダル外でモーダル表示制御を行いたい場合に使用) ヘッダの閉じる(×)は動作しなくなるので注意
};

export const Modal = ({
  name = 'modal',
  openModal,
  setOpenModal,
  children,
  header,
  headerClassName = '',
  footer,
  footerClassName = '',
  size = '2xl',
  staticModal = false,
  always = true,
}: ModalProps) => {
  return (
    <FlowbiteModal
      show={always ? openModal === name : true}
      size={size}
      dismissible={!staticModal}
      onClose={always ? () => setOpenModal?.(undefined) : undefined}
    >
      {header && (
        <FlowbiteModal.Header className={headerClassName}>
          {header}
        </FlowbiteModal.Header>
      )}
      <FlowbiteModal.Body>
        <div className="space-y-6">{children}</div>
      </FlowbiteModal.Body>
      {footer && (
        <FlowbiteModal.Footer className={footerClassName}>
          {footer}
        </FlowbiteModal.Footer>
      )}
    </FlowbiteModal>
  );
};

/**
 * フッターの実装例:
    const footer: JSX.Elements = (
      <Button onClick={() => setOpenModal(undefined)}>I accept</Button>
      <Button color="gray" onClick={() => setOpenModal(undefined)}>
        Decline
      </Button>
    );
 */