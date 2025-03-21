// components/layout/SettingsLayout.tsx
import React from 'react';
import SettingsHeader from './SettingHeader';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader />
      <main className="max-w-screen-2xl mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  );
};
 
export default SettingsLayout;