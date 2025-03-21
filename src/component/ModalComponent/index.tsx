'use client';
import { Modal } from 'antd';
import React from 'react';
import styles from './styles.module.scss';

interface IModalComponent {
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  title: string;
  children: React.ReactNode;
  width?: string;
}

function ModalComponent({
  setIsModalOpen,
  isModalOpen,
  title,
  children,
  width,
}: IModalComponent) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      centered
      footer={null}
      width={width}
    >
      <div className={styles.modalCustom}>
        <div className="text-center text-xl font-medium">{title}</div>
        <div onClick={handleCancel} className={styles.iconX}></div>
        <div className="mt-8">{children}</div>
      </div>
    </Modal>
  );
}

export default ModalComponent;
