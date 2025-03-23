import React from 'react';
import { Tooltip } from 'antd'; // Thư viện Tooltip từ Ant Design (hoặc sử dụng tooltip khác nếu muốn)

interface InfoRowProps {
  label: string;
  value: any
  className?: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, className = "" }) => {
  const displayedValue = value?.length > 40 ? value.slice(0, 40) + '...' : value;
  return (
    <div className={`flex gap-2 p-4 ${className}`}>
      <span>{label}:</span>
      <span className="font-medium cursor-pointer">{displayedValue}</span>

    </div>
  );
};
