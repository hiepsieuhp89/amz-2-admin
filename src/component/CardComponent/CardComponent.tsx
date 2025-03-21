interface CardCommonProps {
    icon: React.ElementType;
    color?: string;
    value: string | number;
    label: string;
}

export const CardCommon: React.FC<CardCommonProps> = ({ icon: Icon, color, value, label }) => (
    <div className={`p-4 flex items-center h-[60px] bg-white rounded-lg shadow`}>
        <Icon className="text-gray-700" size={30} color={color} />
        <div className="w-[1px] bg-gray-300 h-[40px] ml-2"></div>
        <div className="ml-2">
            <p className="font-semibold text-lg" style={{ color }}>{value}</p>
            <p className="text-sm text-black">{label}</p>
        </div>
    </div>
);