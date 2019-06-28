
function displayQrCode(qrCode) { 
    console.log('Display QR code');
    let imageView = document.getElementById('qrCodeImageView');
    document.getElementById('qrCodeImageView').innerHTML += `<span>${qrCode}</span><br/>
    <iframe width=500 height=500 src='${qrCode}'></iframe>
    `
    console.log("finish");
}

function onGenerateQrCodeButtonClick () {
    var e = document.getElementById("text_input");
    var qrCodeData = e.value.split(',');

    qrCodeData.forEach(qr => {
        displayQrCode(getQrCodeUrl(qr)); 
    });
}

function main() {
}

main();