
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
                request.open('POST', 'https://identity.whereismytransport.com/connect/token', true);
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

var getAgenciesFromTapi = function(token, stopId) {
    return new Promise(
        (resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', 'https://platform.whereismytransport.com/api/agencies', true);
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

var getStopsFromTapi = function(token) {
    return new Promise(
        (resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', 'https://platform.whereismytransport.com/api/stops', true);
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

var getLinesFromTapi = function(token) {
    return new Promise(
        (resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', 'https://platform.whereismytransport.com/api/lines', true);
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

async function getAgencies() {
    return new Promise((resolve,reject) => {
        getBearerToken()
        .then(token => getAgenciesFromTapi(token)) 
        .then(fulfilled => resolve(fulfilled))
        .catch(error => reject(error.message));
    })
}

async function getStops(lineId) {
    return new Promise((resolve,reject) => {
        getBearerToken()
        .then(token => getStopsFromTapi(token)) 
        .then(fulfilled => resolve(fulfilled))
        .catch(error => reject(error.message));
    })
}
