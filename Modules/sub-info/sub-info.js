function geArg() {
  return Object.fromEntries(
    $argument.split("&").map((i) => i.split("="))
    .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}


function httpAPI(path = '', method = 'POST', body = null) {
    return new Promise(resolve => {
        $httpAPI(method, path, body, result => {
            resolve(result)
        })
    })
}

!(async () => {
    let panel_msg = {
        title: '当前订阅信息',
        content: '',
        icon: 'network.badge.shield.half.filled',
        'icon-color': '#607B56',
    }
    let content = [];
    let reg = /Days|GB|Expire|Reset|date|到期|剩余|流量/i
    const data = await httpAPI('/v1/policies', 'GET')
    // if (typeof $argument !== "undefined" && $argument !== "") {
    //     const arg = geArg("$argument")
    //     reg = arg.regex
    // }

    if (data['proxies']) {
        data['proxies'].forEach(item => {
            if (reg.test(item)) {
                content.push(item)
            }
        })
    } else {
        content.push('请配和本仓库的配置文件一起食用')
    }

    panel_msg.content = content.join('\n')
    $done(panel_msg)
})()