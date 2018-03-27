let agencies = [];
let stops = [];

function setupStopsList() {
    let stopSelectBody = '<option value="0">Select Stop</option>';
    agencies.forEach((value, index, arr) => {
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

function onAgencySelected (selectedItem) {
    if(selectedItem.value == "0") {
        document.getElementById('stopSelect').innerHTML = '';
    }
    else {
        getStops()
        .then(result => {
            stops = result;
            setupStopsList();
        })
        .catch(error => console.log(error));
    }
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