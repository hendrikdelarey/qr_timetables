const url = "https://api.qrserver.com/v1/create-qr-code/";
const size = 480;

function getQrCodeUrl (value) {
    let target = value;
    target = encodeURI(target);
    let rawUrl = `${url}?size=${size}x${size}&data=${target}`;
    return encodeURI(rawUrl);
}