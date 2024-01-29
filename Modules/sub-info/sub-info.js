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

(async () => {
    let panel_msg = {
        title: '当前订阅信息',
        content: '',
        icon: 'network.badge.shield.half.filled',
        'icon-color': '#607B56',
    }

    const data = await httpAPI('/v1/policies', 'GET')
    // if (typeof $argument !== "undefined" && $argument !== "") {
    //     const arg = geArg("$argument")
    //     reg = arg.regex
    // }

    let content = [];
    let length = data['proxies'].length | 0
    for (let i = 0; i < length; i++) {
        const code = flagIconToHex(data['proxies'][i].split()[0])
        if (code !== "20" && /:|：/.test(data['proxies'][i])) {
            content.push(data['proxies'][i])
        }


    }
    panel_msg.content = content.join('\n')
    $done(panel_msg)
})()