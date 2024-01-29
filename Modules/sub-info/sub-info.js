!(async () => {
    let panel_msg = {
        title: '当前订阅信息',
        content: '',
        icon: 'wifi',
        'icon-color': '#5A9AF9',
    }
    let content = [];
    let test = new Promise((resolve, reject) => {
        $httpAPI.get('/v1/policies', function (error, response, data) {
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
        const reg = /Days|GB|Expire|Reset|date/i
        proxies.forEach(item => {
            if (reg.test(item)) {
                content.push(item.split('=')[0])
            }
        })
    }).catch((error) => {
        console.log(error);
    });

    $done(panel_msg)
})()