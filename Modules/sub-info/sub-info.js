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
        icon: 'wifi',
        'icon-color': '#5A9AF9',
    }
    let content = [];
    const data = await httpAPI('/v1/policies', 'GET')
    const proxies = data['proxies'] | []
    const reg = /Days|GB|Expire|Reset|date/i
    if (proxies.length) {
        proxies.forEach(item => {
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