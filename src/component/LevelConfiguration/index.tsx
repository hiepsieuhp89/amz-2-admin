'use client';
// components/LevelConfiguration.tsx
import React from 'react';
import { Card, Form, InputNumber, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface LevelConfigFormValues {
    maxRewardLevel: number;
    maxDisplayLevel: number;
    maxUserCheckLevel: number;
}

interface LevelConfigurationProps {
    initialValues?: LevelConfigFormValues;
    onSubmit: (values: LevelConfigFormValues) => void ;
    loading?: boolean;
}

export const LevelConfiguration: React.FC<LevelConfigurationProps> = ({
    initialValues = {
        maxRewardLevel: 1,
        maxDisplayLevel: 1,
        maxUserCheckLevel: 10,
    },
    onSubmit,
    loading = false,
}) => {
    const [form] = Form.useForm<LevelConfigFormValues>();

    const handleValuesChange = () => {
        // Auto-save khi có thay đổi
        const values = form.getFieldsValue();
        onSubmit(values);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card
                className="shadow-sm rounded-lg"
                title={
                    <div className="flex items-center space-x-2">
                        <Title level={4} className="!mb-0">LEVEL</Title>
                    </div>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialValues}
                    onValuesChange={handleValuesChange}
                    disabled={loading}
                    className="space-y-4"
                >
                    <Form.Item
                        name="maxRewardLevel"
                        label="Tầng tối thiểu nhận thưởng"
                        tooltip={{
                            title: 'Cấp độ tối thiểu người dùng cần đạt để nhận thưởng',
                            icon: <InfoCircleOutlined className="text-gray-400" />,
                        }}
                        rules={[
                            { required: true, message: 'Vui lòng nhập tầng tối thiểu nhận thưởng' },
                            { type: 'number', min: 1, message: 'Giá trị phải lớn hơn 0' },
                        ]}
                    >
                        <InputNumber
                            className="w-full"
                            min={1}
                            placeholder="Nhập tầng tối thiểu nhận thưởng"
                        />
                    </Form.Item>

                    <Form.Item
                        name="maxDisplayLevel"
                        label="Tầng tối thiểu hiển thị cho người dùng"
                        tooltip={{
                            title: 'Cấp độ tối thiểu sẽ hiển thị cho người dùng thấy',
                            icon: <InfoCircleOutlined className="text-gray-400" />,
                        }}
                        rules={[
                            { required: true, message: 'Vui lòng nhập tầng tối thiểu hiển thị' },
                            { type: 'number', min: 1, message: 'Giá trị phải lớn hơn 0' },
                        ]}
                    >
                        <InputNumber
                            className="w-full"
                            min={1}
                            placeholder="Nhập tầng tối thiểu hiển thị"
                        />
                    </Form.Item>

                    <Form.Item
                        name="maxUserCheckLevel"
                        label="Tầng tối đa người dùng có thể kiểm tra thông tin"
                        tooltip={{
                            title: 'Giới hạn số tầng tối đa mà người dùng có thể xem thông tin',
                            icon: <InfoCircleOutlined className="text-gray-400" />,
                        }}
                        rules={[
                            { required: true, message: 'Vui lòng nhập tầng tối đa có thể kiểm tra' },
                            { type: 'number', min: 1, message: 'Giá trị phải lớn hơn 0' },
                        ]}
                    >
                        <InputNumber
                            className="w-full"
                            min={1}
                            placeholder="Nhập tầng tối đa có thể kiểm tra"
                        />
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
