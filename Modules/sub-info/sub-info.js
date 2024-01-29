(async () => {
    let panel_msg = {
        title: '当前订阅信息',
        content: '',
        icon: getSSID() ? 'wifi' : 'simcard',
        'icon-color': getSSID() ? '#5A9AF9' : '#8AB8DD',
    }
    let content = [];
    let test = new Promise((resolve, reject) => {
        $httpClient.get('/v1/policies', function (error, response, data) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });

    await test.then((data) => {
        const {proxies} = data
        proxies.forEach(item => {
            if (item.indexOf('Days') !== -1) {
                content.push(item)
            }
        })
    }).catch((error) => {
        console.log(error);
    });

    $done(panel_msg)
})()