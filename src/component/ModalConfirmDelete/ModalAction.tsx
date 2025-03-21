import React, { ReactNode } from "react";
import {
    Form,
    Button,
} from "antd";
import Image from "next/image";
import BaseModal from "../BaseModal/BaseModal";
import { IconAlertCircle } from "@tabler/icons-react";

interface ActionProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    title: string;
    isLoading?: boolean;
    handleActionSubmit: (e: any) => void;
    nameTitle?: string;
    contentQuestion?: string | ReactNode;
    nameButtonSubmit?: string;
    nameButtonClose?: string;
}

const ModalAction: React.FC<ActionProps> = ({
    isModalOpen,
    setIsModalOpen,
    title,
    isLoading,
    handleActionSubmit,
    nameTitle,
    contentQuestion,
    nameButtonSubmit,
    nameButtonClose,
}) => {
    return (
        <BaseModal
            title={title}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
        >
            <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: "full" }}>
                <div className="flex gap-2">
                    <IconAlertCircle color="#F70000" />
                    <p className="font-medium text-base">{nameTitle}</p>
                </div>
                <div className="px-6 pt-2 pb-6">
                    {contentQuestion}
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleActionSubmit}
                        className="!rounded-none"
                        danger
                        loading={isLoading}
                    >
                        {nameButtonSubmit}
                    </Button>
                    <Button
                        type="default"
                        onClick={() => setIsModalOpen(false)}
                        className="!rounded-none"
                    >
                        {nameButtonClose}
                    </Button>
                </div>
            </Form.Item>
        </BaseModal>
    );
};
export default ModalAction;
