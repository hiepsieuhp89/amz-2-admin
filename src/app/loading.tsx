import { Spin } from "antd";

const Loading = () => {
    return (
        <div>
            <div className="flex justify-center pt-32">
                <Spin />
            </div>
            <p className="text-center">Đang tải...</p>
        </div>
    )
}

export default Loading;