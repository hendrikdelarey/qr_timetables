
var CLIENT_ID = '8bd4ea1f-5ef2-43d9-a629-036717d29a7d';
var CLIENT_SECRET = 'Tj/uhBjttwgOV7RL/hufBfmvC16gS+uCqkR2nYSGWaI=';

var payload = {
  'client_id': CLIENT_ID,
  'client_secret': CLIENT_SECRET,
  'grant_type': 'client_credentials',
  'scope': 'transportapi:all'
};

var getBearerToken = new Promise(
    function(resolve, reject) {
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
                Promise.resolve(token);
            });
            request.addEventListener("error", reject({message:'error'}));
            request.addEventListener("abort", reject({message:'abort'}));

            request.setRequestHeader('Accept', 'application/json');
            var formData = new FormData();
            for (var key in payload) {
                formData.append(key, payload[key]);
            }
            request.send(formData);
        }
    }
);

var getStopTimetables = function(token, stopId) {
    return new Promise(
        function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('GET', 'https://platform.whereismytransport.com/api/stops/' + stopId + '/timetables', true);
            request.setRequestHeader('Content-type', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer ' + token);
            request.addEventListener('load', function () {
                resolve(JSON.parse(this.responseText));
            });
            request.addEventListener("error", reject(false));
            request.addEventListener("abort", reject(false));
            request.send();
            var response = JSON.parse(xhttp.responseText);
        }
    );
};

function getTimetable(stopId) {
    var timetable = 'timetable';
    getBearerToken
        .then(function(value) {
            console.log(value);
            timetable = value;
        })    
        .catch(error => console.log(error.message));
        //.then(token => getStopTimetables(token, stopId))
        //.then(fulfilled => console.log(fulfilled))
        //.catch(error => console.log(error.message));
    console.log(timetable)
}

getTimetable('OUGFyFyd8kuTa6ewAP9VFw')

