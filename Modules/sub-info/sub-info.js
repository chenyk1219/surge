/*
* 部分方法引用脚本： https://raw.githubusercontent.com/mieqq/mieqq/master/sub_info_panel.js
* 部分方法引用脚本：https://github.com/Rabbit-Spec/Surge/blob/Master/Module/Panel/Sub-info/Moore/Sub-info.js
* 作者： @chenyk1219
* */
function geArg() {
    return Object.fromEntries(
        $argument.split("&").map((i) => i.split("="))
            .map(([k, v]) => [k, decodeURIComponent(v)])
    );
}

function flagIconToHex(flagIcon) {
    // 提取国旗图标的字母部分
    var regionIndicatorLetter = flagIcon.replace(/[\uD83C\uDDE6-\uD83C\uDDFF]/gu, '');

    // 获取字母的 Unicode 码点并转换为十六进制字符串
    var countryCode = regionIndicatorLetter.codePointAt(0).toString(16);

    return countryCode;
}


function httpAPI(path = '', method = 'POST', body = null) {
    return new Promise(resolve => {
        $httpAPI(method, path, body, result => {
            resolve(result)
        })
    })
}

function bytesToSize(bytes) {
    if (bytes === 0) return "0B";
    let k = 1024;
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

function timeTransform(dateNow, dateTime) {
    let dateDiff = dateNow - dateTime;
    let days = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    let leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    let leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000)

    if (days === 0) {

        if (hours === 0) {
            if (minutes === 0) return (`${seconds}秒`);
            return (`${minutes}分${seconds}秒`)
        }
        return (`${hours}时${minutes}分${seconds}秒`)
    } else {
        return (`${days}天${hours}时${minutes}分`)
    }

}

(async () => {
    let panel_msg = {
        title: '当前订阅&流量信息',
        content: '',
        icon: 'airplane.circle',
        'icon-color': '#5A9AF9',
    }

    const data = await httpAPI('/v1/policies', 'GET')

    let content = [];
    content.push("⭐️⭐️订阅信息：")
    let length = data['proxies'].length | 0
    for (let i = 0; i < length; i++) {
        const code = flagIconToHex(data['proxies'][i].split()[0])
        if (code !== "20" && /:|：|Days|GB|Expire|Reset|date|到期|剩余|流量/.test(data['proxies'][i])) {
            content.push(data['proxies'][i])
        }
    }

    content.push("⭐️⭐️流量信息：")

    let runInfo = await httpAPI('/v1/traffic', 'GET')

    let currentTimeStamp = new Date()
    let startTimeStamp = Math.floor(runInfo.startTime * 1000)
    let runTime = timeTransform(currentTimeStamp, startTimeStamp)
    content.push(`Surge Pro® 运行时长：${runTime}`)

    let connectorObj = runInfo.connector
    let connector = 0
    Object.keys(connectorObj).forEach(function (key) {
        connector += connectorObj[key].in
    })
    let direct = connectorObj.DIRECT.in


    let interfaceObj = runInfo.interface
    let interfaceIn = 0
    Object.keys(interfaceObj).forEach(function (key) {
        interfaceIn += interfaceObj[key].in
    })

    let proxy = interfaceIn - direct
    content.push(`本次运行用的总流量：${bytesToSize(interfaceIn)}`)
    content.push(`本次运行用的直连流量：${bytesToSize(direct)}`)
    content.push(`本次运行用的代理流量：${bytesToSize(proxy)}`)

    if (direct > 10 * 1024 * 1024 * 1024) {
        $notification.post("流量使用警告", '', `本次运行用的直连流量已达：${bytesToSize(direct)}`)
    }

    if (proxy > 10 * 1024 * 1024 * 1024) {
        $notification.post("流量使用警告", '', `本次运行用的代理流量已达：${bytesToSize(proxy)}`)
    }


    panel_msg.content = content.join('\n')
    $done(panel_msg)
})()