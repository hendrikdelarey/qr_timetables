const url = "https://api.qrserver.com/v1/create-qr-code/";
const size = 480;
const destinationUrl = 'file:///F:/Workspaces/QRCodes/timetables/index.html?stopid=';

function getQrCodeUrl (value) {
    let target = destinationUrl + value;
    target = encodeURI(target);
    let rawUrl = `${url}?size=${size}x${size}&data=${target}`;
    return encodeURI(rawUrl);
}