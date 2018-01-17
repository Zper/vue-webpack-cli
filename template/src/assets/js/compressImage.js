//Demo在最底部
//压缩图片，生成base64编码
export const CompressImage = (path, obj, callback) => {
    let img = new Image();
    img.onload = function() {
        // 默认按比例压缩
        let w = this.width,
            h = this.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        let quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        // 创建属性节点
        let anw = document.createAttribute('width');
        anw.nodeValue = w;
        let anh = document.createAttribute('height');
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(this, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
    img.src = path;
};

//将base64编码转成blob对象
export const ConvertBase64UrlToBlob = (urlData) => {
    let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
};

//将blob对象或者file对象转成图片url
export const ConvertToImageUrl = (file) => {
    let url = '';
    if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
};

//element组件的使用例子

// import {compressImage, convertBase64UrlToBlob, ConvertToImageUrl} from '@/assets/js/compressImage'

// _.forEach(this.$refs.upload.uploadFiles, (m, index) => {
//     if((m.size / 1024) > (1024 * 3 + 1)) { //大于3m的图片要进行压缩
//         let quality = 0.5;  //设置自定义压缩比例
//         CompressImage(ConvertToImageUrl(m.raw), {quality: quality}, (base64Codes) => {
//             let item = ConvertBase64UrlToBlob(base64Codes);
//             if((item.size / 1024) > (1024 * 3 + 1)) {  //压缩之后还是大于3m
//                 this.$message({
//                     message: '大兄弟，你的图片也太大了吧！',
//                     type: 'success'
//                 });
//                 this.$refs.upload.uploadFiles.splice(index, 1);
//                 return;
//             }
//             let file = new File([item], m.name, {type: item.type});
//             m.url = ConvertToImageUrl(item);
//             m.size = item.size;
//             m.raw = file;
//         });
//     }
// });
