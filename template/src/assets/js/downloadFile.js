/*
* 主用a标签的download属性，此方法是备用
* 解决ie不支持download属性 && 火狐跨域不能下载的问题
* */
export const downloadFile = (url, filename) => {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        //监听进度事件
        xhr.addEventListener('progress', evt => {
            console.log(evt);
            if (evt.lengthComputable) {
                let percent = evt.loaded / evt.total;
                console.log((percent * 100) + '%');
            }
        }, false);
        xhr.onload = () => {
            if (xhr.status === 200) {
                if (window.navigator.msSaveOrOpenBlob) {  //IE10及以上可用
                    navigator.msSaveBlob(xhr.response, filename);
                } else {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(xhr.response);
                    link.download = filename;
                    if(document.all) {  //Firefox不支持 click()方法
                        link.click();
                    } else {
                        let evt = document.createEvent('MouseEvents');
                        evt.initEvent('click', true, true);
                        link.dispatchEvent(evt);
                    }
                    window.URL.revokeObjectURL(link.href);
                }
                resolve();
            }
        };
        xhr.send();
    });
}

//  vue-mixin方法 - Demo

// axios拦截器需要改成下面这样
// if (token && config.responseType !== 'blob') {
//     config.headers['X-Token'] = token;
// }

// downloadFile(url, fileName) {
//     this.$http.request({
//         url: url,
//         method: 'get',
//         responseType: 'blob',
//         progress: (progressEvent) => {
//             console.log(evt);
//             if (evt.lengthComputable) {
//                 let percent = evt.loaded / evt.total;
//                 console.log((percent * 100) + '%');
//             }
//         }
//     }).then(response => {
//         if (response.status === 200) {
//             if (window.navigator.msSaveOrOpenBlob) {  //IE10及以上可用
//                 navigator.msSaveBlob(response.data, filename);
//             } else {
//                 const link = document.createElement('a');
//                 link.href = window.URL.createObjectURL(response.data);
//                 link.download = fileName;
//                 if(document.all) {  //Firefox不支持 click()方法
//                     link.click();
//                 } else {
//                     let evt = document.createEvent('MouseEvents');
//                     evt.initEvent('click', true, true);
//                     link.dispatchEvent(evt);
//                 }
//                 window.URL.revokeObjectURL(link.href);
//             }
//         }
//     }).catch(error => {
//         console.log(error);
//     })
// }