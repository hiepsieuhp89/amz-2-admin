export const geographicData = {
    "United States": {
        provinces: [
            { code: "AL", name: "Alabama" },
            { code: "AK", name: "Alaska" },
            { code: "AZ", name: "Arizona" },
            { code: "AR", name: "Arkansas" },
            { code: "CA", name: "California" },
            { code: "CO", name: "Colorado" },
            { code: "CT", name: "Connecticut" },
            { code: "DE", name: "Delaware" },
            { code: "FL", name: "Florida" },
            { code: "GA", name: "Georgia" },
            { code: "HI", name: "Hawaii" },
            { code: "ID", name: "Idaho" },
            { code: "IL", name: "Illinois" },
            { code: "IN", name: "Indiana" },
            { code: "IA", name: "Iowa" },
            { code: "KS", name: "Kansas" },
            { code: "KY", name: "Kentucky" },
            { code: "LA", name: "Louisiana" },
            { code: "ME", name: "Maine" },
            { code: "MD", name: "Maryland" },
            { code: "MA", name: "Massachusetts" },
            { code: "MI", name: "Michigan" },
            { code: "MN", name: "Minnesota" },
            { code: "MS", name: "Mississippi" },
            { code: "MO", name: "Missouri" },
            { code: "MT", name: "Montana" },
            { code: "NE", name: "Nebraska" },
            { code: "NV", name: "Nevada" },
            { code: "NH", name: "New Hampshire" },
            { code: "NJ", name: "New Jersey" },
            { code: "NM", name: "New Mexico" },
            { code: "NY", name: "New York" },
            { code: "NC", name: "North Carolina" },
            { code: "ND", name: "North Dakota" },
            { code: "OH", name: "Ohio" },
            { code: "OK", name: "Oklahoma" },
            { code: "OR", name: "Oregon" },
            { code: "PA", name: "Pennsylvania" },
            { code: "RI", name: "Rhode Island" },
            { code: "SC", name: "South Carolina" },
            { code: "SD", name: "South Dakota" },
            { code: "TN", name: "Tennessee" },
            { code: "TX", name: "Texas" },
            { code: "UT", name: "Utah" },
            { code: "VT", name: "Vermont" },
            { code: "VA", name: "Virginia" },
            { code: "WA", name: "Washington" },
            { code: "WV", name: "West Virginia" },
            { code: "WI", name: "Wisconsin" },
            { code: "WY", name: "Wyoming" },
        ],
        city: {
            California: [
                { code: "LA", name: "Los Angeles" },
                { code: "SF", name: "San Francisco" },
                { code: "SD", name: "San Diego" },
                { code: "SJ", name: "San Jose" },
                { code: "OAK", name: "Oakland" },
            ],
            "New York": [
                { code: "NYC", name: "New York City" },
                { code: "BUF", name: "Buffalo" },
                { code: "ROC", name: "Rochester" },
                { code: "SYR", name: "Syracuse" },
                { code: "ALB", name: "Albany" },
            ],
            Texas: [
                { code: "HOU", name: "Houston" },
                { code: "DAL", name: "Dallas" },
                { code: "AUS", name: "Austin" },
                { code: "SA", name: "San Antonio" },
                { code: "ELP", name: "El Paso" },
            ],
            // Add more states as needed
        },
        ward: {
            "Los Angeles": [
                { code: "BH", name: "Beverly Hills" },
                { code: "SM", name: "Santa Monica" },
                { code: "HW", name: "Hollywood" },
                { code: "DT", name: "Downtown" },
                { code: "VN", name: "Venice" },
            ],
            "New York City": [
                { code: "MAN", name: "Manhattan" },
                { code: "BRK", name: "Brooklyn" },
                { code: "QNS", name: "Queens" },
                { code: "BRX", name: "Bronx" },
                { code: "SI", name: "Staten Island" },
            ],
            // Add more cities as needed
        },
    },
    Canada: {
        provinces: [
            { code: "AB", name: "Alberta" },
            { code: "BC", name: "British Columbia" },
            { code: "MB", name: "Manitoba" },
            { code: "NB", name: "New Brunswick" },
            { code: "NL", name: "Newfoundland and Labrador" },
            { code: "NS", name: "Nova Scotia" },
            { code: "ON", name: "Ontario" },
            { code: "PE", name: "Prince Edward Island" },
            { code: "QC", name: "Quebec" },
            { code: "SK", name: "Saskatchewan" },
            { code: "NT", name: "Northwest Territories" },
            { code: "NU", name: "Nunavut" },
            { code: "YT", name: "Yukon" },
        ],
        city: {
            Ontario: [
                { code: "TOR", name: "Toronto" },
                { code: "OTT", name: "Ottawa" },
                { code: "MIS", name: "Mississauga" },
                { code: "HAM", name: "Hamilton" },
                { code: "LON", name: "London" },
            ],
            Quebec: [
                { code: "MTL", name: "Montreal" },
                { code: "QUE", name: "Quebec City" },
                { code: "LAV", name: "Laval" },
                { code: "GAT", name: "Gatineau" },
                { code: "SHE", name: "Sherbrooke" },
            ],
            // Add more provinces as needed
        },
        ward: {
            Toronto: [
                { code: "DT", name: "Downtown" },
                { code: "NOR", name: "North York" },
                { code: "SCA", name: "Scarborough" },
                { code: "ETB", name: "Etobicoke" },
                { code: "YRK", name: "York" },
            ],
            // Add more cities as needed
        },
    },
    "United Kingdom": {
        provinces: [
            { code: "ENG", name: "England" },
            { code: "SCT", name: "Scotland" },
            { code: "WLS", name: "Wales" },
            { code: "NIR", name: "Northern Ireland" },
        ],
        city: {
            England: [
                { code: "LDN", name: "London" },
                { code: "MAN", name: "Manchester" },
                { code: "BRM", name: "Birmingham" },
                { code: "LIV", name: "Liverpool" },
                { code: "LEE", name: "Leeds" },
            ],
            Scotland: [
                { code: "EDI", name: "Edinburgh" },
                { code: "GLA", name: "Glasgow" },
                { code: "ABD", name: "Aberdeen" },
                { code: "DUN", name: "Dundee" },
                { code: "INV", name: "Inverness" },
            ],
            // Add more regions as needed
        },
        ward: {
            London: [
                { code: "WST", name: "Westminster" },
                { code: "KEN", name: "Kensington" },
                { code: "CAM", name: "Camden" },
                { code: "ISL", name: "Islington" },
                { code: "HAC", name: "Hackney" },
            ],
            // Add more cities as needed
        },
    },
    Australia: {
        provinces: [
            { code: "NSW", name: "New South Wales" },
            { code: "QLD", name: "Queensland" },
            { code: "SA", name: "South Australia" },
            { code: "TAS", name: "Tasmania" },
            { code: "VIC", name: "Victoria" },
            { code: "WA", name: "Western Australia" },
            { code: "ACT", name: "Australian Capital Territory" },
            { code: "NT", name: "Northern Territory" },
        ],
        city: {
            "New South Wales": [
                { code: "SYD", name: "Sydney" },
                { code: "NEW", name: "Newcastle" },
                { code: "WOL", name: "Wollongong" },
                { code: "CEN", name: "Central Coast" },
                { code: "WAG", name: "Wagga Wagga" },
            ],
            Victoria: [
                { code: "MEL", name: "Melbourne" },
                { code: "GEE", name: "Geelong" },
                { code: "BAL", name: "Ballarat" },
                { code: "BEN", name: "Bendigo" },
                { code: "SHE", name: "Shepparton" },
            ],
            // Add more states as needed
        },
        ward: {
            Sydney: [
                { code: "CBD", name: "Sydney CBD" },
                { code: "NOR", name: "North Sydney" },
                { code: "EAS", name: "Eastern Suburbs" },
                { code: "INN", name: "Inner West" },
                { code: "WES", name: "Western Sydney" },
            ],
            // Add more cities as needed
        },
    },
    Vietnam: {
        provinces: [
            { code: "HN", name: "Hà Nội" },
            { code: "HCM", name: "Hồ Chí Minh" },
            { code: "DN", name: "Đà Nẵng" },
            { code: "HP", name: "Hải Phòng" },
            { code: "CT", name: "Cần Thơ" },
            { code: "AG", name: "An Giang" },
            { code: "VT", name: "Bà Rịa - Vũng Tàu" },
            { code: "BG", name: "Bắc Giang" },
            { code: "BK", name: "Bắc Kạn" },
            { code: "BL", name: "Bạc Liêu" },
            { code: "BN", name: "Bắc Ninh" },
            { code: "BT", name: "Bến Tre" },
            { code: "BD", name: "Bình Định" },
            { code: "BI", name: "Bình Dương" },
            { code: "BP", name: "Bình Phước" },
            { code: "BT", name: "Bình Thuận" },
            { code: "CM", name: "Cà Mau" },
            { code: "CB", name: "Cao Bằng" },
            { code: "DL", name: "Đắk Lắk" },
            { code: "DT", name: "Đắk Nông" },
            { code: "DB", name: "Điện Biên" },
            { code: "DN", name: "Đồng Nai" },
            { code: "DT", name: "Đồng Tháp" },
            { code: "GL", name: "Gia Lai" },
            { code: "HG", name: "Hà Giang" },
            { code: "HN", name: "Hà Nam" },
            { code: "HT", name: "Hà Tĩnh" },
            { code: "HD", name: "Hải Dương" },
            { code: "HG", name: "Hậu Giang" },
            { code: "HB", name: "Hòa Bình" },
            { code: "HY", name: "Hưng Yên" },
            { code: "KH", name: "Khánh Hòa" },
            { code: "KG", name: "Kiên Giang" },
            { code: "KT", name: "Kon Tum" },
            { code: "LC", name: "Lai Châu" },
            { code: "LD", name: "Lâm Đồng" },
            { code: "LS", name: "Lạng Sơn" },
            { code: "LC", name: "Lào Cai" },
            { code: "LA", name: "Long An" },
            { code: "ND", name: "Nam Định" },
            { code: "NA", name: "Nghệ An" },
            { code: "NB", name: "Ninh Bình" },
            { code: "NT", name: "Ninh Thuận" },
            { code: "PT", name: "Phú Thọ" },
            { code: "PY", name: "Phú Yên" },
            { code: "QB", name: "Quảng Bình" },
            { code: "QN", name: "Quảng Nam" },
            { code: "QG", name: "Quảng Ngãi" },
            { code: "QN", name: "Quảng Ninh" },
            { code: "QT", name: "Quảng Trị" },
            { code: "ST", name: "Sóc Trăng" },
            { code: "SL", name: "Sơn La" },
            { code: "TN", name: "Tây Ninh" },
            { code: "TB", name: "Thái Bình" },
            { code: "TN", name: "Thái Nguyên" },
            { code: "TH", name: "Thanh Hóa" },
            { code: "TT", name: "Thừa Thiên Huế" },
            { code: "TG", name: "Tiền Giang" },
            { code: "TV", name: "Trà Vinh" },
            { code: "TQ", name: "Tuyên Quang" },
            { code: "VL", name: "Vĩnh Long" },
            { code: "VP", name: "Vĩnh Phúc" },
            { code: "YB", name: "Yên Bái" },
        ],
        city: {
            "Hà Nội": [
                { code: "HBT", name: "Hai Bà Trưng" },
                { code: "HK", name: "Hoàn Kiếm" },
                { code: "TX", name: "Thanh Xuân" },
                { code: "CG", name: "Cầu Giấy" },
                { code: "BD", name: "Ba Đình" },
                { code: "HM", name: "Hoàng Mai" },
                { code: "BTL", name: "Bắc Từ Liêm" },
                { code: "NTL", name: "Nam Từ Liêm" },
                { code: "TL", name: "Tây Hồ" },
                { code: "DD", name: "Đống Đa" },
            ],
            "Hồ Chí Minh": [
                { code: "Q1", name: "Quận 1" },
                { code: "Q2", name: "Quận 2" },
                { code: "Q3", name: "Quận 3" },
                { code: "Q4", name: "Quận 4" },
                { code: "Q5", name: "Quận 5" },
                { code: "Q6", name: "Quận 6" },
                { code: "Q7", name: "Quận 7" },
                { code: "Q8", name: "Quận 8" },
                { code: "Q9", name: "Quận 9" },
                { code: "Q10", name: "Quận 10" },
                { code: "Q11", name: "Quận 11" },
                { code: "Q12", name: "Quận 12" },
                { code: "TB", name: "Tân Bình" },
                { code: "TP", name: "Tân Phú" },
                { code: "BT", name: "Bình Thạnh" },
                { code: "PN", name: "Phú Nhuận" },
                { code: "GV", name: "Gò Vấp" },
                { code: "TD", name: "Thủ Đức" },
                { code: "BC", name: "Bình Chánh" },
                { code: "HM", name: "Hóc Môn" },
                { code: "CC", name: "Củ Chi" },
                { code: "NB", name: "Nhà Bè" },
                { code: "CG", name: "Cần Giờ" },
            ],
            // Add more provinces as needed
        },
        ward: {
            "Quận 1": [
                { code: "BN", name: "Bến Nghé" },
                { code: "BT", name: "Bến Thành" },
                { code: "CK", name: "Cầu Kho" },
                { code: "CO", name: "Cầu Ông Lãnh" },
                { code: "DK", name: "Đa Kao" },
                { code: "NT", name: "Nguyễn Cư Trinh" },
                { code: "NT", name: "Nguyễn Thái Bình" },
                { code: "PNL", name: "Phạm Ngũ Lão" },
                { code: "TC", name: "Tân Định" },
            ],
            "Hai Bà Trưng": [
                { code: "BD", name: "Bạch Đằng" },
                { code: "BT", name: "Bách Khoa" },
                { code: "BM", name: "Bùi Thị Xuân" },
                { code: "DM", name: "Đồng Mác" },
                { code: "DT", name: "Đồng Tâm" },
                { code: "LDH", name: "Lê Đại Hành" },
                { code: "MD", name: "Minh Khai" },
                { code: "NT", name: "Ngô Thì Nhậm" },
                { code: "NTT", name: "Nguyễn Du" },
                { code: "PT", name: "Phạm Đình Hổ" },
                { code: "QT", name: "Quỳnh Lôi" },
                { code: "QM", name: "Quỳnh Mai" },
                { code: "TM", name: "Thanh Lương" },
                { code: "TN", name: "Thanh Nhàn" },
                { code: "TV", name: "Trương Định" },
                { code: "VG", name: "Vĩnh Tuy" },
            ],
        },
    },
    Japan: {
        provinces: [
            { code: "TYO", name: "Tokyo", countryId: "JP", stateId: "TYO" },
            { code: "OSA", name: "Osaka", countryId: "JP", stateId: "OSA" },
            { code: "KYO", name: "Kyoto", countryId: "JP", stateId: "KYO" },
            { code: "HOK", name: "Hokkaido", countryId: "JP", stateId: "HOK" },
            { code: "OKI", name: "Okinawa", countryId: "JP", stateId: "OKI" },
            { code: "KAN", name: "Kanagawa", countryId: "JP", stateId: "KAN" },
            { code: "AIC", name: "Aichi", countryId: "JP", stateId: "AIC" },
            { code: "FUK", name: "Fukuoka", countryId: "JP", stateId: "FUK" }
        ],
        city: {
            Tokyo: [
                { code: "SIB", name: "Shibuya", cityId: "SIB", districtId: "SIB", postalCodeId: "150-0001" },
                { code: "SHN", name: "Shinjuku", cityId: "SHN", districtId: "SHN", postalCodeId: "160-0021" },
                { code: "GIN", name: "Ginza", cityId: "GIN", districtId: "GIN", postalCodeId: "104-0061" },
                { code: "AKB", name: "Akihabara", cityId: "AKB", districtId: "AKB", postalCodeId: "101-0021" },
                { code: "ASA", name: "Asakusa", cityId: "ASA", districtId: "ASA", postalCodeId: "111-0032" }
            ],
            Osaka: [
                { code: "NMB", name: "Namba", cityId: "NMB", districtId: "NMB", postalCodeId: "542-0076" },
                { code: "UMA", name: "Umeda", cityId: "UMA", districtId: "UMA", postalCodeId: "530-0001" },
                { code: "TEN", name: "Tennoji", cityId: "TEN", districtId: "TEN", postalCodeId: "543-0055" },
                { code: "SHI", name: "Shinsaibashi", cityId: "SHI", districtId: "SHI", postalCodeId: "542-0085" },
                { code: "DOI", name: "Dotonbori", cityId: "DOI", districtId: "DOI", postalCodeId: "542-0071" }
            ],
            Kanagawa: [
                { code: "YOK", name: "Yokohama", cityId: "YOK", districtId: "YOK", postalCodeId: "220-0011" },
                { code: "KAM", name: "Kawasaki", cityId: "KAM", districtId: "KAM", postalCodeId: "210-0007" },
                { code: "FUG", name: "Fujisawa", cityId: "FUG", districtId: "FUG", postalCodeId: "251-0021" },
                { code: "HIR", name: "Hiratsuka", cityId: "HIR", districtId: "HIR", postalCodeId: "254-0041" },
                { code: "ODA", name: "Odawara", cityId: "ODA", districtId: "ODA", postalCodeId: "250-0011" }
            ],
            Aichi: [
                { code: "NAG", name: "Nagoya", cityId: "NAG", districtId: "NAG", postalCodeId: "460-0001" },
                { code: "TOY", name: "Toyota", cityId: "TOY", districtId: "TOY", postalCodeId: "471-0021" },
                { code: "OKA", name: "Okazaki", cityId: "OKA", districtId: "OKA", postalCodeId: "444-0011" },
                { code: "ICH", name: "Ichikawa", cityId: "ICH", districtId: "ICH", postalCodeId: "272-0021" },
                { code: "KAS", name: "Kasugai", cityId: "KAS", districtId: "KAS", postalCodeId: "486-0021" }
            ]
        },
        ward: {
            Shibuya: [
                { code: "HAR", name: "Harajuku" },
                { code: "EBU", name: "Ebisu" },
                { code: "DAI", name: "Daikanyama" },
                { code: "YOY", name: "Yoyogi" },
                { code: "HAT", name: "Hatagaya" },
            ],
            Yokohama: [
                { code: "KAN", name: "Kannai" },
                { code: "MIN", name: "Minato Mirai" },
                { code: "CHO", name: "Chuo" },
                { code: "TSUR", name: "Tsurumi" },
                { code: "KOH", name: "Kohoku" },
            ],
            Nagoya: [
                { code: "SAK", name: "Sakae" },
                { code: "NAK", name: "Nakamura" },
                { code: "SHO", name: "Showa" },
                { code: "MEIT", name: "Meito" },
                { code: "MOR", name: "Moriyama" },
            ],
        },
    },
    Germany: {
        provinces: [
            { code: "BE", name: "Berlin" },
            { code: "BY", name: "Bavaria" },
            { code: "BW", name: "Baden-Württemberg" },
            { code: "NW", name: "North Rhine-Westphalia" },
            { code: "HE", name: "Hesse" },
        ],
        city: {
            Berlin: [
                { code: "MIT", name: "Mitte" },
                { code: "PRE", name: "Prenzlauer Berg" },
                { code: "KRE", name: "Kreuzberg" },
                { code: "CHA", name: "Charlottenburg" },
                { code: "FRI", name: "Friedrichshain" },
            ],
            Munich: [
                { code: "ALT", name: "Altstadt-Lehel" },
                { code: "LUD", name: "Ludwigsvorstadt-Isarvorstadt" },
                { code: "MAX", name: "Maxvorstadt" },
                { code: "SCH", name: "Schwabing" },
                { code: "HAI", name: "Haidenhausen" },
            ],
        },
        ward: {
            Mitte: [
                { code: "MOH", name: "Museum Island" },
                { code: "HAC", name: "Hackescher Markt" },
                { code: "ROS", name: "Rosenthaler Platz" },
                { code: "ALE", name: "Alexanderplatz" },
                { code: "POT", name: "Potsdamer Platz" },
            ],
        },
    },
    "France": {
        provinces: [
            { code: "IDF", name: "Île-de-France" },
            { code: "PAC", name: "Provence-Alpes-Côte d'Azur" },
            { code: "ARA", name: "Auvergne-Rhône-Alpes" },
            { code: "NOR", name: "Normandy" },
            { code: "BRE", name: "Brittany" }
        ],
        city: {
            "Île-de-France": [
                { code: "PAR", name: "Paris" },
                { code: "VER", name: "Versailles" },
                { code: "NAN", name: "Nanterre" },
                { code: "BOU", name: "Boulogne-Billancourt" },
                { code: "CRE", name: "Créteil" }
            ],
            "Provence-Alpes-Côte d'Azur": [
                { code: "MAR", name: "Marseille" },
                { code: "NIC", name: "Nice" },
                { code: "TOU", name: "Toulon" },
                { code: "AIX", name: "Aix-en-Provence" },
                { code: "AVI", name: "Avignon" }
            ]
        },
        ward: {
            "Paris": [
                { code: "1ER", name: "1st Arrondissement" },
                { code: "7EM", name: "7th Arrondissement" },
                { code: "16E", name: "16th Arrondissement" },
                { code: "18E", name: "18th Arrondissement" },
                { code: "20E", name: "20th Arrondissement" }
            ]
        }
    },
    "Italy": {
        provinces: [
            { code: "LOM", name: "Lombardy" },
            { code: "LAZ", name: "Lazio" },
            { code: "CAM", name: "Campania" },
            { code: "VEN", name: "Veneto" },
            { code: "PIE", name: "Piedmont" }
        ],
        city: {
            "Lombardy": [
                { code: "MIL", name: "Milan" },
                { code: "BRE", name: "Brescia" },
                { code: "BER", name: "Bergamo" },
                { code: "VAR", name: "Varese" },
                { code: "MON", name: "Monza" }
            ],
            "Lazio": [
                { code: "ROM", name: "Rome" },
                { code: "LAT", name: "Latina" },
                { code: "FRO", name: "Frosinone" },
                { code: "VIT", name: "Viterbo" },
                { code: "RIE", name: "Rieti" }
            ]
        },
        ward: {
            "Milan": [
                { code: "CEN", name: "Centro Storico" },
                { code: "BIC", name: "Bicocca" },
                { code: "NAV", name: "Navigli" },
                { code: "POR", name: "Porta Romana" },
                { code: "SAR", name: "Saronno" }
            ]
        }
    },
    "Spain": {
        provinces: [
            { code: "MAD", name: "Madrid" },
            { code: "CAT", name: "Catalonia" },
            { code: "AND", name: "Andalusia" },
            { code: "VAL", name: "Valencia" },
            { code: "GAL", name: "Galicia" }
        ],
        city: {
            "Madrid": [
                { code: "MAD", name: "Madrid" },
                { code: "ALC", name: "Alcalá de Henares" },
                { code: "GET", name: "Getafe" },
                { code: "LEG", name: "Leganés" },
                { code: "MÓS", name: "Móstoles" }
            ],
            "Catalonia": [
                { code: "BAR", name: "Barcelona" },
                { code: "GIR", name: "Girona" },
                { code: "LLE", name: "Lleida" },
                { code: "TAR", name: "Tarragona" },
                { code: "SAB", name: "Sabadell" }
            ]
        },
        ward: {
            "Madrid": [
                { code: "CEN", name: "Centro" },
                { code: "CHA", name: "Chamberí" },
                { code: "RET", name: "Retiro" },
                { code: "SAL", name: "Salamanca" },
                { code: "TET", name: "Tetúan" }
            ]
        }
    },
    "South Korea": {
        provinces: [
            { code: "SEO", name: "Seoul" },
            { code: "BUS", name: "Busan" },
            { code: "INC", name: "Incheon" },
            { code: "DAE", name: "Daegu" },
            { code: "DJE", name: "Daejeon" }
        ],
        city: {
            Seoul: [
                { code: "GNG", name: "Gangnam" },
                { code: "MAP", name: "Mapo" },
                { code: "JNG", name: "Jongno" },
                { code: "YDP", name: "Yeongdeungpo" },
                { code: "SNG", name: "Seongdong" }
            ],
            Busan: [
                { code: "HAE", name: "Haeundae" },
                { code: "SEO", name: "Seomyeon" },
                { code: "NAMP", name: "Nampo-dong" },
                { code: "GWAN", name: "Gwangan" },
                { code: "DONG", name: "Dongnae" }
            ]
        },
        ward: {
            Gangnam: [
                { code: "APG", name: "Apgujeong" },
                { code: "COE", name: "COEX" },
                { code: "SIN", name: "Sinsa" },
                { code: "NON", name: "Nonhyeon" },
                { code: "SAM", name: "Samseong" }
            ]
        }
    },
    "Brazil": {
        provinces: [
            { code: "SP", name: "São Paulo" },
            { code: "RJ", name: "Rio de Janeiro" },
            { code: "MG", name: "Minas Gerais" },
            { code: "BA", name: "Bahia" },
            { code: "PR", name: "Paraná" }
        ],
        city: {
            "São Paulo": [
                { code: "SPC", name: "São Paulo City" },
                { code: "CAM", name: "Campinas" },
                { code: "SAN", name: "Santo André" },
                { code: "OSA", name: "Osasco" },
                { code: "SBC", name: "São Bernardo do Campo" }
            ],
            "Rio de Janeiro": [
                { code: "RJC", name: "Rio de Janeiro City" },
                { code: "NIT", name: "Niterói" },
                { code: "DUQ", name: "Duque de Caxias" },
                { code: "NOV", name: "Nova Iguaçu" },
                { code: "SGM", name: "São Gonçalo" }
            ]
        },
        ward: {
            "São Paulo City": [
                { code: "PAL", name: "Paulista" },
                { code: "IBI", name: "Ibirapuera" },
                { code: "MOR", name: "Moema" },
                { code: "PIN", name: "Pinheiros" },
                { code: "JAR", name: "Jardins" }
            ]
        }
    },
    "India": {
        provinces: [
            { code: "MH", name: "Maharashtra" },
            { code: "TN", name: "Tamil Nadu" },
            { code: "UP", name: "Uttar Pradesh" },
            { code: "KA", name: "Karnataka" },
            { code: "GJ", name: "Gujarat" }
        ],
        city: {
            Maharashtra: [
                { code: "MUM", name: "Mumbai" },
                { code: "PUN", name: "Pune" },
                { code: "NAG", name: "Nagpur" },
                { code: "NAS", name: "Nashik" },
                { code: "AUR", name: "Aurangabad" }
            ],
            "Tamil Nadu": [
                { code: "CHE", name: "Chennai" },
                { code: "COI", name: "Coimbatore" },
                { code: "MAD", name: "Madurai" },
                { code: "TIR", name: "Tiruchirappalli" },
                { code: "SAL", name: "Salem" }
            ]
        },
        ward: {
            Mumbai: [
                { code: "SOU", name: "South Mumbai" },
                { code: "BAN", name: "Bandra" },
                { code: "AND", name: "Andheri" },
                { code: "POW", name: "Powai" },
                { code: "THA", name: "Thane" }
            ]
        }
    },
    "Russia": {
        provinces: [
            { code: "MOS", name: "Moscow" },
            { code: "SPB", name: "Saint Petersburg" },
            { code: "NOV", name: "Novosibirsk" },
            { code: "EKA", name: "Yekaterinburg" },
            { code: "KAZ", name: "Kazan" }
        ],
        city: {
            Moscow: [
                { code: "CEN", name: "Central" },
                { code: "NOR", name: "Northern" },
                { code: "SOU", name: "Southern" },
                { code: "EAS", name: "Eastern" },
                { code: "WES", name: "Western" }
            ],
            "Saint Petersburg": [
                { code: "CEN", name: "Central" },
                { code: "VAS", name: "Vasileostrovsky" },
                { code: "PET", name: "Petrogradsky" },
                { code: "VYB", name: "Vyborgsky" },
                { code: "KAL", name: "Kaliningradsky" }
            ]
        },
        ward: {
            "Central Moscow": [
                { code: "TVA", name: "Tverskoy" },
                { code: "ARB", name: "Arbat" },
                { code: "KIT", name: "Kitay-gorod" },
                { code: "PRE", name: "Presnensky" },
                { code: "BAS", name: "Basmanny" }
            ]
        }
    },
    "Mexico": {
        provinces: [
            { code: "MEX", name: "Mexico City" },
            { code: "JAL", name: "Jalisco" },
            { code: "NLE", name: "Nuevo León" },
            { code: "PUE", name: "Puebla" },
            { code: "VER", name: "Veracruz" }
        ],
        city: {
            "Mexico City": [
                { code: "CEN", name: "Centro" },
                { code: "POL", name: "Polanco" },
                { code: "CON", name: "Condesa" },
                { code: "ROMA", name: "Roma" },
                { code: "COY", name: "Coyoacán" }
            ],
            Jalisco: [
                { code: "GDL", name: "Guadalajara" },
                { code: "ZAP", name: "Zapopan" },
                { code: "TLA", name: "Tlaquepaque" },
                { code: "TON", name: "Tonalá" },
                { code: "TLAJ", name: "Tlajomulco" }
            ]
        },
        ward: {
            "Centro Mexico City": [
                { code: "HIS", name: "Historic Center" },
                { code: "ALM", name: "Alameda" },
                { code: "ZOC", name: "Zócalo" },
                { code: "MER", name: "Merced" },
                { code: "SAN", name: "San Juan" }
            ]
        }
    },
    "Thailand": {
        provinces: [
            { code: "BKK", name: "Bangkok" },
            { code: "CM", name: "Chiang Mai" },
            { code: "PH", name: "Phuket" },
            { code: "KR", name: "Krabi" },
            { code: "PT", name: "Pattaya" }
        ],
        city: {
            Bangkok: [
                { code: "SIL", name: "Silom" },
                { code: "SUK", name: "Sukhumvit" },
                { code: "RAT", name: "Ratchathewi" },
                { code: "BAN", name: "Bang Rak" },
                { code: "PHA", name: "Phaya Thai" }
            ]
        }
    },
    "Singapore": {
        provinces: [
            { code: "CEN", name: "Central" },
            { code: "NOR", name: "North" },
            { code: "NEA", name: "North-East" },
            { code: "EAST", name: "East" },
            { code: "WEST", name: "West" }
        ],
        city: {
            Central: [
                { code: "ORC", name: "Orchard" },
                { code: "MAR", name: "Marina Bay" },
                { code: "RIV", name: "Riverside" },
                { code: "BUG", name: "Bugis" },
                { code: "CHN", name: "Chinatown" }
            ]
        }
    },
    "Malaysia": {
        provinces: [
            { code: "KL", name: "Kuala Lumpur" },
            { code: "PEN", name: "Penang" },
            { code: "JOH", name: "Johor" },
            { code: "SAB", name: "Sabah" },
            { code: "SAR", name: "Sarawak" }
        ],
        city: {
            "Kuala Lumpur": [
                { code: "BUK", name: "Bukit Bintang" },
                { code: "KLC", name: "KLCC" },
                { code: "CHN", name: "Chinatown" },
                { code: "BAN", name: "Bangsar" },
                { code: "MON", name: "Mont Kiara" }
            ]
        }
    },
    "Philippines": {
        provinces: [
            { code: "NCR", name: "Metro Manila" },
            { code: "CEB", name: "Cebu" },
            { code: "DAV", name: "Davao" },
            { code: "BOH", name: "Bohol" },
            { code: "PAL", name: "Palawan" }
        ],
        city: {
            "Metro Manila": [
                { code: "MAK", name: "Makati" },
                { code: "BON", name: "Bonifacio Global City" },
                { code: "ORT", name: "Ortigas" },
                { code: "QUE", name: "Quezon City" },
                { code: "MAN", name: "Manila" }
            ]
        }
    },
    "Indonesia": {
        provinces: [
            { code: "JKT", name: "Jakarta" },
            { code: "BAL", name: "Bali" },
            { code: "SBY", name: "Surabaya" },
            { code: "BDG", name: "Bandung" },
            { code: "MKS", name: "Makassar" }
        ],
        city: {
            Jakarta: [
                { code: "SCB", name: "South Jakarta" },
                { code: "CEN", name: "Central Jakarta" },
                { code: "WES", name: "West Jakarta" },
                { code: "NOR", name: "North Jakarta" },
                { code: "EAS", name: "East Jakarta" }
            ]
        }
    }
}