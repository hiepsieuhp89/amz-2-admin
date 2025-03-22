
import { Button, Layout } from 'antd';
import { useRouter } from 'next/navigation';

function NotFoundData() {
    const router = useRouter()
    return (
        <Layout> {/* Sử dụng layout chung của ứng dụng */}
            <div className="min-h-[30vh] flex items-center justify-center px-4">
                <div className="text-center">

                    {/* Nội dung */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Không có dữ liệu
                    </h1>
                    {/* Button quay về trang chủ */}

                    <Button
                        type="primary"
                        size="large"
                        className="bg-[#1677ff] hover:bg-[#4096ff]"
                    >
                        Quay  lại
                    </Button>

                </div>
            </div>
        </Layout>
    );
}

export default NotFoundData;
