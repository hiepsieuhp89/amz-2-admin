
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; 
dayjs.extend(utc); 
export const predefinedRanges = [
    { label: "Hôm nay", value: "today", range: [dayjs().startOf('day').utc(), dayjs().endOf('day').utc()] },
    { label: "Hôm qua", value: "yesterday", range: [dayjs().subtract(1, "day").startOf("day").utc(), dayjs().subtract(1, "day").endOf("day").utc()] },
    { label: "7 ngày gần đây", value: "last7Days", range: [dayjs().subtract(6, "day").startOf("day").utc(), dayjs().endOf("day").utc()] },
    { label: "30 ngày gần đây", value: "last30Days", range: [dayjs().subtract(29, "day").startOf("day").utc(), dayjs().endOf("day").utc()] },
    { label: "Tháng này", value: "thisMonth", range: [dayjs().startOf("month").utc(), dayjs().endOf("month").utc()] },
    { label: "Tháng trước", value: "lastMonth", range: [dayjs().subtract(1, "month").startOf("month").utc(), dayjs().subtract(1, "month").endOf("month").utc()] },
    { label: "Năm nay", value: "thisYear", range: [dayjs().startOf("year").utc(), dayjs().endOf("year").utc()] },
    { label: "Năm ngoái", value: "lastYear", range: [dayjs().subtract(1, "year").startOf("year").utc(), dayjs().subtract(1, "year").endOf("year").utc()] },
    { label: "Tất cả thời gian", value: "allTime", range: [null, null] },
    { label: "Tùy chọn", value: "custom", range: [dayjs().utc(), dayjs().utc()] },
];


export const IGameData = [
    {
        value: 'WINGO',
        label: 'WINGO',
    }, {
        value: 'K3',
        label: 'K3',
    }, {
        value: 'KENO',
        label: '5D',
    },
    {
        value: 'WINGOTRX',
        label: 'WINGOTRX',
    }

]
export const IGameCheckBalance = [
    {
        value: 'wingo',
        label: 'WINGO',
    }, {
        value: 'k3',
        label: 'K3',
    }, {
        value: 'keno',
        label: 'KENO',
        display: '5D'
    },
    {
        value: 'wingo_trx',
        label: 'WINGOTRX',
    }

]
export const IGameHistoryThirdParty = [
    {
        value: 'FISH',
        label: 'Bắn cá',
    }, {
        value: 'LIVE',
        label: 'casino',
    }, {
        value: 'PVP',
        label: 'Game bài',
    },
    {
        value: 'SPORT',
        label: 'Thể thao',
    },
    {
        value: 'RNG',
        label: 'Sà lot',
    }
]

export const gameCategory = ["RNG", "PVP", "LIVE", "SPORTS"]
export const ITypeDuplicateInfo = [
    {
        value: 'LAST_LOGIN_IP',
        label: 'Trùng Ip đăng nhập cuối',
    }, 
    {
        value: 'REGISTER_IP',
        label: 'Trùng Ip đăng kí',
    }, {
        value: 'DUPLICATE_BANK_ACCOUNT_NAME',
        label: 'Trùng tên tài khoản ngân hàng',
    },
    {
        value: 'DUPLICATE_BANK_ACCOUNT_NUMBER',
        label: 'Trùng tên số tài khoản ngân hàng',
    },
    {
        value: 'DUPLICATE_USDT_ADDRESS',
        label: 'Trùng địa chỉ USDT',
    }
]