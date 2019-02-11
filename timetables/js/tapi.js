const TAPI_URL = 'https://platform.whereismytransport.com/'
const IDENTITY_URL = 'https://identity.whereismytransport.com/connect/token'

var CLIENT_ID = '8bd4ea1f-5ef2-43d9-a629-036717d29a7d';
var CLIENT_SECRET = 'Tj/uhBjttwgOV7RL/hufBfmvC16gS+uCqkR2nYSGWaI=';

var payload = {
  'client_id': CLIENT_ID,
  'client_secret': CLIENT_SECRET,
  'grant_type': 'client_credentials',
  'scope': 'transportapi:all'
};

var getBearerToken = function() { 
    return new Promise(
        (resolve, reject) => {
            if(window.token_expires_in != false && window.token_expires_in > new Date().getTime()) {
                resolve (window.token);
            }
            else {
                var request = new XMLHttpRequest();
                request.open('POST', IDENTITY_URL, true);
                request.addEventListener('load', function () {
                    var response = JSON.parse(this.responseText);
                    var token = response.access_token;
                    window.token = token;
                    window.token_expires_in = new Date().getTime() + response.expires_in;
                    resolve(token);
                });
                request.addEventListener("error", error => reject({message:'error', err: error }));
                request.addEventListener("abort", error => reject({message:'abort', err: error }));

                request.setRequestHeader('Accept', 'application/json');
                var formData = new FormData();
                for (var key in payload) {
                    formData.append(key, payload[key]);
                }
                request.send(formData);
            }
        }
    )};

var getStopFromTapi = function(token, stopId) {
    return new Promise(
        (resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', TAPI_URL + 'api/stops/' + stopId, true);
            request.setRequestHeader('Content-type', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer ' + token);
            request.addEventListener('load', function () {
                resolve(JSON.parse(this.responseText));
            });
            request.addEventListener("error", error => reject({message:'error', err: error }));
            request.addEventListener("abort", error => reject({message:'abort', err: error }));
            request.send();
        }
    );
};

var getStopTimetables = function(token, stopId) {
    return new Promise(
        (resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', TAPI_URL + 'api/stops/' + stopId + '/timetables', true);
            request.setRequestHeader('Content-type', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer ' + token);
            request.addEventListener('load', function () {
                resolve(JSON.parse(this.responseText));
            });
            request.addEventListener("error", error => reject({message:'error', err: error }));
            request.addEventListener("abort", error => reject({message:'abort', err: error }));
            request.send();
        }
    );
};

var getLineTimetables = function(token, lineId) {
    return new Promise(
        (resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', TAPI_URL + 'api/lines/' + lineId + '/timetables', true);
            request.setRequestHeader('Content-type', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer ' + token);
            request.addEventListener('load', function () {
                resolve(JSON.parse(this.responseText));
            });
            request.addEventListener("error", error => reject({message:'error', err: error }));
            request.addEventListener("abort", error => reject({message:'abort', err: error }));
            request.send();
        }
    );
};

async function getStop(stopId) {
    return new Promise((resolve,reject) => {
        getBearerToken()
        .then(token => getStopFromTapi(token, stopId)) 
        .then(fulfilled => resolve(fulfilled))
        .catch(error => reject(error.message));
    })
}

async function getStopTimetable(stopId) {
    return new Promise((resolve,reject) => {
        getBearerToken()
        .then(token => getStopTimetables(token, stopId)) 
        .then(fulfilled => resolve(fulfilled))
        .catch(error => reject(error.message));
    })
}

async function getLineTimetable(lineId) {
    return new Promise((resolve,reject) => {
        getBearerToken()
        .then(token => getLineTimetables(token, lineId)) 
        .then(fulfilled => resolve(fulfilled))
        .catch(error => reject(error.message));
    })
}
