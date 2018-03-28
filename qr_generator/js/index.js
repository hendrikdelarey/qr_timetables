let agencies = [];
let stops = [];
let selectedStop = null;

function setupStopsList() {
    let stopSelectBody = '<option value="0">Select Stop</option>';
    stops.forEach((value, index, arr) => {
        stopSelectBody += `
            <option value='${value.id}'>${value.name}</option>`;
    })

    document.getElementById('stopSelect').innerHTML = stopSelectBody;
}

function setupAgencyList() {
    let agencySelectBody = '<option value="0">Select Agency</option>';
    agencies.forEach((value, index, arr) => {
        agencySelectBody += `
            <option value='${value.id}'>${value.name}</option>`;
    })

    document.getElementById('agencySelect').innerHTML = agencySelectBody;
}

function onAgencySelectedChanged () {
    var e = document.getElementById("agencySelect");
    var value = e.options[e.selectedIndex].value;

    if(value == "0") {
        document.getElementById('stopSelect').innerHTML = '';
    }
    else {
        getStops(value)
        .then(result => {
            stops = result;
            setupStopsList();
        })
        .catch(error => console.log(error));
    }
}

function displayQrCode(qrCode) { 
    console.log('Display QR code');
    let imageView = document.getElementById('qrCodeImageView');
    document.getElementById('qrCodeImageView').innerHTML = `
    <iframe width=480 height=480 src='${qrCode}'></iframe>
    `    
}

function onGenerateQrCodeButtonClick () {
    var e = document.getElementById("stopSelect");
    var value = e.options[e.selectedIndex].value;

    displayQrCode(getQrCodeUrl(value));   
}

function main() {
    getAgencies()
    .then(result => {
        agencies = result;
        setupAgencyList();
    })
    .catch(error => console.log(error));
}

main();