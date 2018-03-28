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
        document.getElementById('title').innerHTML = stop.agency.name + ": " + stop.name;
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
        let stopId = getQueryVariable('stopId');
        let lineId = getQueryVariable('lineId');

        if(stopId) {
                getStop(stopId)
                .then(stop => bindStopNameToPage(stop))
                .catch(error => {
                        showErrorMessage(error);
                });

                getStopTimetable('OUGFyFyd8kuTa6ewAP9VFw')
                .then(timetable => {
                        bindStopTimeTableToPage(timetable);
                 })
                 .catch(error => {
                        showErrorMessage(error);
                 });   
        }
        else if(lineId) {
                getLineTimetable(lineId)
                .then(timetable => bindLineTimetableToPage(timetable))
                .catch(error => {
                        showErrorMessage(error);
                })
        }
}

main();