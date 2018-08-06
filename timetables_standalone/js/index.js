function checkTime(i) {
        if (i < 10) {
                i = "0" + i
        };
        return i;
}

function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('time').innerHTML =h + ":" + m;
        var t = setTimeout(startTime, 500);
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function toDateString(date) {
        return date.toTimeString().split(' ')[0].slice(0, -3); 
}

function showErrorMessage(error) {
        document.getElementById('log').innerHTML = 'Error loading timetables';    
}

function bindStopNameToPage(stop) {
        document.getElementById('title').innerHTML = stop.name;
        document.getElementById('agency').innerHTML = stop.agency.name;
}

function bindStopTimeTableToPage(timetable) {
        let timetableBody = '';
        
        timetable.forEach((item, index, arr) => {
                timetableBody += `<tr> 
                <td>${item.line.shortName}</td>
                <td>${item.vehicle.headsign}</td>
                <td>${toDateString(new Date(item.arrivalTime))}</td>
                <td>${toDateString(new Date(item.departureTime))}</td>
                </tr>`
        });

        document.getElementById('timetable-body').innerHTML = timetableBody;
}

function main() {
        startTime();
        let stopId = getQueryVariable('stopid');
        let lineId = getQueryVariable('lineid');
        let clientKey = decodeURIComponent(getQueryVariable('key'));
        let clientSecret = decodeURIComponent(getQueryVariable('secret'));



        if(window.stop && window.timetable) {
          bindStopNameToPage(window.stop)
          bindStopTimeTableToPage(window.timetable)
          return;
        }

        if(stopId) {
                getStop(clientKey, clientSecret, stopId)
                .then(stop => {
                        window.stop = stop;
                        bindStopNameToPage(stop)
                })
                .catch(error => {
                        showErrorMessage(error);
                });

                getStopTimetable(stopId)
                .then(timetable => {
                        window.timetable = timetable;
                        bindStopTimeTableToPage(timetable);
                 })
                 .catch(error => {
                        showErrorMessage(error);
                 });   
        }
        else if(lineId) {
                getLineTimetable(clientKey, clientSecret, lineId)
                .then(timetable => bindLineTimetableToPage(timetable))
                .catch(error => {
                        showErrorMessage(error);
                })
        }
}

main();
