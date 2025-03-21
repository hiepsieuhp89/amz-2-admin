import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center min-w-screen bg-white min-h-screen">
      <Spin />
      <p>Đang tải...</p>
    </div>
  );
};
export default Loading;
