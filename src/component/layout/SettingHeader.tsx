'use client';

// components/layout/SettingsHeader.tsx
import React from 'react';
import { Tabs } from 'antd';
import {
  InfoCircleOutlined,
  SettingOutlined,
  CodeOutlined,
  SendOutlined,
  TeamOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { TabItem } from '@/types/settings';
import { GamepadOutlined } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

const settingTabs: TabItem[] = [
  {
    key: 'general',
    id: 0,
    label: 'THÔNG TIN CHUNG',
    icon: <InfoCircleOutlined />,
  },
  {
    key: 'sco',
    label: 'CẦU HÌNH SCO',
    id: 1,
    icon: <SettingOutlined />,
  },
  {
    key: 'developers',
    label: 'DEVELOPERS',
    id: 2,
    icon: <CodeOutlined />,
  },
  {
    key: 'game',
    label: 'CẦU HÌNH GAME',
    id: 3,
    icon: <GamepadOutlined />,
  },
  {
    key: 'telegram',
    label: 'TELEGRAM',
    id: 4,
    icon: <SendOutlined />,
  },
  {
    key: 'agency',
    label: 'ĐẠI LÝ NGƯỜI DÙNG',
    id: 8,
    icon: <TeamOutlined />,
  },
  {
    key: 'webapp',
    label: 'WEBAPP',
    id: 5,
    icon: <GlobalOutlined />,
  },
];

const SettingsHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname.split('/').pop() || 'general';

  const handleTabChange = (key: string) => {
    router.push(`/configs/${key}`);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto">
        <Tabs
          activeKey={currentTab}
          onChange={handleTabChange}
          items={settingTabs.map(({ key, label, icon }) => ({
            key,
            label: (
              <span className="flex items-center gap-2">
                {icon}
                <span className="font-medium">{label}</span>
              </span>
            ),
          }))}
          className="px-4"
          type="card"
        />
      </div>
    </div>
  );
};
export default SettingsHeader;