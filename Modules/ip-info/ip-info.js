function getIpInfo() {
    const {v4, v6} = $network;
    let info = [];
    if (!v4 && !v6) {
        info = ['网路可能中断', '请手动刷新以重新获取 IP'];
    } else {
        if (v4?.primaryAddress) info.push(`设备IP：${v4?.primaryAddress}`);
        if (v6?.primaryAddress) info.push(`IPv6地址：已分配`);
        if (v4?.primaryRouter && getSSID()) info.push(`路由器IP：${v4?.primaryRouter}`);
        if (v6?.primaryRouter && getSSID()) info.push(`IPv6地址：已分配`);
    }
    // info = info.join("\n");
    return info.join("\n") + '\n';
}

function getFlagEmoji(countryCode) {

    if (countryCode.toUpperCase() === 'TW') {
        countryCode = 'CN'
    }

    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function loadCarrierNames() {
    //整理逻辑:前三码相同->后两码相同运营商->剩下的
    return {
        //台湾运营商 Taiwan
        '466-11': '中華電信',
        '466-92': '中華電信',
        '466-01': '遠傳電信',
        '466-03': '遠傳電信',
        '466-97': '台灣大哥大',
        '466-89': '台灣之星',
        '466-05': 'GT',
        //大陆运营商 China
        '460-03': '中国电信',
        '460-05': '中国电信',
        '460-11': '中国电信',
        '460-01': '中国联通',
        '460-06': '中国联通',
        '460-09': '中国联通',
        '460-00': '中国移动',
        '460-02': '中国移动',
        '460-04': '中国移动',
        '460-07': '中国移动',
        '460-08': '中国移动',
        '460-15': '中国广电',
        '460-20': '中移铁通',
        //香港运营商 HongKong
        '454-00': 'CSL',
        '454-02': 'CSL',
        '454-10': 'CSL',
        '454-18': 'CSL',
        '454-03': '3',
        '454-04': '3',
        '454-05': '3',
        '454-06': 'SMC HK',
        '454-15': 'SMC HK',
        '454-17': 'SMC HK',
        '454-09': 'CMHK',
        '454-12': 'CMHK',
        '454-13': 'CMHK',
        '454-28': 'CMHK',
        '454-31': 'CMHK',
        '454-16': 'csl.',
        '454-19': 'csl.',
        '454-20': 'csl.',
        '454-29': 'csl.',
        '454-01': '中信國際電訊',
        '454-07': 'UNICOM HK',
        '454-08': 'Truphone',
        '454-11': 'CHKTL',
        '454-23': 'Lycamobile',
        //日本运营商 Japan
        '440-00': 'Y!mobile',
        '440-10': 'docomo',
        '440-11': 'Rakuten',
        '440-20': 'SoftBank',
        '440-50': ' au',
        '440-51': ' au',
        '440-52': ' au',
        '440-53': ' au',
        '440-54': ' au',
        '441-00': 'WCP',
        '441-10': 'UQ WiMAX',
        //韩国运营商 Korea
        '450-03': 'SKT',
        '450-05': 'SKT',
        '450-02': 'KT',
        '450-04': 'KT',
        '450-08': 'KT',
        '450-06': 'LG U+',
        '450-10': 'LG U+',
        //美国运营商 USA
        '310-030': 'AT&T',
        '310-070': 'AT&T',
        '310-150': 'AT&T',
        '310-170': 'AT&T',
        '310-280': 'AT&T',
        '310-380': 'AT&T',
        '310-410': 'AT&T',
        '310-560': 'AT&T',
        '310-680': 'AT&T',
        '310-980': 'AT&T',
        '310-160': 'T-Mobile',
        '310-200': 'T-Mobile',
        '310-210': 'T-Mobile',
        '310-220': 'T-Mobile',
        '310-230': 'T-Mobile',
        '310-240': 'T-Mobile',
        '310-250': 'T-Mobile',
        '310-260': 'T-Mobile',
        '310-270': 'T-Mobile',
        '310-300': 'T-Mobile',
        '310-310': 'T-Mobile',
        '310-660': 'T-Mobile',
        '310-800': 'T-Mobile',
        '311-660': 'T-Mobile',
        '311-882': 'T-Mobile',
        '311-490': 'T-Mobile',
        '312-530': 'T-Mobile',
        '311-870': 'T-Mobile',
        '311-880': 'T-Mobile',
        '310-004': 'Verizon',
        '310-010': 'Verizon',
        '310-012': 'Verizon',
        '310-013': 'Verizon',
        '311-110': 'Verizon',
        '311-270': 'Verizon',
        '311-271': 'Verizon',
        '311-272': 'Verizon',
        '311-273': 'Verizon',
        '311-274': 'Verizon',
        '311-275': 'Verizon',
        '311-276': 'Verizon',
        '311-277': 'Verizon',
        '311-278': 'Verizon',
        '311-279': 'Verizon',
        '311-280': 'Verizon',
        '311-281': 'Verizon',
        '311-282': 'Verizon',
        '311-283': 'Verizon',
        '311-284': 'Verizon',
        '311-285': 'Verizon',
        '311-286': 'Verizon',
        '311-287': 'Verizon',
        '311-288': 'Verizon',
        '311-289': 'Verizon',
        '311-390': 'Verizon',
        '311-480': 'Verizon',
        '311-481': 'Verizon',
        '311-482': 'Verizon',
        '311-483': 'Verizon',
        '311-484': 'Verizon',
        '311-485': 'Verizon',
        '311-486': 'Verizon',
        '311-487': 'Verizon',
        '311-488': 'Verizon',
        '311-489': 'Verizon',
        '310-590': 'Verizon',
        '310-890': 'Verizon',
        '310-910': 'Verizon',
        '310-120': 'Sprint',
        '310-850': 'Aeris Comm. Inc.',
        '310-510': 'Airtel Wireless LLC',
        '312-090': 'Allied Wireless Communications Corporation',
        '310-710': 'Arctic Slope Telephone Association Cooperative Inc.',
        '311-440': 'Bluegrass Wireless LLC',
        '311-800': 'Bluegrass Wireless LLC',
        '311-810': 'Bluegrass Wireless LLC',
        '310-900': 'Cable & Communications Corp.',
        '311-590': 'California RSA No. 3 Limited Partnership',
        '311-500': 'Cambridge Telephone Company Inc.',
        '310-830': 'Caprock Cellular Ltd.',
        '312-270': 'Cellular Network Partnership LLC',
        '312-280': 'Cellular Network Partnership LLC',
        '310-360': 'Cellular Network Partnership LLC',
        '311-120': 'Choice Phone LLC',
        '310-480': 'Choice Phone LLC',
        '310-420': 'Cincinnati Bell Wireless LLC',
        '310-180': 'Cingular Wireless',
        '310-620': 'Coleman County Telco /Trans TX',
        '310-06': 'Consolidated Telcom',
        '310-60': 'Consolidated Telcom',
        '310-700': 'Cross Valliant Cellular Partnership',
        '312-030': 'Cross Wireless Telephone Co.',
        '311-140': 'Cross Wireless Telephone Co.',
        '312-040': 'Custer Telephone Cooperative Inc.',
        '310-440': 'Dobson Cellular Systems',
        '310-990': 'E.N.M.R. Telephone Coop.',
        '312-120': 'East Kentucky Network LLC',
        '312-130': 'East Kentucky Network LLC',
        '310-750': 'East Kentucky Network LLC',
        '310-090': 'Edge Wireless LLC',
        '310-610': 'Elkhart TelCo. / Epic Touch Co.',
        '311-311': 'Farmers',
        '311-460': 'Fisher Wireless Services Inc.',
        '311-370': 'GCI Communication Corp.',
        '310-430': 'GCI Communication Corp.',
        '310-920': 'Get Mobile Inc.',
        '311-340': 'Illinois Valley Cellular RSA 2 Partnership',
        '312-170': 'Iowa RSA No. 2 Limited Partnership',
        '311-410': 'Iowa RSA No. 2 Limited Partnership',
        '310-770': 'Iowa Wireless Services LLC',
        '310-650': 'Jasper',
        '310-870': 'Kaplan Telephone Company Inc.',
        '312-180': 'Keystone Wireless LLC',
        '310-690': 'Keystone Wireless LLC',
        '311-310': 'Lamar County Cellular',
        '310-016': 'Leap Wireless International Inc.',
        '310-040': 'Matanuska Tel. Assn. Inc.',
        '310-780': 'Message Express Co. / Airlink PCS',
        '311-330': 'Michigan Wireless LLC',
        '310-400': 'Minnesota South. Wirel. Co. / Hickory',
        '311-010': 'Missouri RSA No 5 Partnership',
        '312-010': 'Missouri RSA No 5 Partnership',
        '311-020': 'Missouri RSA No 5 Partnership',
        '312-220': 'Missouri RSA No 5 Partnership',
        '311-920': 'Missouri RSA No 5 Partnership',
        '310-350': 'Mohave Cellular LP',
        '310-570': 'MTPCS LLC',
        '310-290': 'NEP Cellcorp Inc.',
        '310-34': 'Nevada Wireless LLC',
        '310-600': 'New-Cell Inc.',
        '311-300': 'Nexus Communications Inc.',
        '310-130': 'North Carolina RSA 3 Cellular Tel. Co.',
        '312-230': 'North Dakota Network Company',
        '311-610': 'North Dakota Network Company',
        '310-450': 'Northeast Colorado Cellular Inc.',
        '311-710': 'Northeast Wireless Networks LLC',
        '310-011': 'Northstar',
        '310-670': 'Northstar',
        '311-420': 'Northwest Missouri Cellular Limited Partnership',
        '310-760': 'Panhandle Telephone Cooperative Inc.',
        '310-580': 'PCS ONE',
        '311-170': 'PetroCom',
        '311-670': 'Pine Belt Cellular, Inc.',
        '310-100': 'Plateau Telecommunications Inc.',
        '310-940': 'Poka Lambro Telco Ltd.',
        '310-500': 'Public Service Cellular Inc.',
        '312-160': 'RSA 1 Limited Partnership',
        '311-430': 'RSA 1 Limited Partnership',
        '311-350': 'Sagebrush Cellular Inc.',
        '310-46': 'SIMMETRY',
        '311-260': 'SLO Cellular Inc / Cellular One of San Luis',
        '310-320': 'Smith Bagley Inc.',
        '316-011': 'Southern Communications Services Inc.',
        '310-740': 'Telemetrix Inc.',
        '310-14': 'Testing',
        '310-860': 'Texas RSA 15B2 Limited Partnership',
        '311-050': 'Thumb Cellular Limited Partnership',
        '311-830': 'Thumb Cellular Limited Partnership',
        '310-460': 'TMP Corporation',
        '310-490': 'Triton PCS',
        '312-290': 'Uintah Basin Electronics Telecommunications Inc.',
        '311-860': 'Uintah Basin Electronics Telecommunications Inc.',
        '310-960': 'Uintah Basin Electronics Telecommunications Inc.',
        '310-020': 'Union Telephone Co.',
        '311-220': 'United States Cellular Corp.',
        '310-730': 'United States Cellular Corp.',
        '311-650': 'United Wireless Communications Inc.',
        '310-003': 'Unknown',
        '310-15': 'Unknown',
        '310-23': 'Unknown',
        '310-24': 'Unknown',
        '310-25': 'Unknown',
        '310-26': 'Unknown',
        '310-190': 'Unknown',
        '310-950': 'Unknown',
        '310-38': 'USA 3650 AT&T',
        '310-999': 'Various Networks',
        '310-520': 'VeriSign',
        '310-530': 'West Virginia Wireless',
        '310-340': 'Westlink Communications, LLC',
        '311-070': 'Wisconsin RSA #7 Limited Partnership',
        '310-390': 'Yorkville Telephone Cooperative',
        //英国运营商 UK
        '234-08': 'BT OnePhone UK',
        '234-10': 'O2-UK',
        '234-15': 'vodafone UK',
        '234-20': '3',
        '234-30': 'EE',
        '234-33': 'EE',
        '234-38': 'Virgin',
        '234-50': 'JT',
        '234-55': 'Sure',
        '234-58': 'Manx Telecom',
        //菲律宾运营商 Philippine
        '515-01': 'Islacom',
        '515-02': 'Globe',
        '515-03': 'Smart',
        '515-04': 'Sun',
        '515-08': 'Next Mobile',
        '515-18': 'Cure',
        '515-24': 'ABS-CBN',
        //越南运营商 Vietnam
        '452-01': 'Mobifone',
        '452-02': 'VinaPhone',
        '452-03': 'S-Fone',
        '452-04': 'Viettel',
        '452-05': 'VietNamobile',
        '452-06': 'E-mobile',
        '452-07': 'Gmobile',
    };
}


function getCellularInfo() {
    const radioGeneration = {
        'GPRS': '2.5G',
        'CDMA1x': '2.5G',
        'EDGE': '2.75G',
        'WCDMA': '3G',
        'HSDPA': '3.5G',
        'CDMAEVDORev0': '3.5G',
        'CDMAEVDORevA': '3.5G',
        'CDMAEVDORevB': '3.75G',
        'HSUPA': '3.75G',
        'eHRPD': '3.9G',
        'LTE': '4G',
        'NRNSA': '5G',
        'NR': '5G',
    };

    let cellularInfo = '';
    const carrierNames = loadCarrierNames();
    if ($network['cellular-data']) {
        const carrierId = $network['cellular-data'].carrier;
        const radio = $network['cellular-data'].radio;
        if ($network.wifi?.ssid == null && radio) {
            cellularInfo = carrierNames[carrierId] ?
                `${carrierNames[carrierId]} | ${radioGeneration[radio]} - ${radio} ` :
                `蜂窝数据 | ${radioGeneration[radio]} - ${radio}`;
        }
    }
    return cellularInfo;
}

function getSSID() {
    return $network.wifi?.ssid;
}

function getIcon() {
    if (getSSID()) {
        return "data:image/png;base64,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"
    } else {
        name = getCellularInfo()
        if (name.indexOf('5G') !== -1) {
            return "data:image/png;base64,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"
        } else {
            return "data:image/png;base64,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"
        }
    }
}

(async () => {
    let panel_msg = {
        title: '',
        content: '',
        icon: getSSID() ? 'wifi' : 'simcard',
        'icon-color': getSSID() ? '#5A9AF9' : '#8AB8DD',
    }
    let content = []
    let title = getSSID() ?? getCellularInfo()
    let getIpInfoPromise = new Promise((resolve, reject) => {
        $httpClient.get('http://ip-api.com/json', function (error, response, data) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });

    let getLocalInfoPromise = new Promise((resolve, reject) => {
        $httpClient.get('https://ip.useragentinfo.com/json', function (error, response, data) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });

    await getLocalInfoPromise.then(info => {
        content.push(`${title} 公网IP：${info.ip}`);
        content.push(`${title} ISP：${info.isp} - ${info.net}`);
        content.push(`${title} 位置：${getFlagEmoji(info.short_name)} | ${info.country} - ${info.province} - ${info.city}`);
    }).catch(error => {
        content.push(`本机IP：获取失败`)
    })

    await getIpInfoPromise.then(info => {
        content.push(`节点IP：${info.query}`)
        content.push(`节点ISP：${info.isp}`)
        content.push(`节点位置：${getFlagEmoji(info.countryCode)} | ${info.country} - ${info.city}`)
    }).catch(error => {
        content.push(`节点IP：获取失败`)
    })

    panel_msg.icon = getIcon()
    panel_msg.title = title
    panel_msg.content = getIpInfo() + content.join("\n")
    $done(panel_msg)
})()