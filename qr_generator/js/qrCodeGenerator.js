const url = "https://api.qrserver.com/v1/create-qr-code/";
const size = 480;
const destinationUrl = 'https://hendrikdelarey.github.io/qr_timetables/qr_generator/index.html?stopid=';

function getQrCodeUrl (value) {
    let target = destinationUrl + value;
    target = encodeURI(target);
    let rawUrl = `${url}?size=${size}x${size}&data=${target}`;
    return encodeURI(rawUrl);
}